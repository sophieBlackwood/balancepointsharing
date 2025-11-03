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

// Quick Exit Feature: Press ESC 3 times to go to Google
let escPressCount = 0;
let escTimer;

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    escPressCount++;
    clearTimeout(escTimer);

    escTimer = setTimeout(() => {
      escPressCount = 0;
    }, 1500);

    if (escPressCount === 3) {
      window.location.href = "https://www.google.com";
    }
  }
});

