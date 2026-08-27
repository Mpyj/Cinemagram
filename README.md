# 🎬 Cinemagram

> **A modern full-stack platform for movies, TV series, and anime.**

**Cinemagram** is a modern full-stack entertainment platform built for discovering, managing, searching, and downloading movies, TV series, and anime.

The project combines a powerful FastAPI backend with a modern Next.js frontend and provides authentication, role-based access control, content management, episode management, comments, watchlists, advanced search, responsive UI, and automated content importing.

---

## ✨ Features

### 👥 User System

* User registration
* User login and logout
* JWT-based authentication
* Profile avatar upload
* Change username
* Change email
* Change password
* Membership date display
* Persian calendar date support
* User role display
* Personal profile
* Personal watchlist

---

### 🛡️ Role-Based Access Control

Cinemagram includes three user roles:

| Role      | Permissions                                            |
| --------- | ------------------------------------------------------ |
| 👑 Owner  | Full system access + promote/demote administrators     |
| 🛡️ Admin | Manage content, users and comments                     |
| 👤 User   | Browse, search, download, comment and use the platform |

Administrators can also manage users through actions such as:

* Ban
* Mute
* User management

---

# 🎬 Content Management

Cinemagram supports three main content types:

* 🎞️ Movies
* 📺 TV Series
* 🍿 Anime

Administrators can:

* Add content
* Edit content
* Delete content
* Upload posters
* Assign multiple genres
* Create new genres
* Set release year
* Set rating from `0 - 10`
* Add movie download links
* Create seasons
* Add episodes
* Add individual episode links

---

# 🔍 Advanced Search

Cinemagram provides a flexible search and filtering system.

### Search

* Search by title

### Filters

* Content type
* Genre
* Release year
* Minimum rating

### Sorting

* Newest
* Rating
* Views
* Release year

---

# ❤️ Watchlist

Users can:

* Add movies, series and anime to their watchlist
* Remove content from their watchlist
* View saved content from their profile

---

# 💬 Comments

Users can leave comments under movies, series and anime.

Each comment displays:

* Username
* Profile avatar
* Comment text

Administrators can:

* Approve comments
* Hide comments
* Delete comments

---

# 📥 Download System

## Movies

Movies can have direct download links.

## TV Series & Anime

Episodes are organized by seasons:

```text
Season 1
├── Episode 1
├── Episode 2
└── Episode 3

Season 2
├── Episode 1
├── Episode 2
└── Episode 3
```

---

# 📥 Automated Import System

One of Cinemagram's key features is its automated content import system.

## 🎥 TMDB

Movies and TV series can be imported automatically from TMDB, including available information such as:

* Title
* Poster
* Genres
* Rating
* Metadata

## 🍿 Jikan / MyAnimeList

Anime information can be imported through the Jikan API.

## 📄 Local Files

Cinemagram also supports importing from:

* JSON
* CSV
* Excel
* Text files containing links

This makes it possible to populate the database much faster without manually entering every item.

---

# 📱 Responsive Interface

Cinemagram is designed for:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

### UI Features

* Fully responsive layout
* Mobile hamburger menu
* Dark / Light mode
* Pagination
* Smooth animations
* Hover effects
* Active states
* Glassmorphism
* Animated gradient backgrounds

---

# 🎨 Design

Cinemagram uses a modern cinematic visual style.

### Color Palette

* 🟣 Purple
* 🌸 Pink
* 🩵 Turquoise

### Visual Features

* Glassmorphism
* Animated gradient backgrounds
* Framer Motion animations
* Hover effects
* Active states
* Dark / Light themes
* Vazirmatn Persian font

---

# 🛠️ Tech Stack

## Backend

* **Python**
* **FastAPI**
* **PostgreSQL**
* **SQLAlchemy**
* **Pydantic**
* **JWT**

## Frontend

* **Next.js 14**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Axios**

## External APIs

* **TMDB** — Movies & TV Series
* **Jikan / MyAnimeList** — Anime

---

# 📁 Project Structure

```text
Cinemagram/
├── README.md
├── README.fa.md
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── genre.py
│   │   │   ├── episode.py
│   │   │   ├── comment.py
│   │   │   ├── rating.py
│   │   │   └── watchlist.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── genre.py
│   │   │   ├── episode.py
│   │   │   ├── comment.py
│   │   │   └── auth.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── content.py
│   │   │   ├── episodes.py
│   │   │   ├── genres.py
│   │   │   ├── comments.py
│   │   │   ├── watchlist.py
│   │   │   └── admin.py
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── content_service.py
│   │   │   └── user_service.py
│   │   └── utils/
│   │       ├── file_upload.py
│   │       └── validators.py
│   ├── uploads/
│   │   ├── posters/
│   │   └── avatars/
│   ├── import_from_tmdb.py
│   ├── import_anime.py
│   ├── seed_data.py
│   └── requirements.txt
│
└── frontend/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── search/
    │   ├── login/
    │   ├── register/
    │   ├── profile/
    │   ├── admin/
    │   └── content/
    ├── components/
    ├── lib/
    ├── context/
    ├── hooks/
    └── public/
        └── fonts/
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Mpyj/Cinemagram.git
cd Cinemagram
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start the Backend

```bash
uvicorn app.main:app --reload
```

---

# 🗄️ Database Setup

Make sure PostgreSQL is installed and running.

Open PostgreSQL:

```bash
psql -U postgres -h localhost
```

Create the database:

```sql
CREATE DATABASE cinemagram;
```

Then seed the initial data:

```bash
python seed_data.py
```

---

# 🌐 Frontend Setup

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

---

# 📥 Import Content

### Movies

```bash
python import_from_tmdb.py movies_list.txt --list
```

### TV Series

```bash
python import_from_tmdb.py series_list.txt --list
```

### Anime

```bash
python import_anime.py anime_list.txt --list
```

---

# 🔐 Environment Variables

Configure your environment variables according to your setup.

Example:

```env
DATABASE_URL=
JWT_SECRET=
TMDB_API_KEY=
```

> **Never commit API keys, passwords, database credentials, or JWT secrets to Git.**

---

# 🧩 Architecture

```text
                    ┌───────────────────┐
                    │      Next.js      │
                    │     Frontend      │
                    └─────────┬─────────┘
                              │
                              │ REST API
                              ▼
                    ┌───────────────────┐
                    │      FastAPI      │
                    │      Backend      │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    PostgreSQL     │
                    │     Database      │
                    └───────────────────┘

                         External APIs
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
               TMDB                      Jikan
```

---

# 📌 Pagination

Content lists use pagination with:

```text
20 items per page
```

---

# 🔮 Future Plans

Potential future improvements include:

* Personalized recommendations
* Advanced rating system
* Watch history
* Continue Watching
* Multiple download qualities
* Advanced admin analytics
* More import sources
* Notification system
* Advanced caching
* SEO improvements
* Deployment automation

---

# ⚖️ Usage & Attribution

Cinemagram is available for **learning, personal use, inspection, and development**.

You may use parts of the source code, design, or project structure **with proper attribution**.

## Rules

* Educational and personal use is allowed.
* Using parts of the source code with attribution is allowed.
* If you publish a modified version or use a significant portion of the project, you must credit **Mpyj** as the original creator.
* Removing the original creator's name or source attribution is not allowed.
* Republishing the complete project without attribution is not allowed.

## Attribution

If you use this project or any part of it, please include:

```text
Cinemagram
Created by Mpyj
Source: https://github.com/Mpyj/Cinemagram
Telegram: https://t.me/MpyjTelegram
```

---

# 👨‍💻 Created by Mpyj

**Mpyj**

Programmer • Builder • Tech Enthusiast

### 🔗 Links

* GitHub: https://github.com/Mpyj
* Telegram: https://t.me/MpyjTelegram

---

# 📄 License

This project is distributed under the usage and attribution terms described in this README.

For commercial use or full-project redistribution, please contact the original creator.

---

# 🎬 Cinemagram

### Movies. Series. Anime. One place.

**Built with ❤️ and code by Mpyj.**
