# 📌 Realtime Bookmark Manager

A full-stack application that allows authenticated users to create, update, delete, and view their personal bookmarks with real-time updates powered by Supabase Realtime.

---

## 🚀 Live Demo

> [Realtime Bookmark Manager](https://smart-bookmark-app-orcin-ten.vercel.app/)

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Backend / Services

- Supabase (PostgreSQL + Auth + Realtime)
- Row Level Security (RLS)

---

## ✨ Features

- 🔐 JWT-based Authentication (Supabase Auth)
- ➕ Add new bookmarks
- ✏️ Update bookmarks
- ❌ Delete bookmarks (user scoped)
- 📡 Real-time updates per user
- 📄 Pagination support
- 🧩 Modular component architecture

---

## 🔒 Authentication & Privacy

- Supabase Auth is used for login/session handling.
- Row Level Security (RLS) ensures:
  ```sql
  user_id = auth.uid()
  ```

## 📡 Real-Time Implementation

- Real-time updates are handled using Supabase postgres_changes subscriptions.

- Each user subscribes to their own private channel:

```js
supabase
  .channel(`bookmarks-${userId}`)
  .on(
    "postgres_changes",
    {
      event: "\*",
      schema: "public",
      table: "bookmarks",
      filter: `user_id=eq.${userId}`,
    },
    fetchBookmarks,
  )
  .subscribe();
```

- Additionally, the latest JWT is attached to realtime:

- supabase.realtime.setAuth(session.access_token);

  This ensures secure and user-scoped realtime updates.

## ⚙️ Installation

- git clone <https://github.com/95027/smart-bookmark-app.git>

```js
cd smart-bookmark-app
npm install
npm run dev
```

- Create .env.local:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🧠 Challenges Faced & Solutions

1️⃣ Realtime CHANNEL_ERROR Issue

Problem: Realtime channel occasionally closed or errored.

Cause: Supabase Realtime requires the latest JWT token after auth changes.

Solution:

```
supabase.realtime.setAuth(session.access_token);

This synced the session token with realtime, fixing intermittent subscription failures.
```

2️⃣ Duplicate Channel Subscriptions

Problem: Multiple subscriptions caused inconsistent updates.

Solution: Remove existing channels before creating a new one.

```
supabase.getChannels().forEach((ch) => {
if (ch.topic === topic) supabase.removeChannel(ch);
});
```

3️⃣ User-Scoped Realtime Filtering

Problem: All users received all updates.

Solution: Apply row-level filter:

```
filter: `user_id=eq.${userId}`

This ensured only the owner receives realtime changes.
```

## 🧪 How It Works

- User logs in via Supabase Auth

- JWT session is synced with realtime

- User subscribes to their private bookmark channel

- Any insert/update/delete triggers live UI refresh

## 🤖 AI Tools Usage

- AI tools (like ChatGPT) were used for:

- Debugging realtime auth sync issues

- Refining architecture decisions

- Improving code clarity and documentation

All implementation logic and debugging were manually verified and integrated.

## 📌 Future Improvements

- Optimistic UI updates

- Bookmark search & filtering

- Drag-and-drop ordering

- WebSocket connection status indicator

## 👨‍💻 Author

Sai Kumar Ch  
Full-Stack Developer (Node.js, Express.js, React.js, Next.js, PHP, Laravel, MySQL)  
2+ years of experience building scalable web applications.

🔗 GitHub: https://github.com/95027
