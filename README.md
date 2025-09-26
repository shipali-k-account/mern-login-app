# MERN Agent Management App

A MERN stack application to manage agents, upload CSV/XLSX lists, and distribute tasks among agents.

---

## Features

- **Admin Login** with JWT authentication.
- **Agent Management**: Add and view agents (Name, Email, Mobile, Password).
- **Upload & Distribute Lists**: Upload CSV/XLS/XLSX tasks (`FirstName`, `Phone`, `Notes`) and distribute equally among 5 agents.
- **Dashboard**: View agents and assigned tasks.

---

## Tech Stack

- **Frontend:** React.js, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas or local)  
- **Authentication:** JWT  
- **File Upload:** Multer  

---

## Prerequisites

- Node.js (v16+ recommended)  
- npm  
- MongoDB Atlas account or local MongoDB running  

---

## Backend Setup & Run

1. Open terminal and navigate to the backend folder:

cd backend
Install dependencies:


npm install
## Create a .env file in the backend/ folder with the following:

PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>

## Start the backend server:

node server.js
The backend API will run at http://localhost:5000

## Frontend Setup & Run
Open a new terminal and navigate to the frontend folder:
cd frontend

## Install dependencies:

npm install
## Create a .env file in the frontend/ folder with:

REACT_APP_API_URL=http://localhost:5000

## Start the frontend:

npm start
Open your browser at http://localhost:3000

## Usage
Login using admin credentials.

Add new agents via the Add Agent form.

Upload CSV/XLS/XLSX files to distribute tasks automatically.

View agents and assigned tasks on the dashboard.

Logout when done.