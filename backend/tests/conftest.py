import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app
from app.models import User, Content, Genre, ContentType, ContentStatus, UserRole
from app.core.security import hash_password

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db_session():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()

@pytest.fixture
def test_user(db_session):
    user = User(
        username="testuser",
        email="test@example.com",
        hashed_password=hash_password("password123"),
        role=UserRole.USER,
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def test_owner(db_session):
    user = User(
        username="owner",
        email="owner@example.com",
        hashed_password=hash_password("password123"),
        role=UserRole.OWNER,
        is_active=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user

@pytest.fixture
def test_genre(db_session):
    genre = Genre(name="اکشن", slug="action")
    db_session.add(genre)
    db_session.commit()
    db_session.refresh(genre)
    return genre

@pytest.fixture
def test_content(db_session, test_genre):
    content = Content(
        title="فیلم تست",
        slug="test-movie",
        description="توضیحات تست",
        type=ContentType.MOVIE,
        status=ContentStatus.PUBLISHED,
        release_year=2024,
        rating=8.5,
    )
    content.genres.append(test_genre)
    db_session.add(content)
    db_session.commit()
    db_session.refresh(content)
    return content