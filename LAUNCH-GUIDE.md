# Launching IAL Paper Tracker

This takes about 45 minutes. Do it on a laptop, not an iPad: uploading files and editing `config.js` is much easier there.

You'll create three free accounts:

| Service | What it does | Cost |
|---|---|---|
| **Supabase** | Logins and the database that stores everyone's papers | Free plan |
| **GitHub** | Holds the website's files | Free |
| **Vercel** | Puts the website online at a web address | Free (Hobby plan: personal, non-commercial use only) |

Supabase and Vercel sometimes rename buttons, so a menu might be worded slightly differently from what's written here.

---

## Step 1 — Unzip the files

Unzip `ial-paper-tracker-site.zip`. You should have:

```
index.html   app.js   data.js   style.css   config.js
privacy.html   supabase-setup.sql   LAUNCH-GUIDE.md
```

## Step 2 — Create the Supabase project

1. Go to **supabase.com** → **Start your project** → sign up (signing in with GitHub is quickest, so you may want to do step 5's GitHub sign-up first).
2. **New project**:
   - Name: `ial-paper-tracker`
   - Database password: click **Generate a password** and save it somewhere safe (you won't need it day to day).
   - Region: the one closest to you.
3. Click **Create new project** and wait a minute or two while it sets up.

## Step 3 — Set up the database

1. In the left sidebar, open **SQL Editor** → **New query**.
2. Open `supabase-setup.sql` in a text editor, select all, copy, and paste it into the query box.
3. Press **Run**. You should see **"Success. No rows returned."**

This creates the two tables (profiles and logged papers) and the security rules that make sure each account can only ever see its own data.

## Step 4 — Connect the website to Supabase

1. In Supabase, click **Connect** at the top of the project (or go to **Project Settings → API Keys**).
2. Copy two things:
   - **Project URL**: looks like `https://abcdefgh.supabase.co`
   - **Publishable key**: starts with `sb_publishable_` (on older projects it's called the **anon public** key)
3. Open `config.js` in a plain text editor (Notepad on Windows, TextEdit on Mac in *plain text* mode, or VS Code) and replace the two `PASTE_…` values, keeping the quote marks:

```js
window.TRACKER_CONFIG = {
  supabaseUrl: "https://abcdefgh.supabase.co",
  supabaseKey: "sb_publishable_xxxxxxxxxxxxxxxx"
};
```

4. Save it.

**Never** paste the **secret** key (`sb_secret_…` or `service_role`). Only the publishable key is safe to put on a website.

## Step 5 — Decide on email confirmation

Supabase's built-in email service can only send **2 emails per hour** for the whole site. That covers sign-up confirmations *and* password resets.

In Supabase → **Authentication → Sign In / Providers → Email**:

- **For a small launch (you and friends): turn "Confirm email" OFF.** People can sign up and start straight away. Password-reset emails still work, just within that 2-per-hour limit.
- **Before sharing widely:** set up your own email sender under **Authentication → SMTP Settings** (sometimes listed under **Emails**). [Resend](https://resend.com) has a free tier. Then you can turn "Confirm email" back on.

On the same page, set the minimum password length to **8**.

## Step 5b — (Optional) Add "Continue with Google"

Google sign-in sends no emails, so it isn't affected by the 2-per-hour limit. It takes about 15 minutes.

1. In Supabase, go to **Authentication → Sign In / Providers → Google**. Copy the **Callback URL** it shows. It looks like `https://YOURREF.supabase.co/auth/v1/callback`.
2. Go to **console.cloud.google.com** and sign in with a Google account. Create a new project called `ial-paper-tracker`.
3. Open **Google Auth Platform** (search for it in the top bar) → **Get started**:
   - App name: `IAL Paper Tracker`
   - User support email: your email
   - Audience: **External**
   - Contact email: your email → agree → **Create**.
4. **Data Access → Add or remove scopes**: tick `.../auth/userinfo.email`, `.../auth/userinfo.profile` and `openid` → **Update** → **Save**.
5. **Clients → Create client**:
   - Application type: **Web application**
   - Authorized JavaScript origins: your Vercel address, e.g. `https://ial-paper-tracker-xyz.vercel.app`. You can come back and add this after step 7.
   - Authorized redirect URIs: the **Callback URL** from step 1
   - **Create**, then copy the **Client ID** and **Client secret**.
6. **Audience → Publish app** so anyone can sign in, not just test users. With only these basic scopes, Google doesn't need to review it.
7. Back in Supabase's Google provider page: switch it **on**, paste the Client ID and Client secret, and click **Save**.

Until this is done, the Google button shows "Google sign-in isn't switched on for this site yet", and email sign-in keeps working.

## Step 6 — Put the files on GitHub

1. Go to **github.com** and create an account.
2. Click **+ → New repository**:
   - Name: `ial-paper-tracker`
   - Public or Private: either works.
   - Click **Create repository**.
3. On the next page, click **uploading an existing file**.
4. Drag in **all the files** from the unzipped folder: the files themselves, not the folder. Make sure the `config.js` you edited is included.
5. Click **Commit changes**.

## Step 7 — Put it online with Vercel

1. Go to **vercel.com** → **Sign Up** → **Continue with GitHub**.
2. Click **Add New… → Project**, find `ial-paper-tracker` and click **Import**.
3. Framework Preset: **Other**. Leave the build settings empty. There's nothing to build.
4. Click **Deploy**. After about 30 seconds you'll get an address like `https://ial-paper-tracker-xyz.vercel.app`.

## Step 8 — Tell Supabase your web address

This makes confirmation and password-reset emails link back to your site.

In Supabase → **Authentication → URL Configuration**:

- **Site URL**: your Vercel address, e.g. `https://ial-paper-tracker-xyz.vercel.app`
- **Redirect URLs** → **Add URL**: the same address with a slash on the end, e.g. `https://ial-paper-tracker-xyz.vercel.app/`

Save.

## Step 9 — Add your contact email to the privacy page

On GitHub, open `privacy.html` → click the pencil (edit) icon → replace `[add your contact email here]` with an email people can reach you on → **Commit changes**. Vercel updates the live site by itself within a minute.

## Step 10 — Test it

1. Open your Vercel address and **Create an account**.
2. Pick your subjects, log a paper, and set an exam date.
3. Open the same address on your iPad, sign in, and check the paper is there.
4. Try **Forgot your password?** once to check emails arrive (check spam).

## Step 11 — Bring over your marks from the Claude version

1. In the Claude-hosted tracker: **Subjects & units → Copy backup**.
2. On your new site: **Subjects & units → Restore from backup** → paste → **Restore**.

Your papers, own subjects and exam dates all come across.

---

## Updating the site later

Edit or re-upload any file on GitHub, then commit. Vercel republishes automatically.

## Things to know

- **Free Supabase projects pause after a week with no activity.** If the site says it can't load, open your Supabase dashboard and click **Restore project**. Regular use keeps it awake.
- **Each account can log up to 3,000 papers.** This limit stops anyone filling up the free database.
- **Deleting an account** (account menu → *Delete my account*) permanently removes that person's login and all their data.
- **Grade boundaries** are in `data.js`. When Pearson publishes a new series, add it there, or ask Claude to.
