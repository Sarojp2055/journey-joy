import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import PlaceDetail from './pages/PlaceDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

// IMPORTANT: Replace with your actual Google Client ID from console.cloud.google.com
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ScrollToTop />
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="places/:slug" element={<PlaceDetail />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
)
