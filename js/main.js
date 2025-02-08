// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    // Check if the clicked element is a link with a hash
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.includes('#')) {
        const href = e.target.getAttribute('href');
        const isHomePageLink = href.startsWith('/#');
        const fragmentId = href.split('#')[1];
        
        // If we're not on the home page and it's a home page fragment link
        if (isHomePageLink && window.location.pathname !== '/') {
            // Navigate to home page with the hash
            window.location.href = href;
            return;
        }
        
        // If we're on the correct page, scroll to the element
        const targetElement = document.getElementById(fragmentId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const scrollPercent = Math.min(window.scrollY / 100, 1);
    navbar.style.opacity = 1 - (scrollPercent * 0.2); // This will go from 1 to 0.8
});

// Contact form handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formProps = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formProps);
    
    // Show success message
    alert('Thanks for reaching out! We\'ll get back to you soon.');
    this.reset();
});

// Simple animation for service cards on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Testimonial rotation
const testimonials = [
    {
        text: "My earnings increased by 300% within three months of working with MuseBoost!",
        author: "Sarah K."
    },
    {
        text: "The team at MuseBoost helped me build a strong, engaged community that supports my content.",
        author: "Alex M."
    },
    {
        text: "Professional, discrete, and results-driven. Exactly what I needed for my content career.",
        author: "Jamie R."
    }
];

let currentTestimonialIndex = 0;
const testimonialElement = document.querySelector('.testimonial');

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonialIndex];
    testimonialElement.style.opacity = '0';
    
    setTimeout(() => {
        testimonialElement.innerHTML = `
            <p>"${testimonial.text}"</p>
            <cite>- ${testimonial.author}</cite>
        `;
        testimonialElement.style.opacity = '1';
    }, 500);
    
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
}

// Rotate testimonials every 5 seconds
setInterval(updateTestimonial, 5000);

async function attachPart(targetSelector, partPath) {
    try {
        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            throw new Error(`Target element not found: ${targetSelector}`);
        }

        const response = await fetch(partPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${partPath}`);
        }

        const html = await response.text();
        targetElement.innerHTML = html;

        // Handle active nav links
        const activeSection = targetElement.dataset.active;
        if (activeSection) {
            const navLinks = targetElement.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                const href = link.getAttribute('href').replace('/', '');
                if (href === activeSection) {
                    link.classList.add('active');
                }
            });
        }

        return true;
    } catch (error) {
        console.error('Error attaching component:', error);
        return false;
    }
}

// Handle active navigation link based on data-active attribute
function setActiveNavLink() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const activePage = navbar.getAttribute('data-active');
    if (!activePage) return;
    
    // Remove active class from all links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to the matching link
    const activeLink = document.querySelector(`.nav-links a[href="/${activePage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Call setActiveNavLink when DOM is loaded
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Mobile menu handling
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 6px)' : '';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(5px, -6px)' : '';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    }
});
