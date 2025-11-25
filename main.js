// Asset base path for images (handles subpages)
const base = window.location.pathname.includes('/subpages/') ? '../../' : '';
// Navigation button handlers
document.addEventListener('DOMContentLoaded', () => {
    const homeBTN = document.getElementById('homeBTN');
    const aboutBTN = document.getElementById('aboutBTN');
    const eventsBTN = document.getElementById('eventsBTN');
    const contactBTN = document.getElementById('contactBTN');
    if (homeBTN) homeBTN.addEventListener('click', () => { window.location.href = '/index.html'; });
    if (aboutBTN) aboutBTN.addEventListener('click', () => { window.location.href = '/subpages/about/index.html'; });
    if (eventsBTN) eventsBTN.addEventListener('click', () => { window.location.href = '/subpages/events/index.html'; });
    if (contactBTN) contactBTN.addEventListener('click', () => { window.location.href = '/subpages/contact/index.html'; });

    // Hero image carousel logic
    const heroImgs = document.querySelectorAll('.hero-bg-img');
    let heroIdx = 0;
    if (heroImgs.length > 1) {
        setInterval(() => {
            heroImgs[heroIdx].classList.remove('active');
            heroIdx = (heroIdx + 1) % heroImgs.length;
            heroImgs[heroIdx].classList.add('active');
        }, 3500);
    }
});
// Seamless gradient transition for car collection
if(document.getElementById('carCollectionGradient')){
    window.addEventListener('scroll',updateCarCollectionGradient);
}

function updateCarCollectionGradient(){
    const cards = document.querySelectorAll('.car-card');
    const gradient = document.getElementById('carCollectionGradient');
    if(!cards.length || !gradient) return;
    let found = false;
    for(const card of cards){
        const rect = card.getBoundingClientRect();
        if(rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2){
            // Card in center of viewport
            const bg = card.querySelector('.car-card-bg')?.style.background;
            if(bg){
                gradient.style.background = bg;
                found = true;
                break;
            }
        }
    }
    if(!found){
        // Default gradient
        gradient.style.background = 'linear-gradient(120deg,#f6f5f2 60%,#222 100%)';
    }
}

/*
  15-car dataset for the 2025 Quiet Luxury auction.
  Each car: id, title, year, price (2025), features (array), image placeholder path
*/
const CARS = [
    {
        id:1,
        title:'1962 Ferrari 250 GTO',
        year:1962,
        price:'€78,500,000',
        features:['V12','Matching numbers','Concours restoration'],
        images:['assets/cars/1962Ferrari250GTO/v1.png','assets/cars/1962Ferrari250GTO/v2.png','assets/cars/1962Ferrari250GTO/v3.png','assets/cars/1962Ferrari250GTO/v4.png','assets/cars/1962Ferrari250GTO/v5.png'],
        bg:'#c41e1e'
    },
    {
        id:2,
        title:'1995 McLaren F1',
        year:1995,
        price:'€65,000,000',
        features:['3-seat layout','BMW V12','Carbon fiber chassis'],
        images:['assets/cars/1995McLarenF1/v1.png','assets/cars/1995McLarenF1/v2.png','assets/cars/1995McLarenF1/v3.png','assets/cars/1995McLarenF1/v4.png'],
        bg:'#f7a600'
    },
    {
        id:3,
        title:'1967 Shelby GT500',
        year:1967,
        price:'€4,200,000',
        features:['427 V8','Rare options','Documented provenance'],
        images:['assets/cars/1967 Shelby GT500/v1.png','assets/cars/1967 Shelby GT500/v2.png','assets/cars/1967 Shelby GT500/v3.png','assets/cars/1967 Shelby GT500/v4.png'],
        bg:'#2c2c2c'
    },
    {
        id:4,
        title:'1969 Nissan Skyline GT-R (Hakosuka)',
        year:1969,
        price:'€520,000',
        features:['S20 inline-6','Iconic Japanese classic','Restored'],
        images:['assets/cars/1969 Nissan Skyline GT‑R (Hakosuka)/v1.png','assets/cars/1969 Nissan Skyline GT‑R (Hakosuka)/v2.png','assets/cars/1969 Nissan Skyline GT‑R (Hakosuka)/v3.png'],
        bg:'#bfc8d8'
    }
];

function renderEventsGrid(){
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    // Get sort/filter values
    let cars = [...CARS];
    const sortBy = document.getElementById('sortBy')?.value || 'price';
    const filterYear = document.getElementById('filterYear')?.value;
    const filterMarque = document.getElementById('filterMarque')?.value?.toLowerCase();
    // Filter
    if (filterYear) cars = cars.filter(car => car.year == filterYear);
    if (filterMarque) cars = cars.filter(car => car.title.toLowerCase().includes(filterMarque));
    // Sort
    if (sortBy === 'price') {
        cars.sort((a,b) => parseInt(b.price.replace(/[^\d]/g,'')) - parseInt(a.price.replace(/[^\d]/g,'')));
    } else if (sortBy === 'year') {
        cars.sort((a,b) => b.year - a.year);
    } else if (sortBy === 'marque') {
        cars.sort((a,b) => a.title.localeCompare(b.title));
    }
    cars.forEach((car, idx) => {
        const card = document.createElement('article');
        card.className = 'auction-card';
        card.tabIndex = 0;
        card.innerHTML = `
            <div class="auction-media" style="background-image:url('${base}${car.images[0]}')" aria-hidden="true"></div>
            <div class="auction-body">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-meta">Year: ${car.year} • ${car.features.slice(0,2).join(' • ')}</div>
                <div class="car-price">${car.price}</div>
            </div>
        `;
        card.addEventListener('click', ()=>{
            openCarModal(CARS.indexOf(car),0);
        });
        card.addEventListener('keypress', (e)=>{ if (e.key === 'Enter') card.click(); });
        grid.appendChild(card);
    });
}

// Modal logic
let currentCarIdx = null;
let currentImgIdx = null;
const carModal = document.getElementById('carModal');
const modalContent = document.getElementById('modalContent');
const modalBg = document.getElementById('modalBg');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

function openCarModal(carIdx,imgIdx){
    currentCarIdx = carIdx;
    currentImgIdx = imgIdx;
    const car = CARS[carIdx];
    carModal.style.display = 'block';
    carModal.focus();
    // Immersive bg
    modalBg.style.background = `linear-gradient(120deg, ${car.bg} 60%, #222 100%)`;
    // Modal content
    modalContent.innerHTML = `
        <div class="modal-img-wrap">
            <img src="${base+car.images[imgIdx]}" class="modal-img" alt="${car.title} image ${imgIdx+1}" />
        </div>
        <div class="modal-details">
            <h2>${car.title}</h2>
            <div class="modal-meta">Year: ${car.year} • ${car.features.join(' • ')}</div>
            <div class="modal-price">${car.price}</div>
        </div>
    `;
    // Animate pop-out
    setTimeout(()=>{
        document.querySelector('.modal-img').classList.add('pop-out');
    },10);
}

function closeCarModal(){
    carModal.style.display = 'none';
    currentCarIdx = null;
    currentImgIdx = null;
}

function showPrevImg(){
    if(currentCarIdx===null) return;
    const car = CARS[currentCarIdx];
    if(currentImgIdx>0){
        openCarModal(currentCarIdx,currentImgIdx-1);
    }
}
function showNextImg(){
    if(currentCarIdx===null) return;
    const car = CARS[currentCarIdx];
    if(currentImgIdx<car.images.length-1){
        openCarModal(currentCarIdx,currentImgIdx+1);
    }
}

if(carModal){
    modalClose.addEventListener('click',closeCarModal);
    modalPrev.addEventListener('click',showPrevImg);
    modalNext.addEventListener('click',showNextImg);
    carModal.addEventListener('keydown',e=>{
        if(e.key==='Escape') closeCarModal();
        if(e.key==='ArrowLeft') showPrevImg();
        if(e.key==='ArrowRight') showNextImg();
    });
    modalBg.addEventListener('click',closeCarModal);
}

// If on events page render the grid
if (document.getElementById('eventsGrid')){
    renderEventsGrid();
    // Sorting/filter UI listeners
    const sortBy = document.getElementById('sortBy');
    const filterYear = document.getElementById('filterYear');
    const filterMarque = document.getElementById('filterMarque');
    const clearFilters = document.getElementById('clearFilters');
    if(sortBy) sortBy.addEventListener('change',renderEventsGrid);
    if(filterYear) filterYear.addEventListener('input',renderEventsGrid);
    if(filterMarque) filterMarque.addEventListener('input',renderEventsGrid);
    if(clearFilters) clearFilters.addEventListener('click',()=>{
        if(filterYear) filterYear.value = '';
        if(filterMarque) filterMarque.value = '';
        renderEventsGrid();
    });
}

// Contact form button handler
const contactSubmittedButton = document.getElementById('contactSubmittedButton');
if (contactSubmittedButton) {
    contactSubmittedButton.addEventListener('click', (e) => {
        // If inside a form with submit type, let the form submit after alert
        alert('Thank you for reaching out to us. We will get back to you as soon as possible.');
    });
}