// -------------------------
// THEME TOGGLE
// -------------------------
const themeToggle = document.getElementById("theme-toggle");

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");

  // Update icon
  themeToggle.innerHTML = darkMode
    ? '<i class="fa-regular fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Save preference
  localStorage.setItem("theme", darkMode ? "dark" : "light");
});


// -------------------------
// QUICK EXIT FEATURE
// -------------------------
const quickExitURL = "https://www.google.com/search?q=weather+today&oq=weather+today&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDIwNzBqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8&sei=XmIKabXjNuCr0PEP4cuqoA4&safe=active&ssui=on&zx=1762288224072&no_sw_cr=1";

// Quick Exit button
document.getElementById("quick-exit").addEventListener("click", () => {
  window.location.href = quickExitURL;
});

// Show Quick Exit Modal (Desktop Only)
window.addEventListener("load", () => {
  const modal = document.getElementById("quick-exit-modal");
  if (window.innerWidth > 768) {
    modal.classList.add("show");
  }
});

// Dismiss modal
document.getElementById("dismiss-modal").addEventListener("click", () => {
  const modal = document.getElementById("quick-exit-modal");
  modal.classList.remove("show");
});


// -------------------------
// TRIPLE ESC TO EXIT
// -------------------------
let escPressCount = 0;
let escTimer;

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    escPressCount++;
    clearTimeout(escTimer);

    // Reset count after 1.5 seconds
    escTimer = setTimeout(() => {
      escPressCount = 0;
    }, 1500);

    // Trigger redirect after 3 quick presses
    if (escPressCount === 3) {
      window.location.href = quickExitURL;
    }
  }
});


const backToTop = document.getElementById("back-to-top");
const floatingButtons = document.getElementById("floating-buttons");
let holdTimer;

// Show back-to-top on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
    floatingButtons.classList.add("compact");
  } else {
    backToTop.classList.remove("visible");
    floatingButtons.classList.remove("compact");
    floatingButtons.classList.remove("reveal");
  }
});

// Smooth scroll to top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Only allow hold-to-reveal on mobile
function isMobile() {
  return window.matchMedia("(max-width: 768px)").matches;
}

backToTop.addEventListener("mousedown", () => {
  if (isMobile()) {
    holdTimer = setTimeout(() => {
      floatingButtons.classList.toggle("reveal");
    }, 600);
  }
});

["mouseup", "mouseleave", "touchend"].forEach(evt =>
  backToTop.addEventListener(evt, () => clearTimeout(holdTimer))
);

/* Counselors scheduling modal + mailto fallback */
document.querySelectorAll(".schedule-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const counselor = btn.getAttribute("data-counselor");
    const calendly = btn.getAttribute("data-calendly");
    openBookingModal(counselor, calendly);
  });
});

const modal = document.getElementById("booking-modal");
const modalClose = modal.querySelector(".modal-close");
const bookingForm = document.getElementById("booking-form");
const bookingCounselorText = document.getElementById("booking-counselor");
const formCounselorInput = document.getElementById("form-counselor");
const openCalendlyLink = document.getElementById("open-calendly");

function openBookingModal(counselorName, calendlyUrl) {
  bookingCounselorText.textContent = `For: ${counselorName}`;
  formCounselorInput.value = counselorName;
  openCalendlyLink.href = calendlyUrl || "#";
  modal.setAttribute("aria-hidden", "false");
  // focus first field
  modal.querySelector('input[name="name"]').focus();
}

function closeBookingModal() {
  modal.setAttribute("aria-hidden", "true");
  bookingForm.reset();
}

modalClose.addEventListener("click", closeBookingModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeBookingModal();
});

// Mailto fallback: sends a formatted email to scheduling inbox
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(bookingForm);
  const counselor = form.get("counselor");
  const name = form.get("name");
  const email = form.get("email");
  const phone = form.get("phone") || "N/A";
  const pref = form.get("pref") || "No preference";
  const reason = form.get("reason") || "N/A";

  const subject = encodeURIComponent(`Appointment request — ${counselor}`);
  const body = encodeURIComponent(
    `Counselor: ${counselor}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred: ${pref}\nReason: ${reason}`
  );

  // Replace with your real scheduling inbox
  const mailTo = `mailto:example@balancepoint.org?subject=${subject}&body=${body}`;
  window.location.href = mailTo;

  // Optionally close modal after invoking mailto
  setTimeout(closeBookingModal, 600);
});
