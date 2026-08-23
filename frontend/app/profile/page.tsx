'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('watchlist');

  const tabs = [
    { id: 'watchlist', label: '❤️ علاقه‌مندی‌ها' },
    { id: 'comments', label: '💬 نظرات' },
    { id: 'settings', label: '⚙️ تنظیمات' },
  ];

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="hero-bg"></div>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">👤</div>
            <div>
              <h1 className="profile-name">کاربر سینماگرام</h1>
              <p className="profile-info">عضویت از ۱۴۰۵</p>
            </div>
            <button className="btn-secondary" style={{ marginRight: 'auto', padding: '10px 22px', fontSize: '0.8rem' }}>
              ویرایش پروفایل
            </button>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="profile-card">
          {activeTab === 'watchlist' && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px 0' }}>
              هنوز محتوایی به علاقه‌مندی‌ها اضافه نکردید
            </div>
          )}
          {activeTab === 'comments' && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '30px 0' }}>
              هنوز نظری ثبت نکردید
            </div>
          )}
          {activeTab === 'settings' && (
            <form>
              <div className="form-group">
                <label className="form-label">نام کاربری</label>
                <input type="text" className="form-input" placeholder="username" />
              </div>
              <div className="form-group">
                <label className="form-label">ایمیل</label>
                <input type="email" className="form-input" placeholder="example@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">رمز عبور جدید</label>
                <input type="password" className="form-input" placeholder="••••••••" />
              </div>
              <button type="button" className="btn-submit">ذخیره تغییرات</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}