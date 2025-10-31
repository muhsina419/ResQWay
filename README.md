# 🚨 ResQWay — Smart Healthcare & Emergency Response System  

**An AI-powered web platform to improve emergency response, hospital coordination, and resource management.**

---

## 🧠 Overview  

**ResQWay** connects citizens, ambulances, hospitals, blood banks, volunteers, and city control centers through a unified web dashboard.  
It uses **AI-based routing**, **real-time tracking**, and **hospital auto-allocation** to reduce emergency response time and save lives.  

---

## 💡 Problem Statement  

Emergency response systems often face:  
- 🚑 Delays in ambulance arrivals due to poor routing and traffic  
- 🏥 No real-time visibility of hospital capacity  
- 💉 Inefficient organ/blood transport coordination  
- 🧍 Lack of trained volunteer mobilization  

These inefficiencies cause preventable deaths and resource wastage.  

---

## 💡 Solution  

ResQWay provides an integrated solution that:  
- Optimizes ambulance and organ transport routes with AI and live traffic data.  
- Auto-allocates hospitals based on availability, capacity, and specialization.  
- Displays a real-time analytics dashboard with heatmaps and insights.  
- Tracks blood stock and manages donor matching.  
- Mobilizes verified volunteers during emergencies.  

---

## ⚙️ Key Features  

| # | Feature | Description |
|---|----------|-------------|
| 1 | 🚗 **AI-Based Route Optimization** | Dynamic routing using live traffic data and congestion detection |
| 2 | 🏥 **Hospital Auto-Allocation** | Automatically selects hospitals with available ICU/ER and specialists |
| 3 | 🚦 **Emergency Broadcast to Traffic** | Alerts nearby vehicles and requests signal priority for ambulances |
| 4 | 🧾 **Emergency QR for Patients** | QR code storing vital patient info like blood group and conditions |
| 5 | 📊 **Multi-Role Dashboard** | Role-based access for Public, Ambulance, Hospital, Admin, Volunteers |
| 6 | 🌍 **Central Command & Analytics** | Heatmaps, real-time tracking, and response-time analytics |
| 7 | 🫀 **Organ Transport Tracking** | GPS + IoT sensor monitoring for organ containers |
| 8 | 💉 **Blood Donation & Stock System** | Real-time blood availability and smart donor matching |
| 9 | 🤝 **Volunteer Network** | Verified volunteers receive nearby emergency alerts |
| 10 | 🚨 **Disaster Mode** | Mass casualty support with triage and multi-hospital coordination |

---

## 👥 Target Users  

- General Public  
- Ambulance Drivers & Paramedics  
- Hospital Staff (ER/ICU)  
- Blood Bank Administrators  
- Verified Volunteers  
- City Control Center Admins  

---

## 🧩 System Architecture  

**Frontend:** React.js (Progressive Web App) with TailwindCSS  
**Backend:** Django REST Framework (Python) + Django Channels  
**Database:** SQLite  
**Routing & Maps:** Google Maps API / OpenStreetMap  
**Notifications:** Firebase Cloud Messaging + Twilio  
**IoT Integration:** MQTT broker for organ telemetry and ambulance tracking  

**Architecture Flow:**  
`Frontend ↔ Django API ↔ Core Modules (Routing, HospitalManager, BloodBank, Volunteers, Analytics) ↔ SQLite + Redis`

---

## 🔒 Security & Compliance  

- HTTPS/TLS-secured communication  
- Role-based access control (RBAC)  
- Field-level encryption for sensitive data  
- Audit logs for medical record access  
- HIPAA-aware patient consent flow  

---

## 🖥️ Web Application Pages  

- 🏠 **Landing Page**  
- 🔐 **Login / Signup** (for all user roles)  
- 🚑 **Public Dashboard:** Request ambulance, donate blood, view hospitals  
- 🩺 **Ambulance Panel:** Navigation, patient QR scan, live incident details  
- 🏥 **Hospital Panel:** Incoming patients, bed & blood inventory  
- 🧭 **Admin Panel:** Map of incidents, analytics, and volunteer management  
- 💪 **Volunteer Panel:** Nearby help requests, history, and badges  

---

## 🛠️ Tech Stack  

**Frontend**  
- React.js  
- TailwindCSS  
- Leaflet.js / Google Maps API  
- Recharts / Chart.js  
- Firebase Cloud Messaging  

**Backend**  
- Django REST Framework (Python)  
- Django Channels (WebSockets)  
- Celery + Redis (for async tasks)  
- AI algorithms for routing and hospital allocation  

**Database**  
- SQLite (development & testing)  
- Redis (for caching & real-time state)  

**Notifications & Communication**  
- Firebase (Push Notifications)  
- Twilio (SMS/Voice Alerts)  

**IoT Integration**  
- MQTT for organ temperature and ambulance telemetry  

---

## ⚡ Setup Instructions  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/<your-username>/ResQWay.git
cd ResQWay

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
cd frontend
npm install
npm run dev
| Name                | Role               |
| ------------------- | ------------------ |
| Abhinandana T U     | Backend Developer  |
| Muhsina Beegum      | Frontend Developer |
| Akshaya M K         | UI/UX Designer     |


