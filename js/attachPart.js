// Function to attach HTML parts (components) to the page
async function attachPart(targetSelector, partPath) {
    try {
        const response = await fetch(partPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Attach navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    attachPart('#navbar', 'components/navbar-part.html');
});
