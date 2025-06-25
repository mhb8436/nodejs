import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">게시판</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">게시글 목록</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">새 게시글 작성</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
