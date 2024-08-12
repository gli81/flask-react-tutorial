# Flask React App
## Flask Backend
### Flask config
- `SQLALCHEMY_TRACK_MODIFICATIONS`
- `SQLALCHEMY_ECHO`
### `python_decouple`: to read `.env` file, I will switch to dotenv
- with `python-dotenv`, `load_env()` first, then get attributes with `os.environ["<attribute>"]`
### `flask_restx` and `Api`, `Resource`
- `Api` relationship to `app`: create Api instance with `Api(app)`, attaching it to the Flask app, an Api instance enables RESTful routing with `@api.route()`
- `Resource`: create subclasses of `Resource`, such a subclass can be routed to a url, such a subclass can have `get()`, `post()`, `put()`, and `delete()` methods, each mapped to a type of HTTP request
- `api.model`: create JSON encoder with `api.model("<ORM>", {"<field1>": fields.<field1_type>, "<field2>": fields.<field2_type>})`
  - can set default value for field to replace `None`
- `@api.marshal_with(<api.model>)` tell a method to marshal the return value to JSON with `api.model` just defined; same as `return marshal(<object>, <model>)`, can add response code along with the explicit way, `@api.marshal_list_with(<api.model>)` to marshal each element of the list returned
- `@api.expect(<api.model>)` show example payload in docs
### `os.path.realpath(__file__)`
- `os.path.realpath()` Get path of the linked file of a symbolic link
- `__file__` Get current script's path
### `flask_sqlalchemy`
- Best way `Flask` interact with DB: `SQLAlchemy` works with MySQL, POSTGRES, and MariaDB, and most people work with `SQLAlchemy`
- `SQLAlchemy`: [See here](./SQLAlchemy.md)
- Steps
- Data models: follow SQLAlchemy documentation
- Data manipulation: follow SQLAlchemy documentation
  - for query, the `<Model>.query` interface introduced in the tutorial is legacy, `get_or_404()` is still valid, but it is from `db` now, so do `db.get_or_404(<Model>, id)` instead of `<Model>.query.get_or_404(id)`. To get all, do `db.session.execute(db.select(<Model>)).scalars().all()`, which I think is more complicated than `<Model>.query.all()`
### `@app.shell_context_processor`: define a function that returns a dictionary under this decorator. Key of this dictionary are the variable names that will be added to the shell context, and the values are the corresponding objects or functions. They can be used in flask shell.
### `export FLASK_APP=main.py` OR `set FLASK_APP=main.py`: let flask know that flask commands are associated with the `main.py` file
### `flask` shell commands
- `flask shell`: launches an interactive Python shell with all flask application context loaded, can do SQLAlchemy queries here
- `flask run`: starts a development server
- `flask routes`: list all the routes defined in the app
- `flask db`: manages database migration using flask-migrate
- `flask test`: runs unit tests for app
### JWT: gives token for access and refresh
  - `flask_jwt_extended` package
    - `JWT_Manager` to attach to app
    - `create_access_token()` to create an access token, `create_refresh_token()` to create a refresh token
    - `@require_jwt()` to make a route require token for access
## React Frontend
