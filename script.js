// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
});

// Mobile Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('fa-times');
    });
});

// Dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-1rem)';
            }
        });
        
        // Mobile click behavior
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isOpen = menu.style.display === 'block';
                menu.style.display = isOpen ? 'none' : 'block';
            }
        });
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typing Animation
document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.typing-text');
    if (txtElement) {
        const words = ['Engineering Technology Student', 'Web Developer', 'App Developer', 'Machine Learning Enthusiast', 'PLC Automation Engineer', 'IoT Developer', 'UI/UX Designer', 'Embedded Systems Engineer'];
        new TypeWriter(txtElement, words, 2000);
    }
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Home section elements
    const homeElements = document.querySelectorAll('.home-content h3, .home-content h1, .home-content p, .tech-stack, .social-media, .btn-group');
    homeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    // About section elements
    const aboutImg = document.querySelector('.about-img');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg) {
        aboutImg.classList.add('slide-in-left');
        observer.observe(aboutImg);
    }
    if (aboutContent) {
        aboutContent.classList.add('slide-in-right');
        observer.observe(aboutContent);
    }

    // Skills section elements
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Services section elements
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Portfolio section elements
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    portfolioBoxes.forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Contact section elements
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add scrolling class for smooth behavior
            document.body.classList.add('scrolling');
            document.documentElement.style.scrollBehavior = 'smooth';
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Remove smooth behavior after scrolling
            setTimeout(() => {
                document.body.classList.remove('scrolling');
                document.documentElement.style.scrollBehavior = 'auto';
            }, 1000);
        }
    });
});

// Ensure page loads at top on refresh
window.addEventListener('load', () => {
    // Clear any hash from URL
    if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Reset active navigation
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
        }
    });
});

// Prevent auto-scroll on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure we're at the top
    window.scrollTo(0, 0);
    
    // Remove any hash from URL
    if (window.location.hash && window.location.hash !== '#home') {
        window.history.replaceState(null, null, window.location.pathname);
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced Floating Icons Animation
document.addEventListener('DOMContentLoaded', () => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    // Add click interaction to floating icons
    floatingIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 238, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            `;
            
            icon.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add special effect based on icon
            const iconClass = icon.querySelector('i').className;
            if (iconClass.includes('fa-code')) {
                icon.style.animation = 'none';
                icon.style.transform = 'scale(1.5) rotate(360deg)';
                setTimeout(() => {
                    icon.style.animation = '';
                    icon.style.transform = '';
                }, 1000);
            } else if (iconClass.includes('fa-brain')) {
                icon.style.animation = 'none';
                icon.style.transform = 'scale(1.3)';
                icon.style.boxShadow = '0 0 4rem rgba(0, 238, 255, 0.8)';
                setTimeout(() => {
                    icon.style.animation = '';
                    icon.style.transform = '';
                    icon.style.boxShadow = '';
                }, 800);
            }
        });
        
        // Add random movement on mouse enter
        icon.addEventListener('mouseenter', () => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            icon.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = icon.style.transform.replace(/translate\([^)]*\)/g, '');
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Pause rotation on hover
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelector('.floating-elements');
    
    if (floatingElements) {
        floatingElements.addEventListener('mouseenter', () => {
            floatingElements.style.animationPlayState = 'paused';
        });
        
        floatingElements.addEventListener('mouseleave', () => {
            floatingElements.style.animationPlayState = 'running';
        });
    }
});

// Random floating animation
function randomFloat() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        if (Math.random() > 0.7) {
            const randomX = (Math.random() - 0.5) * 30;
            const randomY = (Math.random() - 0.5) * 30;
            const randomRotate = (Math.random() - 0.5) * 20;
            
            icon.style.transition = 'all 2s ease-in-out';
            icon.style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
            
            setTimeout(() => {
                icon.style.transform = icon.style.transform.replace(/translate\([^)]*\)/g, '').replace(/rotate\([^)]*\)/g, '');
            }, 2000);
        }
    });
}

// Call random float every 5 seconds
setInterval(randomFloat, 5000);

// Magnetic effect for floating icons
document.addEventListener('mousemove', (e) => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    floatingIcons.forEach((icon) => {
        const rect = icon.getBoundingClientRect();
        const iconX = rect.left + rect.width / 2;
        const iconY = rect.top + rect.height / 2;
        
        const distanceX = mouseX - iconX;
        const distanceY = mouseY - iconY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const moveX = (distanceX / distance) * force * 10;
            const moveY = (distanceY / distance) * force * 10;
            
            icon.style.transform += ` translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent);
            animateCounter(counter, target);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

// Observe counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFill = entry.target;
            const width = progressFill.getAttribute('data-width');
            progressFill.style.width = width + '%';
            progressObserver.unobserve(progressFill);
        }
    });
}, { threshold: 0.5 });

// Observe progress bars
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
});

// Circular Progress Animation
const circularProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const percentage = circle.getAttribute('data-percentage');
            const degrees = (percentage / 100) * 360;
            
            circle.style.background = `conic-gradient(var(--main-color) ${degrees}deg, rgba(0, 238, 255, 0.2) ${degrees}deg)`;
            circularProgressObserver.unobserve(circle);
        }
    });
}, { threshold: 0.5 });

// Section Animation Observer
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const circularProgress = document.querySelectorAll('.progress-circle');
    circularProgress.forEach(circle => {
        circularProgressObserver.observe(circle);
    });
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Skill Progress Bars (if you want to add them later)
function createProgressBars() {
    const skillItems = document.querySelectorAll('.skill-tag');
    skillItems.forEach(item => {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = `
            width: 100%;
            height: 4px;
            background: rgba(0, 238, 255, 0.2);
            border-radius: 2px;
            margin-top: 0.5rem;
            overflow: hidden;
        `;
        
        const progress = document.createElement('div');
        progress.className = 'progress';
        progress.style.cssText = `
            height: 100%;
            background: linear-gradient(90deg, #0ef, #4facfe);
            border-radius: 2px;
            width: 0;
            transition: width 1s ease;
        `;
        
        progressBar.appendChild(progress);
        item.appendChild(progressBar);
        
        // Animate progress bar when visible
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const randomWidth = Math.floor(Math.random() * 40) + 60; // 60-100%
                    progress.style.width = randomWidth + '%';
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressObserver.observe(progressBar);
    });
}

// Initialize progress bars (uncomment if you want to use them)
// createProgressBars();

// Theme Toggle (Bonus Feature)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 2rem;
        transform: translateY(-50%);
        width: 4rem;
        height: 4rem;
        background: var(--main-color);
        border: none;
        border-radius: 50%;
        color: var(--bg-color);
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 0 1rem rgba(0, 238, 255, 0.3);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });
}

// Initialize theme toggle (uncomment if you want to use it)
// createThemeToggle();

// Preloader
function createPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'loading';
    preloader.innerHTML = `
        <div class="loader"></div>
    `;
    document.body.appendChild(preloader);
}

// Initialize preloader
createPreloader();

// Add CSS for light theme (if you want to use theme toggle)
const lightThemeCSS = `
.light-theme {
    --bg-color: #ffffff;
    --second-bg-color: #f8f9fa;
    --text-color: #333333;
    --main-color: #007bff;
    --accent-color: #dc3545;
}

.light-theme .header {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
}

.light-theme .navbar a {
    color: #333333;
}

.light-theme .home {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.light-theme .about-content p,
.light-theme .home-content p,
.light-theme .section-subtitle {
    color: #666666;
}

.light-theme .contact-form input,
.light-theme .contact-form textarea {
    background: #ffffff;
    border: 0.2rem solid rgba(0, 123, 255, 0.3);
    color: #333333;
}

.light-theme .contact-form input::placeholder,
.light-theme .contact-form textarea::placeholder {
    color: #999999;
}
`;

// Add light theme CSS to document (uncomment if you want to use theme toggle)
// const style = document.createElement('style');
// style.textContent = lightThemeCSS;
// document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
%cWelcome to Nayana Pabasara's Portfolio! 🚀
%cBuilt with passion for engineering and technology.
%cFeel free to explore the code and get inspired!

Contact: nayana.pabasara@example.com
LinkedIn: https://www.linkedin.com/in/napi-9046392b3/
`, 
'color: #0ef; font-size: 16px; font-weight: bold;',
'color: #4facfe; font-size: 14px;',
'color: #ff6b6b; font-size: 12px;'
);
