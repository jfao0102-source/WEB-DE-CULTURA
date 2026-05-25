// ===================================
//    Navigation & Mobile Menu
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 46, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 46, 0.95)';
        }
    });
});

// ===================================
//    Carousel Functionality
// ===================================
const track = document.getElementById('track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselNav = document.getElementById('carouselNav');
const indicators = document.querySelectorAll('.carousel-indicator');

let currentIndex = 0;
const totalSlides = document.querySelectorAll('.carousel-slide').length;

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('current-slide', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Auto-play carousel
setInterval(() => {
    goToSlide(currentIndex + 1);
}, 5000);

// ===================================
//    Counter Animation
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');
let counterAnimated = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };

    updateCounter();
}

// Trigger counter animation when in view
const aboutSection = document.querySelector('.about');
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
        }
    });
}, observerOptions);

if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// ===================================
//    Gallery Filter
// ===================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ===================================
//    Attendance Form Handling
// ===================================
const attendanceForm = document.getElementById('attendanceForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');

if (attendanceForm) {
    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(attendanceForm);
        const data = Object.fromEntries(formData.entries());

        // Simple validation
        if (!data.name || !data.email || !data.event || !data.guests) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        // Simulate form submission
        console.log('Form submitted:', data);

        // Show success modal
        successModal.style.display = 'block';

        // Reset form
        attendanceForm.reset();

        // Close modal after 5 seconds or when clicking close
        setTimeout(() => {
            successModal.style.display = 'none';
        }, 5000);
    });
}

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// ===================================
//    Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
//    Scroll Reveal Animation
// ===================================
const revealElements = document.querySelectorAll('.event-card, .gallery-item, .stat-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// ===================================
//    Newsletter Form
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email) {
            alert(`¡Gracias por suscribirte! Te enviaremos noticias a: ${email}`);
            emailInput.value = '';
        }
    });
}

// ===================================
//    Event Card Hover Effect
// ===================================
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        eventCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.7';
            }
        });
    });

    card.addEventListener('mouseleave', function() {
        eventCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===================================
//    Parallax Effect for Hero
// ===================================
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// ===================================
//    Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.style.transition = 'opacity 0.5s ease';
            section.style.opacity = '1';
        }, index * 100);
    });
});

// ===================================
//    Dynamic Year in Footer
// ===================================
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = `&copy; ${currentYear} Cultura. Todos los derechos reservados.`;
}

console.log('Cultura Website Loaded Successfully! 🎨');
