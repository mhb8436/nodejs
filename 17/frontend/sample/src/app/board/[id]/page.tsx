"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

export default function BoardDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError("");
      try {
        // 환경변수에서 백엔드 API 주소를 읽어옵니다.
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/board/posts/${params.id}`);
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
        const data = await res.json();
        setPost({
          id: data.id,
          title: data.title,
          content: data.content,
          author: data.user?.nickname || "익명",
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchPost();
  }, [params.id]);

  if (loading) {
    return <div className="max-w-xl mx-auto py-10 px-4">로딩 중...</div>;
  }
  if (error || !post) {
    return <div className="max-w-xl mx-auto py-10 px-4">{error || "게시글을 찾을 수 없습니다."}</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <div className="mb-2 text-gray-600 text-sm">작성자: {post.author}</div>
      <div className="mb-6 whitespace-pre-line">{post.content}</div>
      <Link href="/board" className="text-blue-600 hover:underline">목록으로</Link>
    </div>
  );
}
