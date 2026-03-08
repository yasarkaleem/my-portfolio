// ----- Custom Cursor -----
const cursor = document.getElementById('cursor');
const trail  = document.getElementById('trail');

// Hide both elements until the mouse actually moves into the page
cursor.style.opacity = '0';
trail.style.opacity  = '0';

document.addEventListener('mousemove', (e) => {
  // Reveal on first move
  cursor.style.opacity = '1';
  trail.style.opacity  = '1';

  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    trail.style.left = e.clientX + 'px';
    trail.style.top  = e.clientY + 'px';
  }, 80);
});

// Hide when the mouse leaves the browser window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  trail.style.opacity  = '0';
});

// Show again when the mouse re-enters
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  trail.style.opacity  = '1';
});

// ----- Scroll Reveal -----
// Only animate if IntersectionObserver is supported and NOT a file:// origin
// (Safari blocks IntersectionObserver on file:// URLs)
const isFileProtocol = window.location.protocol === 'file:';
const supportsIO = 'IntersectionObserver' in window;

if (supportsIO && !isFileProtocol) {
  // Add .animate class so elements start hidden
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('animate'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Safety fallback: force-show anything still hidden after 2s
  setTimeout(() => {
    document.querySelectorAll('.reveal.animate:not(.visible)').forEach((el) => {
      el.classList.add('visible');
    });
  }, 2000);
}
// If file:// or no IO support → elements stay visible (opacity: 1) by default

// ----- Skill Bar Animation -----
if (supportsIO) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-card__fill').forEach((fill) => {
          const targetWidth = fill.getAttribute('data-width');
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.transition = 'width 1.2s ease';
            fill.style.width = targetWidth;
          }, 200);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.skills-grid').forEach((el) => skillObserver.observe(el));
}