import { useEffect, useCallback, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Users from "./Users"

export default function Dashboard() {
  const navigate = useNavigate()
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const clearSession = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("expiry")
  }, [])

  const handleSessionExpiry = useCallback(() => {
    clearSession()
    alert("Session expired, please login again")
    navigate("/login", { replace: true })
  }, [navigate, clearSession])

  const checkSession = useCallback(() => {
    const token = localStorage.getItem("token")
    const expiry = localStorage.getItem("expiry")
    
    // If no token or expiry, redirect to login
    if (!token || !expiry) {
      // navigate("/login", { replace: true })
      return false
    }

    const expiryTime = parseInt(expiry, 10)
    const currentTime = Date.now()
    
    // Check if session has expired
    if (currentTime >= expiryTime) {
      handleSessionExpiry()
      return false
    }
    
    // Calculate time remaining until expiry
    const timeUntilExpiry = expiryTime - currentTime
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Set timeout for exact expiry time
    timeoutRef.current = setTimeout(() => {
      handleSessionExpiry()
    }, timeUntilExpiry)
    
    return true
  }, [navigate, handleSessionExpiry])

  useEffect(() => {
    // Initial session check
    if (!checkSession()) {
      return
    }

    // Set up periodic checks every minute
    intervalRef.current = setInterval(() => {
      checkSession()
    }, 60 * 1000)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [checkSession])

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, check session immediately
        checkSession()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [checkSession])

  return (
    <div>
      <h1>Welcome! Home Content</h1>
      <button onClick={()=>navigate('/users')}>Users</button>
    </div>
  )
}