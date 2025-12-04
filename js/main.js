// Preloader hide
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    pre.style.opacity = '0';
    setTimeout(()=> pre.remove(), 600);
  }
});

// Set current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Projects data
const projects = [
  { title: 'Network Penetration Lab', desc: 'Simulated penetration testing environment using Kali and Metasploit.', img: 'assets/project1.webp', link: '#' },
  { title: 'Network Traffic Analyzer', desc: 'Python tool to parse pcap files and extract indicators.', img: 'assets/project2.jpg', link: '#' },
  { title: 'Intro to Cryptography', desc: 'Beginner series on cryptography fundamentals and public key systems.', img: 'assets/project3.jpeg', link: '#' }
];

// Render projects
const projectsList = document.getElementById('projects-list');
if (projectsList) {
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" loading="lazy">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <div style="margin-top:auto;">
        <a class="btn" href="${p.link}">View</a>
      </div>
    `;
    projectsList.appendChild(card);
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    if (nav.style.display === 'flex') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '8px';
    }
  });
}

// Theme toggle with saved preference
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
if (savedTheme === 'light') document.body.classList.add('light');
updateThemeIcon();
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon();
  });
}
function updateThemeIcon() {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

/* ===== CYBER BACKGROUND: particles + soft neon grid + matrix rain ===== */
(function cyberBackground(){
  const wrapper = document.getElementById('bg-canvas') || document.body;
  wrapper.innerHTML = '';

  // create canvases
  const gridCanvas = document.createElement('canvas');
  const particleCanvas = document.createElement('canvas');
  const matrixCanvas = document.createElement('canvas');

  [gridCanvas, particleCanvas, matrixCanvas].forEach(c=>{
    c.style.position = 'fixed';
    c.style.inset = '0';
    c.style.zIndex = '0';
    c.style.pointerEvents = 'none';
    wrapper.appendChild(c);
  });

  const gctx = gridCanvas.getContext('2d');
  const pctx = particleCanvas.getContext('2d');
  const mctx = matrixCanvas.getContext('2d');

  let w = gridCanvas.width = particleCanvas.width = matrixCanvas.width = innerWidth;
  let h = gridCanvas.height = particleCanvas.height = matrixCanvas.height = innerHeight;

  window.addEventListener('resize', ()=>{
    w = gridCanvas.width = particleCanvas.width = matrixCanvas.width = innerWidth;
    h = gridCanvas.height = particleCanvas.height = matrixCanvas.height = innerHeight;
    initParticles();
    initMatrix();
  });

  /* Particles */
  let particles = [];
  function initParticles(){
    particles = [];
    const count = Math.max(30, Math.round((w*h)/120000));
    for(let i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6+0.6,
        vx: (Math.random()-0.5)*0.4,
        vy: (Math.random()-0.5)*0.4,
        hue: 180 + Math.random()*140,
        alpha: 0.06 + Math.random()*0.12
      });
    }
  }

  function drawParticles(){
    pctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x = w; if(p.x>w) p.x = 0;
      if(p.y<0) p.y = h; if(p.y>h) p.y = 0;
      const g = pctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0, `hsla(${p.hue},100%,60%,${p.alpha})`);
      g.addColorStop(1, `hsla(${p.hue},100%,60%,0)`);
      pctx.fillStyle = g;
      pctx.beginPath();
      pctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      pctx.fill();
    });
  }

  /* Soft neon grid */
  let gridLines = [];
  function initGrid(){
    gridLines = [];
    const cols = Math.max(6, Math.round(w / 160));
    const rows = Math.max(6, Math.round(h / 160));
    for(let i=0;i<=cols;i++){
      gridLines.push({x: i * (w/cols), offset: Math.random()*40});
    }
    for(let j=0;j<=rows;j++){
      gridLines.push({y: j * (h/rows), offset: Math.random()*40, horizontal:true});
    }
  }
  function drawGrid(t){
    gctx.clearRect(0,0,w,h);
    gctx.lineWidth = 1;
    gridLines.forEach((ln,i)=>{
      const pulse = (Math.sin((t/1000) + i) + 1) / 2;
      gctx.strokeStyle = `rgba(0,230,255,${0.02 + 0.05*pulse})`;
      gctx.beginPath();
      if(ln.horizontal){
        const y = ln.y + Math.sin((t/1200)+ln.offset)*6;
        gctx.moveTo(0,y); gctx.lineTo(w,y);
      } else {
        const x = ln.x + Math.sin((t/1200)+ln.offset)*6;
        gctx.moveTo(x,0); gctx.lineTo(x,h);
      }
      gctx.stroke();
    });
  }

  /* Matrix rain (subtle) */
  let columns = [];
  function initMatrix(){
    columns = [];
    const fontSize = Math.max(12, Math.floor(w / 140));
    const cols = Math.floor(w / fontSize);
    for(let i=0;i<cols;i++){
      columns[i] = { x: i * fontSize, y: Math.random() * h, speed: 0.6 + Math.random()*1.6, size: fontSize };
    }
    mctx.font = `${Math.max(12, Math.floor(w / 140))}px monospace`;
    mctx.textBaseline = 'top';
  }
  function drawMatrix(){
    mctx.fillStyle = 'rgba(0,0,0,0.12)';
    mctx.fillRect(0,0,w,h);
    columns.forEach(col=>{
      const text = String.fromCharCode(0x30A0 + Math.random()*96);
      mctx.fillStyle = `rgba(0,230,255,0.08)`;
      mctx.fillText(text, col.x, col.y);
      col.y += col.speed * (1 + Math.random()*0.6);
      if(col.y > h + 50) col.y = -10 - Math.random()*100;
    });
  }

  initParticles();
  initGrid();
  initMatrix();

  function loop(now){
    drawGrid(now);
    drawParticles();
    drawMatrix();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})();
