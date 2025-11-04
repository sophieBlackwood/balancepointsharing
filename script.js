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
