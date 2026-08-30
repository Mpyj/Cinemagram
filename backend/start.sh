#!/bin/bash

set -e

echo "======================================"
echo "1. Creating database tables..."
echo "======================================"

python -c "import app.main"

echo "Database tables created successfully."


echo "======================================"
echo "2. Creating Owner..."
echo "======================================"

python make_owner.py


echo "======================================"
echo "3. Importing Movies..."
echo "======================================"

python import_from_tmdb.py movies_list.txt --list


echo "======================================"
echo "4. Importing Series..."
echo "======================================"

python import_from_tmdb.py series_list.txt --list


echo "======================================"
echo "5. Importing Anime..."
echo "======================================"

python import_anime.py anime_list.txt --list


echo "======================================"
echo "6. Starting Cinemagram API..."
echo "======================================"

exec uvicorn app.main:app --host 0.0.0.0 --port $PORT