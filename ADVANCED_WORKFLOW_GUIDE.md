# Advanced Workflow: Dev vs Production Environments

This guide explains how to manage a professional development workflow using Git branches, Vercel environments, and Frontend flavors.

## 1. Why Two Environments?
- **Production (Live):** Real users, real data. You should never test here.
- **Development (Dev):** Where you build new features, change database tables, and test things that might break.

---

## 2. Git Branching Strategy

You should work with at least two branches in GitHub:

1.  **`main` Branch (Production):** 
    - This is the source of truth for your live API.
    - Deployment URL: `https://your-api.vercel.app`
2.  **`dev` Branch (Development):** 
    - This is where daily work happens.
    - Deployment URL: `https://your-api-git-dev-username.vercel.app` (Vercel Preview URL)

### How to move code:
When your feature is ready in `dev`, you merge it into `main`:
```bash
# Switch to main
git checkout main
# Pull latest main changes
git pull origin main
# Merge dev changes into main
git merge dev
# Push to production
git push origin main
```

---

## 3. Step-by-Step Setup for Two Environments

### Step 1: Supabase Setup
1. **Production Project:** Use your existing Supabase project as "Production".
2. **Dev Project:** Create a **New Project** in Supabase (e.g., `employee-api-dev`).
3. **Sync Schema:** Ensure both projects have the same tables. You can use the **SQL Editor** in Supabase to copy the table creation script from Prod to Dev.
4. **Copy Keys:** Keep both sets of `SUPABASE_URL` and `SUPABASE_KEY` ready.

### Step 2: Vercel Environment Configuration
Go to your Vercel Project -> **Settings** -> **Environment Variables**.

#### A. Set Production Keys:
1. Add `SUPABASE_URL`.
2. Enter the **Production** URL.
3. **IMPORTANT:** Check ONLY the `Production` box.
4. Click Save.

#### B. Set Dev/Preview Keys:
1. Add `SUPABASE_URL` again (yes, same name).
2. Enter the **Development** URL.
3. **IMPORTANT:** Check ONLY the `Preview` and `Development` boxes.
4. Click Save.

*(Repeat these steps for `SUPABASE_KEY` as well)*

---

## 4. Connecting Frontend (Flavors)

In your Frontend (e.g., Flutter), use Flavors to toggle between these URLs:

### **Dev Flavor:**
- **Backend URL:** Use your Vercel **Preview** link (the one with `-git-dev` in it).
- **Database:** This will automatically talk to your **Dev Supabase** project.

### **Prod Flavor:**
- **Backend URL:** Use your Vercel **Production** link.
- **Database:** This will automatically talk to your **Real Supabase** project.

---

## 5. The "Golden" Daily Workflow

1.  **Local Development:** Code and test on your laptop using `.env` with **Dev Keys**.
2.  **Commit & Push to Dev:** `git push origin dev`. 
3.  **Cloud Testing:** Vercel deploys to a Preview URL using your **Dev Database**.
4.  **Merge to Main:** Once tested, merge `dev` into `main` and push.
5.  **Go Live:** Vercel updates the Production URL using your **Real Database**.
