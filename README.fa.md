# 🎬 سینماگرام | Cinemagram

> یک پلتفرم فول‌استک مدرن برای فیلم، سریال و انیمه.

[🇬🇧 مشاهده README انگلیسی](./README.md)

<div align="center">

<img src="./assets/logo.jpg" width="180">

# سینماگرام

### فیلم. سریال. انیمه. همه در یک جا.

</div>

---

## 📸 تصاویر پروژه

### 🖥️ نسخه دسکتاپ

![صفحه اصلی سینماگرام](./screenshots/home.jpg)

### 📱 نسخه موبایل

![نسخه موبایل سینماگرام](./screenshots/phone.jpg)

### 🔍 جستجو

![صفحه جستجو](./screenshots/search.jpg)

### 🎬 جزئیات محتوا

![صفحه جزئیات محتوا](./screenshots/content.jpg)

### 👤 پروفایل

![پروفایل کاربر](./screenshots/profile.jpg)

### 🛡️ پنل مدیریت

![پنل مدیریت](./screenshots/admin.jpg)

---

## ✨ امکانات

### 👥 کاربران

- ثبت‌نام
- ورود و خروج
- احراز هویت با JWT
- آپلود عکس پروفایل
- تغییر نام کاربری
- تغییر ایمیل
- تغییر رمز عبور
- نمایش تاریخ عضویت
- پشتیبانی از تاریخ شمسی
- نمایش نقش کاربر
- پروفایل شخصی
- لیست علاقه‌مندی‌ها

---

## 🛡️ نقش‌ها

سینماگرام دارای سه نقش اصلی است:

| نقش | دسترسی |
|---|---|
| 👑 مالک | دسترسی کامل + ارتقا / تنزل ادمین‌ها |
| 🛡️ ادمین | مدیریت محتوا، کاربران و نظرات |
| 👤 کاربر | استفاده از سایت |

ادمین‌ها می‌توانند کاربران را مدیریت کرده و آن‌ها را بن یا ساکت کنند.

---

## 🎬 مدیریت محتوا

سینماگرام از موارد زیر پشتیبانی می‌کند:

- 🎞️ فیلم
- 📺 سریال
- 🍿 انیمه

ادمین‌ها می‌توانند:

- افزودن محتوا
- ویرایش محتوا
- حذف محتوا
- آپلود پوستر
- انتخاب چندین ژانر
- ایجاد ژانر جدید
- تعیین سال ساخت
- تعیین امتیاز از ۰ تا ۱۰
- افزودن لینک دانلود فیلم
- ساخت فصل
- افزودن قسمت
- افزودن لینک قسمت

---

## 🔍 جستجو

### جستجو

- جستجو بر اساس نام

### فیلترها

- نوع محتوا
- ژانر
- سال ساخت
- حداقل امتیاز

### مرتب‌سازی

- جدیدترین
- امتیاز
- بازدید
- سال ساخت

---

## ❤️ علاقه‌مندی‌ها

کاربران می‌توانند:

- محتوا را به علاقه‌مندی‌ها اضافه کنند
- محتوا را از علاقه‌مندی‌ها حذف کنند
- علاقه‌مندی‌ها را در پروفایل مشاهده کنند

---

## 💬 نظرات

کاربران می‌توانند زیر فیلم، سریال و انیمه نظر ثبت کنند.

هر نظر شامل:

- نام کاربر
- آواتار
- متن نظر

ادمین‌ها می‌توانند:

- نظر را تأیید کنند
- نظر را مخفی کنند
- نظر را حذف کنند

---

## 📥 سیستم دانلود

### فیلم

فیلم‌ها می‌توانند لینک دانلود مستقیم داشته باشند.

### سریال و انیمه

قسمت‌ها به صورت فصل‌بندی شده نمایش داده می‌شوند:

فصل ۱
├── قسمت ۱
├── قسمت ۲
└── قسمت ۳

فصل ۲
├── قسمت ۱
├── قسمت ۲
└── قسمت ۳

---

## 📥 Import خودکار

سینماگرام از سیستم Import خودکار محتوا پشتیبانی می‌کند.

### 🎥 TMDB

Import فیلم و سریال شامل اطلاعات موجود مانند:

- نام
- پوستر
- ژانر
- امتیاز
- اطلاعات محتوا

### 🍿 Jikan / MyAnimeList

اطلاعات انیمه‌ها از طریق Jikan API دریافت می‌شود.

### 📄 فایل‌های داخلی

فرمت‌های پشتیبانی‌شده:

- JSON
- CSV
- Excel
- فایل متنی شامل لینک‌ها

---

## 📱 رابط کاربری

سینماگرام برای موارد زیر طراحی شده است:

- 📱 موبایل
- 📲 تبلت
- 💻 دسکتاپ

امکانات:

- طراحی Responsive
- منوی همبرگری موبایل
- حالت تاریک و روشن
- Pagination
- انیمیشن‌های Framer Motion
- Hover Effects
- Active States
- Glassmorphism
- پس‌زمینه گرادیانی متحرک

---

## 🎨 طراحی

سینماگرام از یک هویت بصری مدرن و سینمایی استفاده می‌کند.

- ترکیب رنگ بنفش، صورتی و فیروزه‌ای
- Glassmorphism
- گرادیان‌های متحرک
- انیمیشن‌های Framer Motion
- حالت تاریک و روشن
- فونت وزیرمتن
- افکت‌های Hover و Active

---

## 🛠️ تکنولوژی‌ها

### Backend

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- JWT

### Frontend

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios

### APIهای خارجی

- TMDB — فیلم و سریال
- Jikan / MyAnimeList — انیمه

---

## 📁 ساختار پروژه

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
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   └── utils/
│   ├── uploads/
│   ├── import_from_tmdb.py
│   ├── import_anime.py
│   ├── seed_data.py
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
    │   ├── login/
    │   │   └── page.tsx
    │   ├── register/
    │   │   └── page.tsx
    │   ├── search/
    │   │   └── page.tsx
    │   ├── profile/
    │   │   └── page.tsx
    │   ├── admin/
    │   │   └── page.tsx
    │   └── content/
    │       └── [slug]/
    │           └── page.tsx
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   └── Footer.tsx
    │   ├── home/
    │   │   ├── Hero.tsx
    │   │   ├── CategoryTabs.tsx
    │   │   └── ContentGrid.tsx
    │   ├── content/
    │   │   └── MovieCard.tsx
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

---

## 🚀 راه‌اندازی

### دریافت پروژه

git clone https://github.com/Mpyj/Cinemagram.git
cd Cinemagram

### Backend

cd backend

python -m venv venv

در ویندوز:

venv\Scripts\activate

نصب وابستگی‌ها:

pip install -r requirements.txt

اجرای Backend:

uvicorn app.main:app --reload

---

## 🗄️ دیتابیس

مطمئن شوید PostgreSQL در حال اجراست.

psql -U postgres -h localhost

ساخت دیتابیس:

CREATE DATABASE cinemagram;

وارد کردن دیتای اولیه:

python seed_data.py

---

## 🌐 Frontend

cd frontend

npm install

npm run dev

---

## 📥 Import محتوا

### فیلم

python import_from_tmdb.py movies_list.txt --list

### سریال

python import_from_tmdb.py series_list.txt --list

### انیمه

python import_anime.py anime_list.txt --list

---

## 🔐 متغیرهای محیطی

داخل پوشه frontend یک فایل .env.local ایجاد کنید.

نمونه:

NEXT_PUBLIC_API_URL=

متغیرهای موردنیاز Backend را نیز مطابق تنظیمات محیط خود وارد کنید.

> مهم: هرگز API Key، رمز عبور، اطلاعات دیتابیس، JWT Secret یا فایل .env.local را داخل Git Commit نکنید.

---

## 🧩 معماری پروژه

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

---

## 📌 صفحه‌بندی

لیست محتوا شامل ۲۰ آیتم در هر صفحه است.

---

## 🔮 برنامه‌های آینده

- سیستم پیشنهاد فیلم و سریال
- تاریخچه تماشا
- Continue Watching
- کیفیت‌های مختلف دانلود
- آمار پیشرفته پنل ادمین
- منابع بیشتر برای Import
- سیستم اعلان
- Cache پیشرفته
- بهبود SEO
- اتوماسیون Deployment

---

## ⚖️ قوانین استفاده و ذکر منبع

استفاده از سینماگرام برای یادگیری، استفاده شخصی، بررسی و توسعه مجاز است.

استفاده از بخش‌هایی از سورس‌کد، طراحی یا ساختار پروژه با ذکر منبع و سازنده مجاز است.

### قوانین

- استفاده آموزشی و شخصی مجاز است.
- استفاده از بخش‌هایی از سورس‌کد با ذکر منبع مجاز است.
- نسخه‌های تغییر‌یافته باید نام Mpyj را به‌عنوان سازنده اصلی ذکر کنند.
- حذف نام سازنده یا منبع اصلی مجاز نیست.
- بازنشر کامل پروژه بدون ذکر منبع مجاز نیست.

### نحوه ذکر منبع

Cinemagram
Created by Mpyj
Source: https://github.com/Mpyj/Cinemagram
Telegram: https://t.me/MpyjTelegram

---

## 👨‍💻 ساخته شده توسط Mpyj

Mpyj

Programmer • Builder • Tech Enthusiast

GitHub: https://github.com/Mpyj
Telegram: https://t.me/MpyjTelegram

---

## 📄 License

این پروژه تحت قوانین استفاده و ذکر منبع نوشته‌شده در این README منتشر شده است.

برای استفاده تجاری یا بازنشر کامل پروژه، با سازنده اصلی هماهنگ کنید.

---

# 🎬 سینماگرام

### فیلم. سریال. انیمه. همه در یک جا.

Built with ❤️ and code by Mpyj.