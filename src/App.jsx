import { useState, useEffect } from 'react';
import { auth } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
import Login from './login';  
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    description: '',
    timeline: 'flexible'
  });

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleQuoteClick = (service) => {
    setSelectedService(service);
    setFormData({ ...formData, service });
    setShowQuoteModal(true);
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase Cloud Function call
      const createQuote = httpsCallable(functions, 'createQuote');
      const result = await createQuote(formData);
      
      if(result.data.success) {
        alert('Quote request received! We will contact you soon.');
        setShowQuoteModal(false);
        setFormData({ name: '', email: '', service: '', budget: '', description: '', timeline: 'flexible' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting quote. Please try again.');
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h1 className="logo gradient-text">🚀 NorthPeak Digital</h1>
        
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#testimonials">Reviews</a>
          <a href="#contact" className="btn btn-primary">Contact</a>
          {user ? 
            <a onClick={() => signOut(auth)} className="logout-btn">Logout</a> : 
            <a href="#login">Login</a>
          }
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="side-menu">
          <button onClick={() => setMenuOpen(false)} className="close-btn">✕</button>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          {user ? 
            <a onClick={() => { signOut(auth); setMenuOpen(false); }}>Logout</a> : 
            <a href="#login">Login</a>
          }
        </div>
      )}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">We Build <span className="highlight">Digital Experiences</span></h1>
          <p className="hero-subtitle">Websites • Marketing • Branding - Tailored for Your Success</p>
          <div className="hero-buttons">
            <a href="#services" className="btn btn-primary">Explore Services</a>
            <a href="#contact" className="btn btn-secondary">Get In Touch</a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>50+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat">
            <h3>30+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat">
            <h3>4.9★</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive digital solutions tailored to your business needs</p>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3>Web Development</h3>
            <p>Modern, responsive websites built with React, optimized for speed and SEO</p>
            <ul className="service-list">
              <li>✓ Responsive Design</li>
              <li>✓ Fast Loading</li>
              <li>✓ SEO Optimized</li>
              <li>✓ Mobile First</li>
            </ul>
            <button className="btn btn-outline" onClick={() => handleQuoteClick('Web Development')}>Get Quote</button>
          </div>

          <div className="service-card featured">
            <div className="badge">Most Popular</div>
            <div className="service-icon">📱</div>
            <h3>Digital Marketing</h3>
            <p>Strategic marketing campaigns that drive traffic and conversions</p>
            <ul className="service-list">
              <li>✓ SEO Optimization</li>
              <li>✓ Google Ads</li>
              <li>✓ Social Media</li>
              <li>✓ Content Strategy</li>
            </ul>
            <button className="btn btn-primary" onClick={() => handleQuoteClick('Digital Marketing')}>Get Quote</button>
          </div>

          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3>Branding & Design</h3>
            <p>Complete brand identity that resonates with your target audience</p>
            <ul className="service-list">
              <li>✓ Logo Design</li>
              <li>✓ Brand Strategy</li>
              <li>✓ UI/UX Design</li>
              <li>✓ Brand Guidelines</li>
            </ul>
            <button className="btn btn-outline" onClick={() => handleQuoteClick('Branding & Design')}>Get Quote</button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO/WORK SECTION */}
      <section id="work" className="portfolio-section">
        <div className="section-header">
          <h2>Our Work</h2>
          <p>Successful projects that showcase our expertise</p>
        </div>

        <div className="portfolio-grid">
          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=300&fit=crop" alt="E-commerce Website"/>
            <div className="portfolio-info">
              <h4>E-commerce Platform</h4>
              <p>React + Stripe Integration</p>
              <span className="category">Web Development</span>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=300&fit=crop" alt="Restaurant Branding"/>
            <div className="portfolio-info">
              <h4>Restaurant Branding</h4>
              <p>Logo + Website + Social Strategy</p>
              <span className="category">Branding</span>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=300&fit=crop" alt="Marketing Campaign"/>
            <div className="portfolio-info">
              <h4>Marketing Campaign</h4>
              <p>Google Ads + SEO - 150% ROI</p>
              <span className="category">Marketing</span>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1460925895917-adf4e565db18?w=500&h=300&fit=crop" alt="SaaS Dashboard"/>
            <div className="portfolio-info">
              <h4>SaaS Dashboard</h4>
              <p>Analytics Platform - Real-time Data</p>
              <span className="category">Web Development</span>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" alt="Mobile App"/>
            <div className="portfolio-info">
              <h4>Fitness Mobile App</h4>
              <p>React Native - iOS & Android</p>
              <span className="category">Development</span>
            </div>
          </div>

          <div className="portfolio-card">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop" alt="Brand Identity"/>
            <div className="portfolio-info">
              <h4>Tech Startup Branding</h4>
              <p>Complete Visual Identity System</p>
              <span className="category">Branding</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>About NorthPeak Digital</h2>
            <p>
              We are a creative digital agency dedicated to helping businesses thrive in the online world. 
              With a team of experienced designers, developers, and marketers, we deliver solutions that not only look great but drive real results.
            </p>
            <p>
              Our approach combines strategic thinking with cutting-edge technology to create digital experiences that engage, convert, and delight.
            </p>
            <div className="about-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <div>
                  <h4>Fast Turnaround</h4>
                  <p>Quick delivery without compromising quality</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🎯</span>
                <div>
                  <h4>Results Driven</h4>
                  <p>Every project is optimized for success</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🤝</span>
                <div>
                  <h4>Client Focused</h4>
                  <p>Your goals become our mission</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🚀</span>
                <div>
                  <h4>Innovation First</h4>
                  <p>Always using the latest technologies</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500" alt="Team"/>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>Real feedback from real clients</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "NorthPeak Digital transformed our online presence. The website they built increased our sales by 40% in just 3 months!"
            </p>
            <div className="testimonial-author">
              <h4>Rajesh Kumar</h4>
              <p>E-commerce Business Owner</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Professional, creative, and results-oriented. They understood our vision and delivered beyond expectations. Highly recommended!"
            </p>
            <div className="testimonial-author">
              <h4>Priya Singh</h4>
              <p>Restaurant Owner</p>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "The marketing campaign they ran for us generated 300+ qualified leads. Exceptional service and communication throughout."
            </p>
            <div className="testimonial-author">
              <h4>Amit Patel</h4>
              <p>Tech Startup Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="process-section">
        <div className="section-header">
          <h2>Our Process</h2>
          <p>How we deliver exceptional results</p>
        </div>

        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Discovery</h3>
            <p>Understanding your business, goals, and target audience</p>
          </div>
          <div className="process-arrow">→</div>
          
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Strategy</h3>
            <p>Developing a comprehensive plan and design approach</p>
          </div>
          <div className="process-arrow">→</div>
          
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Execution</h3>
            <p>Building and implementing with attention to detail</p>
          </div>
          <div className="process-arrow">→</div>
          
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Launch</h3>
            <p>Deploying and optimizing for maximum impact</p>
          </div>
        </div>
      </section>

      {/* QUOTE MODAL */}
      {showQuoteModal && (
        <div className="modal-overlay" onClick={() => setShowQuoteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowQuoteModal(false)}>✕</button>
            
            <h2>Get a Quote for {formData.service}</h2>
            <p className="modal-subtitle">Fill in your details and we'll send you a personalized quote</p>

            <form onSubmit={handleQuoteSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Budget Range *</label>
                <select 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  required
                >
                  <option value="">Select budget</option>
                  <option value="10000-25000">₹10K - ₹25K</option>
                  <option value="25000-50000">₹25K - ₹50K</option>
                  <option value="50000-100000">₹50K - ₹1L</option>
                  <option value="100000+">₹1L+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Timeline *</label>
                <select 
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                >
                  <option value="flexible">Flexible</option>
                  <option value="1-2weeks">1-2 Weeks</option>
                  <option value="1month">1 Month</option>
                  <option value="2-3months">2-3 Months</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Description</label>
                <textarea 
                  placeholder="Tell us about your project..."
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Send Quote Request</button>
            </form>
          </div>
        </div>
      )}

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="section-header">
          <h2>Let's Work Together</h2>
          <p>Ready to transform your digital presence?</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <h4>📧 Email</h4>
              <p>hello@northpeak.com</p>
            </div>
            <div className="info-item">
              <h4>📱 Phone</h4>
              <p>+91 XXXXXXXXXX</p>
            </div>
            <div className="info-item">
              <h4>📍 Location</h4>
              <p>India</p>
            </div>
            <div className="info-item">
              <h4>⏱️ Response Time</h4>
              <p>Within 24 hours</p>
            </div>
          </div>

          <form 
            action="https://formspree.io/f/xaqrlnnp" 
            method="POST"
            className="contact-form"
          >
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            
            <div className="form-group">
              <input type="email" name="email" placeholder="Your Email" required />
            </div>
            
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" required />
            </div>

            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">Send Message</button>
          </form>
        </div>
      </section>

      <Login />

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>NorthPeak Digital</h4>
            <p>Building digital experiences that matter</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#instagram">Instagram</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 NorthPeak Digital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
