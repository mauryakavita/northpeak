

import {motion} from 'framer-motion'
import { useState, useEffect } from 'react';


import './App.css'

export default function App() {

  const [menuOpen, setMenuOpen] = useState(false)
const [user, setUser] = useState(null);




const handleLogout = async () => {
  await signOut(auth);
  setMenuOpen(false); // menu band ho jaye
};

        
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="logo gradient-text">My Portfolio</h1>
        
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Work</a>
          <a href="#about">About</a>
         
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

    {user ? 
      <a onClick={() => {signOut(auth); setMenuOpen(false)}}>Logout</a> : 
      <a href="#login" onClick={() => setMenuOpen(false)}>Login</a>
    }
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>

      {/* SIDE MENU MOBILE */}
      {menuOpen && (
        <div className="side-menu">
          <button onClick={() => setMenuOpen(false)} className="close-btn">✕</button>
          <a href="#services" onClick={()=>setMenuOpen(false)}>Services</a>
          <a href="#portfolio" onClick={()=>setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={()=>setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a>
          {user ? 
      <a onClick={() => {signOut(auth); setMenuOpen(false)}}>Logout</a> : 
      <a href="#login" onClick={() => setMenuOpen(false)}>Login</a>
    }
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <motion.h1 initial={{ opacity: 0 ,y: 20}} animate={{ opacity: 1, y: 0 }} transition={{ duration: 4}}>
          Hi, I'm Kavita Maurya
        </motion.h1>
        <p>Web Developer</p>

        <a href="#contact" className="btn btn-big">Get Started</a>
      </section>

      {/* SERVICES SECTION */}
      <section id="services">
        <h3>Our Services</h3>
        <div className="services-grid">
          <div className="service-card">
        <h4> React.js + Firebase Auth</h4>
            <p> Designed responsive landing page with secure admin login using Firebase Authentication. Integrated REST API via FormsPree for contact form submissions .</p>
          </div>
          <div className="service-card">
                <h4>Web development</h4>
            <p>Modern responsive websites with React.js , Node.js ,Tailwind CSS.I build fast, clean, and user-friendly React apps that solve real problems.</p>
          </div>
            
          <div className="service-card">
            <h4> Groq API + Llama 3 Vision</h4>
            <p>
               Integrated Groq API + Llama 3 Vision to solve GATE questions from uploaded images using OCR
            </p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio">
        <h3>PROJECTS</h3>
        <p className="subtitle">Some of my recent projects</p>
        <div className="portfolio-grid">
          
          <motion.div className="portfolio-card" whileHover={{ y: -10 ,scale:1.03}} transition={{ duration: 0.3 }}>
            <img src="gate.jpeg"alt="Project 1"/>
            <div className="portfolio-info">
              <h4>GATE MATE AI</h4>
              <p>React.js, Node.js, Firebase, Groq API, Llama 3 Vision, TailwindCSS </p>
           <a className='link'  href="https://agent-6a63b5e276285672664b6388--gatemateai.netlify.app/" target="_blank" rel="noopener noreferrer">
          Live Link
        </a>

            </div>
          </motion.div>

          <motion.div className="portfolio-card" whileHover={{ y: -10 ,scale:1.03}} transition={{ duration: 0.3 }}>
            <img src="admin.jpg" alt="Project 2"/>
            <div className="portfolio-info">
              <h4>Northpeak</h4>
              <p>React.js , Firebase , Groq API , Formspree , TailwindCSS </p>
              <a className='link'  href="https://northpeak-pink.vercel.app/" target="_blank" rel="noopener noreferrer">Live Link</a>
            </div>
          </motion.div>

          <div className="portfolio-card">
            <img src="weather.jpeg" alt="Project 3"/>
            <div className="portfolio-info">
              <h4>Weather App</h4>
              <p>  JavaScript, HTML, CSS, REST API </p>
               <a className='link' href="https://mauryakavita.github.io/weather/" target="_blank" rel="noopener noreferrer">
          Live Link
        </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <h3>About me</h3>
        <p className="about-text">
           Web Developer with expertise in React.js, Node.js, and API Integration. Built AI-powered GATE
preparation platform using Groq API and Llama 3 Vision. Experienced in REST APIs, Firebase, and
Responsive UI. Solved 170+ DSA problems on LeetCode and CodeChef
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <motion.h3 whileHover={{ y: -5 }}>Hire Me</motion.h3>

<div>
    <a className='link' href="mailto:kvltmaurya@gmail.com">kvltmaurya@gmail.com</a>
       
       </div>
       
       
        <div>
          <a className='link' href="https://github.com/mauryakavita" target="_blank" rel="noopener noreferrer">GitHub Profile Link</a>
         </div>
         <div>
<a className='link' href="https://linkedin.com/in/kavita-maurya-b951a9354" target="_blank" rel="noopener noreferrer">LinkedIn Profile Link</a>
      
        </div>
        <p className="subtitle">I reply within 24 hours</p>
        
        <h2>Let's Work Together</h2>









<form 
  action="https://formspree.io/f/xaqrlnnp" 
  method="POST" 
  style={{display: 'flex', margin:'0 auto', flexDirection: 'column', gap: '15px', maxWidth:'500px', width:'100%'}}
>
  <input type="text" name="name" placeholder="Your Name" required style={{padding:'15px', borderRadius:'8px', border:'1px solid #ddd'}}/>
  
  <input type="email" name="email" placeholder="Your Email" required style={{padding:'15px', borderRadius:'8px', border:'1px solid #ddd'}}/>
  
  <textarea name="message" placeholder="Your Message" rows="5" required style={{padding:'15px', borderRadius:'8px', border:'1px solid #ddd'}}></textarea>
  
  <button type="submit" className="btn btn-big">Send Message</button>
</form>


</section>

      {/* FOOTER */}
      <footer>
        <p>©Kavita Maurya</p>
      </footer>

    </div>
  )
}