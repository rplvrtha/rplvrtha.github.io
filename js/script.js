document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const scrollToTopButton = document.getElementById("scroll-to-top");

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
});
