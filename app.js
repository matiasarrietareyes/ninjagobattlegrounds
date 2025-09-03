// Variables globales del juego
let currentUser = null;
let selectedCharacter = null;
let currentMode = null;
let gameState = 'login';

// Datos de los personajes
const characters = {
    kai: {
        name: 'Kai',
        title: 'Maestro del Fuego',
        element: '🔥 Fuego',
        attack: 85,
        defense: 70,
        special: 'Explosión de Fuego',
        health: 100
    },
    zane: {
        name: 'Zane',
        title: 'Maestro del Hielo',
        element: '❄️ Hielo',
        attack: 80,
        defense: 75,
        special: 'Tormenta de Hielo',
        health: 100
    },
    lloyd: {
        name: 'Lloyd',
        title: 'Ninja Verde',
        element: '🌿 Energía',
        attack: 90,
        defense: 80,
        special: 'Poder Verde',
        health: 100
    },
    cole: {
        name: 'Cole',
        title: 'Maestro de la Tierra',
        element: '🌍 Tierra',
        attack: 75,
        defense: 90,
        special: 'Terremoto',
        health: 100
    },
    jay: {
        name: 'Jay',
        title: 'Maestro del Rayo',
        element: '⚡ Rayo',
        attack: 88,
        defense: 65,
        special: 'Tormenta Eléctrica',
        health: 100
    },
    nya: {
        name: 'Nya',
        title: 'Maestra del Agua',
        element: '💧 Agua',
        attack: 82,
        defense: 78,
        special: 'Tsunami',
        health: 100
    }
};

// Estado de la batalla
let battleState = {
    playerHealth: 100,
    opponentHealth: 100,
    playerTurn: true,
    gameOver: false
};

// Función de login de demostración
function demoLogin() {
    console.log('Iniciando modo demostración...');
    
    // Crear usuario de demostración
    currentUser = {
        name: 'Jugador Demo',
        email: 'demo@ninjago.com',
        avatar: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%23f39c12"/><circle cx="35" cy="40" r="5" fill="%23000"/><circle cx="65" cy="40" r="5" fill="%23000"/><path d="M 35 60 Q 50 70 65 60" stroke="%23000" stroke-width="3" fill="none"/></svg>'
    };
    
    console.log('Usuario demo creado:', currentUser);
    
    // Actualizar la interfaz
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-avatar').src = currentUser.avatar;
    
    // Cambiar a pantalla principal
    showMainScreen();
}

// Función de login con Google
function handleCredentialResponse(response) {
    try {
        const responsePayload = decodeJwtResponse(response.credential);
        
        currentUser = {
            name: responsePayload.name,
            email: responsePayload.email,
            avatar: responsePayload.picture
        };
        
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-avatar').src = currentUser.avatar;
        
        showMainScreen();
    } catch (error) {
        console.error('Error en login de Google:', error);
        alert('Error en el login de Google. Usa el modo demostración.');
    }
}

// Función para decodificar JWT
function decodeJwtResponse(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decodificando JWT:', error);
        throw error;
    }
}

// Función de logout
function logout() {
    currentUser = null;
    selectedCharacter = null;
    currentMode = null;
    gameState = 'login';
    showLoginScreen();
}

// Función para ir atrás
function goBack() {
    if (currentMode) {
        showMainScreen();
    } else {
        showLoginScreen();
    }
}

// Función para seleccionar modo
function selectMode(mode) {
    currentMode = mode;
    showCharacterScreen();
}

// Función para mostrar pantalla de login
function showLoginScreen() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('login-screen').classList.add('active');
}

// Función para mostrar pantalla principal
function showMainScreen() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('main-screen').classList.add('active');
}

// Función para mostrar pantalla de selección de personaje
function showCharacterScreen() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('character-screen').classList.add('active');
    setupCharacterEvents();
}

// Función para mostrar pantalla de batalla
function showBattleScreen() {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById('battle-screen').classList.add('active');
    setupBattle();
}

// Configurar eventos de personajes
function setupCharacterEvents() {
    const characterElements = document.querySelectorAll('.character-item');
    
    characterElements.forEach(element => {
        element.addEventListener('click', function() {
            const characterId = this.dataset.character;
            selectCharacter(characterId);
        });
    });
}

// Seleccionar personaje
function selectCharacter(characterId) {
    selectedCharacter = characterId;
    
    // Remover selección anterior
    document.querySelectorAll('.character-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Agregar selección actual
    document.querySelector(`[data-character="${characterId}"]`).classList.add('selected');
    
    // Actualizar vista previa
    updateCharacterPreview(characterId);
    
    // Habilitar botón de selección
    document.getElementById('select-btn').disabled = false;
}

// Actualizar vista previa del personaje
function updateCharacterPreview(characterId) {
    const character = characters[characterId];
    const previewImage = document.getElementById('preview-image');
    const previewInfo = document.getElementById('preview-info');
    
    // Actualizar imagen con el personaje exacto de las fotos
    const characterImages = {
        kai: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e74c3c"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23e74c3c"/><rect x="25" y="50" width="15" height="25" fill="%23e74c3c"/><rect x="60" y="50" width="15" height="25" fill="%23e74c3c"/><rect x="40" y="85" width="20" height="15" fill="%23e74c3c"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="25" cy="55" r="8" fill="%23f39c12"/><path d="M 25 51 L 27 55 L 25 59 L 23 55 Z" fill="%23000"/></svg>',
        zane: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23ffffff"/><rect x="25" y="50" width="15" height="25" fill="%23ffffff"/><rect x="60" y="50" width="15" height="25" fill="%23ffffff"/><rect x="40" y="85" width="20" height="15" fill="%23ffffff"/><circle cx="35" cy="55" r="3" fill="%233498db"/><circle cx="45" cy="55" r="3" fill="%233498db"/><circle cx="55" cy="55" r="3" fill="%233498db"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="65" cy="55" r="8" fill="%23bdc3c7"/><path d="M 65 51 L 67 55 L 65 59 L 63 55 Z" fill="%23000"/><circle cx="75" cy="55" r="8" fill="%23bdc3c7"/><path d="M 75 51 L 77 55 L 75 59 L 73 55 Z" fill="%23000"/></svg>',
        lloyd: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2327ae60"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%2327ae60"/><rect x="25" y="50" width="15" height="25" fill="%2327ae60"/><rect x="60" y="50" width="15" height="25" fill="%2327ae60"/><rect x="40" y="85" width="20" height="15" fill="%2327ae60"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="25" cy="55" r="8" fill="%23f1c40f"/><text x="25" y="60" text-anchor="middle" fill="%23000" font-size="8" font-weight="bold">6</text></svg>',
        cole: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%238b4513"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%238b4513"/><rect x="25" y="50" width="15" height="25" fill="%238b4513"/><rect x="60" y="50" width="15" height="25" fill="%238b4513"/><rect x="40" y="85" width="20" height="15" fill="%238b4513"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><rect x="25" y="70" width="50" height="3" fill="%23a0522d"/><rect x="25" y="75" width="50" height="3" fill="%23a0522d"/></svg>',
        jay: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f1c40f"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23f1c40f"/><rect x="25" y="50" width="15" height="25" fill="%23f1c40f"/><rect x="60" y="50" width="15" height="25" fill="%23f1c40f"/><rect x="40" y="85" width="20" height="15" fill="%23f1c40f"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="65" cy="55" r="8" fill="%23f1c40f"/><path d="M 65 51 L 67 55 L 65 59 L 63 55 Z" fill="%23000"/><path d="M 61 55 L 65 51 L 69 55 L 65 59 Z" fill="%23000"/></svg>',
        nya: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232980b9"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%232980b9"/><rect x="25" y="50" width="15" height="25" fill="%232980b9"/><rect x="60" y="50" width="15" height="25" fill="%232980b9"/><rect x="40" y="85" width="20" height="15" fill="%232980b9"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><rect x="25" y="70" width="50" height="3" fill="%231e90ff"/><rect x="25" y="75" width="50" height="3" fill="%231e90ff"/></svg>'
    };
    
    previewImage.style.backgroundImage = `url('${characterImages[characterId]}')`;
    
    // Actualizar información
    previewInfo.innerHTML = `
        <h3>${character.name}</h3>
        <p>${character.title}</p>
        <div style="margin: 15px 0;">
            <p><strong>Elemento:</strong> ${character.element}</p>
            <p><strong>Ataque:</strong> ${character.attack}</p>
            <p><strong>Defensa:</strong> ${character.defense}</p>
            <p><strong>Ataque Especial:</strong> ${character.special}</p>
        </div>
    `;
    
    // Configurar botón de selección
    const selectBtn = document.getElementById('select-btn');
    selectBtn.onclick = function() {
        if (currentMode === 'battle') {
            showBattleScreen();
        } else if (currentMode === 'adventure') {
            // Implementar modo aventura
            alert('Modo Aventura próximamente disponible!\n\nCaracterísticas planeadas:\n- Misiones individuales\n- Mejora de habilidades\n- Desbloqueo de nuevos poderes\n- Historia del universo Ninjago');
        }
    };
}

// Función para obtener imagen del personaje
function getCharacterImage(characterId) {
    const characterImages = {
        kai: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23e74c3c"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23e74c3c"/><rect x="25" y="50" width="15" height="25" fill="%23e74c3c"/><rect x="60" y="50" width="15" height="25" fill="%23e74c3c"/><rect x="40" y="85" width="20" height="15" fill="%23e74c3c"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="25" cy="55" r="8" fill="%23f39c12"/><path d="M 25 51 L 27 55 L 25 59 L 23 55 Z" fill="%23000"/></svg>',
        zane: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ffffff"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23ffffff"/><rect x="25" y="50" width="15" height="25" fill="%23ffffff"/><rect x="60" y="50" width="15" height="25" fill="%23ffffff"/><rect x="40" y="85" width="20" height="15" fill="%23ffffff"/><circle cx="35" cy="55" r="3" fill="%233498db"/><circle cx="45" cy="55" r="3" fill="%233498db"/><circle cx="55" cy="55" r="3" fill="%233498db"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="65" cy="55" r="8" fill="%23bdc3c7"/><path d="M 65 51 L 67 55 L 65 59 L 63 55 Z" fill="%23000"/><circle cx="75" cy="55" r="8" fill="%23bdc3c7"/><path d="M 75 51 L 77 55 L 75 59 L 73 55 Z" fill="%23000"/></svg>',
        lloyd: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2327ae60"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%2327ae60"/><rect x="25" y="50" width="15" height="25" fill="%2327ae60"/><rect x="60" y="50" width="15" height="25" fill="%2327ae60"/><rect x="40" y="85" width="20" height="15" fill="%2327ae60"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="25" cy="55" r="8" fill="%23f1c40f"/><text x="25" y="60" text-anchor="middle" fill="%23000" font-size="8" font-weight="bold">6</text></svg>',
        cole: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%238b4513"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%238b4513"/><rect x="25" y="50" width="15" height="25" fill="%238b4513"/><rect x="60" y="50" width="15" height="25" fill="%238b4513"/><rect x="40" y="85" width="20" height="15" fill="%238b4513"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><rect x="25" y="70" width="50" height="3" fill="%23a0522d"/><rect x="25" y="75" width="50" height="3" fill="%23a0522d"/></svg>',
        jay: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f1c40f"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%23f1c40f"/><rect x="25" y="50" width="15" height="25" fill="%23f1c40f"/><rect x="60" y="50" width="15" height="25" fill="%23f1c40f"/><rect x="40" y="85" width="20" height="15" fill="%23f1c40f"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><circle cx="65" cy="55" r="8" fill="%23f1c40f"/><path d="M 65 51 L 67 55 L 65 59 L 63 55 Z" fill="%23000"/><path d="M 61 55 L 65 51 L 69 55 L 65 59 Z" fill="%23000"/></svg>',
        nya: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%232980b9"/><circle cx="50" cy="30" r="15" fill="%23f1c40f"/><rect x="35" y="45" width="30" height="40" fill="%232980b9"/><rect x="25" y="50" width="15" height="25" fill="%232980b9"/><rect x="60" y="50" width="15" height="25" fill="%232980b9"/><rect x="40" y="85" width="20" height="15" fill="%232980b9"/><circle cx="35" cy="55" r="3" fill="%23f39c12"/><circle cx="45" cy="55" r="3" fill="%23f39c12"/><circle cx="55" cy="55" r="3" fill="%23f39c12"/><rect x="30" y="60" width="40" height="3" fill="%23000"/><rect x="35" y="65" width="30" height="3" fill="%23000"/><rect x="25" y="70" width="50" height="3" fill="%231e90ff"/><rect x="25" y="75" width="50" height="3" fill="%231e90ff"/></svg>'
    };
    
    return characterImages[characterId] || characterImages.kai;
}

// Configurar batalla
function setupBattle() {
    if (!selectedCharacter) return;
    
    const character = characters[selectedCharacter];
    battleState.playerHealth = character.health;
    battleState.opponentHealth = 100;
    battleState.playerTurn = true;
    battleState.gameOver = false;
    
    // Configurar personajes en la arena
    const playerImage = document.getElementById('player-image');
    const opponentImage = document.getElementById('opponent-image');
    
    playerImage.style.backgroundImage = `url('${getCharacterImage(selectedCharacter)}')`;
    opponentImage.style.backgroundImage = `url('${getCharacterImage('kai')}')`; // Oponente fijo por ahora
    
    // Configurar nombres
    document.getElementById('player-name').textContent = character.name;
    document.getElementById('opponent-name').textContent = 'Kai (Oponente)';
    
    updateBattleUI();
}

// Función de ataque
function attack() {
    if (battleState.gameOver || !battleState.playerTurn) return;
    
    const character = characters[selectedCharacter];
    const damage = Math.floor(Math.random() * 20) + character.attack - 70;
    
    battleState.opponentHealth = Math.max(0, battleState.opponentHealth - damage);
    battleState.playerTurn = false;
    
    updateBattleUI();
    
    if (battleState.opponentHealth <= 0) {
        endBattle(true);
    } else {
        setTimeout(opponentTurn, 1000);
    }
}

// Función de ataque especial
function specialAttack() {
    if (battleState.gameOver || !battleState.playerTurn) return;
    
    const character = characters[selectedCharacter];
    const damage = Math.floor(Math.random() * 30) + character.attack - 60;
    
    battleState.opponentHealth = Math.max(0, battleState.opponentHealth - damage);
    battleState.playerTurn = false;
    
    updateBattleUI();
    
    if (battleState.opponentHealth <= 0) {
        endBattle(true);
    } else {
        setTimeout(opponentTurn, 1000);
    }
}

// Función de defensa
function defend() {
    if (battleState.gameOver || !battleState.playerTurn) return;
    
    battleState.playerTurn = false;
    updateBattleUI();
    
    setTimeout(opponentTurn, 1000);
}

// Turno del oponente
function opponentTurn() {
    if (battleState.gameOver) return;
    
    const damage = Math.floor(Math.random() * 15) + 60;
    battleState.playerHealth = Math.max(0, battleState.playerHealth - damage);
    battleState.playerTurn = true;
    
    updateBattleUI();
    
    if (battleState.playerHealth <= 0) {
        endBattle(false);
    }
}

// Actualizar interfaz de batalla
function updateBattleUI() {
    // Actualizar barras de salud
    const playerHealthBar = document.getElementById('player-health-bar');
    const opponentHealthBar = document.getElementById('opponent-health-bar');
    
    playerHealthBar.style.width = battleState.playerHealth + '%';
    opponentHealthBar.style.width = battleState.opponentHealth + '%';
    
    // Actualizar texto de salud
    document.getElementById('player-health-text').textContent = battleState.playerHealth;
    document.getElementById('opponent-health-text').textContent = battleState.opponentHealth;
    
    // Actualizar botones
    const attackBtn = document.getElementById('attack-btn');
    const specialBtn = document.getElementById('special-btn');
    const defendBtn = document.getElementById('defend-btn');
    
    attackBtn.disabled = !battleState.playerTurn || battleState.gameOver;
    specialBtn.disabled = !battleState.playerTurn || battleState.gameOver;
    defendBtn.disabled = !battleState.playerTurn || battleState.gameOver;
    
    // Mostrar mensaje de turno
    const turnMessage = document.getElementById('turn-message');
    if (battleState.gameOver) {
        turnMessage.textContent = '¡Batalla terminada!';
    } else if (battleState.playerTurn) {
        turnMessage.textContent = 'Tu turno - ¡Ataca!';
    } else {
        turnMessage.textContent = 'Turno del oponente...';
    }
}

// Terminar batalla
function endBattle(playerWon) {
    battleState.gameOver = true;
    
    const result = playerWon ? '¡Victoria!' : '¡Derrota!';
    const message = playerWon ? 
        `¡Felicidades! ${characters[selectedCharacter].name} ha ganado la batalla.` :
        `¡Mejor suerte la próxima vez! El oponente fue más fuerte.`;
    
    setTimeout(() => {
        alert(`${result}\n\n${message}\n\nPresiona OK para volver a la selección de personajes.`);
        showCharacterScreen();
    }, 500);
}

// Inicializar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Juego Ninjago cargado correctamente');
    console.log('Función demoLogin disponible:', typeof demoLogin);
    
    // Verificar que todos los elementos estén presentes
    const demoBtn = document.querySelector('.demo-btn');
    if (demoBtn) {
        console.log('Botón de demostración encontrado');
        demoBtn.addEventListener('click', demoLogin);
    } else {
        console.error('Botón de demostración no encontrado');
    }
});
