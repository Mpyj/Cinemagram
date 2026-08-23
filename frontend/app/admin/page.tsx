'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (!token) {
      router.push('/login');
      return;
    }

    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.role === 'admin' || parsed.role === 'owner') {
          setIsAdmin(true);
        } else {
          router.push('/');
        }
      } catch {
        router.push('/');
      }
    } else {
      router.push('/');
    }

    setLoading(false);
  }, []);

  const tabs = [
    { id: 'content', label: '🎬 محتوا' },
    { id: 'users', label: '👥 کاربران' },
    { id: 'comments', label: '💬 نظرات' },
  ];

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          در حال بارگذاری...
        </div>
      </>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="hero-bg"></div>
        <div className="admin-header">
          <h1 className="page-title">پنل مدیریت</h1>
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

        <div className="admin-panel">
          {activeTab === 'content' && (
            <>
              <button className="btn-primary" style={{ marginBottom: '20px', padding: '10px 24px', fontSize: '0.85rem' }}>
                + افزودن محتوا
              </button>
              {[1, 2, 3].map((item) => (
                <div key={item} className="admin-item">
                  <span style={{ fontSize: '28px' }}>🎬</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>عنوان فیلم {item}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>منتشر شده</div>
                  </div>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem' }}>ویرایش</button>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)' }}>حذف</button>
                </div>
              ))}
            </>
          )}

          {activeTab === 'users' && (
            <>
              {[1, 2, 3].map((user) => (
                <div key={user} className="admin-item">
                  <span style={{ fontSize: '28px' }}>👤</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>کاربر {user}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>user@email.com</div>
                  </div>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem', color: '#fdcb6e', borderColor: 'rgba(253,203,110,0.3)' }}>سکوت</button>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)' }}>بن</button>
                </div>
              ))}
            </>
          )}

          {activeTab === 'comments' && (
            <>
              {[1, 2, 3].map((comment) => (
                <div key={comment} className="admin-item">
                  <span style={{ fontSize: '24px' }}>💬</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem' }}>این یک نظر نمونه است.</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>۲ ساعت پیش</div>
                  </div>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)' }}>تایید</button>
                  <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.75rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)' }}>حذف</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}