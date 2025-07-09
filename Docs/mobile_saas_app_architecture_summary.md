
# 📱 Mobile SaaS App – Architecture & Tech Stack Summary

## ✅ Overall Vision
Build a mobile application for businesses to:
- Log transactions using **OCR from images**
- Maintain inventory and credit records
- Enable **daily summaries** and **WhatsApp-based notifications**
- Run as a **local-first**, secure, privacy-respecting system
- Market as a **SaaS platform** with multi-device and multi-tier support

---

## 🧱 Architecture Design Decisions

| Layer                    | Design Choice |
|-------------------------|----------------|
| **Mobile Platform**     | React Native (cross-platform) |
| **Data Model**          | Primary device = system of record; staff devices sync securely |
| **Backend**             | FastAPI (API) + Django (Admin) |
| **Database**            | Linode Managed PostgreSQL |
| **Deployment**          | Docker / Docker Compose |
| **Cloud Platform**      | Linode (primary) + GCP/Azure free tiers |
| **Data Sync Strategy**  | Local DB with encrypted sync |
| **Backup Strategy**     | Optional encrypted backups to Linode Object Storage |
| **Security**            | Local encryption (SQLCipher/MMKV), secure device pairing |

---

## 🛠️ Tech Stack Breakdown

### 📱 Mobile (React Native)
- **DB**: SQLite / WatermelonDB (encrypted)
- **OCR**: MLKit via `react-native-vision-camera`
- **Secure Storage**: `react-native-keychain` / MMKV
- **Background Tasks**: `react-native-background-fetch`
- **Notifications**: Twilio or WhatsApp Business API
- **Sync**: API-based or local P2P

### 🔧 Backend
- **API Layer**: FastAPI (async, RESTful)
- **Admin**: Django (for prototyping and management)
- **ORM**: Django ORM
- **DB**: Linode Managed PostgreSQL
- **Storage**: Linode Object Storage (S3-compatible)

### 📡 Infrastructure
- **Platform**: Linode (Docker Compose)
- **Free-tier Tools**: Cloud Run / Azure Functions (optional lightweight jobs)
- **Monitoring/Backup**: Uptime Kuma / CronJobs

---

## 🔮 Post-MVP Features
1. Multi-tier subscriptions (device/txn limits, backup retention)
2. WhatsApp customer notifications
3. Inventory system
4. GST-compliant billing and invoicing
