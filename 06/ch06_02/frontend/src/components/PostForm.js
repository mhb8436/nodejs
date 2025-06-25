import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PostForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "사용자",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/posts", formData);
      // {
      //     "title":"게시글 쓰기",
      //     "content": "게시글 작성"
      // }

      navigate("/");
    } catch (err) {
      console.error("게시글 작성 중 오류가 발생했습니다:", err);
      setError("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form">
      <h2 className="mb-4">새 게시글 작성</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            제목
          </label>
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
          <label htmlFor="author" className="form-label">
            작성자
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            내용
          </label>
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
            onClick={() => navigate("/")}
          >
            취소
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
