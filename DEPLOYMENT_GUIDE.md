# Full Stack Backend Deployment Guide (Express + Supabase + Vercel)

This guide covers everything from local development to making your API live on Vercel.

## 1. Local Development Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/)
- A [Supabase](https://supabase.com/) account and project.

### Step-by-Step Local Setup
1. **Initialize Project:**
   ```bash
   npm init -y
   ```
2. **Install Dependencies:**
   ```bash
   npm install express @supabase/supabase-js dotenv
   ```
3. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=4000
   ```
4. **Run Locally:**
   Add a start script in `package.json`:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "node --watch server.js"
   }
   ```
   Run using: `npm start` or `npm run dev`.

---

## 2. GitHub Integration

1. **Initialize Git:**
   ```bash
   git init
   ```
2. **Create .gitignore:**
   Always exclude `node_modules` and `.env` to keep your keys safe:
   ```text
   node_modules
   .env
   ```
3. **Commit and Push:**
   - Create a repository on GitHub.
   - Run these commands:
     ```bash
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

---

## 3. Vercel Deployment (Live)

### Step 1: Vercel Configuration
Create a `vercel.json` file in the root to handle routing for Express:
```json
{
  "version": 2,
  "rewrites": [
    { "source": "/(.*)", "destination": "/server.js" }
  ]
}
```

### Step 2: Import Project
1. Log in to [Vercel](https://vercel.com/).
2. Click **"Add New"** > **"Project"**.
3. Import your GitHub repository.

### Step 3: Add Environment Variables (CRITICAL)
Before clicking "Deploy" (or in Settings after deploying):
1. Go to the **Environment Variables** section.
2. Add `SUPABASE_URL` and `SUPABASE_KEY`.

### Step 4: Deploy
Click **Deploy**. Your app will be live at `https://your-project.vercel.app`.

---

## 4. Troubleshooting & Best Practices

### ⚠️ Case Sensitivity (The Linux Issue)
Windows is not case-sensitive, but Vercel (Linux) is. 
- **Incorrect:** `require('./models/Employee')` (if file is `employee.js`)
- **Correct:** `require('./models/employee')`
- **Rule:** Always match the filename exactly in your code.

### 🔍 Checking Logs
If you get a `FUNCTION_INVOCATION_FAILED` error:
1. Go to your Vercel Dashboard.
2. Click the **Logs** tab.
3. Look at **Runtime Logs**. It will tell you exactly which file is missing or which variable is undefined.

### 🔄 Updating the App
Whenever you make changes locally:
```bash
git add .
git commit -m "Updated some features"
git push
```
Vercel will automatically detect the push and redeploy your site.
