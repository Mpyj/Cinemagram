'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import api from '@/lib/api';
import { Content, User, Comment, Genre, Episode } from '@/lib/types';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const [userRole, setUserRole] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<Content[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentSlug, setNewContentSlug] = useState('');
  const [newContentType, setNewContentType] = useState('movie');
  const [newContentYear, setNewContentYear] = useState('');
  const [newContentRating, setNewContentRating] = useState('');
  const [newContentDescription, setNewContentDescription] = useState('');
  const [newContentGenres, setNewContentGenres] = useState<number[]>([]);
  const [newContentDownloadUrl, setNewContentDownloadUrl] = useState('');
  const [addingContent, setAddingContent] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState<number | null>(null);

  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editType, setEditType] = useState('movie');
  const [editYear, setEditYear] = useState('');
  const [editRating, setEditRating] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDownloadUrl, setEditDownloadUrl] = useState('');
  const [editGenres, setEditGenres] = useState<number[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);

  const [episodeContentId, setEpisodeContentId] = useState<number>(0);
  const [episodeSeason, setEpisodeSeason] = useState('1');
  const [episodeNumber, setEpisodeNumber] = useState('1');
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [episodeDownloadUrl, setEpisodeDownloadUrl] = useState('');
  const [addingEpisode, setAddingEpisode] = useState(false);

  const [newGenreName, setNewGenreName] = useState('');
  const [addingGenre, setAddingGenre] = useState(false);
  const [showGenreForm, setShowGenreForm] = useState(false);

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
          fetchGenres();
          fetchEpisodes();
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

  const fetchGenres = async () => {
    try {
      const response = await api.get('/genres');
      setGenres(response.data);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await api.get('/episodes');
      setEpisodes(response.data);
    } catch (err) {
      console.error('Error fetching episodes:', err);
    }
  };

  const toggleGenre = (genreId: number) => {
    setNewContentGenres((prev) => prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]);
  };

  const toggleEditGenre = (genreId: number) => {
    setEditGenres((prev) => prev.includes(genreId) ? prev.filter(id => id !== genreId) : [...prev, genreId]);
  };

  const handleAddGenre = async () => {
    if (!newGenreName.trim()) {
      alert('نام ژانر الزامی است');
      return;
    }
    setAddingGenre(true);
    try {
      await api.post('/genres', {
        name: newGenreName.trim(),
        slug: newGenreName.trim().toLowerCase().replace(/\s+/g, '-'),
      });
      alert('✅ ژانر اضافه شد!');
      setNewGenreName('');
      setShowGenreForm(false);
      fetchGenres();
    } catch (err: any) {
      alert('خطا در افزودن ژانر');
    } finally {
      setAddingGenre(false);
    }
  };

  const handleAddContent = async () => {
    if (!newContentTitle.trim() || !newContentSlug.trim()) {
      alert('عنوان و اسلاگ الزامی است');
      return;
    }

    setAddingContent(true);
    try {
      const payload: Record<string, any> = {
        title: newContentTitle.trim(),
        slug: newContentSlug.trim().toLowerCase().replace(/\s+/g, '-'),
        type: newContentType,
        status: 'published',
        genre_ids: newContentGenres,
      };

      // فقط فیلدهایی که مقدار دارن رو اضافه کن
      if (newContentYear) payload.release_year = parseInt(newContentYear);
      if (newContentRating) payload.rating = parseFloat(newContentRating);
      if (newContentDescription.trim()) payload.description = newContentDescription.trim();
      if (newContentType === 'movie' && newContentDownloadUrl.trim()) {
        payload.download_url = newContentDownloadUrl.trim();
      }
      
      console.log('Sending payload:', payload);
      
      await api.post('/content', payload);
      
      alert('✅ محتوا اضافه شد!');
      setNewContentTitle('');
      setNewContentSlug('');
      setNewContentYear('');
      setNewContentRating('');
      setNewContentDescription('');
      setNewContentType('movie');
      setNewContentGenres([]);
      setNewContentDownloadUrl('');
      fetchAllData();
    } catch (err: any) {
      console.error('Add content error:', err);
      if (err.response?.data?.detail) {
        console.error('Detail:', err.response.data.detail);
        alert(`خطا: ${JSON.stringify(err.response.data.detail)}`);
      } else {
        alert('خطا در افزودن محتوا');
      }
    } finally {
      setAddingContent(false);
    }
  };

  const handleEditContent = (content: Content) => {
    setEditingContent(content);
    setEditTitle(content.title);
    setEditSlug(content.slug);
    setEditType(content.type);
    setEditYear(content.release_year?.toString() || '');
    setEditRating(content.rating?.toString() || '');
    setEditDescription(content.description || '');
    setEditDownloadUrl(content.download_url || '');
    setEditGenres(content.genres?.map(g => g.id) || []);
  };

  const handleSaveEdit = async () => {
    if (!editingContent) return;
    setSavingEdit(true);
    try {
      const payload: Record<string, any> = {
        title: editTitle,
        slug: editSlug,
        type: editType,
        genre_ids: editGenres,
      };

      if (editYear) payload.release_year = parseInt(editYear);
      if (editRating) payload.rating = parseFloat(editRating);
      if (editDescription.trim()) payload.description = editDescription.trim();
      if (editType === 'movie' && editDownloadUrl.trim()) {
        payload.download_url = editDownloadUrl.trim();
      }

      await api.put(`/content/${editingContent.id}`, payload);
      alert('✅ تغییرات ذخیره شد!');
      setEditingContent(null);
      fetchAllData();
    } catch (err: any) {
      console.error('Save edit error:', err);
      if (err.response?.data?.detail) {
        console.error('Detail:', err.response.data.detail);
      }
      alert('خطا در ذخیره تغییرات');
    } finally {
      setSavingEdit(false);
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

  const handleUploadPoster = async (contentId: number, file: File) => {
    setUploadingPoster(contentId);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post(`/content/${contentId}/poster`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✅ پوستر آپلود شد!');
      fetchAllData();
    } catch (err) {
      alert('خطا در آپلود پوستر');
    } finally {
      setUploadingPoster(null);
    }
  };

  const handleAddEpisode = async () => {
    if (!episodeContentId) {
      alert('یک محتوا انتخاب کنید');
      return;
    }
    if (!episodeNumber) {
      alert('شماره قسمت الزامی است');
      return;
    }

    setAddingEpisode(true);
    try {
      const payload: Record<string, any> = {
        content_id: episodeContentId,
        season_number: parseInt(episodeSeason) || 1,
        episode_number: parseInt(episodeNumber),
      };
      if (episodeTitle.trim()) payload.title = episodeTitle.trim();
      if (episodeDownloadUrl.trim()) payload.download_url = episodeDownloadUrl.trim();

      await api.post('/episodes', payload);
      alert('✅ اپیزود اضافه شد!');
      setEpisodeSeason('1');
      setEpisodeNumber('1');
      setEpisodeTitle('');
      setEpisodeDownloadUrl('');
      fetchEpisodes();
    } catch (err: any) {
      console.error('Add episode error:', err);
      if (err.response?.data?.detail) {
        console.error('Detail:', err.response.data.detail);
      }
      alert('خطا در افزودن اپیزود');
    } finally {
      setAddingEpisode(false);
    }
  };

  const handleDeleteEpisode = async (episodeId: number) => {
    if (!confirm('مطمئن هستید؟')) return;
    try {
      await api.delete(`/episodes/${episodeId}`);
      alert('اپیزود حذف شد!');
      fetchEpisodes();
    } catch (err) {
      alert('خطا در حذف اپیزود');
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
    { id: 'episodes', label: '📋 اپیزودها' },
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
          <p style={{ display: 'inline-block', fontSize: '0.85rem', fontWeight: 700, padding: '5px 18px', borderRadius: '20px', marginTop: '5px', background: isOwner ? 'linear-gradient(135deg, #fdcb6e, #fd79a8)' : 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: 'white' }}>
            {isOwner ? '👑 مالک' : '🛡️ ادمین'}
          </p>
        </div>

        <div className="tabs-section">
          <div className="tabs">
            {tabs.map((tab) => (
              <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loadingData && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>در حال بارگذاری...</div>
        )}

        <div className="admin-panel">
          {/* تب محتوا */}
          {activeTab === 'content' && (
            <>
              <div style={{ marginBottom: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
                <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '15px' }}>➕ افزودن محتوای جدید</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" placeholder="عنوان" value={newContentTitle} onChange={(e) => setNewContentTitle(e.target.value)} className="form-input" />
                  <input type="text" placeholder="اسلاگ" value={newContentSlug} onChange={(e) => setNewContentSlug(e.target.value)} className="form-input" />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <select value={newContentType} onChange={(e) => setNewContentType(e.target.value)} className="form-input">
                    <option value="movie">🎬 فیلم</option>
                    <option value="series">📺 سریال</option>
                    <option value="anime">✨ انیمه</option>
                  </select>
                  <input type="text" inputMode="numeric" placeholder="سال ساخت" value={newContentYear} onChange={(e) => setNewContentYear(e.target.value.replace(/[^0-9]/g, ''))} className="form-input" />
                  <input type="text" inputMode="decimal" placeholder="امتیاز" value={newContentRating} onChange={(e) => setNewContentRating(e.target.value.replace(/[^0-9.]/g, ''))} className="form-input" />
                </div>

                {newContentType === 'movie' && (
                  <div style={{ marginBottom: '10px' }}>
                    <input type="text" placeholder="لینک دانلود فیلم" value={newContentDownloadUrl} onChange={(e) => setNewContentDownloadUrl(e.target.value)} className="form-input" />
                  </div>
                )}

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>ژانرها:</label>
                    <button type="button" onClick={() => setShowGenreForm(!showGenreForm)} className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.7rem' }}>
                      {showGenreForm ? '✕ بستن' : '+ ژانر جدید'}
                    </button>
                  </div>

                  {showGenreForm && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                      <input type="text" placeholder="نام ژانر" value={newGenreName} onChange={(e) => setNewGenreName(e.target.value)} className="form-input" style={{ flex: 1 }} />
                      <button type="button" onClick={handleAddGenre} disabled={addingGenre} className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                        {addingGenre ? '...' : 'افزودن'}
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {genres.map((genre) => (
                      <button key={genre.id} type="button" onClick={() => toggleGenre(genre.id)} className="tab" style={{
                        padding: '6px 14px', fontSize: '0.75rem',
                        background: newContentGenres.includes(genre.id) ? 'var(--gradient-1)' : 'var(--bg-card)',
                        color: newContentGenres.includes(genre.id) ? 'white' : 'var(--text-muted)',
                        border: newContentGenres.includes(genre.id) ? '1px solid transparent' : '1px solid var(--border)',
                      }}>
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea placeholder="توضیحات" value={newContentDescription} onChange={(e) => setNewContentDescription(e.target.value)} className="comment-textarea" style={{ minHeight: '60px', marginBottom: '10px' }} />
                
                <button className="btn-primary" onClick={handleAddContent} disabled={addingContent} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  {addingContent ? '...' : 'افزودن'}
                </button>
              </div>

              {editingContent && (
                <div style={{ marginBottom: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-hover)', borderRadius: '14px', padding: '20px' }}>
                  <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '15px' }}>✏️ ویرایش: {editingContent.title}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input type="text" placeholder="عنوان" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="form-input" />
                    <input type="text" placeholder="اسلاگ" value={editSlug} onChange={(e) => setEditSlug(e.target.value)} className="form-input" />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <select value={editType} onChange={(e) => setEditType(e.target.value)} className="form-input">
                      <option value="movie">🎬 فیلم</option>
                      <option value="series">📺 سریال</option>
                      <option value="anime">✨ انیمه</option>
                    </select>
                    <input type="text" inputMode="numeric" placeholder="سال ساخت" value={editYear} onChange={(e) => setEditYear(e.target.value.replace(/[^0-9]/g, ''))} className="form-input" />
                    <input type="text" inputMode="decimal" placeholder="امتیاز" value={editRating} onChange={(e) => setEditRating(e.target.value.replace(/[^0-9.]/g, ''))} className="form-input" />
                  </div>

                  {editType === 'movie' && (
                    <div style={{ marginBottom: '10px' }}>
                      <input type="text" placeholder="لینک دانلود فیلم" value={editDownloadUrl} onChange={(e) => setEditDownloadUrl(e.target.value)} className="form-input" />
                    </div>
                  )}

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>ژانرها:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {genres.map((genre) => (
                        <button key={genre.id} type="button" onClick={() => toggleEditGenre(genre.id)} className="tab" style={{
                          padding: '6px 14px', fontSize: '0.75rem',
                          background: editGenres.includes(genre.id) ? 'var(--gradient-1)' : 'var(--bg-card)',
                          color: editGenres.includes(genre.id) ? 'white' : 'var(--text-muted)',
                          border: editGenres.includes(genre.id) ? '1px solid transparent' : '1px solid var(--border)',
                        }}>
                          {genre.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea placeholder="توضیحات" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="comment-textarea" style={{ minHeight: '60px', marginBottom: '10px' }} />

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-primary" onClick={handleSaveEdit} disabled={savingEdit} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                      {savingEdit ? '...' : 'ذخیره'}
                    </button>
                    <button className="btn-secondary" onClick={() => setEditingContent(null)} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                      لغو
                    </button>
                  </div>
                </div>
              )}

              {contents.map((content) => (
                <div key={content.id} className="admin-item">
                  <span style={{ width: '50px', height: '50px', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '24px', background: 'var(--bg-card)' }}>
                    {content.poster_url ? (
                      <img src={content.poster_url} alt={content.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    ) : (
                      content.type === 'movie' ? '🎬' : content.type === 'series' ? '📺' : '✨'
                    )}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{content.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {content.slug} • {content.release_year || 'نامشخص'} • ⭐ {content.rating || 'N/A'}
                      {content.download_url && ' • ⬇ دانلود'}
                    </div>
                  </div>
                  <label className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.7rem', cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {uploadingPoster === content.id ? '⏳...' : '📷 عکس'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUploadPoster(content.id, file); e.target.value = ''; }} />
                  </label>
                  <button className="btn-secondary" onClick={() => handleEditContent(content)} style={{ padding: '6px 12px', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                    ✏️ ویرایش
                  </button>
                  <button className="btn-secondary" onClick={() => handleDeleteContent(content.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}>
                    🗑 حذف
                  </button>
                </div>
              ))}
            </>
          )}

          {/* تب اپیزودها */}
          {activeTab === 'episodes' && (
            <>
              <div style={{ marginBottom: '20px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
                <h3 style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '15px' }}>➕ افزودن اپیزود جدید</h3>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>محتوا:</label>
                  <select value={episodeContentId} onChange={(e) => setEpisodeContentId(parseInt(e.target.value))} className="form-input">
                    <option value={0}>انتخاب کنید...</option>
                    {contents.filter(c => c.type === 'series' || c.type === 'anime').map((content) => (
                      <option key={content.id} value={content.id}>{content.type === 'series' ? '📺' : '✨'} {content.title}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" inputMode="numeric" placeholder="فصل" value={episodeSeason} onChange={(e) => setEpisodeSeason(e.target.value.replace(/[^0-9]/g, ''))} className="form-input" />
                  <input type="text" inputMode="numeric" placeholder="شماره قسمت" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value.replace(/[^0-9]/g, ''))} className="form-input" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                  <input type="text" placeholder="عنوان قسمت (اختیاری)" value={episodeTitle} onChange={(e) => setEpisodeTitle(e.target.value)} className="form-input" />
                  <input type="text" placeholder="لینک دانلود" value={episodeDownloadUrl} onChange={(e) => setEpisodeDownloadUrl(e.target.value)} className="form-input" />
                </div>

                <button className="btn-primary" onClick={handleAddEpisode} disabled={addingEpisode} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                  {addingEpisode ? '...' : 'افزودن اپیزود'}
                </button>
              </div>

              {episodes.map((episode) => {
                const parentContent = contents.find(c => c.id === episode.content_id);
                return (
                  <div key={episode.id} className="admin-item">
                    <span style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', flexShrink: 0 }}>
                      {episode.episode_number}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{parentContent?.title || 'محتوا'} - {episode.title || `قسمت ${episode.episode_number}`}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>فصل {episode.season_number} • قسمت {episode.episode_number}{episode.download_url && ' • ⬇ دانلود'}</div>
                    </div>
                    <button className="btn-secondary" onClick={() => handleDeleteEpisode(episode.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}>
                      🗑 حذف
                    </button>
                  </div>
                );
              })}
            </>
          )}

          {/* تب کاربران */}
          {activeTab === 'users' && (
            <>
              {users.map((user) => {
                const canManage = canManageUser(user);
                const muted = isMuted(user);
                return (
                  <div key={user.id} className="admin-item">
                    <span style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {user.avatar_url ? <img src={user.avatar_url} alt={user.username} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /> : <span style={{ fontSize: '20px' }}>👤</span>}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        {user.username}
                        <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>{getRoleLabel(user.role)}</span>
                        {user.id === currentUserId && <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>شما</span>}
                        {user.is_banned && <span style={{ fontSize: '0.7rem', color: '#fd79a8', fontWeight: 700 }}>🚫 بن شده</span>}
                        {muted && <span style={{ fontSize: '0.7rem', color: '#fdcb6e', fontWeight: 700 }}>🔇 سکوت شده</span>}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                    {canManage && (
                      <>
                        {user.is_banned ? (
                          <button className="btn-secondary" onClick={() => handleUnbanUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}>آزاد</button>
                        ) : (
                          <button className="btn-secondary" onClick={() => handleBanUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}>بن</button>
                        )}
                        {muted ? (
                          <button className="btn-secondary" onClick={() => handleUnmuteUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}>رفع سکوت</button>
                        ) : (
                          <button className="btn-secondary" onClick={() => handleMuteUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fdcb6e', borderColor: 'rgba(253,203,110,0.3)', whiteSpace: 'nowrap' }}>سکوت</button>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* تب نظرات */}
          {activeTab === 'comments' && (
            <>
              {comments.map((comment) => (
                <div key={comment.id} className="admin-item">
                  <span style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {comment.avatar_url ? <img src={comment.avatar_url} alt={comment.username || 'کاربر'} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /> : <span style={{ fontSize: '20px' }}>👤</span>}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem' }}>{comment.body}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text)' }}>{comment.username || `کاربر ${comment.user_id}`}</span>
                      {' '}•{' '}{new Date(comment.created_at).toLocaleDateString('fa-IR')}
                    </div>
                  </div>
                  {!comment.is_approved && <button className="btn-secondary" onClick={() => handleApproveComment(comment.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#10b981', borderColor: 'rgba(16,185,129,0.3)', whiteSpace: 'nowrap' }}>تایید</button>}
                  <button className="btn-secondary" onClick={() => handleHideComment(comment.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fdcb6e', borderColor: 'rgba(253,203,110,0.3)', whiteSpace: 'nowrap' }}>مخفی</button>
                  <button className="btn-secondary" onClick={() => handleDeleteComment(comment.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}>حذف</button>
                </div>
              ))}
            </>
          )}

          {/* تب نقش‌ها */}
          {activeTab === 'roles' && isOwner && (
            <>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>👑 مدیریت نقش‌ها</h2>
              {users.map((user) => (
                <div key={user.id} className="admin-item">
                  <span style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {user.avatar_url ? <img src={user.avatar_url} alt={user.username} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} /> : <span style={{ fontSize: '20px' }}>👤</span>}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{user.username}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{getRoleLabel(user.role)}</div>
                  </div>
                  {user.id === currentUserId && <span style={{ fontSize: '0.75rem', color: '#fdcb6e', fontWeight: 700, whiteSpace: 'nowrap' }}>👑 مالک</span>}
                  {user.role === 'user' && user.id !== currentUserId && <button className="btn-secondary" onClick={() => handlePromoteUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#a29bfe', borderColor: 'rgba(162,155,254,0.3)', whiteSpace: 'nowrap' }}>⬆ ارتقا به ادمین</button>}
                  {user.role === 'admin' && <button className="btn-secondary" onClick={() => handleDemoteUser(user.id)} style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#fd79a8', borderColor: 'rgba(253,121,168,0.3)', whiteSpace: 'nowrap' }}>⬇ تنزل به کاربر</button>}
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