import React, { useState, useEffect } from 'react'

export default function App() {
  const [activeNav, setActiveNav] = useState('hero')
  const [scrolled, setScrolled] = useState(false)
  const [formStatus, setFormStatus] = useState('')
  const [visibleSections, setVisibleSections] = useState(new Set())
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active nav section
      const sections = ['hero', 'about', 'education', 'experience', 'skills', 'projects', 'certifications', 'testimonials', 'resume', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveNav(section)
            break
          }
        }
      }

      // Trigger fade-in animations
      document.querySelectorAll('[data-animate]').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // JS-driven looping typing animation for hero title (type -> pause -> repeat)
  useEffect(() => {
    const heroTitle = "Hi, I'm Seidh Abdullah Adahan"
    let cancelled = false
    let idx = 0

    const typeNext = () => {
      if (cancelled) return
      if (idx <= heroTitle.length) {
        setTypedText(heroTitle.slice(0, idx))
        idx++
        setTimeout(typeNext, 60)
      } else {
        // finished typing: pause, then erase and restart
        setTimeout(() => {
          if (cancelled) return
          // quick erase effect (clear all at once for subtle loop)
          setTypedText('')
          idx = 0
          setTimeout(typeNext, 500)
        }, 1200)
      }
    }

    // start typing loop
    typeNext()
    return () => { cancelled = true }
  }, [])

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('Sending...')
    setTimeout(() => {
      setFormStatus('Message sent successfully! 🎉')
      setTimeout(() => setFormStatus(''), 3000)
    }, 500)
  }

  return (
    <div className="site">
      {/* Background video (muted, looped, autoplay) - prefers local flame video at /videos/flame.mp4
          Place your local file at `public/videos/flame.mp4`. If absent, the remote Pixabey video will be used as fallback. */}
      <video className="bg-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/videos/flame.mp4" type="video/mp4" />
        <source src="https://pixabay.com/videos/download/video-6785_medium.mp4" type="video/mp4" />
      </video>

      {/* Decorative light-theme animation layer (subtle gradients & floating orbs) */}
      <div className="light-anim" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <h1 className="brand">Seidh Abdullah Adahan</h1>
          <nav className="nav">
            <a href="#about" className={activeNav === 'about' ? 'active' : ''}>About</a>
            <a href="#education" className={activeNav === 'education' ? 'active' : ''}>Education</a>
            <a href="#skills" className={activeNav === 'skills' ? 'active' : ''}>Skills</a>
            <a href="#projects" className={activeNav === 'projects' ? 'active' : ''}>Projects</a>
            <a href="#contact" className={activeNav === 'contact' ? 'active' : ''}>Contact</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero">
          <div className="container hero-inner">
            <div className="hero-content" data-animate="fade-up">
              {/** typed heading (JS-driven) */}
              <h2 className="typed">{typedText}</h2>
              <p className="lead">Undergraduate Biomedical Technolhogy Student. Passionate about designing and innovating biomedical devices that solve real-world healthcare challenges.</p>
              <div className="hero-stats">
                <div><strong>22</strong><span>Years Old</span></div>
                <div><strong>2nd Year</strong><span>Student</span></div>
                <div><strong>5+</strong><span>Tech Skills</span></div>
              </div>
              <div className="hero-cta">
                <a href="#contact" className="btn">Get In Touch</a>
                <a href="#about" className="btn ghost">Learn More</a>
              </div>
            </div>
            <aside className="hero-image" data-animate="fade-right">
              <img src="https://i.imgur.com/By4oItL.jpeg" alt="Seidh Abdullah Adahan" />
            </aside>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <h3 data-animate="fade-up">About Me</h3>
            <p data-animate="fade-up">I am an undergraduate Biomedical Technology student with a strong interest in medical device design, embedded electronics, data analysis, and web development. I enjoy combining hardware and software to build prototypes that address accessibility and affordability in healthcare.</p>

            <div className="info-grid">
              <div data-animate="fade-up">
                <h4>Personal Information</h4>
                <p><strong>Age:</strong> 22<br/><strong>Date of Birth:</strong> October 8, 2003<br/><strong>Languages:</strong> English, Sinhala, Tamil</p>
              </div>
              <div data-animate="fade-up">
                <h4>Location & Availability</h4>
                <p>I-06, Tzuchi, Siribopra, Hambantota<br/>Available for internships and remote collaboration. Timezone: GMT+5:30</p>
              </div>
              <div data-animate="fade-up">
                <h4>Interests</h4>
                <p>Biomedical instrumentation, signal processing, prototyping, open-source healthcare, sports analytics.</p>
              </div>
              <div data-animate="fade-up">
                <h4>Contact</h4>
                <p><strong>Email:</strong> <a href="mailto:seidhabdul10@gmail.com">seidhabdul10@gmail.com</a><br/><strong>Phone:</strong> <a href="tel:0714882750">0714882750</a></p>
              </div>
            </div>

            <div style={{marginTop:20}} data-animate="fade-up">
              <h4>Career Objectives</h4>
              <p>Design and innovate biomedical devices that solve practical healthcare problems — focusing on low-cost sensing, assistive devices, and data-driven clinical decision tools. Seek internships and collaborative research opportunities to build real-world prototypes.</p>
            </div>
          </div>
        </section>

        <section id="education" className="section muted">
          <div className="container">
            <h3 data-animate="fade-up">Education</h3>
            <div className="card" data-animate="fade-up">
              <h4>BHSc (Hons) in Biomedical Technology</h4>
              <p>Gampaha Wickramarachchi University of Indigenous Medicine — 2nd Year, 1st Semester</p>
              <p><strong>Relevant coursework:</strong> Biomedical Instrumentation, Physiology, Digital Electronics, Signal Processing, Data Analysis.</p>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <h3 data-animate="fade-up">Experience</h3>
            <div className="card" data-animate="fade-up">
              <h4>EMG (Electromyography) Signal Analysis Project</h4>
              <p><em>September 2025</em></p>
              <ul>
                <li>Developed and implemented EMG signal acquisition system using surface electrodes and Arduino-based amplification.</li>
                <li>Processed raw EMG signals with digital filtering and feature extraction techniques.</li>
                <li>Analyzed muscle activation patterns and created visualization dashboard for real-time signal monitoring.</li>
              </ul>
            </div>

            <div className="card" style={{marginTop:16}} data-animate="fade-up">
              <h4>Freelance Web & Hardware Projects</h4>
              <p><em>2022 — Present</em></p>
              <ul>
                <li>Built responsive portfolio and small web tools using React and TypeScript.</li>
                <li>Prototyped microcontroller-based projects (Arduino/ESP32) for sensing and control.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="container">
            <h3 data-animate="fade-up">Skills & Expertise</h3>
            <div className="skills-list" data-animate="fade-up">
              <span>Biomedical Instrumentation</span>
              <span>Embedded C / Arduino</span>
              <span>Python (NumPy, Pandas)</span>
              <span>React & TypeScript</span>
              <span>Digital Electronics</span>
              <span>Signal Processing</span>
              <span>R Programming</span>
              <span>PCB Prototyping</span>
            </div>
          </div>
        </section>

        <section id="projects" className="section muted">
          <div className="container">
            <h3 data-animate="fade-up">Projects</h3>

            <div className="card" data-animate="fade-up">
              <h4>Portable Heart Rate Monitor</h4>
              <p>A low-cost PPG-based heart rate monitor prototype using ESP32, designed for easy mounting and continuous monitoring. Includes data logging and basic visualization via a web dashboard.</p>
              <p><strong>Tech:</strong> ESP32, PPG sensor, Python, React</p>
              <p><a href="#">View Case Study</a> • <a href="#">Source Code</a></p>
            </div>

            <div className="card" style={{marginTop:16}} data-animate="fade-up">
              <h4>Prototype Respiratory Rate Detector</h4>
              <p>Experimental sensor using accelerometer and pressure sensing to estimate respiration rate for non-invasive monitoring.</p>
              <p><strong>Tech:</strong> Arduino, Accelerometer, Signal Processing (Python)</p>
            </div>

            <div className="card" style={{marginTop:16}} data-animate="fade-up">
              <h4>Portfolio Website (this site)</h4>
              <p>Responsive portfolio built with Vite, React, and TypeScript showcasing projects, resume, and contact form.</p>
              <p><strong>Tech:</strong> React, TypeScript, Vite, CSS</p>
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="container">
            <h3 data-animate="fade-up">Certifications & Awards</h3>
            <div className="info-grid">
              <div data-animate="fade-up">
                <h4>Medical Instrumentation Training Course</h4>
                <p>Nawaloka Hospital, Sri Lanka — 2025</p>
              </div>
              <div data-animate="fade-up">
                <h4>Programming for Data Science</h4>
                <p>Online Course — Python & R (2022)</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section muted">
          <div className="container">
            <h3 data-animate="fade-up">Testimonials</h3>
            <div className="card" data-animate="fade-up">
              <p>“Seidh shows a lot of initiative — great at prototyping and collaborating on research tasks.” — Prof. A. Supervisor</p>
            </div>
          </div>
        </section>

        <section id="resume" className="section">
          <div className="container">
            <h3 data-animate="fade-up">Resume</h3>
            <div data-animate="fade-up">
              <p>You can download a PDF version of my resume for a full list of projects, coursework, and references.</p>
              <a className="btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download Resume (PDF)</a>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container">
            <h3 data-animate="fade-up">Get In Touch</h3>
            <div className="contact-grid">
              <div data-animate="fade-up">
                <p><strong>Email</strong><br/><a href="mailto:seidhabdul10@gmail.com">seidhabdul10@gmail.com</a></p>
                <p><strong>Phone</strong><br/><a href="tel:0714882750">0714882750</a></p>
                <p><strong>LinkedIn</strong><br/><a href="https://www.linkedin.com/in/seidh-abdullah-biomedicaltech" target="_blank" rel="noopener noreferrer">Seidh Abdullah</a></p>
                <p><strong>GitHub</strong><br/><a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">github.com/your-github</a></p>
                <p><strong>Address</strong><br/>I-06, Tzuchi, Siribopra, Hambantota</p>
              </div>
              <form className="contact-form" onSubmit={handleFormSubmit} data-animate="fade-up">
                <label>Full Name <input type="text" placeholder="Your name" required/></label>
                <label>Email Address <input type="email" placeholder="your@email.com" required/></label>
                <label>Subject <input type="text" placeholder="How can we help?" required/></label>
                <label>Message <textarea placeholder="Your message here..." required/></label>
                <button type="submit" className="btn">Send Message</button>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2025 Seidh Abdullah Adahan. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
