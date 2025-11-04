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
const quickExitURL = "https://www.google.com/search?btnI=I&q=weather";

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


// -------------------------
// BACK TO TOP BUTTON
// -------------------------
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// -------------------------
// QUICK ACTIONS MENU (Mobile Support)
// -------------------------
const toggleButton = document.getElementById("quick-actions-toggle");
const actionsMenu = document.getElementById("actions-menu");

if (toggleButton && actionsMenu) {
  toggleButton.addEventListener("click", () => {
    actionsMenu.classList.toggle("show");
    toggleButton.classList.toggle("active");
  });
}
