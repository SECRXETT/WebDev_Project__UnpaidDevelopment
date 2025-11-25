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

// Events / Auctions navigation
const eventsButton = document.getElementById('eventsBTN');
const browseEventsButton = document.getElementById('browseEvents');
if (eventsButton) {
    eventsButton.addEventListener('click', () => nav('subpages/events/index.html'));
}
if (browseEventsButton) {
    browseEventsButton.addEventListener('click', () => nav('subpages/events/index.html'));
}

/*
  15-car dataset for the 2025 Quiet Luxury auction.
  Each car: id, title, year, price (2025), features (array), image placeholder path
*/
const CARS = [
    {id:1,title:'1962 Ferrari 250 GTO',year:1962,price:'€78,500,000',features:['V12','Matching numbers','Concours restoration'],img:'assets/placeholders/car-1.svg'},
    {id:2,title:'1995 McLaren F1',year:1995,price:'€65,000,000',features:['3-seat layout','BMW V12','Carbon fiber chassis'],img:'assets/placeholders/car-2.svg'},
    {id:3,title:'1967 Shelby GT500',year:1967,price:'€4,200,000',features:['427 V8','Rare options','Documented provenance'],img:'assets/placeholders/car-3.svg'},
    {id:4,title:'1997 Porsche 911 GT1 Straßenversion',year:1997,price:'€14,500,000',features:['Race-derived','Twin-turbo','Limited production'],img:'assets/placeholders/car-4.svg'},
    {id:5,title:'1957 Mercedes-Benz 300 SL Gullwing',year:1957,price:'€11,000,000',features:['Gullwing doors','Fuel-injected inline-6','Iconic design'],img:'assets/placeholders/car-5.svg'},
    {id:6,title:'2013 Lamborghini Veneno',year:2013,price:'€8,900,000',features:['Limited to 3','Top speed oriented','V12 engine'],img:'assets/placeholders/car-6.svg'},
    {id:7,title:'1961 Jaguar E-Type Series 1',year:1961,price:'€1,200,000',features:['Inline-6','Original coachwork','Classic British GT'],img:'assets/placeholders/car-7.svg'},
    {id:8,title:'2004 Ferrari Enzo',year:2004,price:'€3,200,000',features:['F1-derived tech','V12','Carbon-fiber tub'],img:'assets/placeholders/car-8.svg'},
    {id:9,title:'1987 Porsche 959 Komfort',year:1987,price:'€2,800,000',features:['Twin-turbo','All-wheel drive','Advanced electronics'],img:'assets/placeholders/car-9.svg'},
    {id:10,title:'1954 Fiat 8V Supersonic',year:1954,price:'€1,400,000',features:['Rare coachbuilt body','V8 engine','Collector favorite'],img:'assets/placeholders/car-10.svg'},
    {id:11,title:'1970 Lamborghini Miura SV',year:1970,price:'€9,500,000',features:['Mid-engine V12','Pioneering supercar','Historic provenance'],img:'assets/placeholders/car-11.svg'},
    {id:12,title:'2016 Porsche 918 Spyder',year:2016,price:'€1,900,000',features:['Hybrid powertrain','Limited run','Track-capable'],img:'assets/placeholders/car-12.svg'},
    {id:13,title:'2005 Rolls-Royce Phantom (Bespoke)',year:2005,price:'€350,000',features:['Bespoke interior','Hand-stitched leather','V12 luxury'],img:'assets/placeholders/car-13.svg'},
    {id:14,title:'2023 Aston Martin Valkyrie AMR Pro (Prototype)',year:2023,price:'€16,000,000',features:['Hypercar prototype','Aerodynamic extreme','F1 engineering'],img:'assets/placeholders/car-14.svg'},
    {id:15,title:'1969 Nissan Skyline GT-R (Hakosuka)',year:1969,price:'€520,000',features:['S20 inline-6','Iconic Japanese classic','Restored'],img:'assets/placeholders/car-15.svg'},
];

function renderEventsGrid(){
    const grid = document.getElementById('eventsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    CARS.forEach(car => {
        const card = document.createElement('article');
        card.className = 'auction-card';
        card.tabIndex = 0;
        card.innerHTML = `
            <div class="auction-media" style="background-image:url('${base}${car.img}')" aria-hidden="true"></div>
            <div class="auction-body">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-meta">Year: ${car.year} • ${car.features.slice(0,2).join(' • ')}</div>
                <div class="car-price">${car.price}</div>
            </div>
        `;
        // Accessible click behavior
        card.addEventListener('click', ()=>{
            alert(`${car.title} — ${car.price} (2025).\n\nFeatures:\n- ${car.features.join('\n- ')}\n\nImage placeholder will be replaced in stage two.`);
        });
        card.addEventListener('keypress', (e)=>{ if (e.key === 'Enter') card.click(); });
        grid.appendChild(card);
    });
}

// If on events page render the grid
if (document.getElementById('eventsGrid')){
    renderEventsGrid();
}

if (contactSubmittedButton) {
    contactSubmittedButton.addEventListener('click', (e) => {
        // If inside a form with submit type, let the form submit after alert
        alert('Thank you for reaching out to us. We will get back to you as soon as possible.');
    });
}