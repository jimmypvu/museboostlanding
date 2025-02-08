// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
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
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
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