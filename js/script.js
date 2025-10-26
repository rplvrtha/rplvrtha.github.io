document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 800,
    once: true,
    offset: 50,
  });

  // === Pengaturan Tahun di Footer ===
const currentYear = new Date().getFullYear();
// Menargetkan semua elemen dengan ID yang dimulai dengan "current-year"
const yearElements = document.querySelectorAll('[id^="current-year"]');
yearElements.forEach(element => {
  element.textContent = currentYear;
});

  // === Logika Dark Mode ===
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  const updateThemeIcons = (isDarkMode) => {
    if (isDarkMode) {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  };

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      updateThemeIcons(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      updateThemeIcons(false);
    }
  };

  const currentTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  applyTheme(currentTheme);

  themeToggle.addEventListener("click", () => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    applyTheme(isDarkMode ? "light" : "dark");
  });

  // === Logika Tombol Scroll-to-Top ===
  const scrollToTopButton = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollToTopButton.classList.remove("hidden", "opacity-0");
      scrollToTopButton.classList.add("opacity-100");
    } else {
      scrollToTopButton.classList.add("opacity-0");
      // Sembunyikan setelah transisi selesai
      setTimeout(() => {
         if (window.scrollY <= 300) { // Cek lagi untuk menghindari race condition
            scrollToTopButton.classList.add("hidden");
         }
      }, 300);
    }
  });

  scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // === [FIX] Logika Menu Mobile (Dropdown Animasi) ===
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navIconMenu = document.getElementById("nav-icon-menu");
  const navIconClose = document.getElementById("nav-icon-close");

  // Hanya jalankan jika elemen-elemen mobile ada
  if (navToggle && navMenu && navIconMenu && navIconClose) {
    const mobileNavLinks = navMenu.querySelectorAll("a"); // Ambil semua link di dalam menu mobile

    const toggleMenu = () => {
      const isOpen = !navMenu.classList.contains("invisible");

      if (isOpen) {
        // Close it
        navMenu.classList.add("opacity-0", "-translate-y-4", "invisible");
        navIconMenu.classList.remove("hidden");
        navIconClose.classList.add("hidden");
        document.body.style.overflow = ''; // Mengembalikan scroll body
      } else {
        // Open it
        navMenu.classList.remove("opacity-0", "-translate-y-4", "invisible");
        navIconMenu.classList.add("hidden");
        navIconClose.classList.remove("hidden");
        document.body.style.overflow = 'hidden'; // Mencegah scroll body
      }
    };

    // Event listener untuk tombol hamburger
    navToggle.addEventListener("click", toggleMenu);

    // Event listener untuk setiap link di menu mobile
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        // Otomatis tutup menu saat link di-klik
        toggleMenu();
      });
    });
  }

  // === Logika Bayangan Navbar saat Scroll ===
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      navbar.classList.add("shadow-lg");
    } else {
      navbar.classList.remove("shadow-lg");
    }
  });

  // === Logika Navigasi Aktif (Intersection Observer) ===
  // Menargetkan link di menu desktop
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link"); 

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4, // 40% dari section harus terlihat
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach((section) => observer.observe(section));
});