# -*- coding: utf-8 -*-

from flask import Flask
from config import DevConfig
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restx import Api
# from routes.auth import user_bp

app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
migrate = Migrate(app, db)
JWTManager(app) ## register app with JWT
api = Api(app, doc="/docs")



if __name__ == "__main__":
    app.run()