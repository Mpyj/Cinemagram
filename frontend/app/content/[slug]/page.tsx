'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/ui/BackToTop';
import { Content, Comment, Episode } from '@/lib/types';
import { getContentBySlug, getComments, addComment, addToWatchlist, getEpisodes } from '@/lib/api';

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [content, setContent] = useState<Content | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchlistAdded, setWatchlistAdded] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState<number | 'all'>('all');

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('access_token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getContentBySlug(slug);
        setContent(data);
        
        const commentData = await getComments(data.id);
        setComments(commentData);
        
        if (data.type === 'series' || data.type === 'anime') {
          const eps = await getEpisodes(data.id);
          console.log('Episodes fetched:', eps);
          setEpisodes(eps);
          if (eps.length > 0) {
            setSelectedSeason(eps[0].season_number);
          }
        }
        
        setError('');
      } catch (err) {
        console.error('Error:', err);
        setError('خطا در دریافت اطلاعات');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!newComment.trim() || !content) return;

    try {
      const comment = await addComment({
        content_id: content.id,
        body: newComment.trim(),
      });
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      alert('خطا در ثبت نظر');
    }
  };

  const handleWatchlist = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    if (!content) return;

    try {
      await addToWatchlist(content.id);
      setWatchlistAdded(true);
      alert('به علاقه‌مندی‌ها اضافه شد!');
    } catch (err) {
      alert('خطا در افزودن به علاقه‌مندی‌ها');
    }
  };

  const handleWatch = () => {
    alert('پخش آنلاین به زودی فعال می‌شود!');
  };

  const handleDownloadClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setShowDownloadModal(true);
  };

  const getGradient = (type: string) => {
    switch (type) {
      case 'movie': return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
      case 'series': return 'linear-gradient(135deg, #0a3d4a, #1b2d5e)';
      case 'anime': return 'linear-gradient(135deg, #3d2d0a, #4a1d3a)';
      default: return 'linear-gradient(135deg, #2d1b5e, #4a1d3a)';
    }
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case 'movie': return '🚀';
      case 'series': return '🧪';
      case 'anime': return '🛡️';
      default: return '🎬';
    }
  };

  const seasons = [...new Set(episodes.map(ep => ep.season_number))].sort((a, b) => a - b);
  const filteredEpisodes = selectedSeason === 'all'
    ? episodes
    : episodes.filter(ep => ep.season_number === selectedSeason);

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
          در حال بارگذاری...
        </div>
        <Footer />
      </>
    );
  }

  if (error || !content) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
          {error || 'محتوا یافت نشد'}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <div className="detail-container">
          <div className="hero-bg"></div>

          <div className="detail-banner" style={{ background: getGradient(content.type) }}>
            {content.poster_url ? (
              <img src={content.poster_url} alt={content.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              getEmoji(content.type)
            )}
          </div>

          <div className="detail-card">
            <h1 className="detail-title">{content.title}</h1>

            <div className="detail-meta">
              <span>📅 {content.release_year || 'نامشخص'}</span>
              <span>🎭 {content.genres?.map(g => g.name).join('، ') || 'نامشخص'}</span>
              <span>
                {content.type === 'movie' ? '🎬 فیلم' : content.type === 'series' ? '📺 سریال' : '✨ انیمه'}
              </span>
              {content.country && <span>🌍 {content.country}</span>}
            </div>

            <div className="detail-rating">
              <span className="value">{content.rating || 'N/A'}</span>
              <span className="stars">
                {'★'.repeat(Math.round((content.rating || 0) / 2))}
                {'☆'.repeat(5 - Math.round((content.rating || 0) / 2))}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {content.views_count.toLocaleString('fa-IR')} بازدید
              </span>
            </div>

            <p className="detail-description">{content.description || 'توضیحاتی ثبت نشده است.'}</p>

            <div className="detail-actions">
              <button className="btn-primary" onClick={handleWatch} style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                ▶ پخش آنلاین
              </button>

              <button className="btn-secondary" onClick={handleDownloadClick} style={{ padding: '10px 24px', fontSize: '0.85rem' }}>
                ⬇ دانلود
              </button>

              <button className="btn-secondary" onClick={handleWatchlist} disabled={watchlistAdded} style={{ padding: '10px 24px', fontSize: '0.85rem', ...(watchlistAdded ? { borderColor: 'rgba(16,185,129,0.5)', color: '#10b981' } : {}) }}>
                {watchlistAdded ? '✅ اضافه شد' : '❤️ افزودن به علاقه‌مندی‌ها'}
              </button>
            </div>

            <div className="comments-section">
              <h2 className="comments-title">💬 نظرات ({comments.length})</h2>

              <div className="comment-form">
                {!isLoggedIn && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    برای ثبت نظر باید{' '}
                    <a href="/login" style={{ color: 'var(--secondary)' }}>وارد شوید</a>
                  </div>
                )}
                <textarea className="comment-textarea" placeholder={isLoggedIn ? 'نظر خود را بنویسید...' : 'برای ثبت نظر وارد شوید...'} value={newComment} onChange={(e) => setNewComment(e.target.value)} disabled={!isLoggedIn} />
                <button className="btn-primary" onClick={handleAddComment} disabled={!newComment.trim() || !isLoggedIn} style={{ marginTop: '10px', padding: '10px 24px', fontSize: '0.85rem', opacity: (!newComment.trim() || !isLoggedIn) ? 0.5 : 1 }}>
                  {isLoggedIn ? 'ثبت نظر' : 'ورود و ثبت نظر'}
                </button>
              </div>

              <div className="comment-list">
                {comments.length === 0 && (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>
                    اولین نفری باشید که نظر می‌دهید!
                  </div>
                )}
                {comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-avatar" style={{ overflow: 'hidden' }}>
                        {comment.avatar_url ? (
                          <img src={comment.avatar_url} alt={comment.username || 'کاربر'} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          '👤'
                        )}
                      </div>
                      <div>
                        <div className="comment-user">{comment.username || `کاربر ${comment.user_id}`}</div>
                        <div className="comment-date">{new Date(comment.created_at).toLocaleDateString('fa-IR')}</div>
                      </div>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* مودال دانلود */}
      {showDownloadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowDownloadModal(false)}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', maxWidth: '600px', width: '100%', maxHeight: '80vh', overflow: 'auto', padding: '25px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>⬇ دانلود {content.title}</h2>
              <button onClick={() => setShowDownloadModal(false)} style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--bg-card-hover)', border: 'none', color: 'var(--text)', fontSize: '1rem', cursor: 'pointer' }}>✕</button>
            </div>

            {/* برای فیلم */}
            {content.type === 'movie' && content.download_url && (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <a href={content.download_url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 30px', borderRadius: '50px', background: 'var(--gradient-1)', color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>
                  ⬇ دانلود فیلم
                </a>
              </div>
            )}

            {/* برای فیلم بدون لینک */}
            {content.type === 'movie' && !content.download_url && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>
                لینک دانلود برای این فیلم ثبت نشده است
              </div>
            )}

            {/* برای سریال/انیمه */}
            {(content.type === 'series' || content.type === 'anime') && (
              <>
                {/* تب فصل‌ها */}
                {seasons.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '50px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: selectedSeason === season ? 'var(--gradient-1)' : 'var(--bg-card)',
                          color: selectedSeason === season ? 'white' : 'var(--text-muted)',
                          border: selectedSeason === season ? '1px solid transparent' : '1px solid var(--border)',
                        }}
                      >
                        فصل {season}
                      </button>
                    ))}
                  </div>
                )}

                {/* لیست اپیزودها */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {filteredEpisodes.length === 0 && (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                      اپیزودی برای این فصل ثبت نشده
                    </div>
                  )}
                  {filteredEpisodes.map((episode) => (
                    <div key={episode.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 15px', borderRadius: '12px', background: 'var(--bg-card-hover)', border: '1px solid var(--border)' }}>
                      <span style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--gradient-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', flexShrink: 0, fontSize: '0.85rem' }}>
                        {episode.episode_number}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          فصل {episode.season_number} - قسمت {episode.episode_number}
                        </div>
                        {episode.title && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{episode.title}</div>
                        )}
                      </div>
                      {episode.download_url ? (
                        <a href={episode.download_url} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', borderRadius: '20px', background: 'var(--gradient-1)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                          ⬇ دانلود
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>بدون لینک</span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
      <BackToTop />
    </>
  );
}