const themeToggle = document.getElementById("theme-toggle");

// Toggle theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const darkMode = document.body.classList.contains("dark");

  // Change icon
  themeToggle.innerHTML = darkMode
    ? '<i class="fa-regular fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  // Save preference
  localStorage.setItem("theme", darkMode ? "dark" : "light");
});

// Remember saved theme
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

let escCount = 0;
let timer;

// -------------------------
// QUICK EXIT FEATURE
// -------------------------

// Redirect to Google when button clicked
document.getElementById("quick-exit").addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});

// Triple ESC to exit
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
      window.location.href = "https://www.google.com";
    }
  }
});
