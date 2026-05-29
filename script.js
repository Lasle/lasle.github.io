document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. TYPING ANIMATION (HERO SECTION)
    // ==========================================================================
    const roles = [
        'Data Scientist',
        'Machine Learning Engineer',
        'Industrial Engineer',
        'Quantitative Analyst'
    ];
    
    const typingTextElement = document.getElementById('typing-text');
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Add character
            typingTextElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // Handling transition points
        if (!isDeleting && currentCharIndex === currentRole.length) {
            // Pause at full word
            isDeleting = true;
            typingSpeed = 2000; // Time the word stays on screen
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            // Move to next word index
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }
        
        setTimeout(typeRole, typingSpeed);
    }
    
    // Initialize typing animation if element exists
    if (typingTextElement) {
        typeRole();
    }

    // ==========================================================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Triggers slightly before entry
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 3. HEADER STYLE TRANSITION ON SCROLL
    // ==========================================================================
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 4. MOBILE NAVIGATION DRAWER
    // ==========================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const headerLinks = document.querySelectorAll('.nav-link');
    
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            mobileNavToggle.classList.toggle('open');
            mobileNavToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        
        // Close menu when clicking navigation link
        headerLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileNavToggle.classList.remove('open');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ==========================================================================
    // 5. SKILLS DYNAMIC CATEGORIZATION FILTER
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active to current
            const currentBtn = e.currentTarget;
            currentBtn.classList.add('active');
            
            const filterValue = currentBtn.getAttribute('data-filter');
            
            skillItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});
