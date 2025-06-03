document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const scrollToTopButton = document.getElementById("scroll-to-top");
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");
  const htmlElement = document.documentElement; // Reference to <html> tag

  // Apply saved theme from localStorage or device preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    htmlElement.classList.toggle("dark", savedTheme === "dark");
    themeLabel.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
  } else {
    htmlElement.classList.toggle("dark", prefersDarkMode);
    themeLabel.textContent = prefersDarkMode ? "Light Mode" : "Dark Mode";
  }

  // Toggle navigation menu
  navToggle.addEventListener("click", () => navMenu.classList.toggle("hidden"));

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", () => {
    scrollToTopButton.classList.toggle("hidden", window.scrollY <= 200);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
      if (window.innerWidth < 768) navMenu.classList.add("hidden");
    });
  });

  // Scroll to top functionality
  scrollToTopButton.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // Set current year dynamically
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Toggle dark mode
  themeToggle.addEventListener("click", () => {
    const isDarkMode = htmlElement.classList.toggle("dark"); // Add/remove 'dark' class on <html>
    themeLabel.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    // Save theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});
