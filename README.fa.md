# 🎬 سینماگرام | Cinemagram

> یک پلتفرم فول‌استک مدرن برای فیلم، سریال و انیمه.

[🇬🇧 مشاهده README انگلیسی](./README.md)

<div align="center">

<img src="./assets/logo.jpg" width="180" alt="Cinemagram Logo">

# سینماگرام

### فیلم. سریال. انیمه. همه در یک جا.

</div>

---

# 📸 تصاویر پروژه

## 🖥️ نسخه دسکتاپ

![صفحه اصلی سینماگرام](./screenshots/home.jpg)

## 📱 نسخه موبایل

![نسخه موبایل سینماگرام](./screenshots/phone.jpg)

## 🔍 جستجو

![صفحه جستجو](./screenshots/search.jpg)

## 🎬 جزئیات محتوا

![صفحه جزئیات محتوا](./screenshots/content.jpg)

## 👤 پروفایل

![پروفایل کاربر](./screenshots/profile.jpg)

## 🛡️ پنل مدیریت

![پنل مدیریت](./screenshots/admin.jpg)

---

# ✨ امکانات

## 👥 کاربران

سینماگرام دارای یک سیستم کامل مدیریت کاربران، احراز هویت و پروفایل است.

* ثبت‌نام
* ورود و خروج
* احراز هویت با JWT
* آپلود عکس پروفایل
* تغییر نام کاربری
* تغییر ایمیل
* تغییر رمز عبور
* نمایش تاریخ عضویت
* پشتیبانی از تاریخ شمسی
* نمایش نقش کاربر
* پروفایل شخصی
* لیست علاقه‌مندی‌ها

---

# 🛡️ نقش‌ها

سینماگرام دارای سه نقش اصلی است:

| نقش       | دسترسی                              |
| --------- | ----------------------------------- |
| 👑 مالک   | دسترسی کامل + ارتقا و تنزل ادمین‌ها |
| 🛡️ ادمین | مدیریت محتوا، کاربران و نظرات       |
| 👤 کاربر  | استفاده از پلتفرم                   |

ادمین‌ها می‌توانند کاربران را مدیریت کرده و اقداماتی مانند موارد زیر انجام دهند:

* بن کردن کاربران
* ساکت کردن کاربران
* مدیریت محتوا
* مدیریت نظرات
* مدیریت کاربران

---

# 🧪 تست‌ها

سینماگرام دارای یک مجموعه تست جامع با استفاده از **pytest** برای بررسی بخش‌های اصلی Backend است.

## پوشش تست‌ها

تست‌های فعلی شامل بخش‌های زیر هستند:

* ✅ احراز هویت

  * ثبت‌نام
  * ورود
  * رمز عبور اشتباه
  * ایمیل تکراری

* ✅ محتوا

  * دریافت لیست محتوا
  * دریافت محتوا بر اساس Slug
  * بررسی محتوای پیدا نشده
  * فیلتر بر اساس نوع محتوا

* ✅ ژانرها

  * دریافت لیست ژانرها
  * ایجاد ژانر جدید

* ✅ علاقه‌مندی‌ها

  * اضافه کردن محتوا
  * دریافت لیست علاقه‌مندی‌ها

## اجرای تست‌ها

```bash
cd backend
pytest tests/ -v
```

## نتیجه تست‌ها

```text
12 passed
```

---

# 🎬 مدیریت محتوا

سینماگرام از انواع مختلف محتوا پشتیبانی می‌کند:

* 🎞️ فیلم
* 📺 سریال
* 🍿 انیمه

ادمین‌ها می‌توانند:

* افزودن محتوا
* ویرایش محتوا
* حذف محتوا
* آپلود پوستر
* انتخاب چندین ژانر
* ایجاد ژانر جدید
* تعیین سال ساخت
* تعیین امتیاز از ۰ تا ۱۰
* افزودن لینک دانلود فیلم
* ساخت فصل
* افزودن قسمت
* افزودن لینک قسمت

---

# 🔍 جستجو

## جستجو

جستجوی محتوا بر اساس:

* نام

## فیلترها

محتوا را می‌توان بر اساس موارد زیر فیلتر کرد:

* نوع محتوا
* ژانر
* سال ساخت
* حداقل امتیاز

## مرتب‌سازی

گزینه‌های مرتب‌سازی:

* جدیدترین
* امتیاز
* بازدید
* سال ساخت

---

# ❤️ علاقه‌مندی‌ها

کاربران می‌توانند لیست شخصی علاقه‌مندی‌های خود را مدیریت کنند.

امکانات این بخش:

* اضافه کردن محتوا به علاقه‌مندی‌ها
* حذف محتوا از علاقه‌مندی‌ها
* مشاهده محتوای ذخیره‌شده در پروفایل

---

# 💬 نظرات

کاربران می‌توانند زیر موارد زیر نظر ثبت کنند:

* فیلم
* سریال
* انیمه

هر نظر شامل:

* نام کاربر
* آواتار
* متن نظر

ادمین‌ها می‌توانند:

* تأیید نظر
* مخفی کردن نظر
* حذف نظر

---

# 📥 سیستم دانلود

## 🎞️ فیلم

فیلم‌ها می‌توانند دارای لینک دانلود مستقیم باشند.

## 📺 سریال و 🍿 انیمه

قسمت‌ها به‌صورت فصل‌بندی‌شده سازمان‌دهی می‌شوند:

```text
فصل ۱
├── قسمت ۱
├── قسمت ۲
└── قسمت ۳

فصل ۲
├── قسمت ۱
├── قسمت ۲
└── قسمت ۳
```

هر قسمت می‌تواند لینک دانلود اختصاصی خود را داشته باشد.

---

# 📥 ورود خودکار محتوا

سینماگرام از سیستم ورود و Import خودکار محتوا از منابع مختلف پشتیبانی می‌کند.

## 🎥 TMDB

فیلم‌ها و سریال‌ها می‌توانند همراه با اطلاعات موجود زیر وارد شوند:

* نام
* پوستر
* ژانرها
* امتیاز
* اطلاعات و متادیتای محتوا

## 🍿 Jikan / MyAnimeList

اطلاعات انیمه‌ها از طریق API سرویس Jikan دریافت و وارد می‌شود.

## 📄 فایل‌های محلی

محتوا همچنین می‌تواند از فایل‌های محلی وارد شود.

فرمت‌های پشتیبانی‌شده:

* JSON
* CSV
* Excel
* فایل‌های متنی شامل لینک

---

# 📱 رابط کاربری واکنش‌گرا

سینماگرام برای دستگاه‌های مختلف طراحی شده است:

* 📱 موبایل
* 📲 تبلت
* 💻 دسکتاپ

رابط کاربری شامل:

* طراحی واکنش‌گرا
* منوی همبرگری در موبایل
* حالت تاریک و روشن
* صفحه‌بندی
* انیمیشن‌های Framer Motion
* افکت‌های Hover
* Active States
* Glassmorphism
* پس‌زمینه‌های گرادیانی متحرک

---

# 🎨 طراحی

سینماگرام از یک هویت بصری مدرن و سینمایی استفاده می‌کند.

ویژگی‌های طراحی:

* ترکیب رنگ بنفش، صورتی و فیروزه‌ای
* Glassmorphism
* گرادیان‌های متحرک
* انیمیشن‌های Framer Motion
* حالت تاریک و روشن
* فونت Vazirmatn
* افکت‌های مدرن Hover
* Active States
* رابط کاربری واکنش‌گرا

---

# 🛠️ تکنولوژی‌ها

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
* SQLite (In-Memory برای تست‌ها)

## APIهای خارجی

* TMDB — فیلم و سریال
* Jikan / MyAnimeList — انیمه

---

# 📁 ساختار پروژه

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

# 🚀 راه‌اندازی پروژه

## دریافت پروژه

```bash
git clone https://github.com/Mpyj/Cinemagram.git
cd Cinemagram
```

---

# ⚙️ راه‌اندازی Backend

وارد پوشه Backend شوید:

```bash
cd backend
```

یک محیط مجازی ایجاد کنید:

```bash
python -m venv venv
```

## ویندوز

محیط مجازی را فعال کنید:

```bash
venv\Scripts\activate
```

وابستگی‌ها را نصب کنید:

```bash
pip install -r requirements.txt
```

Backend را اجرا کنید:

```bash
uvicorn app.main:app --reload
```

---

# 🧪 اجرای تست‌ها

از داخل پوشه `backend`:

```bash
pytest tests/ -v
```

تست‌ها از SQLite به‌صورت In-Memory برای اجرای تست‌ها استفاده می‌کنند.

---

# 🗄️ دیتابیس

مطمئن شوید PostgreSQL در حال اجرا است.

```bash
psql -U postgres -h localhost
```

دیتابیس را ایجاد کنید:

```sql
CREATE DATABASE cinemagram;
```

دیتای اولیه را وارد کنید:

```bash
python seed_data.py
```

---

# 🌐 راه‌اندازی Frontend

وارد پوشه Frontend شوید:

```bash
cd frontend
```

وابستگی‌ها را نصب کنید:

```bash
npm install
```

سرور توسعه را اجرا کنید:

```bash
npm run dev
```

---

# 📥 Import محتوا

## 🎞️ وارد کردن فیلم

```bash
python import_from_tmdb.py movies_list.txt --list
```

## 📺 وارد کردن سریال

```bash
python import_from_tmdb.py series_list.txt --list
```

## 🍿 وارد کردن انیمه

```bash
python import_anime.py anime_list.txt --list
```

---

# 🔐 متغیرهای محیطی

داخل پوشه `frontend` یک فایل `.env.local` ایجاد کنید.

نمونه:

```env
NEXT_PUBLIC_API_URL=
```

متغیرهای محیطی موردنیاز را متناسب با تنظیمات پروژه خود وارد کنید.

> **مهم:** هرگز API Key، رمز عبور، اطلاعات دیتابیس، JWT Secret یا فایل `.env.local` را داخل Git Commit نکنید.

---

# 🧩 معماری پروژه

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


                          APIهای خارجی
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
                TMDB                      Jikan
```

---

# 📌 صفحه‌بندی

لیست‌های محتوا شامل **۲۰ آیتم در هر صفحه** هستند.

---

# 🔮 برنامه‌های آینده

برخی از قابلیت‌هایی که می‌توانند در آینده به پروژه اضافه شوند:

* سیستم پیشنهاد شخصی‌سازی‌شده فیلم و سریال
* تاریخچه تماشا
* Continue Watching
* کیفیت‌های مختلف دانلود
* آمار پیشرفته پنل مدیریت
* منابع بیشتر برای Import محتوا
* سیستم اعلان
* Cache پیشرفته
* بهبود SEO
* اتوماسیون Deployment

---

# ⚖️ قوانین استفاده و ذکر منبع

سینماگرام برای موارد زیر قابل استفاده است:

* یادگیری
* استفاده شخصی
* بررسی
* توسعه

استفاده از بخش‌هایی از سورس‌کد، طراحی یا ساختار پروژه با ذکر منبع و سازنده مجاز است.

## قوانین

* استفاده آموزشی و شخصی مجاز است.
* استفاده مجدد از سورس‌کد با ذکر منبع مجاز است.
* نسخه‌های تغییر‌یافته باید نام **Mpyj** را به‌عنوان سازنده اصلی ذکر کنند.
* حذف نام سازنده یا منبع اصلی مجاز نیست.
* بازنشر کامل پروژه بدون ذکر منبع مجاز نیست.

## نحوه ذکر منبع

**Cinemagram**

Created by **Mpyj**

Source: https://github.com/Mpyj/Cinemagram

Telegram: https://t.me/MpyjTelegram

---

# 👨‍💻 ساخته‌شده توسط Mpyj

**Mpyj**

Programmer • Builder • Tech Enthusiast

GitHub: https://github.com/Mpyj

Telegram: https://t.me/MpyjTelegram

---

# 📄 License

این پروژه تحت قوانین استفاده و ذکر منبع نوشته‌شده در همین README منتشر شده است.

برای استفاده تجاری یا بازنشر کامل پروژه، با سازنده اصلی هماهنگ کنید.

---

<div align="center">

# 🎬 سینماگرام

### فیلم. سریال. انیمه. همه در یک جا.

Built with ❤️ and code by **Mpyj**

</div>
