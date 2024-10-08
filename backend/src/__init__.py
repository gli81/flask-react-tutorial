# -*- coding: utf-8 -*-

from flask import Flask
# from .exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_restx import Api
from .config import DevConfig, TestConfig, ProdConfig
import os
from flask_cors import CORS 
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

config_dict = {
    "dev": DevConfig,
    "test": TestConfig,
    "prod": ProdConfig,
}

def create_app(conf: "str"="dev"):
    """
    factory function to create app
    """
    if conf not in config_dict:
        conf = "dev"
    if conf in ["dev",]:
        os.environ['FLASK_DEBUG'] = "True"
    app = Flask(__name__)
    app.config.from_object(config_dict[conf])
    CORS(app)
    # print(app.config)
    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app) ## register app with JWT
    api = Api(app, doc="/docs")
    from .routes.auth import auth_ns
    api.add_namespace(auth_ns)
    from .routes.recipe import recipe_ns
    api.add_namespace(recipe_ns)
    @app.shell_context_processor
    def make_shell_context():
        from .models.recipe import Recipe
        from .models.user import User
        return {
            "db": db,
            "Recipe": Recipe,
            "User": User
        }
    return app
