# 🚖 Casby

A full-stack ride-hailing platform inspired by Uber, built with React, Node.js, Express, MongoDB, and Socket.io. Casby enables users to book rides, captains (drivers) to accept rides, and provides real-time location tracking and ride management.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 About the Project

**Casby** is a modern, scalable ride-hailing application. It allows users to register, log in, search for rides, and track their journey in real-time. Captains (drivers) can register, log in, receive ride requests, and update their location live. The platform uses WebSockets for real-time communication and Google Maps for geolocation and suggestions.

---

## 🚀 Features

- User and Captain registration & authentication
- Secure JWT-based login/logout with token blacklisting
- Real-time ride requests and notifications via Socket.io
- Live location tracking for both users and captains
- Google Maps integration for address suggestions and route display
- Ride fare calculation based on distance
- Responsive, modern UI with Tailwind CSS
- Modular, scalable backend with Express and MongoDB

---

## 🛠 Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Tailwind CSS
- Axios
- @react-google-maps/api
- Socket.io-client
- React Icons, Lucide React

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.io
- JWT (jsonwebtoken)
- bcrypt
- express-validator
- dotenv

---

## 🖼️ Screenshots

<img src="./media/media (1).png" width="200" />
<img src="./media/media (2).png" width="200" />
<img src="./media/media (3).png" width="200" />
<img src="./media/media (4).png" width="200" />
<img src="./media/media (5).png" width="200" />
<img src="./media/media (6).png" width="200" />


---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)
- Google Maps API Key

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/casby.git
cd casby
```

#### 2. Setup Backend

```bash 
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```
#### 3. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your backend base URL and Google Maps API key
npm run dev
```
---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```

### Frontend (`frontend/.env`)
```
VITE_BASE_URL=http://localhost:3000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

```

---

## 📡 API Endpoints

### 🧑‍💼 User
- `POST   /api/user/register` — Register a new user  
- `POST   /api/user/login` — User login  
- `GET    /api/user/profile` — Get user profile _(auth required)_
- `GET    /api/user/logout` — Logout user _(auth required)_

### 🧑‍✈️ Captain
- `POST   /api/captain/register` — Register a new captain  
- `POST   /api/captain/login` — Captain login  
- `GET    /api/captain/profile` — Get captain profile _(auth required)_  
- `GET    /api/captain/logout` — Logout captain _(auth required)_

### 🗺 Maps
- `GET    /api/maps/get-suggestions?input=...` — Get address suggestions _(auth required)_  
- `GET    /api/maps/get-coordinates?address=...` — Get coordinates for an address _(auth required)_  
- `GET    /api/maps/get-distance-time?origin=...&destination=...` — Get distance and time _(auth required)_

### 🚘 Ride
- `POST   /api/ride/create` — Create a new ride _(user auth required)_  
- `GET    /api/ride/get-fare?pickup=...&destination=...` — Get fare estimate _(user auth required)_  
- `POST   /api/ride/confirm` — Captain confirms a ride _(captain auth required)_  
- `GET    /api/ride/start-ride?rideId=...&otp=...` — Start ride with OTP _(captain auth required)_  
- `POST   /api/ride/end-ride` — End ride _(captain auth required)_

---

## 🗂 Folder Structure

```

casby/
│
├── backend/
│   ├── [app.js]
│   ├── [server.js]
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── [socket.js]
│   └── [README.md]
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── [App.jsx]
│   │   ├── [main.jsx]
│   │   └── [index.css]
│   ├── public/
│   ├── [package.json]
│   ├── [vite.config.js]
│   └── [README.md]
│
└── [README.md]

````

---

## 🚀 Deployment

### Backend
 Deploy to services like Heroku, Render, or DigitalOcean. Set environment variables for production.

### Frontend
 Deploy to Vercel, Netlify, or any static hosting. Set the production backend URL and Google Maps API key in the environment variables.

---

## 🤝 Contributing

Contributions are welcome!  
Please open issues or submit pull requests for improvements and bug fixes.

Steps to contribute:
```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature

# 3. Commit your changes
git commit -am 'Add new feature'

# 4. Push to the branch
git push origin feature/your-feature

# 5. Open a pull request
````

---

## 📝 License

This project is licensed under the [MIT License]

---

Made with ❤️ for urban mobility.

```

