document.addEventListener('DOMContentLoaded', () => {
    const pokemonInput = document.getElementById('pokemonInput');
    const searchButton = document.getElementById('searchButton');
    const pokemonResults = document.getElementById('pokemonResults');

    const BASE_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

    const statNames = {
        'hp': 'PS',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'Ataque Especial',
        'special-defense': 'Defensa Especial',
        'speed': 'Velocidad'
    };

    const clearResults = () => {
        pokemonResults.innerHTML = '';
    };

    const displayError = (message) => {
        clearResults();
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = `Error: ${message}`;
        pokemonResults.appendChild(errorMessage);
    };

    const createTypeBadge = (type) => {
        const span = document.createElement('span');
        span.classList.add('pokemon-type-badge');
        span.classList.add(`type-${type.toLowerCase()}`);
        span.textContent = type;
        return span;
    };

    const displayPokemon = (pokemonData) => {
        clearResults();

        const pokemonCard = document.createElement('div');
        pokemonCard.classList.add('pokemon-card');

        const name = document.createElement('h2');
        name.textContent = pokemonData.name;

        const image = document.createElement('img');
        
        image.src = pokemonData.sprites.front_default || 'https://via.placeholder.com/150?text=No+Image';
        image.alt = `Imagen de ${pokemonData.name}`;

        const id = document.createElement('p');
        id.innerHTML = `<strong>ID:</strong> #${pokemonData.id}`;

        const height = document.createElement('p');
        height.innerHTML = `<strong>Altura:</strong> ${(pokemonData.height / 10)} m`; // Viene en decímetros
        
        const weight = document.createElement('p');
        weight.innerHTML = `<strong>Peso:</strong> ${(pokemonData.weight / 10)} kg`; // Viene en hectogramos

        const typesContainer = document.createElement('div');
        typesContainer.classList.add('pokemon-types');
        typesContainer.innerHTML = '<strong>Tipo(s):</strong> ';
        pokemonData.types.forEach(typeInfo => {
            typesContainer.appendChild(createTypeBadge(typeInfo.type.name));
        });

        const statsContainer = document.createElement('div');
        statsContainer.classList.add('pokemon-stats');
        const statsTitle = document.createElement('h3');
        statsTitle.textContent = 'Estadísticas Base';
        statsContainer.appendChild(statsTitle);

        pokemonData.stats.forEach(statInfo => {
            const statItem = document.createElement('div');
            statItem.classList.add('stat-item');

            const statNameSpan = document.createElement('span');
            statNameSpan.classList.add('stat-name');

            statNameSpan.textContent = statNames[statInfo.stat.name] || statInfo.stat.name;
            
            const statValueSpan = document.createElement('span');
            statValueSpan.classList.add('stat-value');
            statValueSpan.textContent = statInfo.base_stat;

            statItem.appendChild(statNameSpan);
            statItem.appendChild(statValueSpan);
            statsContainer.appendChild(statItem);
        });


        pokemonCard.appendChild(name);
        pokemonCard.appendChild(image);
        pokemonCard.appendChild(id);
        pokemonCard.appendChild(height);
        pokemonCard.appendChild(weight);
        pokemonCard.appendChild(typesContainer);
        pokemonCard.appendChild(statsContainer);

        pokemonResults.appendChild(pokemonCard);
    };

    const searchPokemon = async () => {
        const searchTerm = pokemonInput.value.trim().toLowerCase();
        if (!searchTerm) {
            displayError('Por favor, introduce el nombre o ID de un Pokémon.');
            return;
        }

        clearResults();
        pokemonResults.innerHTML = '<p style="text-align: center;">Cargando Pokémon...</p>';

        try {
            const response = await fetch(`${BASE_API_URL}${searchTerm}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Pokémon no encontrado. Asegúrate de que el nombre o ID sean correctos.');
                }
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            displayPokemon(data);
        } catch (error) {
            displayError(error.message);
        }
    };

    searchButton.addEventListener('click', searchPokemon);
    pokemonInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchPokemon();
        }
    });

    pokemonInput.value = 'pikachu';
    searchPokemon();
});