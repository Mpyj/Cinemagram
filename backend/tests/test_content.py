def test_get_content(client, test_content):
    response = client.get("/api/v1/content")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert data["total"] >= 1

def test_get_content_by_slug(client, test_content):
    response = client.get(f"/api/v1/content/slug/{test_content.slug}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "فیلم تست"

def test_get_content_by_slug_not_found(client):
    response = client.get("/api/v1/content/slug/nonexistent")
    assert response.status_code == 404

def test_filter_by_type(client, test_content):
    response = client.get("/api/v1/content?type=movie")
    assert response.status_code == 200
    data = response.json()
    for item in data["items"]:
        assert item["type"] == "movie"