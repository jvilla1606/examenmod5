const characterSections = document.querySelectorAll('.character-section');
const characterInfoContainer = document.getElementById('character-info');

// Función para cargar los personajes, limitando a 5 y manteniendo los personajes previos
async function loadCharacters(start, end, range) {
  // Si ya existe un contenedor para el rango, reutilízalo. Si no, créalo.
  let rangeContainer = document.getElementById(`characters-${range}`);
  
  if (rangeContainer) {
    rangeContainer.innerHTML = ''; // Si es la misma sección, refrescamos su contenido
  } else {
    // Crear un nuevo contenedor para el rango si no existe
    rangeContainer = document.createElement('div');
    rangeContainer.id = `characters-${range}`;
    rangeContainer.classList.add('range-container');
    characterInfoContainer.appendChild(rangeContainer);
  }

  // Limitar la carga a 5 personajes
  const maxCharacters = Math.min(5, end - start + 1);

  for (let i = 0; i < maxCharacters; i++) {
    const characterId = start + i;
    try {
      const response = await fetch(`https://swapi.dev/api/people/${characterId}/`);
      if (!response.ok) throw new Error('Error al cargar el personaje');
      const character = await response.json();
      displayCharacter(character, rangeContainer);
    } catch (error) {
      console.error(`Error al cargar el personaje ${characterId}:`, error);
    }
  }
}

// Función para mostrar la información del personaje en un contenedor específico
function displayCharacter(character, container) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');
  characterCard.innerHTML = `
    <h5>${character.name}</h5>
    <p>Altura: ${character.height} cm</p>
    <p>Peso: ${character.mass} kg</p>
  `;
  container.appendChild(characterCard);
}

// Event listeners para cargar personajes en cada sección
characterSections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    const range = section.dataset.range;
    const [start, end] = range.split('-').map(Number);
    loadCharacters(start, end, range);
  });
});
