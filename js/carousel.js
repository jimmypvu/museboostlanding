let currentSlide = 0;
let images = [];

async function loadCarouselImages() {
    try {
        const response = await fetch('/js/carousel-data.json');
        const data = await response.json();
        images = data.images;
        initializeCarousel();
    } catch (error) {
        console.error('Error loading carousel images:', error);
    }
}

function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel || images.length === 0) return;

    // Clear existing content
    carousel.innerHTML = '';

    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'carousel-images';

    // Add all images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Carousel Image ${index + 1}`;
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.opacity = index === 0 ? '1' : '0';
        img.style.transition = 'opacity 0.5s ease-in-out';
        imageContainer.appendChild(img);
    });

    // Add navigation arrows
    const prevArrow = document.createElement('button');
    prevArrow.className = 'carousel-nav prev';
    prevArrow.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
        </svg>
    `;
    
    const nextArrow = document.createElement('button');
    nextArrow.className = 'carousel-nav next';
    nextArrow.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
        </svg>
    `;

    // Create dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'carousel-dots';

    // Add dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    });

    carousel.appendChild(imageContainer);
    carousel.appendChild(prevArrow);
    carousel.appendChild(nextArrow);
    carousel.appendChild(dotsContainer);

    // Add event listeners
    prevArrow.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + images.length) % images.length;
        updateCarousel();
    });

    nextArrow.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    });

    // Auto advance
    setInterval(() => {
        currentSlide = (currentSlide + 1) % images.length;
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const imgs = document.querySelectorAll('.carousel-images img');
    const dots = document.querySelectorAll('.carousel-dot');
    
    imgs.forEach((img, index) => {
        img.style.opacity = index === currentSlide ? '1' : '0';
    });
    
    dots.forEach((dot, index) => {
        dot.className = `carousel-dot${index === currentSlide ? ' active' : ''}`;
    });
}

// Load carousel images when DOM is ready
document.addEventListener('DOMContentLoaded', loadCarouselImages);
