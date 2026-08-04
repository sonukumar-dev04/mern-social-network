# Pronet 🌐

A full-stack social networking platform with real-time chat, friend requests, and story uploads.

🔗 **Live:** [mern-social-network.vercel.app](https://mern-social-network.vercel.app/)

## Features
- User profiles with bio, skills, education, work experience
- Post creation with likes and comments
- 24-hour story uploads with view tracking
- Real-time one-on-one chat via Socket.io
- Friend request system (search, send, accept)
- Live notifications for likes, comments, and requests
- Secure JWT authentication with bcrypt password hashing

## Tech Stack
**Frontend:** React.js, Redux Toolkit
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Real-time:** Socket.io
**Auth:** JWT, bcrypt
**Media Storage:** Cloudinary
**Deployment:** Frontend on Vercel, Backend on Render

## Folder Structure

├── Frontend/ # React app
├── Backend/ # Express API + Socket.io server


## Getting Started
```bash
git clone https://github.com/sonukumar-dev04/mern-social-network.git
cd Frontend
npm install
npm run dev
```

Set up your `.env` with MongoDB URI, JWT secret, and Cloudinary credentials.
