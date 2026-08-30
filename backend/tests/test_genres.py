def test_get_genres(client, test_genre):
    response = client.get("/api/v1/genres")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert data[0]["name"] == "اکشن"

def test_create_genre(client, test_owner):
    # لاگین اول
    login_response = client.post("/api/v1/auth/login", json={
        "email": "owner@example.com",
        "password": "password123",
    })
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.post("/api/v1/genres", json={
        "name": "درام",
        "slug": "drama",
    }, headers=headers)
    assert response.status_code == 201