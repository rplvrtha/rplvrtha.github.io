document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.add("hidden");
      });
    });
  }

  const themeToggleButton = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  const setTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
      localStorage.setItem("theme", "light");
    }
  };

  const prefersDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  setTheme(prefersDark);

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const isCurrentlyDark =
        document.documentElement.classList.contains("dark");
      setTheme(!isCurrentlyDark);
    });
  }

  const scrollToTopButton = document.getElementById("scroll-to-top");

  if (scrollToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopButton.classList.remove("hidden");
        scrollToTopButton.classList.add("opacity-100");
      } else {
        scrollToTopButton.classList.add("hidden");
        scrollToTopButton.classList.remove("opacity-100");
      }
    });

    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});