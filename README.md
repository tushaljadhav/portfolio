# Portfolio Deployment (Frontend + Backend)

This project is now split into two clear parts:

- `frontend/` -> Static website (deploy to Vercel)
- `backend/` -> Express API (deploy to Render)

## Project Structure

```text
portfolio/
  backend/
    config/
    controllers/
    data/
    models/
    routes/
    app.js
    server.js
  frontend/
    css/
    images/
    js/
      config.js
      main.js
    index.html
    vercel.json
  .env
  .env.example
  package.json
  render.yaml
```

## Local Run

1. Install dependencies at project root:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill values.

3. Start backend:

```bash
npm run dev
```

4. Open frontend with a static server (for example VS Code Live Server) from `frontend/`.

## Deploy Backend on Render

1. Push project to GitHub.
2. In Render, create a new **Web Service** from the repository.
3. Keep:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables from `.env.example`:
   - `PORT`
   - `MONGO_URI`
   - `MAIL_USER`
   - `MAIL_PASS`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `RESUME_FILE_PATH`
   - `ALLOWED_ORIGINS` (set this after Vercel URL is known)
5. Deploy and copy your backend URL, for example:
   - `https://portfolio-backend.onrender.com`

## Deploy Frontend on Vercel

1. In Vercel, create a new project from same repository.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: `Other`.
4. Deploy.
5. After first deploy, get Vercel URL, for example:
   - `https://portfolio-site.vercel.app`

## Connect Frontend to Backend

1. Update frontend API base URL in `frontend/js/config.js`:

```js
window.PORTFOLIO_API_BASE_URL = 'https://portfolio-backend.onrender.com';
```

2. Commit and redeploy Vercel.
3. In Render, update `ALLOWED_ORIGINS` with your Vercel domain:

```text
https://portfolio-site.vercel.app
```

4. Redeploy Render.

## Notes

- If frontend and backend are same domain locally, `config.js` can stay empty.
- CORS is controlled by `ALLOWED_ORIGINS` (comma-separated list supported).
- Backend health check is available at `/health`.
