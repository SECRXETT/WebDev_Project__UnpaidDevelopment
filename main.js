// Shared navigation + form handling script
// Safely query elements (may not exist on every page)
const contactButton = document.getElementById('contactBTN');
const aboutButton = document.getElementById('aboutBTN');
const homeButton = document.getElementById('homeBTN');
const contactSubmittedButton = document.getElementById('submitBTN');

// Determine base path relative to current page so links work from subpages
// If we're inside /subpages/... go up two levels, else stay at root
// Example locations:
//   /index.html -> depth 1
//   /subpages/contact/index.html -> depth 3 ("", "subpages", "contact", "index.html")
const pathParts = window.location.pathname.split('/').filter(Boolean);
let base = '';
if (pathParts.includes('subpages')) {
    // we're in a subpage: go up two directories back to project root
    base = '../../';
}

function nav(to) {
    window.location.href = base + to;
}

if (contactButton) {
    contactButton.addEventListener('click', () => nav('subpages/contact/index.html'));
}
if (aboutButton) {
    aboutButton.addEventListener('click', () => nav('subpages/about/index.html'));
}
if (homeButton) {
    homeButton.addEventListener('click', () => nav('index.html'));
}

if (contactSubmittedButton) {
    contactSubmittedButton.addEventListener('click', (e) => {
        // If inside a form with submit type, let the form submit after alert
        alert('Thank you for reaching out to us. We will get back to you as soon as possible.');
    });
}