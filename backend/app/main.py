from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .core.config import settings
from .core.database import Base, engine
from . import models
from .routers import (
auth,
users,
genres,
content,
episodes,
comments,
watchlist,
admin,
)

# Create database tables if they do not exist

Base.metadata.create_all(bind=engine)

# Create uploads directory if it does not exist

Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)

app = FastAPI(
title="سینماگرام API",
description="API برای سایت فیلم، سریال و انیمه",
version="1.0.0",
docs_url="/docs" if settings.DEBUG else None,
redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS

app.add_middleware(
CORSMiddleware,
allow_origins=["*"],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

# Serve uploaded files

app.mount(
"/uploads",
StaticFiles(directory=settings.UPLOAD_DIR),
name="uploads",
)

# API Routers

app.include_router(auth.router, prefix="/api/v1")
app.include_router(users.router, prefix="/api/v1")
app.include_router(genres.router, prefix="/api/v1")
app.include_router(content.router, prefix="/api/v1")
app.include_router(episodes.router, prefix="/api/v1")
app.include_router(comments.router, prefix="/api/v1")
app.include_router(watchlist.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {
"message": "سینماگرام API روشنه!",
"version": "1.0.0",
"docs": "/docs",
}

@app.get("/health")
async def health_check():
    return {
"status": "healthy",
"app": "سینماگرام",
"database": "PostgreSQL",
}
