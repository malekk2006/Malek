// set year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// projects data (use your images)
const projects = [
  { title: 'Network Penetration Lab', desc: 'Simulated pentest environment with Kali and Metasploit.', img: 'assets/project1.webp', link: '#' },
  { title: 'Network Traffic Analyzer', desc: 'Python tool to parse pcap and extract indicators.', img: 'assets/project2.jpg', link: '#' },
  { title: 'Intro to Cryptography', desc: 'Beginner series on cryptography fundamentals.', img: 'assets/project3.jpeg', link: '#' }
];

// render projects
const projectsList = document.getElementById('projects-list');
if (projectsList) {
  projects.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'project-card';
    el.innerHTML = `<img src="${p.img}" alt="${p.title}"><h3>${p.title}</h3><p>${p.desc}</p><div style="margin-top:auto"><a class="btn" href="${p.link}">View</a></div>`;
    projectsList.appendChild(el);
  });
}

// mobile menu
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', ()=>{
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
  });
}

// theme toggle
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
if (saved === 'light') document.body.classList.add('light');
if (themeToggle) {
  themeToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
  });
  themeToggle.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

// subtle animated background using canvas
(function bgCanvas(){
  const root = document.getElementById('bg-root');
  if (!root) return;
  const c = document.createElement('canvas');
  c.style.position = 'fixed'; c.style.inset = '0'; c.style.zIndex = '0'; c.style.pointerEvents = 'none';
  root.appendChild(c);
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth, h = c.height = innerHeight;
  window.addEventListener('resize', ()=>{ w = c.width = innerWidth; h = c.height = innerHeight; });

  const nodes = [];
  for (let i=0;i<60;i++){
    nodes.push({ x: Math.random()*w, y: Math.random()*h, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r: Math.random()*1.8+0.6, hue: 180+Math.random()*140 });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    // soft gradient
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0,'rgba(0,20,40,0.06)');
    g.addColorStop(1,'rgba(10,6,20,0.02)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // lines between close nodes
    for (let i=0;i<nodes.length;i++){
      for (let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.hypot(dx,dy);
        if (d < 160){
          ctx.strokeStyle = `rgba(0,230,255,${0.06*(1 - d/160)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }

    // draw nodes
    nodes.forEach(n=>{
      n.x += n.vx; n.y += n.vy;
      if (n.x<0) n.x = w; if (n.x>w) n.x = 0;
      if (n.y<0) n.y = h; if (n.y>h) n.y = 0;
      const rg = ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*8);
      rg.addColorStop(0, `hsla(${n.hue},100%,60%,0.12)`);
      rg.addColorStop(1, `hsla(${n.hue},100%,60%,0)`);
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();
