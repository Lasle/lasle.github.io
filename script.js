document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. TYPING ANIMATION (HERO SECTION)
    // ==========================================================================
    const roles = [
        'Data Scientist',
        'Machine Learning Engineer',
        'Industrial Engineer',
    ];

    const typingTextElement = document.getElementById('typing-text');
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const prefixElement = document.getElementById('hero-prefix');

    function updatePrefix(role) {
        if (!prefixElement) return;
        const firstLetter = role.charAt(0).toLowerCase();
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        if (vowels.includes(firstLetter)) {
            prefixElement.textContent = "I'm an ";
        } else {
            prefixElement.textContent = "I'm a ";
        }
    }

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
            updatePrefix(roles[currentRoleIndex]);
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeRole, typingSpeed);
    }

    // Initialize typing animation if element exists
    if (typingTextElement) {
        updatePrefix(roles[currentRoleIndex]);
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

    // ==========================================================================
    // 6. SCROLLYTELLING 3D ILLUSTRATIONS
    // ==========================================================================
    const scrollyItems = document.querySelectorAll('[data-scrolly-id]');
    
    // Initial active states
    const initialActiveIds = ['venture-music', 'edu-kit-master', 'exp-scalable'];
    initialActiveIds.forEach(id => {
        const ill = document.querySelector(`.showcase-illustration[data-illustration-id="${id}"]`);
        if (ill) ill.classList.add('active');
    });

    const scrollyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const itemId = entry.target.getAttribute('data-scrolly-id');
                const parentSection = entry.target.closest('section');
                if (!parentSection) return;
                
                const targetIll = parentSection.querySelector(`.showcase-illustration[data-illustration-id="${itemId}"]`);
                if (!targetIll) return;
                
                // If already active, do nothing
                if (targetIll.classList.contains('active')) return;
                
                // Deactivate current active in this section
                const currentActive = parentSection.querySelector('.showcase-illustration.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                    currentActive.classList.add('exit');
                    setTimeout(() => {
                        currentActive.classList.remove('exit');
                    }, 800);
                }
                
                // Activate new one
                targetIll.classList.add('active');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-20% 0px -20% 0px' // focus on center area of screen
    });

    scrollyItems.forEach(item => {
        scrollyObserver.observe(item);
    });

    // ==========================================================================
    // 7. 3D CURSOR TILT FOR ACTIVE SVGS
    // ==========================================================================
    const viewports = document.querySelectorAll('.showcase-viewport');
    
    viewports.forEach(viewport => {
        viewport.addEventListener('mousemove', (e) => {
            const activeIllustration = viewport.querySelector('.showcase-illustration.active .illustration-3d');
            if (!activeIllustration) return;
            
            const rect = viewport.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate degrees (-20deg to +20deg)
            const rotateY = ((x - centerX) / centerX) * 20;
            const rotateX = -((y - centerY) / centerY) * 20;
            
            activeIllustration.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        viewport.addEventListener('mouseleave', () => {
            const activeIllustration = viewport.querySelector('.showcase-illustration.active .illustration-3d');
            if (activeIllustration) {
                activeIllustration.style.transform = 'rotateX(15deg) rotateY(-15deg) scale(1)';
            }
        });
    });

    // ==========================================================================
    // 8. GLASSMORPHIC CARD CURSOR GLARE
    // ==========================================================================
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==========================================================================
    // 9. MAGNETIC BUTTON PULL
    // ==========================================================================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
            btn.style.boxShadow = `0 8px 30px rgba(99, 102, 241, 0.35)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.boxShadow = '';
        });
    });
});
