# -* - coding: utf-8 -*-

from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
load_dotenv(BASE_DIR+"/.env")


class Config:
    """
    regarding configs (mostly DEBUG) not properly loaded
    https://stackoverflow.com/questions/52451154/flask-app-not-using-config-file-settings-properly
    """
    SECRET_KEY = os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS = bool(os.environ["SQLALCHEMY_TRACK_MODIFICATIONS"])


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///" \
        + os.path.join(BASE_DIR, "dev.db")
    # DEBUG = True
    SQLALCHEMY_ECHO = True


class ProdConfig(Config):
    pass


class TestConfig(Config):
    pass
