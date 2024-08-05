# Flask React App

## Flask Backend

### Flask config

- `SQLALCHEMY_TRACK_MODIFICATIONS`

- `SQLALCHEMY_ECHO`

### `python_decouple`

### `flask_restx` and `Api`, `Resources`

- `Api` relationship to `app`

### `os.path.realpath(__file__)`

- `os.path.realpath()` Get path of the linked file of a symbolic link

- `__file__` Get current script's path

### `flask_sqlalchemy`

- Best way `Flask` interact with DB 

- Steps

- Data models

- `SQLAlchemy`: have a separate note later
  
  - `Engine` object
  - `Connection` object
    - execute, commit
  - `Result` object
    - type of return value of an execution 
    - `for row in result:` `Row` object: act like named tuples
    - `result.all()`
    - transform to `MappingResult` object with `result.mappings()`
  - `Session` object

### `@app.shell_context_processor`?

### `export FLASK_APP=main.py` OR `set FLASK_APP=main.py`

- What features it provide?

### `flask shell` command

## React Frontend
