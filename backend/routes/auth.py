# -*- coding: utf-8 -*-

from flask_restx import fields, Resource, Namespace
from flask import request, jsonify
from backend.models.user import User
from backend.exts import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token

## use Namespace
auth_ns = Namespace("auth", description="ns for auth")

signup_model = auth_ns.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username": fields.String(),
        "password": fields.String(),
    }
)


@auth_ns.route("/signup")
class SignUp(Resource):
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        username = data.get("username")
        user_exist: "bool" = db.session.execute(
            db.select(User).filter_by(username=username)
        ).scalars().first() != None
        if user_exist:
            return jsonify(
                {
                    "message": f"User {username} already exists"
                }
            )
        new_user = User(
            username = username,
            email = data.get("email"),
            password = generate_password_hash(data.get("password")),
        )

        new_user.save()
        return jsonify(
            {
                "message": "User created successful"
            }
        )


@auth_ns.route("/login")
class Login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        usrnm = data.get("username")
        pwd = data.get("password")

        db_usr = db.session.execute(
            db.select(User).filter_by(username=usrnm)
        ).scalars().first()
        if db_usr:
            if check_password_hash(db_usr.password, pwd):
                access_token = create_access_token(
                    identity=db_usr.username
                )
                refresh_token = create_refresh_token(
                    identity=db_usr.username
                )
                return jsonify(
                    {
                        "message": "Login successful",
                        "access_token": access_token,
                        "refresh_token": refresh_token
                    }
                )
        else:
            return jsonify(
                {"message": "Invalid username"}
            )