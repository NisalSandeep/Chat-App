
<div align="center">

```
 ██████╗██╗  ██╗ █████╗ ████████╗███╗   ██╗ ██████╗ ██╗    ██╗
██╔════╝██║  ██║██╔══██╗╚══██╔══╝████╗  ██║██╔═══██╗██║    ██║
██║     ███████║███████║   ██║   ██╔██╗ ██║██║   ██║██║ █╗ ██║
██║     ██╔══██║██╔══██║   ██║   ██║╚██╗██║██║   ██║██║███╗██║
╚██████╗██║  ██║██║  ██║   ██║   ██║ ╚████║╚██████╔╝╚███╔███╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═══╝ ╚═════╝  ╚══╝╚══╝
```

**— A production-ready full-stack chat platform —**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## ◈ What Is This?

> A real-time, full-stack chat application I built from scratch — featuring custom JWT authentication, live messaging, image uploads, welcome emails, and a polished UI. No cookie-cutter boilerplates.

---

## ◈ Feature Highlights

| Category | Details |
|---|---|
| 🔐 **Auth** | Custom JWT-based login & signup — no third-party auth services |
| ⚡ **Real-time** | Instant messaging via Socket.io with online/offline presence |
| 🔔 **UX Sounds** | Notification & typing sounds with user toggle support |
| 📨 **Emails** | Welcome emails sent on signup via Resend |
| 🖼️ **Images** | Profile & chat image uploads powered by Cloudinary |
| 🚦 **Rate Limiting** | API protection with Arcjet |
| 🗄️ **Database** | MongoDB for persistent message and user storage |
| 🎨 **UI** | React + Tailwind CSS + DaisyUI — clean, responsive, and fast |
| 🧠 **State** | Zustand for lightweight global state management |
| 🚀 **Deploy** | Free-tier friendly — ready for Sevalla deployment |

---

## ◈ Tech Stack

```
Frontend  →  React · Tailwind CSS · DaisyUI · Zustand · Socket.io-client
Backend   →  Node.js · Express · Socket.io · JWT · Arcjet
Database  →  MongoDB (Mongoose)
Services  →  Cloudinary · Resend · Arcjet
Deploy    →  Sevalla
```

---

## ◈ Environment Setup

### `/backend/.env`

```bash
# ── Server ──────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── Database ─────────────────────────────────────
MONGO_URI=your_mongo_uri_here

# ── Auth ─────────────────────────────────────────
JWT_SECRET=your_jwt_secret

# ── Email (Resend) ────────────────────────────────
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

# ── Client ───────────────────────────────────────
CLIENT_URL=http://localhost:5173

# ── Cloudinary ───────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# ── Arcjet ───────────────────────────────────────
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## ◈ Running Locally

**1 — Clone the repo**
```bash
git clone https://github.com/NisalSandeep/Chat-App
cd chatnow
```

**2 — Start the backend**
```bash
cd backend
npm install
npm run dev
```

**3 — Start the frontend**
```bash
cd frontend
npm install
npm run dev
```

**4 — Open your browser**
```
http://localhost:5173
```

---

## ◈ Project Structure

```
chatnow/
├── backend/
│   ├── controllers/       # Route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routes
│   ├── middleware/        # Auth & rate-limit middleware
│   ├── lib/               # Socket.io, Cloudinary, Resend setup
│   └── server.js          # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Route-level views
    │   ├── store/         # Zustand state stores
    │   └── lib/           # API helpers & socket client
    └── public/
```

---

## ◈ What I Learned Building This

- Implementing **JWT auth from scratch** — access tokens, protected routes, and secure cookie handling
- Setting up **bidirectional real-time communication** with Socket.io rooms and events
- Managing **transactional emails** with Resend's API
- Integrating **Cloudinary** for scalable image upload and delivery
- Protecting APIs with **Arcjet rate limiting**
- Structuring a clean **monorepo** with separate frontend and backend

---

## ◈ Deployment

This app is optimized for deployment on **[Sevalla](https://sevalla.com)** using its free tier.

Steps:
1. Push your repo to GitHub
2. Connect Sevalla to your repo
3. Set environment variables in Sevalla dashboard
4. Deploy — done ✓

---

<div align="center">

Built with focus, curiosity, and a lot of `console.log()` debugging.

**— Made by [Your Name](https://github.com/your-username) —**

</div>
