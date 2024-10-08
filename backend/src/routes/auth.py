# -*- coding: utf-8 -*-

from flask_restx import fields, Resource, Namespace
from flask import request, jsonify, make_response
from ..models.user import User
from .. import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)

## use Namespace
auth_ns = Namespace(
    "Authentication",
    description="Namespace for authentication",
    path='/'
)

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
        email = data.get("email")
        user_exist: "bool" = db.session.execute(
            db.select(User).filter_by(username=username)
        ).scalars().first() != None
        if user_exist:
            return jsonify(
                {
                    "msg": f"User {username} already exists"
                }
            )
        email_used: "bool" = db.session.execute(
            db.select(User).filter_by(email=email)
        ).scalars().first() != None
        if email_used:
            return jsonify(
                {
                    "msg": f"Email used"
                }
            )
        new_user = User(
            username = username,
            email = email,
            password = generate_password_hash(data.get("password")),
        )

        new_user.save()
        return make_response(
            jsonify(
                {
                    "msg": "User created successful"
                }
            ),
            201
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
                        "msg": "Login successful",
                        "access_token": access_token,
                        "refresh_token": refresh_token
                    }
                )
            else:
                return jsonify(
                    {
                        "msg": "Invalid password"
                    }
                )
        else:
            return jsonify(
                {"msg": "Invalid username"}
            )


@auth_ns.route("/refresh")
class Refresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        user = get_jwt_identity()
        new_access_token = create_access_token(identity=user)
        return make_response(
            jsonify(
                {
                    "access_token": new_access_token
                }
            ),
            200
        )