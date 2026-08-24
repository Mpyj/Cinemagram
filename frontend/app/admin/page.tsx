'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { Content, User, Comment } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [userRole, setUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<Content[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentSlug, setNewContentSlug] = useState('');
  const [newContentType, setNewContentType] = useState('movie');
  const [newContentYear, setNewContentYear] = useState('');
  const [newContentRating, setNewContentRating] = useState('');
  const [newContentDescription, setNewContentDescription] = useState('');
  const [addingContent, setAddingContent] = useState(false);

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
        setUserRole(parsed.role || '');
        setCurrentUserId(parsed.id || null);
        
        if (parsed.role === 'admin' || parsed.role === 'owner') {
          fetchAllData();
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

  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const [contentRes, usersRes, commentsRes] = await Promise.all([
        api.get('/content'),
        api.get('/admin/users'),
        api.get('/admin/comments'),
      ]);
      setContents(contentRes.data);
      setUsers(usersRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAddContent = async () => {
    if (!newContentTitle.trim() || !newContentSlug.trim()) {
      alert('عنوان و اسلاگ الزامی است');
      return;
    }

    setAddingContent(true);
    try {
      await api.post('/content', {
        title: newContentTitle.trim(),
        slug: newContentSlug.trim().toLowerCase().replace(/\s+/g, '-'),
        type: newContentType,
        release_year: newContentYear ? parseInt(newContentYear) : null,
        rating: newContentRating ? parseFloat(newContentRating) : null,
        description: newContentDescription || null,
        status: 'published',
        genre_ids: [],
      });
      
      alert('✅ محتوا اضافه شد!');
      setNewContentTitle('');
      setNewContentSlug('');
      setNewContentYear('');
      setNewContentRating('');
      setNewContentDescription('');
      setNewContentType('movie');
      fetchAllData();
    } catch (err: any) {
      console.error('Add content error:', err);
      alert('خطا در افزودن محتوا');
    } finally {
      setAddingContent(false);
    }
  };

  const handleDeleteContent = async (contentId: number) => {
    if (!confirm('مطمئن هستید؟')) return;
    try {
      await api.delete(`/content/${contentId}`);
      alert('محتوا حذف شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در حذف محتوا');
    }
  };

  const handleBanUser = async (userId: number) => {
    try {
      await api.post(`/admin/users/${userId}/ban`);
      alert('کاربر بن شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در بن کردن کاربر');
    }
  };

  const handleUnbanUser = async (userId: number) => {
    try {
      await api.post(`/admin/users/${userId}/unban`);
      alert('کاربر آزاد شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در آزاد کردن کاربر');
    }
  };

  const handleMuteUser = async (userId: number) => {
    try {
      await api.post(`/admin/users/${userId}/mute`);
      alert('کاربر سکوت شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در سکوت کردن کاربر');
    }
  };

  const handleUnmuteUser = async (userId: number) => {
    try {
      await api.post(`/admin/users/${userId}/unmute`);
      alert('سکوت کاربر برداشته شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در برداشتن سکوت');
    }
  };

  const handleApproveComment = async (commentId: number) => {
    try {
      await api.put(`/admin/comments/${commentId}/approve`);
      alert('نظر تایید شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در تایید نظر');
    }
  };

  const handleHideComment = async (commentId: number) => {
    try {
      await api.put(`/admin/comments/${commentId}/hide`);
      alert('نظر مخفی شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در مخفی کردن نظر');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('مطمئن هستید؟')) return;
    try {
      await api.delete(`/admin/comments/${commentId}`);
      alert('نظر حذف شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در حذف نظر');
    }
  };

  const handlePromoteUser = async (userId: number) => {
    try {
      await api.put(`/admin/users/${userId}/role?new_role=admin`);
      alert('کاربر به ادمین ارتقا یافت!');
      fetchAllData();
    } catch (err) {
      alert('خطا در ارتقای کاربر');
    }
  };

  const handleDemoteUser = async (userId: number) => {
    try {
      await api.put(`/admin/users/${userId}/role?new_role=user`);
      alert('کاربر به کاربر عادی تنزل یافت!');
      fetchAllData();
    } catch (err) {
      alert('خطا در تنزل کاربر');
    }
  };

  const isOwner = userRole === 'owner';

  const isMuted = (user: User): boolean => {
    if (!user.mute_until) return false;
    return new Date(user.mute_until).getTime() > Date.now();
  };

  const canManageUser = (targetUser: User): boolean => {
    if (!currentUserId) return false;
    if (targetUser.id === currentUserId) return false;
    if (targetUser.role === 'owner') return false;
    if (isOwner) return true;
    if (userRole === 'admin' && targetUser.role === 'user') return true;
    return false;
  };

  const tabs = [
    { id: 'content', label: '🎬 محتوا' },
    { id: 'users', label: '👥 کاربران' },
    { id: 'comments', label: '💬 نظرات' },
    ...(isOwner ? [{ id: 'roles', label: '👑 نقش‌ها' }] : []),
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner': return '👑 مالک';
      case 'admin': return '🛡️ ادمین';
      case 'user': return '👤 کاربر';
      default: return role;
    }
  };

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

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="hero-bg"></div>
        <div className="admin-header" style={{ textAlign: 'center' }}>
          <h1 className="page-title">پنل مدیریت</h1>
          <p
            style={{
              display: 'inline-block',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '5px 18px',
              borderRadius: '20px',
              marginTop: '5px',
              background: isOwner
                ? 'linear-gradient(135deg, #fdcb6e, #fd79a8)'
                : 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              color: 'white',
            }}
          >
            {isOwner ? '👑 مالک' : '🛡️ ادمین'}
          </p>
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

        {loadingData && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
            در حال بارگذاری...
          </div>
        )}

        <div className="admin-panel">
          {/* ===== تب محتوا ===== */}
          {activeTab === 'content' && (
            <>
              <div style={{
                marginBottom: '20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '20px',
              }}>
                <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '15px' }}>
                  ➕ افزودن محتوای جدید
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="عنوان"
                    value={newContentTitle}
                    onChange={(e) => setNewContentTitle(e.target.value)}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="اسلاگ (مثلا: my-movie)"
                    value={newContentSlug}
                    onChange={(e) => setNewContentSlug(e.target.value)}
                    className="form-input"
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <select
                    value={newContentType}
                    onChange={(e) => setNewContentType(e.target.value)}
                    className="form-input"
                  >
                    <option value="movie">🎬 فیلم</option>
                    <option value="series">📺 سریال</option>
                    <option value="anime">✨ انیمه</option>
                  </select>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="سال ساخت (مثلا: 1403)"
                    value={newContentYear}
                    onChange={(e) => setNewContentYear(e.target.value.replace(/[^0-9]/g, ''))}
                    className="form-input"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="امتیاز (مثلا: 8.5)"
                    value={newContentRating}
                    onChange={(e) => setNewContentRating(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="form-input"
                  />
                </div>
                
                <textarea
                  placeholder="توضیحات"
                  value={newContentDescription}
                  onChange={(e) => setNewContentDescription(e.target.value)}
                  className="comment-textarea"
                  style={{ minHeight: '60px', marginBottom: '10px' }}
                />
                
                <button
                  className="btn-primary"
                  onClick={handleAddContent}
                  disabled={addingContent}
                  style={{ padding: '8px 20px', fontSize: '0.85rem' }}
                >
                  {addingContent ? 'در حال افزودن...' : 'افزودن'}
                </button>
              </div>

              {contents.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                  محتوایی یافت نشد
                </div>
              )}
              {contents.map((content) => (
                <div key={content.id} className="admin-item">
                  <span style={{ fontSize: '28px' }}>
                    {content.type === 'movie' ? '🎬' : content.type === 'series' ? '📺' : '✨'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{content.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {content.slug} • {content.release_year || 'نامشخص'} • ⭐ {content.rating || 'N/A'}
                    </div>
                  </div>
                  <button
                    className="btn-secondary"
                    onClick={() => handleDeleteContent(content.id)}
                    style={{ padding: '6px 14px', fontSize: '0.75rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}
                  >
                    🗑 حذف
                  </button>
                </div>
              ))}
            </>
          )}

          {/* ===== تب کاربران ===== */}
          {activeTab === 'users' && (
            <>
              {users.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                  کاربری یافت نشد
                </div>
              )}
              {users.map((user) => {
                const canManage = canManageUser(user);
                const muted = isMuted(user);
                
                return (
                  <div key={user.id} className="admin-item">
                    <span style={{ fontSize: '28px' }}>👤</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {user.username}
                        <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>
                          {getRoleLabel(user.role)}
                        </span>
                        {user.id === currentUserId && (
                          <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>شما</span>
                        )}
                        {user.is_banned && (
                          <span style={{ fontSize: '0.7rem', color: '#fd79a8', fontWeight: 700 }}>🚫 بن شده</span>
                        )}
                        {muted && (
                          <span style={{ fontSize: '0.7rem', color: '#fdcb6e', fontWeight: 700 }}>🔇 سکوت شده</span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>

                    {canManage && (
                      <>
                        {user.is_banned ? (
                          <button
                            className="btn-secondary"
                            onClick={() => handleUnbanUser(user.id)}
                            style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}
                          >
                            آزاد
                          </button>
                        ) : (
                          <button
                            className="btn-secondary"
                            onClick={() => handleBanUser(user.id)}
                            style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}
                          >
                            بن
                          </button>
                        )}

                        {muted ? (
                          <button
                            className="btn-secondary"
                            onClick={() => handleUnmuteUser(user.id)}
                            style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}
                          >
                            رفع سکوت
                          </button>
                        ) : (
                          <button
                            className="btn-secondary"
                            onClick={() => handleMuteUser(user.id)}
                            style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fdcb6e', borderColor: 'rgba(253,203,110,0.3)', whiteSpace: 'nowrap' }}
                          >
                            سکوت
                          </button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* ===== تب نظرات ===== */}
          {activeTab === 'comments' && (
            <>
              {comments.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                  نظری یافت نشد
                </div>
              )}
              {comments.map((comment) => (
                <div key={comment.id} className="admin-item">
                  <span style={{ fontSize: '24px', width: '38px', height: '38px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {comment.avatar_url ? (
                      <img
                        src={comment.avatar_url}
                        alt={comment.username || 'کاربر'}
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      '💬'
                    )}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem' }}>{comment.body}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {comment.username || `کاربر ${comment.user_id}`} • {new Date(comment.created_at).toLocaleDateString('fa-IR')}
                    </div>
                  </div>
                  {!comment.is_approved && (
                    <button
                      className="btn-secondary"
                      onClick={() => handleApproveComment(comment.id)}
                      style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}
                    >
                      تایید
                    </button>
                  )}
                  <button
                    className="btn-secondary"
                    onClick={() => handleHideComment(comment.id)}
                    style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fdcb6e', borderColor: 'rgba(253,203,110,0.3)', whiteSpace: 'nowrap' }}
                  >
                    مخفی
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleDeleteComment(comment.id)}
                    style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}
                  >
                    حذف
                  </button>
                </div>
              ))}
            </>
          )}

          {/* ===== تب نقش‌ها (فقط Owner) ===== */}
          {activeTab === 'roles' && isOwner && (
            <>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>
                👑 مدیریت نقش‌ها
              </h2>
              {users.map((user) => (
                <div key={user.id} className="admin-item">
                  <span style={{ fontSize: '28px' }}>👤</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.username}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {getRoleLabel(user.role)}
                    </div>
                  </div>
                  
                  {user.id === currentUserId && (
                    <span style={{ fontSize: '0.75rem', color: '#fdcb6e', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      👑 مالک
                    </span>
                  )}
                  
                  {user.role === 'user' && user.id !== currentUserId && (
                    <button
                      className="btn-secondary"
                      onClick={() => handlePromoteUser(user.id)}
                      style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#a29bfe', borderColor: 'rgba(162,155,254,0.3)', whiteSpace: 'nowrap' }}
                    >
                      ⬆ ارتقا به ادمین
                    </button>
                  )}
                  
                  {user.role === 'admin' && (
                    <button
                      className="btn-secondary"
                      onClick={() => handleDemoteUser(user.id)}
                      style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}
                    >
                      ⬇ تنزل به کاربر
                    </button>
                  )}
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