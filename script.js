// Mobile navigation toggle
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close nav when a link is clicked (on small screens)
  mainNav.addEventListener("click", (event) => {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest(".nav-link") &&
      mainNav.classList.contains("is-open")
    ) {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Smooth scrolling for same-page nav links (for older browsers that ignore CSS smooth scroll)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const anchor = event.currentTarget;
    if (!(anchor instanceof HTMLAnchorElement)) return;

    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Simple contact form validation and status messaging
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

function setFormStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove("form-status--success", "form-status--error");
  if (type === "success") {
    formStatus.classList.add("form-status--success");
  } else if (type === "error") {
    formStatus.classList.add("form-status--error");
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const eventDateInput = document.getElementById("event-date");
    const guestsInput = document.getElementById("guests");
    const eventTypeSelect = document.getElementById("event-type");
    const messageInput = document.getElementById("message");

    let isValid = true;
    const errors = [];

    const name = nameInput && "value" in nameInput ? nameInput.value.trim() : "";
    const email =
      emailInput && "value" in emailInput ? emailInput.value.trim() : "";
    const phone =
      phoneInput && "value" in phoneInput ? phoneInput.value.trim() : "";
    const eventDate =
      eventDateInput && "value" in eventDateInput
        ? eventDateInput.value.trim()
        : "";
    const guestsRaw =
      guestsInput && "value" in guestsInput ? guestsInput.value.trim() : "";
    const eventType =
      eventTypeSelect && "value" in eventTypeSelect
        ? eventTypeSelect.value.trim()
        : "";
    const message =
      messageInput && "value" in messageInput ? messageInput.value.trim() : "";

    if (!name) {
      isValid = false;
      errors.push("Please enter your name.");
    }

    if (!email) {
      isValid = false;
      errors.push("Please enter your email address.");
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        isValid = false;
        errors.push("Please enter a valid email address.");
      }
    }

    if (!eventDate) {
      isValid = false;
      errors.push("Please select an event date.");
    }

    const guests = parseInt(guestsRaw, 10);
    if (!guestsRaw || Number.isNaN(guests) || guests <= 0) {
      isValid = false;
      errors.push("Please enter a valid guest count.");
    }

    if (!eventType) {
      isValid = false;
      errors.push("Please choose an event type.");
    }

    if (!message || message.length < 10) {
      isValid = false;
      errors.push("Please tell us a bit more about your event.");
    }

    if (!isValid) {
      setFormStatus(errors.join(" "), "error");
      return;
    }

    // Simulate a successful submit for now (front-end only)
    contactForm.reset();
    setFormStatus(
      "Thank you! Your inquiry has been received. We’ll be in touch shortly.",
      "success"
    );
  });
}

// Set footer year automatically
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = String(new Date().getFullYear());
}

