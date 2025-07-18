document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const isDark = document.body.classList.contains('dark-mode');

  if (window.scrollY > 100) {
    header.style.background = isDark ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = isDark ? 'var(--header-bg-dark)' : 'var(--header-bg-light)';
    header.style.backdropFilter = 'none';
  }
});

function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(counter => {
    const target = +counter.getAttribute('data-count');
    let current = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const value = Math.floor(progress * target);
      counter.innerText = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats');
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, 
    }
  );

  if (statsSection) {
    observer.observe(statsSection);
  }
});


document.addEventListener('DOMContentLoaded', animateCounters);


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
      if (entry.target.classList.contains('stats')) {
        animateCounters();
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.feature-card, .course-card, .instructor-card, .testimonial-card, .stats')
  .forEach(el => observer.observe(el));

const mobileMenuBtn = document.createElement('button');
Object.assign(mobileMenuBtn.style, {
  display: 'none',
  background: 'none',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
  color: '#333'
});
mobileMenuBtn.innerHTML = '☰';

const nav = document.querySelector('nav');
nav.insertBefore(mobileMenuBtn, nav.children[2]);

function checkMobile() {
  const navLinks = document.querySelector('.nav-links');
  if (window.innerWidth <= 768) {
    mobileMenuBtn.style.display = 'block';
    navLinks.style.display = 'none';
  } else {
    Object.assign(navLinks.style, {
      display: 'flex',
      flexDirection: 'row',
      position: 'static',
      width: 'auto',
      background: 'none',
      boxShadow: 'none',
      padding: '0'
    });
    mobileMenuBtn.style.display = 'none';
  }
}

mobileMenuBtn.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const isDark = document.body.classList.contains('dark-mode');

  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    Object.assign(navLinks.style, {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      padding: '1rem',
      zIndex: '1000',
      background: isDark ? 'var(--header-bg-dark)' : 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    });
  }
});

window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = 'none';
  });
});

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-content h2');
  setTimeout(() => typeWriter(heroTitle, heroTitle.textContent, 80), 500);
});



(function preApplyTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else {
    document.documentElement.classList.remove('dark-mode');
  }
})();


// slider animation

function applyThemeAndIcon(isDark) {
  const icon = document.getElementById('theme-icon');
  const newIcon = isDark ? 'sun' : 'moon';

  document.documentElement.classList.toggle('dark-mode', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  icon.setAttribute('data-lucide', newIcon);
  lucide.createIcons();
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDarkNow = !document.documentElement.classList.contains('dark-mode');
  applyThemeAndIcon(isDarkNow);
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

(function setupHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.getElementById('next-slide');
  const prevBtn = document.getElementById('prev-slide');
  let current = 0;
  let interval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');

      const content = slide.querySelector('.hero-content');
      if (content) {
        content.style.animation = 'none';
        void content.offsetWidth;
      }
    });

    const newSlide = slides[index];
    newSlide.classList.add('active');

    const activeContent = newSlide.querySelector('.hero-content');
    if (activeContent) {
      activeContent.style.animation = 'fadeUp 0.8s ease-out forwards';
    }
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 10000); 
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
  });

  showSlide(current);
  interval = setInterval(nextSlide, 10000);
})();

document.addEventListener('DOMContentLoaded', function () {
    const joinNowButton = document.querySelector('.join-now');
    const joinPopularButtons = document.querySelectorAll('.join-btn-popular');
    const enquiryModal = document.getElementById('enquiryModal');
    const closeButton = document.querySelector('.close-button');

    function showModal() {
        enquiryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        enquiryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    if (joinNowButton) {
        joinNowButton.addEventListener('click', showModal);
    }

    joinPopularButtons.forEach(function (button) {
        button.addEventListener('click', showModal);
    });

    if (closeButton) {
        closeButton.addEventListener('click', hideModal);
    }

    window.addEventListener('click', function (event) {
        if (event.target === enquiryModal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && enquiryModal.style.display === 'flex') {
            hideModal();
        }
    });
});

