const directory = document.getElementById('directory');
const url = 'https://randomuser.me/api/?results=16&nat=us';

async function getEmployees() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayEmployees(data.results);
    } catch (error) {
        console.error("API Fetch Error:", error);
        directory.innerHTML = "<p>Failed to load staff data. Please try again later.</p>";
    }
}
getEmployees();

function displayEmployees(employees) {
    let html = '';
    employees.forEach(employee => {
        html += `
            <div class="card">
                <img src="${employee.picture.large}" alt="">
                <h3>${employee.name.first} ${employee.name.last}</h3>
                <p>${employee.email}</p>
                <p>${employee.location.city}, ${employee.location.state}</p>
            </div>
        `;
    });
    directory.innerHTML = html;
}



const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

function performSearch() {
    let foundCount = 0;

    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        if (name.includes(searchTerm)) {
            card.style.display = 'block';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    const message = document.getElementById('no-results');
    message.style.display = foundCount === 0 ? 'block' : 'none';

    const counter = document.getElementById('counter');
    const total = cards.length;
    counter.textContent = `Showing ${foundCount} of ${total} employees`;
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    performSearch();
});