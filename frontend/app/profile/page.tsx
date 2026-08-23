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
  role: string;
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

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/login');
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
      
      if (result?.avatar_url) {
        setUserData((prev) => prev ? { ...prev, avatar_url: result.avatar_url } : prev);
        
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          parsed.avatar_url = result.avatar_url;
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

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner': return 'مالک';
      case 'admin': return 'ادمین';
      case 'user': return 'کاربر';
      default: return role;
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="hero-bg"></div>

        <div className="profile-card">
          <div className="profile-header">
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

            <div style={{ flex: 1 }}>
              <h1 className="profile-name">
                {userData?.username || '...'}
                {userData?.role && (
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: '20px',
                      marginRight: '8px',
                      background: userData.role === 'owner'
                        ? 'linear-gradient(135deg, #fdcb6e, #fd79a8)'
                        : userData.role === 'admin'
                          ? 'linear-gradient(135deg, #6c5ce7, #a29bfe)'
                          : 'var(--bg-card)',
                      color: userData.role === 'user' ? 'var(--text-muted)' : 'white',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {getRoleLabel(userData.role)}
                  </span>
                )}
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

            {/* دکمه خروج */}
            <button
              className="btn-secondary"
              onClick={handleLogout}
              style={{
                padding: '8px 18px',
                fontSize: '0.8rem',
                color: '#fd79a8',
                borderColor: 'rgba(253,121,168,0.3)',
              }}
            >
              🚪 خروج
            </button>

            {avatarFile && (
              <button
                className="btn-primary"
                onClick={handleAvatarSubmit}
                disabled={uploading}
                style={{
                  padding: '8px 20px',
                  fontSize: '0.8rem',
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