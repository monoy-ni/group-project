import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h2 className="error-code">404</h2>
        <h3 className="error-message">页面不存在</h3>
        <p className="error-description">
          抱歉，您访问的页面不存在或已被移除。请检查您输入的网址是否正确。
        </p>
        <Link to="/" className="back-home-button">返回首页</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;