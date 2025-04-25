```md
# 🧠 BrainPin

**BrainPin** is a simple web app to save and organize all your favorite things — articles, YouTube videos, songs, images, or any link you want to revisit later. Think of it as your personal pinboard on the web.

> 🚧 The project is still under development — refining and improving UX.

---

## 🔗 Live Preview

Frontend hosted on **Vercel**  
🔗 [BrainPin site](https://brainpin.vercel.app) 

Backend hosted on **Render**

---

## 🛠️ Tech Stack

### Frontend
- **React + Vite** (Client)
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Framer Motion**
- **Lucide React**
- **Zustand** (State management)
- **Sonner** (Toast notifications)
- **Radix UI** components
- **axios** for HTTP requests
- **React Intersection Observer**
- **next-themes** for dark/light mode
- **tw-animate-css** for animations
- **Tailwind Merge** & **clsx** for class utilities

Hosted on: **Vercel**

### Backend
- **Node.js + Express**
- **TypeScript**
- **MongoDB (via Mongoose)**
- **Zod** for schema validation
- **bcryptjs** for password hashing
- **jsonwebtoken** for auth
- **dotenv** for environment variables
- **CORS**

Hosted on: **Render**

---

## 📂 Project Structure

```
brainpin/
├── client/      # React frontend
└── server/      # Express backend
```

---

## 🚀 Setup Instructions

### Clone the repo
```bash
git clone https://github.com/Virenishere/Brainpin.git
cd brainpin
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

Make sure you set your environment variables for MongoDB and JWT in `.env`.

---

## 📌 Features (so far)
- Save posts: Articles, YouTube videos, Songs, Images, and custom links
- Organize them visually
- Responsive & smooth animations
- User authentication (JWT-based)
- Dark/Light mode

---

## 📧 Contact

If you'd like to connect or give feedback:  
**Virender Prasad** – [LinkedIn](https://www.linkedin.com/in/virenderprasad) *(update link)*

---

## 📝 License

This project is licensed under the MIT License.
