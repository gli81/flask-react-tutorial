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

- `SQLAlchemy`: [See here](./SQLAlchemy.md)
  
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
    - type annotation can be used to indicate SQL data type, 可以根据type annotation来自动推断一些trait比如nullable
    - `mapped_column()`, `relationship()`
      - `back_populates` parameter of `relationship()` link two tables, so that when update one table, the other will also be updated
      - ?????好像是说mapped_column如果是list类型 那就算创建时没有赋值也会是空list而不是None, 可以自动追踪list内element的变化 flush时可以自动解析顺序?????
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
    - __SKIP FROM `Subqueries and CTEs` SECTION__
  - `compile()`
  - `update()` function and `Update` instance: `update()` function produces an `Update` instance, which can be passed to `execute()` function to get `Result`
    - `.where()` method: specify which old values to change
    - `.values()` method: put int new values
    - `bindparam()`: when updating different old values with different new values, `.where(<Table>.c.<column> == bindparam("<name_for_old_value>")).values(<column> = bindparam("name_for_new_value"))`, when executing, pass a list of dictionaries like `{<name_for_old_value>: <old_value>, <name_for_new_value>: <new_value>}`
    - ?????correlated subquery?????
    - ?????`UPDATE ... FROM ...` clause?????
    - `.ordered_values()`: MySQL only parameter ordered updates, update multiple variables in an order, update one, then next one based on previous one, `.ordered_values((<Table>.c.<column1>, <value1>), (<Table>.c.<column2>, <Table>.c.<column1> + <value2>))`
  - `delete()` function and `Delete` instance: `delete()` function produces an `Delete` instance, which can be passed to `execute()` function to get `Result`
    - `.where()` method: specifies what rows to delete
    - ????? multiple table delete?????
  - `CursorResult.rowcount()`: `CursorResult` is subclass of `Result`, get affected rows from update and delete
    - `CursorResult` is the return type of `conn.execute()` for all operations for CORE use, and the return type of `session.execute()` for INSERT, UPDATE, and DELETE for ORM use.
  - ????? `.returning()` for DELETE and UPDATE ?????
  - ORM insert: create object of the `<class>`, then `session.add()`, then `session.flush()`, creating object => transient, `session.add()` => pending, `session.flush()` => persistent, communicate with a transaction. flush not usually necessary, because autoflush when commit
  - ORM update: select first, make changes to the result object, it will be recorded, when next time there is a flush next time, the change will be made to the database. Autoflush before each query.
  - ORM delete: select first, then `session.delete(<object>)`, will be deleted in transaction in next flush
  - bulk DML, using methods similar to CORE method: [link](https://docs.sqlalchemy.org/en/20/orm/queryguide/dml.html#orm-expression-update-delete)
  - rollback: removes all changes made to the local item in the transaction
  - `session.close()`: close a session, will rollback first, after closing a session, all objects created during the session is detached and will cause error if try to access
  - ?????Loading strategies?????
    - `Select.options()`

### `@app.shell_context_processor`?

### `export FLASK_APP=main.py` OR `set FLASK_APP=main.py`

- What features it provide?

### `flask shell` command

## React Frontend
