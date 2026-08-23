'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    avatar_url: string | null;
    created_at: string;
    bio: string;
  } | null>(null);
  const [showFullDate, setShowFullDate] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
      return;
    }

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      } catch {
        // اگه user ذخیره نشده، از API بگیر
        fetchUserProfile(token);
      }
    } else {
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        localStorage.setItem('user', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    
    // پیش‌نمایش عکس
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSubmit = async () => {
    if (!avatarFile) return;

    const token = localStorage.getItem('access_token');
    if (!token) return;

    const formData = new FormData();
    formData.append('file', avatarFile);

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUserData((prev) => prev ? { ...prev, avatar_url: data.avatar_url } : prev);
        localStorage.setItem('user', JSON.stringify({ ...userData, avatar_url: data.avatar_url }));
        setAvatarFile(null);
        setAvatarPreview(null);
        alert('عکس پروفایل آپدیت شد!');
      } else {
        alert('خطا در آپلود عکس');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('خطا در آپلود عکس');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatYear = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
    }).format(date);
  };

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
            {/* عکس پروفایل */}
            <div className="profile-avatar" style={{ position: 'relative', overflow: 'visible' }}>
              {avatarPreview || userData?.avatar_url ? (
                <img
                  src={avatarPreview || userData?.avatar_url}
                  alt="avatar"
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                '👤'
              )}
              
              {/* دکمه آپلود */}
              <label
                style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '-5px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--gradient-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  border: '2px solid var(--bg)',
                  transition: 'all 0.3s',
                }}
              >
                📷
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>

            <div>
              <h1 className="profile-name">
                {userData?.username || 'کاربر'}
              </h1>
              <p className="profile-info">
                عضویت از{' '}
                <span
                  onClick={() => setShowFullDate(!showFullDate)}
                  style={{
                    cursor: 'pointer',
                    color: 'var(--secondary)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    transition: 'all 0.3s',
                  }}
                  title={showFullDate ? 'نمایش سال' : 'نمایش تاریخ کامل'}
                >
                  {showFullDate
                    ? formatDate(userData?.created_at || new Date().toISOString())
                    : formatYear(userData?.created_at || new Date().toISOString())}
                </span>
              </p>
              {userData?.email && (
                <p className="profile-info" style={{ fontSize: '0.8rem' }}>
                  📧 {userData.email}
                </p>
              )}
            </div>

            {/* دکمه ثبت آپلود */}
            {avatarFile && (
              <button
                className="btn-primary"
                onClick={handleAvatarSubmit}
                style={{
                  padding: '8px 20px',
                  fontSize: '0.8rem',
                  marginRight: 'auto',
                }}
              >
                ذخیره عکس
              </button>
            )}
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
                <input
                  type="text"
                  className="form-input"
                  defaultValue={userData?.username || ''}
                  placeholder="username"
                />
              </div>
              <div className="form-group">
                <label className="form-label">ایمیل</label>
                <input
                  type="email"
                  className="form-input"
                  defaultValue={userData?.email || ''}
                  placeholder="example@email.com"
                />
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
      <BackToTop />
    </>
  );
}