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
    counter.textContent = `Showing ${employeesToDisplay.length} of ${allEmployees.length} employees`;
    
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

searchInput.addEventListener('input', performSearch);

searchBtn.addEventListener('click', performSearch);

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderDirectory(allEmployees); 
});

// Start the app
getEmployees();