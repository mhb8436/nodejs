import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`/posts?page=${page}`);
      setPosts(response.data.data || []);
      setCurrentPage(page);
      // api2.js는 totalPages를 제공하지 않으므로 임의로 설정
      // 실제로는 총 게시글 수를 알아야 정확한 페이지 수 계산 가능
      setTotalPages(response.data.data && response.data.data.length > 0 ? 10 : 1);
      setError(null);
    } catch (err) {
      console.error('게시글을 불러오는 중 오류가 발생했습니다:', err);
      setError('게시글을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="post-list">
      <h2 className="mb-4">게시글 목록</h2>
      
      {posts.length === 0 ? (
        <div className="alert alert-info">게시글이 없습니다.</div>
      ) : (
        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                  <td>{post.author}</td>
                  <td>{post.createAt && post.createAt.substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <span className="mx-2">
              {currentPage} / {totalPages}
            </span>
            <button 
              className="btn btn-sm btn-outline-primary" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              다음
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-3">
        <Link to="/create" className="btn btn-primary">
          새 게시글 작성
        </Link>
      </div>
    </div>
  );
}

export default PostList;
