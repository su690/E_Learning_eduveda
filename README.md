# E-Learning Frontend (React + Tailwind)

This repository contains a complete React frontend scaffold focused on **Login & Registration** flows that send data to a backend API (e.g. `/api/v1/auth/register` and `/api/v1/auth/login`). The design is beautiful, responsive, and uses Tailwind CSS. The code below is organized as separate files — copy each file into your project structure.

---

---- FILE: package.json ----
{
  "name": "elearning-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "clsx": "^1.2.1"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.5.3",
    "vite": "^5.0.0"
  }
}

---- FILE: tailwind.config.cjs ----
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        accent: '#06b6d4'
      }
    }
  },
  plugins: []
}

---- FILE: postcss.config.cjs ----
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}

---- FILE: index.html ----
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-Learning - Auth</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

---- FILE: src/main.jsx ----
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

---- FILE: src/App.jsx ----
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <nav className="p-4 max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">EL</div>
          <div className="text-lg font-semibold">E-Learn</div>
        </Link>
        <div className="space-x-3">
          <Link to="/login" className="px-4 py-2 rounded-md border">Login</Link>
          <Link to="/register" className="px-4 py-2 rounded-md bg-accent text-white">Register</Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

function Landing(){
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl font-extrabold mb-4">Learn. Grow. Succeed.</h1>
        <p className="text-gray-700 mb-6">Join thousands of learners. Beautiful courses with video, docs and hands-on tasks. Sign up and get started today.</p>
        <div className="flex gap-3">
          <Link to="/register" className="px-6 py-3 bg-accent text-white rounded-md">Get Started</Link>
          <Link to="/login" className="px-6 py-3 border rounded-md">Login</Link>
        </div>
      </div>
      <div className="flex justify-center">
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=bb1f4f3bfa2c8f1d1c2f9b5a2e1b8a1e" alt="learning" className="rounded-lg shadow-xl max-h-80 object-cover"/>
      </div>
    </section>
  )
}

---- FILE: src/api/axios.js ----
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api/v1'

const instance = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // if backend uses cookies; adjust as needed
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response interceptor (optional)
instance.interceptors.response.use(
  res => res,
  err => {
    // global error handling
    return Promise.reject(err)
  }
)

export default instance

---- FILE: src/pages/Login.jsx ----
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await api.post('/auth/login', { email, password })
      // backend should return accessToken and optionally user info
      const { accessToken } = res.data
      // simple storage (localStorage). For production prefer httpOnly cookie set by backend.
      localStorage.setItem('accessToken', accessToken)
      navigate('/dashboard')
    }catch(err){
      console.error(err)
      setError(err?.response?.data?.message || 'Login failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your courses.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
            <button disabled={loading} className="px-4 py-2 bg-accent text-white rounded-md">{loading ? 'Signing in...' : 'Sign in'}</button>
            <a href="#" className="text-sm text-sky-600">Forgot password?</a>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600">Don’t have an account? <a href="/register" className="text-accent">Create one</a></div>
      </div>

      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-accent/10 to-white p-6">
        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c3b6b1c9a3f6f6f1b9c7f9d8f0a3b1c" alt="students" className="w-full h-52 object-cover rounded-md mb-4" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">Beautiful courses</h3>
          <p className="text-sm text-gray-600">Interactive lessons with multimedia and hands-on materials.</p>
        </div>
      </div>
    </div>
  )
}

---- FILE: src/pages/Register.jsx ----
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Register(){
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
      const res = await api.post('/auth/register', { fullName, email, password, role })
      // optionally auto-login or navigate
      navigate('/login')
    }catch(err){
      console.error(err)
      setError(err?.response?.data?.message || 'Registration failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-2">Create your account</h2>
        <p className="text-sm text-gray-500 mb-6">Join as a student or instructor and start creating or taking courses.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input value={fullName} onChange={e=>setFullName(e.target.value)} type="text" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required minLength={6} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select value={role} onChange={e=>setRole(e.target.value)} className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-2">
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex items-center justify-between">
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
