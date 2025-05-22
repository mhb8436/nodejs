"use client";
import Link from "next/link";

// 게시판 샘플 데이터 (실제 서비스에서는 API로 대체)
const samplePosts = [
  { id: 1, title: "첫 번째 게시글", author: "user1" },
  { id: 2, title: "두 번째 게시글", author: "user2" },
];

export default function BoardPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">게시판</h1>
      <div className="mb-4 flex justify-end">
        <Link href="/board/write" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">글쓰기</Link>
      </div>
      <ul className="divide-y">
        {samplePosts.map((post) => (
          <li key={post.id} className="py-4 flex justify-between items-center">
            <Link href={`/board/${post.id}`} className="text-lg text-blue-700 hover:underline">{post.title}</Link>
            <span className="text-gray-500 text-sm">{post.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
