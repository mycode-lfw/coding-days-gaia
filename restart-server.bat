@echo off
echo Cerco il server sulla porta 3001...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
    echo Fermo il server (PID %%a)...
    taskkill /PID %%a /F >nul 2>&1
)

echo Avvio il server...
cd /d "%~dp0agent"
start "LABFORWEB Agent Server" cmd /k "npm start"

echo.
echo Server avviato! Puoi chiudere questa finestra.
timeout /t 3 >nul
