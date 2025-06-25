import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/posts/${id}`);
        const post = response.data.data;
        setFormData({
          title: post.title,
          content: post.content
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    
    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }
    
    try {
      setSubmitting(true);
      await axios.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('게시글 수정 중 오류가 발생했습니다:', err);
      setError('게시글 수정 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="post-form">
      <h2 className="mb-4">게시글 수정</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">제목</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="content" className="form-label">내용</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="10"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(`/posts/${id}`)}
          >
            취소
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
