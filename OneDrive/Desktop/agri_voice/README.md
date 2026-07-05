# Krishi Mitra – Smart Agricultural Advisor

Krishi Mitra is a browser-based website that helps farmers ask questions, check weather, view crop market prices, and manage their profile in one place.

The project is built as a full-stack web application:
- React frontend for the website pages
- Node.js + Express backend for authentication and data APIs
- FastAPI AI service for simple keyword-based farming advice
- MongoDB for users, queries, crop prices, and weather cache

## Why this project exists

Farmers often need fast answers for daily decisions such as crop care, fertilizer use, weather, and market timing. This website is designed to provide practical guidance in a simple, easy-to-use browser interface.

## Project Structure

```text
AI-Farmer-Assistant/
├── frontend/
├── backend/
├── ai-service/
└── README.md
```

## Features

- Landing page with clear website navigation
- Farmer registration and login with JWT authentication
- Dashboard with weather, tips, market summary, and recent questions
- Ask AI page for farming advice
- Weather page with search and live backend data support
- Market prices page with crop search and live backend data support
- Farmer profile view and update page
- Query history on the dashboard
- Logout support
- Responsive website layout for browser use

## Technology Stack

### Frontend
- React.js with Vite
- React Router
- Axios
- CSS via inline styling and global base styles

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### AI Service
- Python
- FastAPI

## Website Flow

1. Visitor opens the landing page
2. User registers or logs in
3. User reaches the dashboard
4. User can ask AI, check weather, view market prices, or update profile
5. Dashboard shows recent AI questions

## API Endpoints

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/profile`
- `PUT /api/user/profile`

### AI
- `POST /api/ai/ask`
- `GET /api/ai/history`

### Market and Weather
- `GET /api/market`
- `GET /api/weather`

### FastAPI
- `POST /predict`

Example request:

```json
{
  "question": "My tomato leaves have yellow spots"
}
```

Example response:

```json
{
  "crop": "Tomato",
  "problem": "Possible fungal or nutrient issue",
  "solution": "Check for fungal infection, remove infected leaves, and use recommended treatment.",
  "tips": "Avoid overwatering and keep good air circulation around the plant."
}
```

## Setup

### 1. Backend

Create a `.env` file in `backend/` based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_farmer_assistant
JWT_SECRET=replace_with_a_strong_secret
AI_SERVICE_URL=http://localhost:8000/predict
```

Install dependencies:

```bash
cd backend
npm install
```

Run the backend:

```bash
npm run dev
```

### 2. Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

### 3. AI Service

Create a Python virtual environment if needed, then install dependencies:

```bash
cd ai-service
pip install -r requirements.txt
```

Run the FastAPI service:

```bash
uvicorn app.main:app --reload --port 8000
```

## Current Data Models

- Users
- Queries
- CropPrices
- WeatherCache

## Future Enhancements

- Real weather API integration
- Real agricultural market API integration
- NLP or LLM-based crop advisory
- Voice input and text-to-speech
- Better analytics and personalized recommendations

## Notes

- The AI service currently uses simple keyword matching.
- The website is designed to be beginner-friendly and easy to explain in interviews.
- The project is intentionally modular so future upgrades can be added without rewriting everything.

## Docker / Compose

You can run the full stack locally using Docker Compose (builds images for frontend, backend, ai-service and runs a MongoDB instance):

```bash
docker compose up --build
```

By default the frontend will be exposed on port `5173`, backend on `5000`, and ai-service on `8000`.

## CI

A GitHub Actions workflow is included to build the frontend and run a small AI service image-upload test. See `.github/workflows/ci.yml`.
