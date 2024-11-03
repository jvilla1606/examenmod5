// Obtener referencias a los elementos
const characterSections = document.querySelectorAll('.character-section');
const characterInfoContainer = document.getElementById('character-info');

// Función para cargar los personajes desde la API de SWAPI, limitando a 5 personajes
async function loadCharacters(start, end) {
  characterInfoContainer.innerHTML = ''; // Limpiar el contenedor
  
  // Limitar el rango para cargar solo 5 personajes
  const maxCharacters = Math.min(5, end - start + 1); // Asegura que no se cargue más de 5 personajes
  
  for (let i = 0; i < maxCharacters; i++) {
    const characterId = start + i; // Calcular el ID de personaje
    try {
      const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
      if (!response.ok) throw new Error('Error al cargar el personaje');
      const character = await response.json();
      displayCharacter(character);
    } catch (error) {
      console.error(`Error al cargar el personaje ${characterId}:`, error);
    }
  }
  characterInfoContainer.style.display = 'block';
}

// Función para mostrar la información del personaje
function displayCharacter(character) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');
  characterCard.innerHTML = `
    <h5>${character.name}</h5>
    <p>Altura: ${character.height} cm</p>
    <p>Peso: ${character.mass} kg</p>
  `;
  characterInfoContainer.appendChild(characterCard);
}

// Event listeners para cargar personajes en cada sección
characterSections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    const range = section.dataset.range.split('-');
    const start = parseInt(range[0]);
    const end = parseInt(range[1]);
    loadCharacters(start, end);
  });
});