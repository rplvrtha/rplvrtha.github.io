document.addEventListener("DOMContentLoaded", () => {
  // --- 0. Inisialisasi Animasi (AOS) ---
  AOS.init({
    duration: 800, // Durasi animasi dalam ms
    once: true, // Animasi hanya berjalan sekali
    offset: 50, // Memicu animasi sedikit lebih awal
  });

  // --- 1. Toggle Menu Navigasi Mobile ---
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("hidden");
    });

    // Menutup menu saat link di-klik (untuk mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.add("hidden");
      });
    });
  }

  // --- 2. Logika Mode Gelap (Theme Toggle) DIPERBAIKI ---
  const themeToggleButton = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  // Fungsi untuk mengatur tema (HANYA MENGUBAH <html> DAN IKON)
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

  // Cek tema saat halaman dimuat
  // Default ke 'dark' jika tidak ada di localStorage ATAU jika sistem user prefer dark
  const prefersDark =
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  setTheme(prefersDark); // Atur tema saat halaman pertama kali dibuka

  // Event listener untuk tombol
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      // Cek tema SAAT INI lalu ganti ke lawannya
      const isCurrentlyDark =
        document.documentElement.classList.contains("dark");
      setTheme(!isCurrentlyDark);
    });
  }

  // --- 3. Tombol Scroll to Top ---
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

  // --- 4. Tahun Dinamis di Footer ---
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});