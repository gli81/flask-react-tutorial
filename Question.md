# Flask React App
## Flask Backend
### Flask config
- `SQLALCHEMY_TRACK_MODIFICATIONS`
- `SQLALCHEMY_ECHO`
- `DEBUG`: setting this config in code (i.e. `config.py`) is not working
  - https://stackoverflow.com/questions/52451154/flask-app-not-using-config-file-settings-properly
  - https://www.sitepoint.com/community/t/flask-python-config-py-not-working/402482
  - solved this by setting environment variable if development mode when creating app
### `python_decouple`: to read `.env` file, I will switch to dotenv
- with `python-dotenv`, `load_env()` first, then get attributes with `os.environ["<attribute>"]`
### `flask_restx` and `Api`, `Resource`
- `Api` relationship to `app`: create Api instance with `Api(app)`, attaching it to the Flask app, an Api instance enables RESTful routing with `@api.route()`
- `Resource`: create subclasses of `Resource`, such a subclass can be routed to a url, such a subclass can have `get()`, `post()`, `put()`, and `delete()` methods, each mapped to a type of HTTP request
- `api.model`: create JSON encoder with `api.model("<ORM>", {"<field1>": fields.<field1_type>, "<field2>": fields.<field2_type>})`
  - can set default value for field to replace `None`
- `@api.marshal_with(<api.model>)` tell a method to marshal the return value to JSON with `api.model` just defined; same as `return marshal(<object>, <model>)`, can add response code along with the explicit way, `@api.marshal_list_with(<api.model>)` to marshal each element of the list returned
- `@api.expect(<api.model>)` show example payload in docs
- `Namespace(<name>, <description>, <path>)`, replaces api in separate router files, then in main file, do `api.add_namespace(<namespace>, path="")`
  - To put route under root route, pass `'/'` to `path` parameter of `Namespace()`
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
  - if run from project folder, flask looks for `create_app()` function, and treat the entire folder as a package
  - if run from parent folder, set `--app` flag, flask goes into the designated package and looks for `create_app()` and run
- `flask routes`: list all the routes defined in the app
- `flask db`: manages database migration using flask-migrate
### JWT: gives token for access and refresh
  - `flask_jwt_extended` package
    - `JWT_Manager` to attach to app
    - `create_access_token()` to create an access token, `create_refresh_token()` to create a refresh token
    - `@require_jwt()` to make a route require token for access
### unit test with `unittest`
### unit test with `pytest`
- most widely used unit test framework
- define functions that start with `test_`, test with `assert` statements
- fixtures `@pytest.fixture()`
  - 
### CORS
  - ?????what is CORS?????
  - import `CORS` from `flask_cors`, and register app with `CORS` by `CORS(app)`
## React Frontend
### main entry point
- `main.jsx` and `index.html`
### components
- function based: each function is a component, of course these functions return html tags
- `export default <component_name>`
- import in other files, and use `<component_name />`
- 要return多个component要用空<></>包起来因为只允许返回一个tag但可以有多个子tag
- js code wrapped with `{}`
- props: passed to components as parameters
  - pass key=value to a component `<component_name <key1>=<value1> />`
  - for value passed in, string literal all other type variables wrapped with `{}`
  - to retrive boolean, use ternary operator
  - PropTypes
    - check value passed in is expected type
    - `<component>.propTypes = {<key1>: PropTypes.<type1>,}`
    - only gives warning, won't crash program
  - `defaultProps`, a separate struct specifing default values for each field
- rendering list
  - `<variable>.map(<function>)` function to convert everything into `<li>{}</li>`
  - React expect each `<li></li>` to have different keys, can set them to one of the attributes
  - sort with `<variable>.sort()`
  - filter with `<variable>.filter()`
- onClick
  - have a function in there
    - if the function have parameters, it will be triggered without click, so do `() => <function>(<param1>)`
    - ?????event?????: basically an object detailing the click
    - `onDoubleClick` attribute of button
- onChange
  - for `<input>`, `<textarea>`, `<select>`, `<radio>`...
  - provide an event typically, detailing the change, have a function that handles the change with that event being parameter
### `UseState()` hook
- two return value, a variable and a setter of that variable, one parameter the initial value `const [<variable>, <setter>] = useState(<initial>);`
- call setter function multiple times with in one event handler, the last one will work, others won't
- use updater function when try to call the same setter function multiple times in one handler: pass an arrow function to setter function, by convention don't use the original variable name `setCount(c => c + 1);`
- best practice: also use updater function even only call setter function once
- if state is an object: use spread operator `{...<original_object>, <param>: <new_value>}`, set two same key will result in the latter one being effective, when use updater function, setting new value by `<original_object>.<param>=event.target.value` is not working
- if state is an array
  - use `id` attribute and `document.getElementById().value` to get new element, reset `document.getElementById().value` to empty then spread current state with spread operator, adding the new one
  - to remove, pass `key` attribute to handler, then remove with `filter()` function
### `UseEffect()` hook
- two parameters, one callback function that will be executed upon changes in dependency list, one dependency list
  - if no dependency list, run on every change on the component; empty dependency list, run only when the component loads; have something in the list, run when these components or values or states change
  - callback funtion can return a function, it will be run ?????when the component unmounted?????
### vite
- to start: `npm create vite@latest <app_name>`, install dependencies `npm i`
- to run development server: `npm run dev`
- set proxy
  - in `vite.config.js`
    ```js
    export default defineConfig({
      plugins: [react()],
      server: {
        proxy: {
          "/api": {
            target:"<backend_url>",
            changeOrigin: true,
            rewrite: (p) => p.replace(/^\/api/, '')
          }
        }
      }
    }) // takes every request start with /api, remove the api part and send to backend
    ```
