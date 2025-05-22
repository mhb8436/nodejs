"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Message {
  id: number;
  user: { id: number; nickname: string };
  content: string;
  createdAt: string;
}

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000";

  // 기존 메시지 REST API로 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${apiBaseUrl}/chat/rooms/${roomId}/messages`);
        if (!res.ok) throw new Error("메시지 목록을 불러오지 못했습니다.");
        const data = await res.json();
        setMessages(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (roomId) fetchMessages();
  }, [roomId]);

  // 닉네임 및 WebSocket 연결
  useEffect(() => {
    let nick = localStorage.getItem("chat_nickname");
    if (!nick) {
      nick = "user" + Math.floor(Math.random() * 10000);
      localStorage.setItem("chat_nickname", nick);
    }
    setNickname(nick);
    if (!roomId) return;
    ws.current = new WebSocket(wsUrl + `/chat?roomId=${roomId}`);
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages((prev) => [...prev, msg]);
      } catch {}
    };
    ws.current.onerror = () => {
      setError("채팅 서버 연결 실패");
    };
    return () => {
      ws.current?.close();
    };
  }, [roomId, wsUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !ws.current || ws.current.readyState !== 1) return;
    const msg = {
      user: { nickname },
      content: input,
      createdAt: new Date().toISOString(),
    };
    ws.current.send(JSON.stringify(msg));
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4 flex flex-col h-[80vh]">
      <div className="mb-2">
        <Link href="/chat" className="text-blue-600 hover:underline">← 채팅방 목록</Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">채팅방 #{roomId}</h1>
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-50">
        {loading && <div>로딩 중...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {messages.length === 0 && !loading && <div className="text-gray-400">메시지가 없습니다.</div>}
        {messages.map((msg, idx) => (
          <div key={msg.id || idx} className="mb-2">
            <span className="font-semibold text-blue-700">{msg.user.nickname}</span>
            <span className="ml-2 text-gray-700">{msg.content}</span>
            <span className="ml-2 text-xs text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="메시지를 입력하세요"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          보내기
        </button>
      </form>
    </div>
  );
}
