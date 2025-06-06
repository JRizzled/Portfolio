// Portfolio JavaScript functionality
transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function() {
    // Get navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const pageNumber = document.getElementById('current-page');
    
    // Section mapping for page numbers
    const sectionPageMap = {
        'home': 1,
        'photo': 2,
        'about': 3,
        'research': 4,
        'contact': 5
    };

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Calculate offset to account for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link immediately
                updateActiveNavLink(this);
                
                // Update page number immediately
                updatePageNumber(targetId);
            }
        });
    });

    // Function to update active navigation link
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // Function to update page number
    function updatePageNumber(sectionId) {
        const pageNum = sectionPageMap[sectionId] || 1;
        if (pageNumber) {
            pageNumber.textContent = pageNum;
        }
    }

    // Intersection Observer for automatic nav highlighting and page numbering
    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        let mostVisibleEntry = null;
        let maxRatio = 0;

        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                mostVisibleEntry = entry;
            }
        });

        if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
            const sectionId = mostVisibleEntry.target.id;
            
            // Update active nav link
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (correspondingNavLink) {
                updateActiveNavLink(correspondingNavLink);
            }
            
            // Update page number
            updatePageNumber(sectionId);
        }
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove navbar background opacity based on scroll
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(42, 42, 42, 0.98)';
        } else {
            navbar.style.backgroundColor = 'rgba(42, 42, 42, 0.95)';
        }
    });

    // Enhanced hover effects for skill tags - using CSS classes instead of direct style manipulation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.classList.add('skill-tag-hover');
        });
        
        tag.addEventListener('mouseleave', function() {
            this.classList.remove('skill-tag-hover');
        });
    });

    // Add typing effect to portfolio title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect for the main title
    const portfolioTitle = document.querySelector('.portfolio-title');
    if (portfolioTitle) {
        const originalText = portfolioTitle.textContent;
        
        // Start typing effect after a short delay
        setTimeout(() => {
            typeWriter(portfolioTitle, originalText, 80);
        }, 500);
    }

    // Simplified parallax effect to avoid overlay issues
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const parallaxSpeed = 0.2; // Reduced speed to minimize issues
        
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });

    // Add fade-in animation for sections
    const fadeElements = document.querySelectorAll('.intro-content, .research-subsection, .contact-content');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Set initial state and observe elements
    fadeElements.forEach(element => {
        element.classList.add('fade-in-element');
        fadeObserver.observe(element);
    });

    // Handle mobile navigation (responsive behavior)
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile specific adjustments
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.style.flexDirection = 'column';
            }
        } else {
            // Desktop specific adjustments
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.style.flexDirection = 'row';
            }
        }
    }

    // Initialize and listen for resize
    handleResize();
    window.addEventListener('resize', handleResize);

    // Add click effect to placeholder images
    const placeholderImages = document.querySelectorAll('.placeholder-image, .large-placeholder-image, .chart-placeholder');
    
    placeholderImages.forEach(image => {
        image.addEventListener('click', function() {
            // Add a subtle pulse effect using CSS class
            this.classList.add('image-clicked');
            setTimeout(() => {
                this.classList.remove('image-clicked');
            }, 200);
        });
    });

    // Initialize page number to 1 (home section)
    updatePageNumber('home');
    
    // Set home as active on load
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
        updateActiveNavLink(homeLink);
    }

    console.log('Portfolio website initialized successfully!');
});