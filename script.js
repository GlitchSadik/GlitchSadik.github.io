// === VALORANT PORTFOLIO SCRIPT ===

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// === RIGHT PANEL TOGGLE ===
const layoutEl = document.querySelector('.layout');
const rightPanelEl = document.getElementById('rightPanel');
const rightPanelToggleEl = document.getElementById('rightPanelToggle');

function setRightPanelCollapsed(collapsed) {
  if (!layoutEl || !rightPanelEl || !rightPanelToggleEl) return;
  layoutEl.classList.toggle('has-collapsed-panel', collapsed);
  rightPanelEl.classList.toggle('is-collapsed', collapsed);
  rightPanelToggleEl.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  try {
    localStorage.setItem('rightPanelCollapsed', collapsed ? '1' : '0');
  } catch {
    // ignore
  }
}

if (layoutEl && rightPanelEl && rightPanelToggleEl) {
  let initialCollapsed = false;
  try {
    initialCollapsed = localStorage.getItem('rightPanelCollapsed') === '1';
  } catch {
    initialCollapsed = false;
  }
  setRightPanelCollapsed(initialCollapsed);

  rightPanelToggleEl.addEventListener('click', () => {
    const collapsed = layoutEl.classList.contains('has-collapsed-panel');
    setRightPanelCollapsed(!collapsed);
  });
}

// === SECTION NAVIGATION ===
const menuItems = document.querySelectorAll('.menu-item');
const topbarLinks = document.querySelectorAll('.topbar-link');
const sections = document.querySelectorAll('.section');

function showSection(sectionId) {
  // Hide all sections
  sections.forEach(section => section.classList.remove('active'));
  
  // Show target section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
  }
  
  // Update menu items
  menuItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + sectionId) {
      item.classList.add('active');
    }
  });
  
  // Update topbar links
  topbarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });
}

// Sidebar menu clicks
menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = item.getAttribute('href').substring(1);
    showSection(sectionId);
  });
});

// Topbar link clicks
topbarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    showSection(sectionId);
  });
});

// Handle in-page links (like buttons)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const sectionId = href.substring(1);
      showSection(sectionId);
    }
  });
});

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', (e) => {
  const activeSection = document.querySelector('.section.active');
  const sectionIds = Array.from(sections).map(s => s.id);
  const currentIndex = sectionIds.indexOf(activeSection?.id);
  
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const nextIndex = (currentIndex + 1) % sectionIds.length;
    showSection(sectionIds[nextIndex]);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
    showSection(sectionIds[prevIndex]);
  }
});

// === PARTICLE ANIMATION ENHANCEMENT ===
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
  // Randomize initial positions slightly
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  particle.style.left = randomX + '%';
  particle.style.top = randomY + '%';
  particle.style.animationDelay = (index * 0.8) + 's';
});

// === HOVER EFFECTS FOR PROJECT CARDS ===
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'var(--accent-red)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = 'var(--border)';
  });
});

// === INITIALIZE ===
// Show home section by default
showSection('home');
