import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
    //   const res = await axios.post("http://localhost:5000/api/login", { email, password });

    console.log("Test click")
      
      // Set token and expiry (10 minutes from now)
    //   localStorage.setItem("token", res.data.token)
      localStorage.setItem("expiry", Date.now() + 10 * 60 * 1000)
      
      navigate("/")
    } catch (err) {
    //   alert("Login failed")
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}