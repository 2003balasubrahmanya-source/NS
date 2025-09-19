// File: scripts/about.js
// Purpose: Dedicated JavaScript for About Us page of NS Enterprises - Career Compass
// Author: NS Enterprises Web Team
// Last updated: 2025-09-19
// Description: Handles navigation, accessibility, section animation, and chat popup

// Section fade-in animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('main section').forEach(section => {
  observer.observe(section);
});

// Nav toggle accessibility and enhancements
function toggleNavMenu(btn) {
  const nav = document.getElementById('mainnav');
  const overlay = document.getElementById('nav-overlay');
  const expanded = nav.classList.toggle('show');
  btn.setAttribute('aria-expanded', expanded);
  if (overlay) overlay.classList.toggle('show', expanded);
  if (expanded) {
    nav.focus();
    trapFocus(nav);
  } else {
    releaseFocusTrap();
  }
}

function closeNavMenu() {
  const nav = document.getElementById('mainnav');
  const overlay = document.getElementById('nav-overlay');
  nav.classList.remove('show');
  if (overlay) overlay.classList.remove('show');
  releaseFocusTrap();
  // Set focus back to menu button
  const btn = document.querySelector('.nav-toggle');
  if (btn) btn.focus();
}

// Close menu on link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 600) closeNavMenu();
    });
  });
});

// Focus trap for accessibility
let focusTrapEl = null;
let focusTrapHandler = null;
function trapFocus(el) {
  focusTrapEl = el;
  const focusable = el.querySelectorAll('a, button:not([disabled]), [tabindex="0"]');
  if (!focusable.length) return;
  let first = focusable[0], last = focusable[focusable.length-1];
  focusTrapHandler = function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    } else if (e.key === 'Escape') {
      closeNavMenu();
    }
  };
  el.addEventListener('keydown', focusTrapHandler);
}
function releaseFocusTrap() {
  if (focusTrapEl && focusTrapHandler) {
    focusTrapEl.removeEventListener('keydown', focusTrapHandler);
    focusTrapEl = null;
    focusTrapHandler = null;
  }
}

// Last updated date
window.addEventListener('DOMContentLoaded', function() {
  const el = document.getElementById('last-updated');
  if (el) {
    const d = new Date();
    el.textContent = d.toLocaleDateString('en-GB', {year:'numeric', month:'long', day:'numeric'});
  }
});

// Chat popup
function toggleChatPopup() {
  const popup = document.getElementById("chat-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
  if (popup.style.display === "flex") {
    popup.setAttribute('aria-modal', 'true');
    popup.setAttribute('role', 'dialog');
  } else {
    popup.removeAttribute('aria-modal');
    popup.removeAttribute('role');
  }
}
// Keyboard accessibility for chat button
window.addEventListener('DOMContentLoaded', function() {
  const chatBtn = document.getElementById('chat-button');
  if (chatBtn) {
    chatBtn.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleChatPopup();
      }
    });
  }
});
