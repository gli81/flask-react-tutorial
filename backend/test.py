# -*- coding: utf-8 -*-

import unittest
from . import create_app
from .exts import db

class Test(unittest.TestCase):
    def setUp(self):
        self.app = create_app("test")
        self.client = self.app.test_client(self)
        with self.app.app_context():
            # db.init_app(self.app)
            db.create_all()
    
    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()
    
    def test_hello(self):
        resp = self.client.get("/hello").json
        self.assertEqual(resp, {"msg": "hello"})     

    def test_signup(self):
        resp = self.client.post("/signup",
            json={
                "username": "aa",
                "email": "aa@aa.com",
                "password": "abc",
            }
        )
        status_code = resp.status_code
        self.assertEqual(status_code, 201)
    
    def test_login(self):
        self.client.post("/signup",
            json={
                "username": "aa",
                "email": "aa@aa.com",
                "password": "abc",
            }
        )
        resp = self.client.post(
            "/login",
            json={
                "username": "aa",
                "password": "abc",
            }
        )
        status = resp.status_code
        self.assertEqual(status, 200)
        self.assertEqual(resp.json["msg"], "Login successful")
    
    def test_get_all_recipes(self):
        resp = self.client.get("/recipes")
        status = resp.status_code
        self.assertEqual(status, 200)

    def test_get_one_recipe(self):
        pass

    def test_create_recipe(self):
        pass

    def test_update_recipe(self):
        pass

    def test_delete_recipe(self):
        pass


if __name__ == "__main__":
    unittest.main()