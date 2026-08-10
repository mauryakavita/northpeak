import { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './login';  
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="logo gradient-text">NorthPeak Digital</h1>
        
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Work</a>
          <a href="#about">About</a>
          <a href="#contact" className="btn">Contact</a>
          {user ? 
            <a onClick={() => signOut(auth)}>Logout</a> : 
            <a href="#login">Login</a>
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
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          {user ? 
            <a onClick={() => { signOut(auth); setMenuOpen(false); }}>Logout</a> : 
            <a href="#login" onClick={() => setMenuOpen(false)}>Login</a>
          }
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <h2>We Build Digital Experiences</h2>
        <p>Websites, Marketing & Branding</p>
        <a href="#contact" className="btn btn-big">Get Started</a>
      </section>

      {/* SERVICES SECTION */}
      <section id="services">
        <h3>Our Services</h3>
        <div className="services-grid">
          <div className="service-card">
            <h4>Web Development</h4>
            <p>Modern responsive websites with React & Tailwind</p>
          </div>
          <div className="service-card">
            <h4>Digital Marketing</h4>
            <p>SEO, Google Ads, Social Media Management</p>
          </div>
          <div className="service-card">
            <h4>Branding</h4>
            <p>Logo, Identity & Complete Brand Strategy</p>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio">
        <h3>Our Work</h3>
        <p className="subtitle">Some of our recent projects</p>
        <div className="portfolio-grid">
          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400" alt="Project 1"/>
            <div className="portfolio-info">
              <h4>E-commerce Website</h4>
              <p>React + Stripe Integration</p>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400" alt="Project 2"/>
            <div className="portfolio-info">
              <h4>Restaurant Branding</h4>
              <p>Logo + Website + Social Media</p>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400" alt="Project 3"/>
            <div className="portfolio-info">
              <h4>Marketing Campaign</h4>
              <p>Google Ads + SEO Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <h3>About Us</h3>
        <p className="about-text">
          We are NorthPeak Digital, a creative agency helping businesses grow online. 
          We believe in clean design, fast websites, and results that matter.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <h3>Contact Us</h3>
        <p>Email: hello@northpeak.com</p>
        <p className="subtitle">We reply within 24 hours</p>
        
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

      <Login />

      {/* FOOTER */}
      <footer>
        <p>© 2026 NorthPeak Digital</p>
      </footer>
    </div>
  )
}
