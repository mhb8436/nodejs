import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data.data);
        setError(null);
      } catch (err) {
        console.error('게시글을 불러오는 중 오류가 발생했습니다:', err);
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await axios.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        console.error('게시글 삭제 중 오류가 발생했습니다:', err);
        alert('게시글 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div className="alert alert-warning">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="post-detail">
      <h2 className="mb-4">게시글 상세</h2>
      
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">{post.title}</h5>
          <span className="badge bg-secondary">조회수: {post.count}</span>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <small className="text-muted">
              작성자: {post.author} | 작성일: {post.createAt && post.createAt.substring(0, 10)}
            </small>
          </div>
          <div className="mb-4">
            {post.content.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
            <Link to="/" className="btn btn-secondary me-2">목록으로</Link>
          </div>
          <div>
            <Link to={`/edit/${post.id}`} className="btn btn-primary me-2">수정</Link>
            <button onClick={handleDelete} className="btn btn-danger">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
