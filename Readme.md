STUDENT NAME:Naomi Zephania
UID: 24BDA70345

EXPT 6B: A beginner-friendly Express + MongoDB authentication API with:

        --user registration and login
        --JWT-based protected route (/users/me)
        --password hashing with Argon2
        --request logging (optional SolarWinds forwarding)
        --centralized error handling


1. Technologies Used
  --Node.js (ES modules)
  --Express 5
  --MongoDB + Mongoose
  --Argon2 (password hashing)
  --JSON Web Token (jsonwebtoken)
  --http-errors + http-status-codes
  --Axios (for optional SolarWinds log shipping)
  --pnpm + nodemon
2. Folder Structure
config/
  db.js
  solarwinds.js
controllers/
  auth.controller.js
middleware/
  auth.middleware.js
  error.middleware.js
  logger.middleware.js
models/
  user.model.js
routes/
  auth.routes.js
utils/
  jwt.js
index.js


3. Installation and Run
  >Install dependencies.
  >pnpm install
  >Create .env in the project root.
    PORT=3000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_super_secret_key
    JWT_EXPIRES_IN=1d
    SOLARWINDS_TOKEN=optional
  >Start development server.
    pnpm dev
  >For production mode.
    pnpm start

4. How the App Boots (index.js)
 >Startup flow:

   Load environment variables (dotenv.config()).
   Connect to MongoDB (connectDB()).
   Register middlewares (cors(), express.json(), loggerMiddleware).
   Mount auth routes at /users.
   Add health/base route /.
   Register errorMiddleware as the last middleware.
   Listen on PORT (default 3000).


5. API Contract
Base URL
http://localhost:3000

POST /users/register
Request:

{
  "fullName": "Naomi",
  "email": "naomi@example.com",
  "password": "Password@"
}
Success (201):

{
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "fullName": "Naomi",
    "email": "naomi@example.com",
    "createdAt": "..."
  }
}
POST /users/login
Request:

{
  "email": "naomi@example.com",
  "password": "Password@"
}
Success (200):

{
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "id": "...",
    "fullName": "Naomi",
    "email": "naomi@example.com"
  }
}
GET /users/me
Header:

Authorization: Bearer <jwt>
Success (200):

{
  "message": "User fetched successfully",
  "data": {
    "_id": "...",
    "fullName": "Naomi",
    "email": "naomi@example.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
