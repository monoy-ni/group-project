import React, { useState } from 'react';
import './EntertainmentPage.css';
import { Link } from 'react-router-dom';

const EntertainmentPage = () => {
  const [activeTab, setActiveTab] = useState('videos');

  // 模拟视频数据
  const videos = [
    { id: 1, title: '养生太极教学', duration: '15:30', views: '1.2万', thumbnail: '/video1.jpg' },
    { id: 2, title: '老年智能手机使用教程', duration: '10:45', views: '8.5千', thumbnail: '/video2.jpg' },
    { id: 3, title: '老年合唱团排练', duration: '18:20', views: '5.3千', thumbnail: '/video3.jpg' },
    { id: 4, title: '书法基础入门', duration: '22:10', views: '3.7千', thumbnail: '/video4.jpg' },
  ];

  // 模拟音频数据
  const audios = [
    { id: 1, title: '经典老歌回顾', singer: '群星', duration: '45:20', plays: '2.3万' },
    { id: 2, title: '健康养生讲座', speaker: '张医生', duration: '30:15', plays: '1.8万' },
    { id: 3, title: '历史故事', speaker: '王教授', duration: '50:30', plays: '1.2万' },
    { id: 4, title: '诗歌朗诵', speaker: '李老师', duration: '25:10', plays: '9.5千' },
  ];

  // 模拟游戏数据
  const games = [
    { id: 1, title: '记忆连连看', type: '益智', difficulty: '简单', players: '5.6千' },
    { id: 2, title: '象棋对战', type: '策略', difficulty: '中等', players: '3.2千' },
    { id: 3, title: '数字拼图', type: '益智', difficulty: '简单', players: '2.8千' },
    { id: 4, title: '麻将达人', type: '休闲', difficulty: '中等', players: '4.1千' },
  ];

  // 模拟兴趣课程数据
  const courses = [
    { id: 1, title: '书法入门课程', description: '学习书法基础知识，掌握基本笔画和结构。', teacher: '李老师', duration: '8课时' },
    { id: 2, title: '智能手机使用教程', description: '学习智能手机基本操作，拍照、视频通话等功能。', teacher: '王老师', duration: '6课时' },
    { id: 3, title: '健康养生知识', description: '了解老年人常见健康问题及预防方法。', teacher: '张医生', duration: '10课时' },
  ];

  // 模拟休闲活动数据
  const leisureActivities = [
    { id: 1, name: '冥想放松', description: '10分钟冥想，缓解压力和焦虑', duration: '10分钟' },
    { id: 2, name: '情绪日记', description: '记录今天的心情和感受', duration: '15分钟' },
    { id: 3, name: '呼吸练习', description: '深呼吸练习，平静心情', duration: '5分钟' },
  ];

  return (
    <div className="entertainment-page">
      <h2 className="page-title">娱乐学习</h2>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          视频课堂
        </button>
        <button
          className={`tab-button ${activeTab === 'audios' ? 'active' : ''}`}
          onClick={() => setActiveTab('audios')}
        >
          音频节目
        </button>
        <button
          className={`tab-button ${activeTab === 'games' ? 'active' : ''}`}
          onClick={() => setActiveTab('games')}
        >
          益智游戏
        </button>
        <button
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          兴趣课程
        </button>
        <button
          className={`tab-button ${activeTab === 'leisure' ? 'active' : ''}`}
          onClick={() => setActiveTab('leisure')}
        >
          休闲活动
        </button>
      </div>

      <div className="content-container">
        {activeTab === 'videos' && (
          <div className="video-grid">
            {videos.map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <div className="play-icon">▶</div>
                </div>
                <h3 className="video-title">{video.title}</h3>
                <div className="video-meta">
                  <span className="video-duration">{video.duration}</span>
                  <span className="video-views">{video.views} 观看</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audios' && (
          <div className="audio-list">
            {audios.map((audio) => (
              <div key={audio.id} className="audio-item">
                <div className="audio-play-button">▶</div>
                <div className="audio-info">
                  <h3 className="audio-title">{audio.title}</h3>
                  <p className="audio-speaker">
                    {audio.singer ? `演唱: ${audio.singer}` : `主讲: ${audio.speaker}`}
                  </p>
                </div>
                <div className="audio-meta">
                  <span className="audio-duration">{audio.duration}</span>
                  <span className="audio-plays">{audio.plays} 播放</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'games' && (
          <div className="game-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-type">类型: {game.type}</p>
                <p className="game-difficulty">难度: {game.difficulty}</p>
                <p className="game-players">{game.players} 人在玩</p>
                <button className="play-game-button">开始游戏</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="course-list">
            {courses.map((course) => (
              <div key={course.id} className="course-item">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-info">
                  <span className="course-teacher">{course.teacher}</span>
                  <span className="course-duration">{course.duration}</span>
                </div>
                <button className="join-course-button">加入课程</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'leisure' && (
          <div className="leisure-activities">
            <h3 className="leisure-title">休闲活动</h3>
            <p>参与有益身心健康的活动，缓解压力，放松心情。</p>

            <div className="activities-grid">
              {leisureActivities.map(activity => (
                <div key={activity.id} className="activity-card">
                  <h3>{activity.name}</h3>
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-duration">{activity.duration}</p>
                  <button className="btn-secondary">开始</button>
                </div>
              ))}
            </div>

            <div className="support-groups">
              <h3>兴趣小组</h3>
              <p>加入兴趣小组，与志同道合的朋友交流分享。</p>
              <div className="groups-grid">
                <div className="group-card">
                  <h4>冥想爱好者</h4>
                  <p>成员: 128人</p>
                  <button className="join-btn">加入</button>
                </div>
                <div className="group-card">
                  <h4>书法交流</h4>
                  <p>成员: 95人</p>
                  <button className="join-btn">加入</button>
                </div>
                <div className="group-card">
                  <h4>园艺爱好者</h4>
                  <p>成员: 76人</p>
                  <button className="join-btn">加入</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="recommendation-section">
        <h3 className="section-title">为您推荐</h3>
        <div className="recommendation-list">
          <div className="recommendation-item">
            <h4 className="recommendation-title">老年电脑基础班</h4>
            <p className="recommendation-date">5月15日 14:00-16:00</p>
            <Link to="/" className="recommendation-link">查看详情</Link>
          </div>
          <div className="recommendation-item">
            <h4 className="recommendation-title">春季养生讲座</h4>
            <p className="recommendation-date">5月20日 10:00-11:30</p>
            <Link to="/" className="recommendation-link">查看详情</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentPage;