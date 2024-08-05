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
    - pass dictionaries to `execute()` as parameters to the SQL expression
    - pass a list of dictionaries to `execute()` as multiple parameters to the SQL expression
  - `Result` object
    - type of return value of an execution 
    - `for row in result:` `Row` object: act like named tuples
    - `result.all()`
    - transform to `MappingResult` object with `result.mappings()`
  - `Session` object
    - counterpart of `Connection` for ORM usage (`Connection` is for Core usage)
      - ??? what is the difference between Core usage and ORM usage ???
  - `MetaData` object: used to store tables
  - `Table` object
  - `Column` object
    - `nullable`, `primary_key`, `ForeignKey()`
  - ORM mapped class
    - a `Base` class inherits `DeclaritiveBase` class, every other table in the metadata inherits `Base`
    - type annotation can be used to indicate SQL data type
    - `mapped_column()`, `relationship()`
    - [other styles of ORM mapped class](https://docs.sqlalchemy.org/en/20/orm/mapping_styles.html#orm-mapping-styles)
    - 

### `@app.shell_context_processor`?

### `export FLASK_APP=main.py` OR `set FLASK_APP=main.py`

- What features it provide?

### `flask shell` command

## React Frontend
