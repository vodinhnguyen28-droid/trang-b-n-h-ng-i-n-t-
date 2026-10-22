@echo off
chcp 65001 >nul
title NGUYEN MART - FULLSTACK E-COMMERCE
echo =======================================================
echo      ĐANG KHỞI CHẠY HỆ THỐNG NGUYEN MART (SHOPEE CLONE)
echo =======================================================
echo.
echo [1/3] Khởi động Backend REST API Server (Cổng 5000)...
start "Nguyen Mart - Backend Server (Port 5000)" cmd /k "node server.js"

echo [2/3] Khởi động Frontend Website (Cổng 3000)...
start "Nguyen Mart - Frontend Vite (Port 3000)" cmd /k "npm.cmd run dev -- --port 3000"

echo [3/3] Đang mở trình duyệt vào website...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo =======================================================
echo  ✅ HỆ THỐNG ĐÃ KHỞI CHẠY THÀNH CÔNG!
echo  👉 Website người mua: http://localhost:3000
echo  👉 Backend REST API:  http://localhost:5000
echo =======================================================
echo Bạn có thể thu nhỏ cửa sổ này lại.
pause
