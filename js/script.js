// Smooth scrolling for nav links and buttons
document.addEventListener('DOMContentLoaded', function(){
  const nav = document.getElementById('mainNav');
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){ target.scrollIntoView({behavior:'smooth',block:'start'}); }
        // close mobile nav if open
        if(document.body.classList.contains('nav-open')){ toggleNav(); }
      }
    })
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ document.body.classList.add('dark'); themeToggle.textContent = '☀️'; }
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.body.classList.toggle('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', toggleNav);
  function toggleNav(){
    const navEl = document.querySelector('.nav');
    const open = !navEl.classList.contains('open');
    navEl.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  // Contact form
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const endpoint = form.dataset.formspree && form.dataset.formspree.trim();
    const fd = new FormData(form);
    msg.textContent = 'Sending...';
    if(endpoint){
      try{
        const res = await fetch(endpoint, {method:'POST', body:fd, headers:{'Accept':'application/json'}});
        if(res.ok){ msg.textContent = 'Thanks! Your message has been sent.'; form.reset(); }
        else { const data = await res.json().catch(()=>null); msg.textContent = data && data.error ? data.error : 'Submission failed.'; }
      }catch(err){ msg.textContent = 'Submission failed — please try again later.' }
      setTimeout(()=> msg.textContent = '', 6000);
    } else {
      // No Formspree endpoint provided; show demo message
      msg.textContent = 'Demo: message received locally (no endpoint configured).';
      form.reset();
      setTimeout(()=> msg.textContent = '', 6000);
    }
  });

  // Animate progress bars when in view
  const progEls = document.querySelectorAll('.progress');
  const obs = new IntersectionObserver(entries =>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const percent = el.getAttribute('data-percent') || '0';
        const fill = el.querySelector('.progress-fill');
        fill.style.width = percent + '%';
        fill.textContent = percent + '%';
        obs.unobserve(el);
      }
    })
  },{threshold:0.25});
  progEls.forEach(p=>obs.observe(p));

  // Project modal behavior
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalLink = document.getElementById('modalLink');
  document.querySelectorAll('.view-project').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.project-card');
      if(!card) return;
      modalTitle.textContent = card.dataset.title || '';
      modalDesc.textContent = card.dataset.desc || '';
      modalLink.href = card.dataset.link || '#';
      modalLink.textContent = card.dataset.link && card.dataset.link !== '#' ? 'Open Project' : 'Close';
      modal.classList.remove('hidden');
    })
  });
  document.querySelectorAll('.modal-close').forEach(b=>b.addEventListener('click', ()=> modal.classList.add('hidden')));
  modal.addEventListener('click', (ev)=>{ if(ev.target === modal) modal.classList.add('hidden'); });
  document.addEventListener('keydown', (ev)=>{ if(ev.key === 'Escape') modal.classList.add('hidden'); });

  // highlight current nav link while scrolling
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#mainNav a');
  const sectObs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector(`#mainNav a[href="#${id}"]`);
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    })
  },{threshold:0.45});
  sections.forEach(s=>sectObs.observe(s));

  // reveal animations for sections
  const reveals = document.querySelectorAll('.section, .hero');
  const rObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); rObs.unobserve(e.target); }
    })
  },{threshold:0.12});
  reveals.forEach(r=>{ r.classList.add('reveal'); rObs.observe(r); });

});