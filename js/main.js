// Set current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Projects data - filenames match your assets folder
const projects = [
  {
    title: 'Network Penetration Lab',
    desc: 'Simulated penetration testing environment using Kali and Metasploit.',
    img: 'assets/project1.webp',
    link: '#'
  },
  {
    title: 'Network Traffic Analyzer',
    desc: 'Python tool to parse pcap files and extract indicators.',
    img: 'assets/project2.jpg',
    link: '#'
  },
  {
    title: 'Intro to Cryptography',
    desc: 'Beginner series on cryptography fundamentals and public key systems.',
    img: 'assets/project3.jpeg',
    link: '#'
  }
];

// Render projects dynamically
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

// Theme toggle with preference saved
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

/* ====== CYBER BACKGROUND SCRIPTS ====== */
(function cyberBackground(){
  const wrapper = document.getElementById('bg-canvas') || document.body;
  wrapper.innerHTML = '';

  // grid canvas
  const gridCanvas = document.createElement('canvas');
  gridCanvas.className = 'cyber-grid-canvas';
  gridCanvas.style.position = 'fixed';
  gridCanvas.style.inset = '0';
  gridCanvas.style.zIndex = '0';
  gridCanvas.style.pointerEvents = 'none';
  wrapper.appendChild(gridCanvas);

  // matrix canvas
  const matrixCanvas = document.createElement('canvas');
  matrixCanvas.className = 'cyber-matrix-canvas';
  matrixCanvas.style.position = 'fixed';
  matrixCanvas.style.inset = '0';
  matrixCanvas.style.zIndex = '0';
  matrixCanvas.style.pointerEvents = 'none';
  wrapper.appendChild(matrixCanvas);

  // overlays
  const scan = document.createElement('div');
  scan.className = 'cyber-scanlines';
  document.body.appendChild(scan);
  const vign = document.createElement('div');
  vign.className = 'cyber-vignette';
  document.body.appendChild(vign);

  const gctx = gridCanvas.getContext('2d');
  const mctx = matrixCanvas.getContext('2d');

  let w = gridCanvas.width = matrixCanvas.width = innerWidth;
  let h = gridCanvas.height = matrixCanvas.height = innerHeight;

  window.addEventListener('resize', ()=>{
    w = gridCanvas.width = matrixCanvas.width = innerWidth;
    h = gridCanvas.height = matrixCanvas.height = innerHeight;
    initGrid();
    initMatrix();
  });

  /* GRID */
  let gridLines = [];
  function initGrid(){
    gridLines = [];
    const cols = Math.max(6, Math.round(w / 120));
    const rows = Math.max(6, Math.round(h / 120));
    for(let i=0;i<=cols;i++){
      const x = i * (w/cols);
      gridLines.push({x, offset: Math.random()*40});
    }
    for(let j=0;j<=rows;j++){
      const y = j * (h/rows);
      gridLines.push({y, offset: Math.random()*40, horizontal:true});
    }
  }
  function drawGrid(t){
    gctx.clearRect(0,0,w,h);
    const grad = gctx.createLinearGradient(0,0,w,h);
    grad.addColorStop(0,'rgba(0,20,40,0.12)');
    grad.addColorStop(1,'rgba(10,6,20,0.06)');
    gctx.fillStyle = grad;
    gctx.fillRect(0,0,w,h);

    gctx.lineWidth = 1;
    gridLines.forEach((ln,i)=>{
      const pulse = (Math.sin((t/1000) + i) + 1) / 2;
      gctx.strokeStyle = `rgba(0,230,255,${0.02 + 0.06*pulse})`;
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

    const cx = w * 0.12, cy = h * 0.18;
    const rg = gctx.createRadialGradient(cx,cy,0,cx,cy,400);
    rg.addColorStop(0,'rgba(0,230,255,0.06)');
    rg.addColorStop(1,'rgba(0,230,255,0)');
    gctx.fillStyle = rg;
    gctx.fillRect(0,0,w,h);
  }

  /* MATRIX RAIN */
  let columns = [];
  function initMatrix(){
    columns = [];
    const fontSize = Math.max(12, Math.floor(w / 120));
    const cols = Math.floor(w / fontSize);
    for(let i=0;i<cols;i++){
      columns[i] = {
        x: i * fontSize,
        y: Math.random() * h,
        speed: 0.6 + Math.random()*1.6,
        size: fontSize
      };
    }
    mctx.font = `${Math.max(12, Math.floor(w / 120))}px monospace`;
    mctx.textBaseline = 'top';
  }
  function drawMatrix(){
    mctx.fillStyle = 'rgba(0,0,0,0.12)';
    mctx.fillRect(0,0,w,h);

    columns.forEach(col=>{
      const text = String.fromCharCode(0x30A0 + Math.random()*96);
      const hue = 180 + Math.random()*120;
      mctx.fillStyle = `hsla(${hue},100%,60%,0.12)`;
      mctx.fillText(text, col.x, col.y);
      mctx.fillStyle = `rgba(0,230,255,0.9)`;
      mctx.fillText(text, col.x, col.y - (col.size*0.2));
      col.y += col.speed * (1 + Math.random()*0.6);
      if(col.y > h + 50) col.y = -10 - Math.random()*100;
    });
  }

  initGrid();
  initMatrix();

  let last = performance.now();
  function loop(now){
    drawGrid(now);
    drawMatrix();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})();
