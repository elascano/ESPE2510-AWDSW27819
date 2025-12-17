const API_URL = '/api/team';


const clientsBody = document.getElementById('clientsBody');
const clientModal = document.getElementById('clientModal');
const clientForm = document.getElementById('clientForm');
const btnNewClient = document.getElementById('btnNewClient');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnCancel = document.getElementById('btnCancel');


btnNewClient.addEventListener('click', openClientModal);
btnCloseModal.addEventListener('click', closeClientModal);
btnCancel.addEventListener('click', closeClientModal);
clientForm.addEventListener('submit', saveClient);


document.addEventListener('DOMContentLoaded', loadTeams);

async function loadTeams() {
    try {
        const res = await fetch(API_URL);
        const teams = await res.json();

        clientsBody.innerHTML = teams.map(t => `
            <tr>
                <td>${t.name}</td>
                <td>${t.email || '-'}</td>
                <td>${t.phone || '-'}</td>
                <td>${t.address || '-'}</td>
            </tr>
        `).join('');
        lucide.createIcons();
    } catch (err) {
        console.error('Error loading teams:', err);
    }
}

function openClientModal() {
    clientForm.reset();
    clientModal.classList.add('active');
}

function closeClientModal() {
    clientModal.classList.remove('active');
}

async function saveClient(e) {
    e.preventDefault();

    const team = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        address: document.getElementById('clientAddress').value,
        foundedYear: 1998,
        stadium: "Generic Stadium",
        league: "Major Soccer League"
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(team)
        });

        if (!res.ok) throw new Error(`Error ${res.status}`);

        closeClientModal();
        loadTeams(); 
    } catch (err) {
        console.error('Error saving team:', err);
    }
}
