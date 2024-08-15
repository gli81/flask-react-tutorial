# -*- coding: utf-8 -*-

import pytest
from ..src import create_app
from ..src import db

@pytest.fixture()
def app():
    app = create_app("test")
    with app.app_context():
        # db.init_app(self.app)
        db.create_all()
    yield app
    with app.app_context():
        db.session.remove()
        db.drop_all()

@pytest.fixture()
def client(app):
    return app.test_client()

def test_hello(client):
    resp = client.get("/hello")
    assert resp.json.get("msg") == "hello"

def test_signup(client):
    resp = client.post(
        "/signup",
        json={
            "username": "aa",
            "email": "aa@aa.com",
            "password": "pca", 
        }
    )
    assert resp.status_code == 201
