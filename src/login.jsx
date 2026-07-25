import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg("Login Success! ✅");
    } catch (error) {
      setMsg("Error: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMsg("Logout Success! 👋");
  };

  return (
    <div id="login" style={{ padding: "50px", textAlign: "center" }}>
      <h2>Admin Panel</h2>
      
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <button 
            onClick={handleLogout}
            style={{width:"250px", padding:"12px", background:"red", color:"white", border:"none", borderRadius:"5px", cursor:"pointer"}}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            style={{width:"250px", padding:"10px", margin:"10px"}}
          /><br/>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)} 
            style={{width:"250px", padding:"10px", margin:"10px"}}
          /><br/>
          <button 
            onClick={handleLogin} 
            style={{width:"250px", padding:"12px", background:"#4CAF50", color:"white", border:"none", borderRadius:"5px", cursor:"pointer"}}
          >
            Login
          </button>
        </>
      )}
      <p style={{color:"red"}}>{msg}</p>
    </div>
  );
}