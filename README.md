# 🎬 Cinemagram

> A modern full-stack platform for movies, TV series, and anime.

[🇮🇷 مشاهده README فارسی](./README.fa.md)

<div align="center">

<img src="./assets/logo.jpg" width="180" alt="Cinemagram Logo">

# Cinemagram

### Movies. Series. Anime. One place.

</div>

---

## 📸 Screenshots

### 🖥️ Desktop

![Cinemagram Home](./screenshots/home.jpg)

### 📱 Mobile

![Cinemagram Mobile](./screenshots/phone.jpg)

### 🔍 Search

![Cinemagram Search](./screenshots/search.jpg)

### 🎬 Content Details

![Cinemagram Content](./screenshots/content.jpg)

### 👤 Profile

![Cinemagram Profile](./screenshots/profile.jpg)

### 🛡️ Admin Panel

![Cinemagram Admin](./screenshots/admin.jpg)

---

# ✨ Features

## 👥 Users

Cinemagram provides a complete user system with authentication and profile management.

* Registration
* Login / Logout
* JWT authentication
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

## 🛡️ Roles

Cinemagram includes three different user roles:

| Role      | Permissions                           |
| --------- | ------------------------------------- |
| 👑 Owner  | Full access + promote / demote admins |
| 🛡️ Admin | Manage content, users and comments    |
| 👤 User   | Use the platform                      |

Admins can manage users with actions such as:

* Ban users
* Mute users
* Manage platform content
* Manage comments
* Manage users

---

# 🧪 Tests

Cinemagram includes a comprehensive **pytest** test suite for testing core backend functionality.

## Test Coverage

The current test suite covers:

* ✅ Authentication

  * Register
  * Login
  * Wrong password
  * Duplicate email

* ✅ Content

  * List content
  * Get content by slug
  * Not found handling
  * Filter by content type

* ✅ Genres

  * List genres
  * Create genres

* ✅ Watchlist

  * Add content
  * Get watchlist

## Run Tests

```bash
cd backend
pytest tests/ -v
```

## Test Results

```text
12 passed
```

---

# 🎬 Content Management

Cinemagram supports multiple types of entertainment content:

* 🎞️ Movies
* 📺 TV Series
* 🍿 Anime

Admins can manage content with features such as:

* Add content
* Edit content
* Delete content
* Upload posters
* Assign multiple genres
* Create new genres
* Set release year
* Set rating from 0 to 10
* Add movie download links
* Create seasons
* Add episodes
* Add episode links

---

# 🔍 Search

## Search

Search content by:

* Title

## Filters

Content can be filtered by:

* Content type
* Genre
* Release year
* Minimum rating

## Sorting

Available sorting options:

* Newest
* Rating
* Views
* Release year

---

# ❤️ Watchlist

Users can manage their personal watchlist.

Available actions:

* Add content to watchlist
* Remove content from watchlist
* View saved content from profile

---

# 💬 Comments

Users can comment on:

* Movies
* TV Series
* Anime

Each comment includes:

* Username
* Profile avatar
* Comment text

Admins can manage comments by:

* Approving comments
* Hiding comments
* Deleting comments

---

# 📥 Download System

## 🎞️ Movies

Movies can provide direct download links.

## 📺 Series & 🍿 Anime

Episodes are organized by seasons.

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

Each episode can have its own download link.

---

# 📥 Automated Import

Cinemagram supports automated content importing from multiple sources.

## 🎥 TMDB

Movies and TV series can be imported with available information such as:

* Title
* Poster
* Genres
* Rating
* Metadata

## 🍿 Jikan / MyAnimeList

Anime information can be imported through the Jikan API.

## 📄 Local Files

Content can also be imported from local files.

Supported formats:

* JSON
* CSV
* Excel
* Text files containing links

---

# 📱 Responsive UI

Cinemagram is designed to work across multiple devices:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The interface includes:

* Responsive layout
* Mobile hamburger menu
* Dark / Light mode
* Pagination
* Framer Motion animations
* Hover effects
* Active states
* Glassmorphism
* Animated gradient backgrounds

---

# 🎨 Design

Cinemagram uses a modern cinematic visual identity.

Design features include:

* Purple / Pink / Turquoise color palette
* Glassmorphism
* Animated gradients
* Framer Motion animations
* Dark / Light themes
* Vazirmatn font
* Modern hover effects
* Active states
* Responsive interface

---

# 🛠️ Tech Stack

## Backend

* Python
* FastAPI
* PostgreSQL
* SQLAlchemy
* Pydantic
* JWT

## Frontend

* Next.js 14
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios

## Testing

* Pytest
* Pytest Coverage
* FastAPI TestClient
* SQLite (in-memory for tests)

## External APIs

* TMDB — Movies & TV Series
* Jikan / MyAnimeList — Anime

---

# 📁 Project Structure

```text
Cinemagram/
├── README.md
├── README.fa.md
│
├── assets/
│   └── logo.jpg
│
├── screenshots/
│   ├── home.jpg
│   ├── phone.jpg
│   ├── search.jpg
│   ├── content.jpg
│   ├── profile.jpg
│   └── admin.jpg
│
├── backend/
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   │
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── genre.py
│   │   │   ├── episode.py
│   │   │   ├── comment.py
│   │   │   ├── rating.py
│   │   │   └── watchlist.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── content.py
│   │   │   ├── genre.py
│   │   │   ├── episode.py
│   │   │   ├── comment.py
│   │   │   └── auth.py
│   │   │
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
│   │   │
│   │   ├── services/
│   │   │   ├── auth_service.py
│   │   │   ├── content_service.py
│   │   │   └── user_service.py
│   │   │
│   │   └── utils/
│   │       ├── file_upload.py
│   │       └── validators.py
│   │
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py
│   │   ├── test_auth.py
│   │   ├── test_content.py
│   │   ├── test_genres.py
│   │   └── test_watchlist.py
│   │
│   ├── uploads/
│   │   ├── posters/
│   │   └── avatars/
│   │
│   ├── import_from_tmdb.py
│   ├── import_anime.py
│   ├── seed_data.py
│   ├── pytest.ini
│   └── requirements.txt
│
└── frontend/
    ├── .env.local
    ├── .gitignore
    ├── next.config.ts
    ├── package.json
    ├── tsconfig.json
    │
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   │
    │   ├── login/
    │   │   └── page.tsx
    │   │
    │   ├── register/
    │   │   └── page.tsx
    │   │
    │   ├── search/
    │   │   └── page.tsx
    │   │
    │   ├── profile/
    │   │   └── page.tsx
    │   │
    │   ├── admin/
    │   │   └── page.tsx
    │   │
    │   └── content/
    │       └── [slug]/
    │           └── page.tsx
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   │
    │   ├── home/
    │   │   ├── Hero.tsx
    │   │   ├── CategoryTabs.tsx
    │   │   └── ContentGrid.tsx
    │   │
    │   ├── content/
    │   │   └── MovieCard.tsx
    │   │
    │   └── ui/
    │       └── BackToTop.tsx
    │
    ├── context/
    │   ├── ThemeContext.tsx
    │   └── AuthContext.tsx
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useContent.ts
    │
    ├── lib/
    │   ├── api.ts
    │   └── types.ts
    │
    └── public/
        └── fonts/
            ├── Vazirmatn-Regular.woff2
            ├── Vazirmatn-Bold.woff2
            └── Vazirmatn-Black.woff2
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Mpyj/Cinemagram.git
cd Cinemagram
```

---

# ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows

Activate the virtual environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

---

# 🧪 Running Tests

From the backend directory:

```bash
pytest tests/ -v
```

The tests use SQLite in-memory databases for testing.

---

# 🗄️ Database

Make sure PostgreSQL is running.

```bash
psql -U postgres -h localhost
```

Create the database:

```sql
CREATE DATABASE cinemagram;
```

Seed the initial data:

```bash
python seed_data.py
```

---

# 🌐 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 📥 Import Content

## 🎞️ Import Movies

```bash
python import_from_tmdb.py movies_list.txt --list
```

## 📺 Import TV Series

```bash
python import_from_tmdb.py series_list.txt --list
```

## 🍿 Import Anime

```bash
python import_anime.py anime_list.txt --list
```

---

# 🔐 Environment Variables

Create a `.env.local` file inside the `frontend` directory.

Example:

```env
NEXT_PUBLIC_API_URL=
```

Configure the required environment variables according to your local setup.

> **Important:** Never commit API keys, passwords, database credentials, JWT secrets, or `.env.local` files to Git.

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

Content lists use **20 items per page**.

---

# 🔮 Future Plans

Possible future improvements include:

* Personalized recommendations
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

Cinemagram is available for:

* Learning
* Personal use
* Inspection
* Development

Using parts of the source code, design, or project structure is allowed with proper attribution.

## Rules

* Educational and personal use is allowed.
* Source code may be reused with attribution.
* Modified versions must credit **Mpyj** as the original creator.
* Removing the original creator's name or source is not allowed.
* Republishing the complete project without attribution is not allowed.

## Attribution

**Cinemagram**
Created by **Mpyj**

Source: https://github.com/Mpyj/Cinemagram

Telegram: https://t.me/MpyjTelegram

---

# 👨‍💻 Created by Mpyj

**Mpyj**

Programmer • Builder • Tech Enthusiast

GitHub: https://github.com/Mpyj

Telegram: https://t.me/MpyjTelegram

---

# 📄 License

This project is distributed under the usage and attribution terms described in this README.

For commercial use or full-project redistribution, please contact the original creator.

---

<div align="center">

# 🎬 Cinemagram

### Movies. Series. Anime. One place.

Built with ❤️ and code by **Mpyj**

</div>
