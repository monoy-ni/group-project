import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>健康与智慧养老系统</h1>
        <p>全方位关爱老年人的健康与生活</p>
        <div className="cta-buttons">
          <Link to="/health" className="btn-primary">开始健康之旅</Link>
          <Link to="/profile" className="btn-secondary">登录/注册</Link>
        </div>
      </header>

      <section className="features-section">
        <h2>核心功能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </div>
            <h3>身体健康</h3>
            <p>在线问诊、名医连线、实时健康监测，全方位关注您的身体健康状况。</p>
            <Link to="/health" className="learn-more">了解更多</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3>心理健康</h3>
            <p>心灵助手、情绪监测、专业心理咨询，呵护您的心理健康。</p>
            <Link to="/mental" className="learn-more">了解更多</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3>娱乐学习</h3>
            <p>线上老年大学、听戏听书、广场舞教学，丰富您的精神生活。</p>
            <Link to="/entertainment" className="learn-more">了解更多</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path>
                <path d="M9 22V12h6v10"></path>
                <path d="M2 10.6L12 2l10 8.6"></path>
              </svg>
            </div>
            <h3>家庭监测</h3>
            <p>实时摄像头监控、异常行为检测、紧急求助，保障您的居家安全。</p>
            <Link to="/family" className="learn-more">了解更多</Link>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>用户评价</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <p className="quote">"这个系统让我能够随时监测自己的健康状况，还能在线咨询医生，真是太方便了！"</p>
            <p className="author">— 张大爷，72岁</p>
          </div>
          <div className="testimonial-card">
            <p className="quote">"通过这个系统，我参加了线上老年大学，学到了很多新知识，认识了很多新朋友，生活变得充实多了。"</p>
            <p className="author">— 李奶奶，68岁</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <p>© 2025 健康与智慧养老系统 版权所有</p>
          <div className="footer-links">
            <Link to="/about">关于我们</Link>
            <Link to="/contact">联系我们</Link>
            <Link to="/privacy">隐私政策</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;