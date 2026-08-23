'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { getMyProfile, uploadAvatar } from '@/lib/api';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('watchlist');
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [showFullDate, setShowFullDate] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
      return;
    }

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserData(parsed);
      } catch {
        fetchProfile();
      }
    } else {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setUserData(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      setAvatarPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarSubmit = async () => {
    if (!avatarFile) return;

    setUploading(true);
    try {
      const result = await uploadAvatar(avatarFile);
      console.log('Upload result:', result);
      
      if (result?.avatar_url) {
        const fullUrl = result.avatar_url;
        
        setUserData((prev) => prev ? { ...prev, avatar_url: fullUrl } : prev);
        
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          parsed.avatar_url = fullUrl;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
        
        setAvatarFile(null);
        setAvatarPreview(null);
        alert('عکس پروفایل آپدیت شد!');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('خطا در آپلود عکس');
    } finally {
      setUploading(false);
    }
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatYearOnly = (dateString: string) => {
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
            <div style={{ position: 'relative' }}>
              <div className="profile-avatar" style={{ overflow: 'hidden' }}>
                {avatarPreview || userData?.avatar_url ? (
                  <img
                    src={avatarPreview || userData?.avatar_url || ''}
                    alt="پروفایل"
                    style={{
                      width: '90px',
                      height: '90px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      // اگه عکس لود نشد، ایموجی نشون بده
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '40px' }}>👤</span>
                )}
              </div>
              
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
                  zIndex: 3,
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
                {userData?.username || '...'}
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
                  }}
                >
                  {userData?.created_at
                    ? (showFullDate
                        ? formatFullDate(userData.created_at)
                        : formatYearOnly(userData.created_at))
                    : '...'}
                </span>
              </p>
              {userData?.email && (
                <p className="profile-info" style={{ fontSize: '0.8rem' }}>
                  📧 {userData.email}
                </p>
              )}
            </div>

            {avatarFile && (
              <button
                className="btn-primary"
                onClick={handleAvatarSubmit}
                disabled={uploading}
                style={{
                  padding: '8px 20px',
                  fontSize: '0.8rem',
                  marginRight: 'auto',
                }}
              >
                {uploading ? 'در حال آپلود...' : 'ذخیره عکس'}
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
                />
              </div>
              <div className="form-group">
                <label className="form-label">ایمیل</label>
                <input
                  type="email"
                  className="form-input"
                  defaultValue={userData?.email || ''}
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