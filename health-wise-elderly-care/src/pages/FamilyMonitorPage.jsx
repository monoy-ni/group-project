import React, { useState, useEffect } from 'react';
import './FamilyMonitorPage.css';
import { Link } from 'react-router-dom';

// 模拟家庭成员数据
const familyMembers = [
  { id: 1, name: '张三', relation: '本人', age: 65, avatar: '/avatar1.jpg', status: 'normal' },
  { id: 2, name: '李四', relation: '配偶', age: 62, avatar: '/avatar2.jpg', status: 'warning' },
  { id: 3, name: '王五', relation: '儿子', age: 35, avatar: '/avatar3.jpg', status: 'normal' },
  { id: 4, name: '赵六', relation: '女儿', age: 32, avatar: '/avatar4.jpg', status: 'normal' },
];

// 模拟健康数据
const healthData = {
  heartRate: [65, 68, 70, 67, 69, 72, 75, 73, 71, 68, 66, 65],
  bloodPressure: [130, 132, 128, 135, 133, 129, 127, 131, 134, 130, 128, 127],
  bloodSugar: [5.2, 5.4, 5.3, 5.5, 5.7, 5.6, 5.4, 5.3, 5.5, 5.4, 5.2, 5.1],
  weight: [65, 65.2, 64.8, 65.1, 64.9, 64.7, 64.5, 64.6, 64.8, 64.7, 64.5, 64.4],
};

// 模拟警报记录
const alertRecords = [
  { id: 1, date: '2023-05-10', time: '14:30', type: '血压异常', member: '李四', status: '已处理' },
  { id: 2, date: '2023-05-08', time: '09:15', type: '心率过快', member: '张三', status: '已处理' },
  { id: 3, date: '2023-05-05', time: '21:45', type: '血糖过高', member: '李四', status: '已处理' },
];

const FamilyMonitorPage = () => {
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="family-monitor-page">
      <h2 className="page-title">家庭监测</h2>

      <div className="current-time">
        {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
      </div>

      <div className="family-members">
        <h3 className="section-title">家庭成员</h3>
        <div className="members-list">
          {familyMembers.map((member) => (
            <div
              key={member.id}
              className={`member-card ${selectedMember.id === member.id ? 'selected' : ''}
                ${member.status === 'warning' ? 'warning' : ''}
                ${member.status === 'danger' ? 'danger' : ''}`}
              onClick={() => setSelectedMember(member)}
            >
              <div className="member-avatar"></div>
              <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-relation">{member.relation}</p>
                <p className="member-age">{member.age}岁</p>
              </div>
              <div className="member-status">
                {member.status === 'normal' && <span className="status-normal">正常</span>}
                {member.status === 'warning' && <span className="status-warning">注意</span>}
                {member.status === 'danger' && <span className="status-danger">危险</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tab-container">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          健康概览
        </button>
        <button
          className={`tab-button ${activeTab === 'real-time' ? 'active' : ''}`}
          onClick={() => setActiveTab('real-time')}
        >
          实时监测
        </button>
        <button
          className={`tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          警报记录
        </button>
        <button
          className={`tab-button ${activeTab === 'advice' ? 'active' : ''}`}
          onClick={() => setActiveTab('advice')}
        >
          健康建议
        </button>
      </div>

      <div className="content-container">
        {activeTab === 'overview' && (
          <div className="health-overview">
            <h3 className="overview-title">{selectedMember.name}的健康概览</h3>
            <div className="health-cards">
              <div className="health-card">
                <h4 className="card-title">心率</h4>
                <p className="card-value">{healthData.heartRate[healthData.heartRate.length - 1]} BPM</p>
                <p className="card-status normal">正常</p>
              </div>
              <div className="health-card">
                <h4 className="card-title">血压</h4>
                <p className="card-value">{healthData.bloodPressure[healthData.bloodPressure.length - 1]} / 85 mmHg</p>
                {selectedMember.id === 2 ? (
                  <p className="card-status warning">偏高</p>
                ) : (
                  <p className="card-status normal">正常</p>
                )}
              </div>
              <div className="health-card">
                <h4 className="card-title">血糖</h4>
                <p className="card-value">{healthData.bloodSugar[healthData.bloodSugar.length - 1]} mmol/L</p>
                {selectedMember.id === 2 ? (
                  <p className="card-status warning">偏高</p>
                ) : (
                  <p className="card-status normal">正常</p>
                )}
              </div>
              <div className="health-card">
                <h4 className="card-title">体重</h4>
                <p className="card-value">{healthData.weight[healthData.weight.length - 1]} kg</p>
                <p className="card-status normal">正常</p>
              </div>
            </div>
            <div className="health-trends">
              <h4 className="trend-title">近12小时趋势</h4>
              <div className="chart-placeholder">
                {/* 这里将放置图表 */}
                <div className="chart-line"></div>
                <div className="chart-line" style={{ top: '40%', left: '10%', width: '80%' }}></div>
                <div className="chart-line" style={{ top: '60%', left: '10%', width: '80%' }}></div>
                <div className="chart-line" style={{ top: '80%', left: '10%', width: '80%' }}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'real-time' && (
          <div className="real-time-monitor">
            <h3 className="monitor-title">{selectedMember.name}的实时监测</h3>
            <div className="vital-signs">
              <div className="vital-sign">
                <h4 className="vital-title">心率</h4>
                <p className="vital-value">{healthData.heartRate[healthData.heartRate.length - 1]} <span className="unit">BPM</span></p>
                <div className="vital-chart">
                  <div className="pulse-animation"></div>
                </div>
              </div>
              <div className="vital-sign">
                <h4 className="vital-title">血压</h4>
                <p className="vital-value">{healthData.bloodPressure[healthData.bloodPressure.length - 1]} / 85 <span className="unit">mmHg</span></p>
                <div className="vital-chart"></div>
              </div>
              <div className="vital-sign">
                <h4 className="vital-title">血糖</h4>
                <p className="vital-value">{healthData.bloodSugar[healthData.bloodSugar.length - 1]} <span className="unit">mmol/L</span></p>
                <div className="vital-chart"></div>
              </div>
              <div className="vital-sign">
                <h4 className="vital-title">血氧</h4>
                <p className="vital-value">98 <span className="unit">%</span></p>
                <div className="vital-chart"></div>
              </div>
            </div>
            <div className="activity-status">
              <h4 className="activity-title">活动状态</h4>
              <p className="activity-value">静止</p>
            </div>
            <div className="location-info">
              <h4 className="location-title">位置信息</h4>
              <p className="location-value">家中</p>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="alerts-record">
            <h3 className="alerts-title">警报记录</h3>
            <div className="alerts-filter">
              <select className="filter-select">
                <option value="all">全部成员</option>
                {familyMembers.map((member) => (
                  <option key={member.id} value={member.id} selected={selectedMember.id === member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              <select className="filter-select">
                <option value="all">全部状态</option>
                <option value="processed">已处理</option>
                <option value="unprocessed">未处理</option>
              </select>
            </div>
            <div className="alerts-list">
              {alertRecords
                .filter((alert) => selectedMember.id === 1 || alert.member === selectedMember.name)
                .map((alert) => (
                  <div key={alert.id} className="alert-item">
                    <div className="alert-time">
                      <span className="alert-date">{alert.date}</span>
                      <span className="alert-time">{alert.time}</span>
                    </div>
                    <div className="alert-type">{alert.type}</div>
                    <div className="alert-member">{alert.member}</div>
                    <div className="alert-status">
                      <span className={alert.status === '已处理' ? 'status-processed' : 'status-unprocessed'}>
                        {alert.status}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'advice' && (
          <div className="health-advice">
            <h3 className="advice-title">健康建议</h3>
            <div className="advice-list">
              <div className="advice-item">
                <h4 className="advice-subtitle">饮食建议</h4>
                <p className="advice-content">
                  {selectedMember.id === 2
                    ? '建议减少盐分摄入，增加新鲜蔬果的比例，避免高脂肪食物。' :
                    '保持均衡饮食，摄入足够的蛋白质、维生素和矿物质。'}
                </p>
              </div>
              <div className="advice-item">
                <h4 className="advice-subtitle">运动建议</h4>
                <p className="advice-content">
                  {selectedMember.id === 2
                    ? '建议每天进行30分钟的轻度运动，如散步、太极等，避免剧烈运动。' :
                    '建议每周进行150分钟的中等强度运动，如快走、游泳等。'}
                </p>
              </div>
              <div className="advice-item">
                <h4 className="advice-subtitle">作息建议</h4>
                <p className="advice-content">保持规律的作息时间，每天保证7-8小时的睡眠。</p>
              </div>
              <div className="advice-item">
                <h4 className="advice-subtitle">就医建议</h4>
                <p className="advice-content">
                  {selectedMember.id === 2
                    ? '建议近期到医院进行血压和血糖的进一步检查。' :
                    '建议每年进行一次全面体检。'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyMonitorPage;