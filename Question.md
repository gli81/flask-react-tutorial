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

- Best way `Flask` interact with DB: `SQLAlchemy` works with MySQL, POSTGRES, and MariaDB, and most people work with `SQLAlchemy`

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
  - `insert()` function and `Insert` instance: `insert()` function produces an `Insert` instance, which can be passed to `execute()` function to get `Result`
    - `conn.execute(insert(<table>).values(<column1> = <value>, <column2> = <value>))`
    - `conn.execute(insert(<table>), [{"<column1>": <value>, <column2>: <value>}])`
    - `insert()`'s result is the last inserted primary key value
    - `.returning()` to specify what columns to return of the inserted rows
    - ?????`insert().from_select()` ==> `INSERT INTO <table> (<column1>, <column2>) SELECT <table2>.<column1>, <table2>.<column1> FROM <table2>`?????
  - `select()` function and `Select` instance: `select()` function produces an `Select` instance, which can be passed to `execute()` function to get `Result`
    - Core => `select(<Table_instance>)`, get named tuples in each row
      - To select certain columns
        - `select(<Table_instance>.c.<column1>, <Table_instance>.c.<column2>)`
        - `select(<Table_instance>.c["<column1>", "<column2>"])`
        - get named tuples in each row
    - ORM => `select(<ORM_class>)`, get instance of the class in each row
      - `scalars()` instead of `execute()`
      - To select certain columns
        - `select(<ORM_class>.<column1>, <ORM_class>.<column2>)`
        - get named tuples in each row
    - `label()`?????
    - `text()` & `literal_column()`: if want to select some constant value
    - `Select.where()` method:
      - takes a comparison statement
        - Core => `<Table_instance>.c.<column> == <value>`
        - ORM => 
      - multiple statements in `where()` is AND between them
      - `Select.where().where()` is AND between them
      - `and_(<statement1>, <statement2>)`
      - `or_(<statement1>, <statement2>)`
    - `Select.filter_by()` method
    - `Select.join_from(<Table1>, <Table2>)` method: FROM \<Table1\> JOIN \<Table2\>
      - additional equation parameter to set ON clause if ON clause can't be inferred or want to set explicitly, typically ON clause is inferred based on `ForeignKeyConstraint`
      - `isouter` parameter: if Ture => left join
      - `full` parameter: if Ture => full join
    - `Select.join()` method: specifies only for the JOIN clause
      - additional equation parameter to set ON clause if ON clause can't be inferred or want to set explicitly, typically ON clause is inferred based on `ForeignKeyConstraint`
      - `isouter` parameter: if Ture => left join
      - `full` parameter: if Ture => full join
    - `Select.select_from()` method: if don't want FROM clause to be inferred, or can't be inferred
    - `Select.order_by()` method: ORDER BY clause
      - `Select.order_by(<Table>.c.<column>)` => Core
      - `Select.order_by(<class>.<column>)` => ORM
      - `.asc()` for ASCENDING, `.desc()` for DESCENDING
    - GROUP BY
      - sqlalchemy's `func` package
        - create new functions by `<new_function> = func.<function>(<Table>.c.<column>)`, then apply function to column in `select()`
        - create new functions by `<new_function> = func.<function>(<class>.<column>)`, then apply function to column in `select()`
      - `group_by("<column_name || column_label>")`: don't forget the quotation marks, `order_by()` after `group_by()` also needs quotation marks?????
      - `desc()`, `asc()`
    - table alias
      - Core: `<variable> = <Table>.alias()`, set before constructing Select
      - ORM: `<variable> = aliased(<class>)`, set before constructing Select
  - `compile()`
  - __SKIP FROM `Subqueries and CTEs` SECTION__

### `@app.shell_context_processor`?

### `export FLASK_APP=main.py` OR `set FLASK_APP=main.py`

- What features it provide?

### `flask shell` command

## React Frontend
