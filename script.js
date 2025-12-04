// Basic interactions: theme toggle, language toggle, skills animation, year
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeToggle');
  const langBtn = document.getElementById('langToggle');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    themeBtn.textContent = document.body.classList.contains('light') ? 'زر الظلام' : 'زر الضوء';
  });

  // Language toggle simple implementation
  let lang = 'ar';
  langBtn.addEventListener('click', () => {
    if(lang === 'ar'){
      lang = 'en';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      langBtn.textContent = 'ع';
      // Simple text swaps
      document.querySelector('.hero-title').textContent = 'Hello — I am Malek Alastal';
      document.querySelector('.hero-sub').textContent = 'Student and Cybersecurity enthusiast. I share resources and projects.';
      document.querySelector('.btn.primary').textContent = 'Browse';
      document.querySelector('.btn.outline').textContent = 'Contact via WhatsApp';
    } else {
      lang = 'ar';
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      langBtn.textContent = 'EN';
      document.querySelector('.hero-title').textContent = 'مرحباً — أنا مالك العستال';
      document.querySelector('.hero-sub').textContent = 'طالب ومتخصص في الأمن السيبراني. أشارك موارد، مشاريع، وروابط تعليمية مفيدة.';
      document.querySelector('.btn.primary').textContent = 'تصفح أعمالي';
      document.querySelector('.btn.outline').textContent = 'تحميل السيرة أو تواصل واتس اب';
    }
  });

  // Skills animation
  const fills = document.querySelectorAll('.skill-fill');
  const animateSkills = () => {
    fills.forEach(f => {
      const val = f.getAttribute('data-value') || 0;
      f.style.width = val + '%';
    });
  };
  // Trigger when in view
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) animateSkills(); });
  }, {threshold: 0.3});
  const skillsSection = document.getElementById('skills');
  if(skillsSection) obs.observe(skillsSection);

  // Simple animation for hero image
  const heroImg = document.querySelector('.hero-image');
  if(heroImg){
    heroImg.style.transform = 'translateY(0)';
    heroImg.style.opacity = 1;
  }
});
