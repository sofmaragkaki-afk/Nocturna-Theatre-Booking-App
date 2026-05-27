<p align="center">
  <img width="140" src="https://github.com/user-attachments/assets/eb384680-4853-42a0-afa2-9a4a3d3408b4" />
</p>

<h1 align="center">Nocturna</h1>

<p align="center">
Luxury Theatre Booking Mobile Application
</p>

<p align="center">
React Native • Node.js • MySQL • JWT Authentication
</p>

---

## About The Project

Nocturna is a modern luxury theatre booking application developed for the **CN6035 – Mobile & Distributed Systems** coursework.

The application allows users to:

- Browse theatre performances
- Select seats in real time
- Create secure accounts
- Manage reservations
- Cancel bookings
- View booking history

The system combines a **React Native frontend**, a **Node.js REST API backend** and a **MySQL relational database**.

---

## Application Preview

### Login & Register

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/0c380bd5-1569-4f3b-bf43-93b7ce6ace77" />
  <img width="250" src="https://github.com/user-attachments/assets/79ea3f67-d57a-4973-af89-8a1f51ad42f2" />
</p>

---

### Home Screen

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/f23fe6f0-040a-4506-90db-82581e324cf6" />
  <img width="250" src="https://github.com/user-attachments/assets/87509401-4648-466d-bb62-683873ca4fc9" />
</p>

---

### Seat Reservation System

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/2465a4f6-5ff6-466c-9d73-eea4389a28fe" />
  <img width="250" src="https://github.com/user-attachments/assets/bcd81695-cc7a-4d70-ad83-3868bb5bcfb6" />
</p>

---

### My Bookings

<p align="center">
  <img width="250" src="https://github.com/user-attachments/assets/560a3423-6fd2-4683-a7cc-c4810519c528" />
</p>

---

## Features

- JWT Authentication
- Theatre Reservation System
- Real-Time Seat Availability
- Mobile First UI
- Booking Management
- Reservation Cancellation
- REST API Integration
- MySQL Database Connectivity

---

## Tech Stack

### Frontend
- React Native
- Expo Router
- TypeScript

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs

### Database
- MySQL

### Testing
- Postman

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Shows

```http
GET /api/shows
GET /api/shows/:id/seats
```

### Bookings

```http
POST /api/bookings
GET /api/bookings/my
DELETE /api/bookings/:id
```

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npx expo start
```

---

## API Testing

The REST API was tested using Postman.

✔ Register User  
✔ Login User  
✔ Get Shows  
✔ Get Seats  
✔ Create Reservation  
✔ View Bookings  
✔ Cancel Reservation  

---

## Design

The application follows a cinematic theatre-inspired visual design with:

- Velvet red UI
- Gold accent colors
- Dark luxury atmosphere
- Modern card-based layouts

---

## Author

**Sofia Maragaki**  
Metropolitan College
