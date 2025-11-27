// Page Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile Navigation Toggle with animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    if (hamburger.classList.contains('active')) {
        hamburger.style.transform = 'rotate(90deg)';
    } else {
        hamburger.style.transform = 'rotate(0deg)';
    }
});

hamburger.style.transition = 'transform 0.3s ease';

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Enhanced Navbar scroll effect with hide/show
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Intersection Observer with powerful animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all sections with staggered animations
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) scale(0.95)';
    section.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.1}s`;
    observer.observe(section);
});

// Powerful skill items animation with rotation
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(50px) rotateX(-15deg)';
    category.style.transition = `all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.15}s`;
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0)';
        }
    });
}, observerOptions);

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// Powerful certification cards animation with scale and rotation
const certCards = document.querySelectorAll('.cert-card');
certCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) scale(0.8) rotate(-5deg)';
    card.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.2}s`;
});

const certObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1) rotate(0)';
        }
    });
}, observerOptions);

certCards.forEach(card => {
    certObserver.observe(card);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter animation for impact numbers
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
};

// Observe impact cards and animate numbers
const impactCards = document.querySelectorAll('.impact-card');
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const numberElement = entry.target.querySelector('.impact-number');
            const text = numberElement.textContent;
            
            // Extract number and suffix
            const match = text.match(/(\d+[\d,]*)(.*)/);
            if (match) {
                const number = parseInt(match[1].replace(/,/g, ''));
                const suffix = match[2];
                
                if (!isNaN(number)) {
                    numberElement.textContent = '0' + suffix;
                    let start = 0;
                    const duration = 2000;
                    const increment = number / (duration / 16);
                    
                    const updateCounter = () => {
                        start += increment;
                        if (start < number) {
                            numberElement.textContent = Math.floor(start).toLocaleString() + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            numberElement.textContent = number.toLocaleString() + suffix;
                        }
                    };
                    
                    updateCounter();
                }
            }
        }
    });
}, { threshold: 0.5 });

impactCards.forEach(card => {
    impactObserver.observe(card);
});

// Enhanced typing effect for hero subtitle with cursor
const heroSubtitle = document.querySelector('.hero-subtitle');
const subtitleText = heroSubtitle.textContent;
heroSubtitle.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < subtitleText.length) {
        heroSubtitle.textContent += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    } else {
        // Remove cursor after typing
        setTimeout(() => {
            heroSubtitle.style.borderRight = 'none';
        }, 500);
    }
}

// Add typing cursor effect
heroSubtitle.style.borderRight = '3px solid var(--secondary-color)';
heroSubtitle.style.animation = 'blink 0.7s step-end infinite';

const blinkStyle = document.createElement('style');
blinkStyle.textContent = `
    @keyframes blink {
        50% { border-color: transparent; }
    }
`;
document.head.appendChild(blinkStyle);

// Start typing effect after page load
setTimeout(typeWriter, 800);

// Enhanced parallax effect for hero section with scale
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        const scale = 1 - (scrolled / 2000);
        hero.style.transform = `translateY(${scrolled * 0.5}px) scale(${scale})`;
        hero.style.opacity = 1 - (scrolled / 700);
    }
});

// Powerful interactive tech stack items with magnetic effect
document.querySelectorAll('.tech-item, .tech-badge-small').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
        this.style.boxShadow = '0 10px 30px rgba(0, 102, 204, 0.4)';
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
            border-radius: inherit;
            pointer-events: none;
            animation: rippleEffect 0.6s ease-out;
        `;
        this.style.position = 'relative';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        this.style.boxShadow = '';
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent += `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Progress bar on scroll
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #0066cc, #ff9900);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Powerful timeline items animation with slide and scale
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0) scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    if (index % 2 === 0) {
        item.style.transform = 'translateX(-100px) scale(0.9)';
    } else {
        item.style.transform = 'translateX(100px) scale(0.9)';
    }
    item.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    timelineObserver.observe(item);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .contact-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
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

// Powerful reveal for project details with slide and scale
const detailSections = document.querySelectorAll('.detail-section');
detailSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px) scale(0.95)';
    section.style.transition = `all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${index * 0.25}s`;
});

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, { threshold: 0.1 });

detailSections.forEach(section => projectObserver.observe(section));

// Enhanced cursor trail effect with gradient
const cursorTrail = [];
const trailLength = 15;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const trail = document.createElement('div');
    const size = Math.random() * 8 + 4;
    trail.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(0, 102, 204, 0.6), rgba(255, 153, 0, 0.3));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        left: ${e.clientX - size/2}px;
        top: ${e.clientY - size/2}px;
        animation: trailFade 0.8s ease-out forwards;
        box-shadow: 0 0 10px rgba(0, 102, 204, 0.5);
    `;
    
    document.body.appendChild(trail);
    cursorTrail.push(trail);
    
    if (cursorTrail.length > trailLength) {
        const oldTrail = cursorTrail.shift();
        oldTrail.remove();
    }
});

// Magnetic effect for buttons
document.querySelectorAll('.btn, .contact-btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        to {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
    
    // Parallax for cards
    document.querySelectorAll('.cert-card, .skill-category').forEach((card, index) => {
        const speed = (index % 2 === 0) ? 0.05 : -0.05;
        const yPos = -(scrolled * speed);
        if (card.getBoundingClientRect().top < window.innerHeight) {
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Floating animation for icons
document.querySelectorAll('.cert-icon i').forEach((icon, index) => {
    icon.style.animation = `gentleFloat ${3 + index * 0.5}s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.2}s`;
});

// Text reveal animation on scroll
const revealText = () => {
    document.querySelectorAll('.experience-highlights li, .project-details li').forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 50) {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        }
    });
};

document.querySelectorAll('.experience-highlights li, .project-details li').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
});

window.addEventListener('scroll', revealText);
revealText();

// Add sparkle effect on hover for important elements
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px rgba(0, 102, 204, 0.6)';
        this.style.transform = 'scale(1.05)';
    });
    
    title.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.transform = 'scale(1)';
    });
    
    this.style.transition = 'all 0.3s ease';
});

console.log('🚀 Portfolio loaded with POWERFUL animations!');
console.log('✨ Enhanced interactive features enabled!');
console.log('💫 Magnetic effects, parallax, and smooth transitions active!');


// 3D Tilt Effect for Cards
document.querySelectorAll('.cert-card, .skill-category, .impact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
    
    card.style.transition = 'transform 0.1s ease';
});

// Scroll Progress Indicator Enhancement
const progressBar = document.querySelector('div[style*="position: fixed"]');
if (progressBar) {
    progressBar.style.background = 'linear-gradient(90deg, #0066cc, #00ccff, #ff9900, #ff6600)';
    progressBar.style.backgroundSize = '200% 100%';
    progressBar.style.animation = 'gradientShift 3s ease infinite';
    
    const gradientStyle = document.createElement('style');
    gradientStyle.textContent = `
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(gradientStyle);
}

// Smooth scroll with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.offsetTop - 70;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Add glow effect to active elements
setInterval(() => {
    document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
        setTimeout(() => {
            dot.style.boxShadow = '0 0 30px rgba(255, 153, 0, 0.8)';
            setTimeout(() => {
                dot.style.boxShadow = '0 0 0 4px var(--primary-color)';
            }, 300);
        }, index * 500);
    });
}, 5000);

console.log('🎨 3D tilt effects activated!');
console.log('⚡ All powerful animations loaded successfully!');
