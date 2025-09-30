# E-Learning Frontend (React + Tailwind)
<button disabled={loading} className="px-4 py-2 bg-accent text-white rounded-md">{loading ? 'Creating...' : 'Create account'}</button>
<a href="/login" className="text-sm text-sky-600">Already have an account?</a>
</div>
</form>
</div>


<div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-accent/10 to-white p-6">
<img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9a1c9a8b8f8a1f1b2c3d4e5f6a7b8c9d" alt="register" className="w-full h-52 object-cover rounded-md mb-4" />
<div className="text-center">
<h3 className="font-semibold text-lg">Start learning</h3>
<p className="text-sm text-gray-600">Create an account and access high-quality courses.</p>
</div>
</div>
</div>
)
}


---- FILE: src/pages/Dashboard.jsx ----
import React from 'react'


export default function Dashboard(){
return (
<div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
<h2 className="text-2xl font-bold mb-4">Dashboard</h2>
<p className="text-gray-700">This is a placeholder dashboard. After login, the backend should return user info — you can render enrolled courses, progress, and more here.</p>
</div>
)
}


---- FILE: src/styles.css ----
@tailwind base;
@tailwind components;
@tailwind utilities;


html, body, #root { height: 100%; }


/* small helpers */
.btn { @apply px-4 py-2 rounded-md };


---- FILE: README.md ----
# E-Learning Frontend (React + Tailwind) — Auth Focus


This project contains a polished React frontend focused on **Login** and **Registration** flows. It expects a backend API at `VITE_API_BASE` (environment variable) or `http://localhost:5000/api/v1`.


## Features
- Beautiful responsive UI using Tailwind CSS
- Login and register forms with client-side validation
- Axios instance pre-configured to send requests to backend
- LocalStorage token handling (demo). For stronger security, configure backend to set httpOnly cookies.


## Setup
1. Create a folder and copy the files above into the same structure.
2. Install deps:
```bash
npm install
```
3. Create `.env` file in project root with optional API base:
```
VITE_API_BASE=http://localhost:5000/api/v1
```
4. Run dev server:
```bash
npm run dev
```


## Backend expectations (for auth)
- `POST /auth/register` : registers user -> request body `{ fullName, email, password, role }` return 201.
- `POST /auth/login` : login -> request body `{ email, password }` return `{ accessToken, user }`.


> Note: For production, prefer backend to return httpOnly cookies for tokens instead of localStorage.


## Next steps I can provide (optional, pick one):
- Full backend scaffold (Spring Boot or ASP.NET Core) for auth + MySQL integration.
- A full frontend module for courses, enrollment, and assessments to match the LLD.
- Add Redux/RTK Query for advanced state management and caching.


---


Happy building! Copy files into your project and run `npm run dev` to test the auth flows. Adjust `VITE_API_BASE` to point to your backend.
