@echo off
set "CURRENT_DIR=%~dp0"
for %%i in ("%CURRENT_DIR%..") do set "PARENT_DIR=%%~fi"
set PYTHONPATH=%PARENT_DIR%