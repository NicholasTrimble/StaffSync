const directory = document.getElementById('directory');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn'); 
const resetBtn = document.getElementById('reset-btn');
const counter = document.getElementById('counter');
const noResultsMessage = document.getElementById('no-results');

const url = 'https://randomuser.me/api/?results=16&nat=us';

let allEmployees = []; 

async function getEmployees() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        allEmployees = data.results; 
        renderDirectory(allEmployees); 
    } catch (error) {
        console.error("API Fetch Error:", error);
        directory.innerHTML = "<p>Failed to load staff data. Please try again later.</p>";
    }
}

function renderDirectory(employeesToDisplay) {
    animateCounter(employeesToDisplay.length);

    
    if (employeesToDisplay.length === 0) {
        directory.innerHTML = '';
        noResultsMessage.style.display = 'block';
        return; 
    } 
    
    noResultsMessage.style.display = 'none'; 

    const html = employeesToDisplay.map((employee, index) => `
        <div class="card" style="--animation-order: ${index};">
            <img src="${employee.picture.large}" alt="">
            <h3>${employee.name.first} ${employee.name.last}</h3>
            <p>${employee.email}</p>
            <p>${employee.location.city}, ${employee.location.state}</p>
        </div>
    `).join('');

    directory.innerHTML = html;
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredEmployees = allEmployees.filter(employee => {
        const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
        return fullName.includes(searchTerm);
    });

    renderDirectory(filteredEmployees);
}

// Animate cards
function animateCounter(newCount) {
    const total = allEmployees.length;
    const duration = 300;
    const start = parseInt(counter.textContent.match(/\d+/)[0]) || 0;
    const startTime = performance.now();

    function update(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const current = Math.floor(start + (newCount - start) * progress);
        counter.textContent = `Showing ${current} of ${total} employees`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}


const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

directory.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;

    const index = Array.from(directory.children).indexOf(card);
    const employee = allEmployees[index];

    modalContent.innerHTML = `
        <img src="${employee.picture.large}" style="border-radius:50%; width:120px;">
        <h2>${employee.name.first} ${employee.name.last}</h2>
        <p>${employee.email}</p>
        <p>${employee.phone}</p>
        <p>${employee.location.street.number} ${employee.location.street.name}</p>
        <p>${employee.location.city}, ${employee.location.state}</p>
    `;

    modal.classList.add('active');
});

modal.addEventListener('click', () => {
    modal.classList.remove('active');
});






searchInput.addEventListener('input', performSearch);

searchBtn.addEventListener('click', performSearch);

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderDirectory(allEmployees); 
});

getEmployees();