# -*- coding: utf-8 -*-

from backend.app import api, app
from flask_restx import fields, Resource, Blueprint
from flask import request, jsonify
from backend.models.user import User
from backend.exts import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token

## use Blueprint
user_bp = Blueprint("user_bp", __name__)
app.register_blueprint(user_bp, url_prefix="")

signup_model = api.model(
    "SignUp",
    {
        "username": fields.String(),
        "email": fields.String(),
        "password": fields.String(),
    }
)

login_model = api.model(
    "Login",
    {
        "username": fields.String(),
        "password": fields.String(),
    }
)


@user_bp.route("/signup")
class SignUp(Resource):
    @api.expect(signup_model)
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


@user_bp.route("/login")
class Login(Resource):
    @api.expect(login_model)
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