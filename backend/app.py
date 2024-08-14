# -*- coding: utf-8 -*-

from .src import create_app

app = create_app("dev")


if __name__ == "__main__":
    app.run()
