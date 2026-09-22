/**
 * Sakthi Dental Clinic - Client Scripts
 * Handles mobile drawer toggle, client-side booking validation, and accordion sync.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initAccordionSync();
  initAppointmentForm();
});

// Mobile Drawer Menu
function initMobileNavigation() {
  const toggleBtn = document.getElementById('nav-toggle') || document.querySelector('.hamburger');
  const navDrawer = document.getElementById('primary-nav') || document.querySelector('.nav-menu');

  if (!toggleBtn || !navDrawer) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !navDrawer.classList.contains('open');
    navDrawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', willOpen);
  });

  // Close nav drawer when tapping outside on mobile screens
  document.addEventListener('click', (e) => {
    if (navDrawer.classList.contains('open') && !navDrawer.contains(e.target) && e.target !== toggleBtn) {
      navDrawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Exclusive Accordion Behavior for older browsers
function initAccordionSync() {
  const faqEntries = document.querySelectorAll('.accordion details');
  if (!faqEntries.length) return;

  faqEntries.forEach((entry) => {
    entry.addEventListener('toggle', () => {
      if (entry.open) {
        faqEntries.forEach((other) => {
          if (other !== entry && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}

// Appointment Booking Form Handling
function initAppointmentForm() {
  const bookingForm = document.getElementById('appointment-form');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // Field references matching contact.html
    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');
    const dateField = document.getElementById('date');
    const feedbackBox = document.getElementById('form-message');

    // Error labels
    const nameErr = document.getElementById('name-error');
    const phoneErr = document.getElementById('phone-error');
    const dateErr = document.getElementById('date-error');

    // Reset current error status
    [nameErr, phoneErr, dateErr].forEach((el) => {
      if (el) el.style.display = 'none';
    });

    let hasErrors = false;

    // Name check
    if (!nameField || !nameField.value.trim()) {
      if (nameErr) nameErr.style.display = 'block';
      hasErrors = true;
    }

    // Phone validation (accepts 10 digits and standard international prefixes)
    const phonePattern = /^[0-9+\s-]{8,15}$/;
    if (!phoneField || !phonePattern.test(phoneField.value.trim())) {
      if (phoneErr) phoneErr.style.display = 'block';
      hasErrors = true;
    }

    // Preferred date check
    if (!dateField || !dateField.value) {
      if (dateErr) dateErr.style.display = 'block';
      hasErrors = true;
    }

    if (hasErrors) {
      if (feedbackBox) {
        feedbackBox.style.color = '#ef4444';
        feedbackBox.textContent = 'Please complete the required fields highlighted above.';
      }
      return;
    }

    // Success response for static prototype
    if (feedbackBox) {
      feedbackBox.style.color = 'var(--primary, #7c5ce7)';
      feedbackBox.textContent = 'Thank you! Your appointment request has been submitted successfully.';
    }

    bookingForm.reset();
  });
}