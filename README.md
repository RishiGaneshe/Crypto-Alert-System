# 🚀 Cryptocurrency Market API – Real-Time Data, Caching & Alerts  

A **high-performance cryptocurrency API** that provides **real-time market data**, caches responses using **Redis**, and allows users to set **price alerts** with instant email notifications via **SendGrid**. The system also includes a **WebSocket** connection for continuous updates, ensuring seamless tracking.  

---

## 📌 Features  

✅ **Real-time Cryptocurrency Price Fetching**  
✅ **Optimized Performance with Redis Caching**  
✅ **User-Defined Price Alerts via Email Notifications**  
✅ **WebSocket Integration for Live Updates**  
✅ **Secure Authentication with JWT**  
✅ **MongoDB for Storing User Data & Alerts**  
✅ **Asynchronous Email Dispatch for High Throughput**  

---

## 🛠️ Tech Stack  

- **Node.js** – Backend API  
- **MongoDB** – Database for user & alert storage  
- **Redis** – In-memory caching for optimized API responses  
- **SendGrid** – Email notification service  
- **WebSockets** – Real-time data streaming  
- **JWT** – Secure authentication & authorization  
- **Axios** – External API requests  

---

## 📌 System Overview  

The API fetches **real-time cryptocurrency prices** from an **external market data provider**.  
By implementing **Redis caching**, the system optimizes response time and reduces API call overhead.  

Users can set **custom price alerts**, and when a specified price is reached, an **email notification** is sent via **SendGrid**.  

Additionally, a **WebSocket connection** enables users to receive continuous price updates **without needing to refresh**.  

---

## 🔧 System Architecture  

![Cryptocurrency API Architecture](https://your-image-link-here.com)  

---

## 🚀 Workflow  

1️⃣ **User requests crypto price data** → Data is fetched & cached in Redis  
2️⃣ **User sets a price alert** → Alert is stored in MongoDB  
3️⃣ **WebSocket updates** the frontend in real-time  
4️⃣ **If price matches the alert, an email notification is sent**  

---

## 🔐 Security & Performance  

✔ **JWT-based authentication** for access control  
✔ **Rate limiting** to prevent excessive API requests  
✔ **Redis caching** for enhanced performance  
✔ **Asynchronous email processing** for high-speed notifications  
✔ **Error handling & logging** for system reliability  

---

## 📌 Use Case Scenarios  

🔹 **Crypto Traders** – Get notified when prices hit specific thresholds  
🔹 **Investors** – Track market trends with real-time updates  
🔹 **Developers** – Integrate WebSocket-based live pricing into applications  

---



---
