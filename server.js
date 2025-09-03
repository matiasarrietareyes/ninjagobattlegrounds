const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Servir archivos estáticos
app.use(express.static(__dirname));

// Estado del juego
const gameState = {
  players: new Map(),
  characters: [
            { id: 'kai', name: 'Kai (Red Ninja)', img: 'images/ninjarojosinmascara.png.png', available: true },
            { id: 'zane', name: 'Zane (White Ninja)', img: 'images/ninjablanco.png-fotor-bg-remover-20250902204741.png', available: true },
            { id: 'jay', name: 'Jay (Blue Ninja)', img: 'images/ninjaazul.png-fotor-bg-remover-20250902204441.png', available: true },
            { id: 'cole', name: 'Cole (Black Ninja)', img: 'images/ninjaazul.png-fotor-bg-remover-20250902204441.png', available: true }
  ],
  rooms: new Map()
};

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  // Enviar estado inicial del juego
  socket.emit('gameState', {
    characters: gameState.characters,
    players: Array.from(gameState.players.values())
  });

  // Unirse a una sala
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    
    if (!gameState.rooms.has(roomId)) {
      gameState.rooms.set(roomId, {
        id: roomId,
        players: [],
        status: 'waiting',
        maxPlayers: 2
      });
    }
    
    const room = gameState.rooms.get(roomId);
    if (room.players.length < room.maxPlayers) {
      room.players.push(socket.id);
      io.to(roomId).emit('roomUpdate', room);
    }
  });

  // Seleccionar personaje
  socket.on('selectCharacter', (data) => {
    const { characterId, roomId } = data;
    
    // Marcar personaje como no disponible
    const character = gameState.characters.find(c => c.id === characterId);
    if (character && character.available) {
      character.available = false;
      
      // Agregar jugador
      gameState.players.set(socket.id, {
        id: socket.id,
        characterId: characterId,
        character: character,
        roomId: roomId,
        ready: true
      });
      
      // Notificar a todos los jugadores
      io.emit('characterSelected', {
        characterId: characterId,
        playerId: socket.id,
        available: false
      });
      
      // Verificar si la sala está lista para comenzar
      const room = gameState.rooms.get(roomId);
      if (room && room.players.length >= 2) {
        const allReady = room.players.every(playerId => 
          gameState.players.get(playerId)?.ready
        );
        
        if (allReady) {
          room.status = 'ready';
          io.to(roomId).emit('gameReady', room);
        }
      }
    }
  });

  // Iniciar batalla
  socket.on('startBattle', (roomId) => {
    const room = gameState.rooms.get(roomId);
    if (room && room.status === 'ready') {
      room.status = 'battle';
      io.to(roomId).emit('battleStarted', room);
    }
  });

  // Movimiento del jugador
  socket.on('playerMove', (data) => {
    const { x, y, roomId } = data;
    const player = gameState.players.get(socket.id);
    
    if (player) {
      player.x = x;
      player.y = y;
      socket.to(roomId).emit('playerMoved', {
        playerId: socket.id,
        x: x,
        y: y,
        characterId: player.characterId
      });
    }
  });

  // Ataque del jugador
  socket.on('playerAttack', (data) => {
    const { targetId, roomId } = data;
    socket.to(roomId).emit('playerAttacked', {
      attackerId: socket.id,
      targetId: targetId
    });
  });

  // Desconexión
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
    
    const player = gameState.players.get(socket.id);
    if (player) {
      // Liberar personaje
      const character = gameState.characters.find(c => c.id === player.characterId);
      if (character) {
        character.available = true;
        io.emit('characterSelected', {
          characterId: player.characterId,
          playerId: socket.id,
          available: true
        });
      }
      
      // Remover de sala
      if (player.roomId) {
        const room = gameState.rooms.get(player.roomId);
        if (room) {
          room.players = room.players.filter(id => id !== socket.id);
          if (room.players.length === 0) {
            gameState.rooms.delete(player.roomId);
          } else {
            io.to(player.roomId).emit('roomUpdate', room);
          }
        }
      }
      
      gameState.players.delete(socket.id);
    }
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ninjago-online.html'));
});

// Ruta para obtener estado del juego
app.get('/api/gameState', (req, res) => {
  res.json({
    players: Array.from(gameState.players.values()),
    characters: gameState.characters,
    rooms: Array.from(gameState.rooms.values())
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor Ninjago Online ejecutándose en puerto ${PORT}`);
  console.log(`Abre http://localhost:${PORT} en tu navegador`);
});
