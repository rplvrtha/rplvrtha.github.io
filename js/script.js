// Contoh sederhana: Menambahkan event listener ke tombol kontak
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");
    });

    const scrollToTopButton = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopButton.classList.remove("hidden");
        } else {
            scrollToTopButton.classList.add("hidden");
        }
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Tutup menu navigasi jika dalam mode mobile
            if (window.innerWidth < 768) {
                navMenu.classList.add("hidden");
            }
        });
    });
});

const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("block");
});