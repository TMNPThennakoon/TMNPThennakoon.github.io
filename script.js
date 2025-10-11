// Theme Management
class ThemeManager {
    constructor() {
        this.isDarkMode = localStorage.getItem('theme') === 'dark' || 
                         (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupEventListeners();
    }

    applyTheme() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.words = [
            'Engineering Technology Student',
            'Web Developer',
            'App Developer',
            'Machine Learning Enthusiast',
            'PLC Automation Engineer',
            'IoT Developer',
            'UI/UX Designer',
            'Embedded Systems Engineer'
        ];
        this.currentWordIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const typeSpeed = this.isDeleting ? 100 : 100;
        const waitTime = this.isDeleting ? 500 : 2000;
        const current = this.words[this.currentWordIndex];
        
        if (!this.isDeleting && this.currentText === current) {
            setTimeout(() => this.isDeleting = true, waitTime);
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
        } else {
            this.currentText = this.isDeleting 
                ? current.substring(0, this.currentText.length - 1)
                : current.substring(0, this.currentText.length + 1);
        }

        const typingElement = document.getElementById('typing-text');
        if (typingElement) {
            typingElement.textContent = this.currentText;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Header Management
class HeaderManager {
    constructor() {
        this.isMenuOpen = false;
        this.isSticky = false;
        this.activeSection = 'home';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollListener();
        this.setupNavigation();
    }

    setupEventListeners() {
        const menuIcon = document.getElementById('menu-icon');
        if (menuIcon) {
            menuIcon.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const navbar = document.getElementById('navbar');
            const menuIcon = document.getElementById('menu-icon');
            if (!navbar.contains(e.target) && !menuIcon.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    setupScrollListener() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollState();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll);
    }

    updateScrollState() {
        const header = document.getElementById('header');
        const scrollY = window.scrollY;
        
        // Update sticky state
        this.isSticky = scrollY > 100;
        if (header) {
            header.classList.toggle('sticky', this.isSticky);
        }

        // Update active section
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        this.activeSection = current;
        this.updateActiveNavLinks();
    }

    updateActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const sectionId = href ? href.substring(1) : '';
            
            if (sectionId === this.activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update dropdown toggle active state
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            const aboutSections = ['about', 'experience', 'education'];
            dropdownToggle.classList.toggle('active', aboutSections.includes(this.activeSection));
        }
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.scrollToSection(href.substring(1));
                    this.closeMenu();
                }
            });
        });
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const navbar = document.getElementById('navbar');
        const menuIcon = document.getElementById('menu-icon');
        
        if (navbar) {
            navbar.classList.toggle('active', this.isMenuOpen);
        }
        
        if (menuIcon) {
            menuIcon.classList.toggle('fa-bars', !this.isMenuOpen);
            menuIcon.classList.toggle('fa-times', this.isMenuOpen);
        }
    }

    closeMenu() {
        this.isMenuOpen = false;
        const navbar = document.getElementById('navbar');
        const menuIcon = document.getElementById('menu-icon');
        
        if (navbar) {
            navbar.classList.remove('active');
        }
        
        if (menuIcon) {
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        }
    }
}

// Portfolio Filter
class PortfolioFilter {
    constructor() {
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.setActiveFilter(filter);
            });
        });
    }

    setActiveFilter(filter) {
        this.activeFilter = filter;
        
        // Update active button
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-filter') === filter);
        });

        // Filter portfolio items
        this.filterPortfolioItems();
    }

    filterPortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-box');
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const shouldShow = this.activeFilter === 'all' || category === this.activeFilter;
            
            item.style.display = shouldShow ? 'block' : 'none';
            
            if (shouldShow) {
                item.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }
}

// Scroll to Top
class ScrollToTop {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollListener();
    }

    setupEventListeners() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    setupScrollListener() {
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        
        window.addEventListener('scroll', () => {
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.toggle('show', window.scrollY > 300);
            }
        });
    }
}

// Skill Progress Animation
class SkillProgress {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width;
                    observer.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(skillBar => {
            observer.observe(skillBar);
        });
    }
}

// Floating Elements Animation
class FloatingElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupFloatingIcons();
    }

    setupFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            // Add random animation delays
            icon.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effects
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) translateY(-10px)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) translateY(0)';
            });
        });
    }
}

// Smooth Scrolling for all anchor links
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}

// Page Load Animation
class PageLoader {
    constructor() {
        this.init();
    }

    init() {
        // Fade in body
        document.body.style.opacity = '0';
        document.body.style.animation = 'fadeInUp 1s ease-out 0.2s both';
        
        // Add loaded class after animation
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 1200);
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new TypingAnimation();
    new HeaderManager();
    new PortfolioFilter();
    new ScrollToTop();
    new SkillProgress();
    new FloatingElements();
    new SmoothScrolling();
    new PageLoader();

    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        observer.observe(item);
    });

    // Observe portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-box');
    portfolioItems.forEach(item => {
        observer.observe(item);
    });

    // Observe service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    serviceBoxes.forEach(box => {
        observer.observe(box);
    });

    // Observe education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        observer.observe(card);
    });

    // Observe certification cards
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        observer.observe(card);
    });

    // Observe experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        observer.observe(card);
    });

    console.log('Portfolio website initialized successfully!');
});

