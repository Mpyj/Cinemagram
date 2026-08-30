def test_add_to_watchlist(client, test_user, test_content):
    # لاگین
    login_response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "password123",
    })
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    response = client.post(f"/api/v1/watchlist/{test_content.id}", headers=headers)
    assert response.status_code == 201

def test_get_watchlist(client, test_user, test_content):
    login_response = client.post("/api/v1/auth/login", json={
        "email": "test@example.com",
        "password": "password123",
    })
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # اضافه کن
    client.post(f"/api/v1/watchlist/{test_content.id}", headers=headers)
    
    # بگیر
    response = client.get("/api/v1/watchlist", headers=headers)
    assert response.status_code == 200