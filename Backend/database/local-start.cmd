@echo off

:: Change to the directory where the script is located
cd %~dp0

:: Configure the oracle instant client env variable
set PATH=%PATH%;"C:\Users\aiden\Documents\CPSC_304\instantclient-basiclite-windows.x64-23.4.0.24.05\instantclient_23_4"

:: Start Node application
npm start

exit /b 0
