document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const scrollToTopButton = document.getElementById("scroll-to-top");

  // Toggle navigation menu
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
  });

  // Show/hide scroll-to-top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollToTopButton.classList.remove("hidden");
    } else {
      scrollToTopButton.classList.add("hidden");
    }
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Close menu on mobile after clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth < 768) {
        navMenu.classList.add("hidden");
      }
    });
  });

  // Scroll to top functionality
  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Set current year dynamically
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});
