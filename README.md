# KTM Heritage Trails MVP

A full-stack application built for exploring and tracking visits to the sacred heritage sites of the Kathmandu Valley.

## Architecture
- **Database**: Aiven MySQL (Free Tier)
- **Backend**: Node.js + Express (Hosted on Render)
- **Frontend**: React + Vite + Tailwind CSS (Hosted on Vercel/Netlify)

## Local Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   DATABASE_URL=mysql://user:pass@host:port/dbname?ssl-mode=REQUIRED
   JWT_SECRET=your_secret
   WHATSAPP_NUMBER=977...
   ```
4. Run migrations and seed: `npm run seed`
5. Start server: `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
4. Start dev server: `npm run dev`

## Deployment Principles (Zero-Cost)

### Backend (Render)
1. Push `backend` folder to GitHub.
2. Create a new "Web Service" on Render.
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node src/server.js`
5. Add Environment Variables:
   - `DATABASE_URL`: Your Aiven Connection URI
   - `JWT_SECRET`: A random string
   - `WHATSAPP_NUMBER`: Format `97798...`
   - `FRONTEND_URL`: Your deployed frontend URL

### Frontend (Vercel/Netlify)
1. Push `frontend` folder to GitHub.
2. Connect to Vercel/Netlify.
3. Set **Build Command**: `npm run build`
4. Set **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your backend API URL (e.g., `https://ktm-heritage-api.onrender.com/api`)

## Security Features
- Parameterized SQL queries to prevent SQL injection.
- Password hashing with Bcrypt.
- JWT-based authentication.
- Helmet JS for secure HTTP headers.
- Rate limiting on API points.
- CORS protection with allowlist.
