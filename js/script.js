document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const scrollToTopButton = document.getElementById("scroll-to-top");
  const themeToggleButton = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const html = document.documentElement;

  // Toggle navigation menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
    navMenu.setAttribute("data-aos", navMenu.classList.contains("hidden") ? "" : "slide-down");
  });

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", () => {
    scrollToTopButton.classList.toggle("hidden", window.scrollY <= 200);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth < 768) navMenu.classList.add("hidden");
    });
  });

  // Scroll to top functionality
  scrollToTopButton.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // Set current year dynamically
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Theme toggle functionality
  themeToggleButton.addEventListener("click", () => {
    const isDarkMode = html.classList.toggle("dark");
    themeToggleButton.classList.toggle("bg-black", !isDarkMode);
    themeToggleButton.classList.toggle("bg-white", isDarkMode);
    themeLabel.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    themeLabel.classList.toggle("text-white", !isDarkMode);
    themeLabel.classList.toggle("text-gray-900", isDarkMode);

    // Save preference to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });

  // Apply initial mode based on saved preference or default
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialDarkMode = savedTheme === "dark" || (!savedTheme && prefersDarkMode);

  html.classList.toggle("dark", initialDarkMode);
  themeToggleButton.classList.toggle("bg-black", !initialDarkMode);
  themeToggleButton.classList.toggle("bg-white", initialDarkMode);
  themeLabel.textContent = initialDarkMode ? "Light Mode" : "Dark Mode";
  themeLabel.classList.toggle("text-white", !initialDarkMode);
  themeLabel.classList.toggle("text-gray-900", initialDarkMode);
});
