"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ChatRoom {
  id: number;
  name: string;
}

export default function ChatRoomListPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError("");
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/chat/rooms`);
        if (!res.ok) throw new Error("채팅방 목록을 불러오지 못했습니다.");
        const data = await res.json();
        setRooms(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">채팅방 목록</h1>
      {loading && <div>로딩 중...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul className="divide-y">
        {rooms.map((room) => (
          <li key={room.id} className="py-4 flex items-center justify-between">
            <span className="text-lg">{room.name}</span>
            <Link href={`/chat/room/${room.id}`} className="text-blue-600 hover:underline">
              입장
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
