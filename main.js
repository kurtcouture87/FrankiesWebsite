document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
      mobileToggle.innerHTML = isExpanded ? '✕' : '☰';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '☰';
        }
      });
    });
  }

  // 2. Schedule Filtering
  const pillBtns = document.querySelectorAll('.pill-btn');
  const scheduleRows = document.querySelectorAll('.schedule-row');

  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all pills
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      scheduleRows.forEach(row => {
        const studio = row.getAttribute('data-studio');
        if (filter === 'all' || studio === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 3. Booking Modal
  const modalBackdrop = document.getElementById('booking-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalStudioName = document.getElementById('modal-studio-name');
  const modalClassTitle = document.getElementById('modal-class-title');
  const bookBtns = document.querySelectorAll('.book-class-btn');

  function openModal(studio, classTitle) {
    if (modalStudioName) modalStudioName.textContent = studio;
    if (modalClassTitle) modalClassTitle.textContent = classTitle;
    if (modalBackdrop) modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (modalBackdrop) modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const studio = btn.getAttribute('data-studio-name') || 'Studio Class';
      const title = btn.getAttribute('data-class-name') || 'Jivamukti Open';
      openModal(studio, title);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById('inquiry-form');
  const formSuccess = document.getElementById('form-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 5000);
        }
      }, 600);
    });
  }

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id], main[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
});
