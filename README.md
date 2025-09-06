# 🥷 Ninjago Battlegrounds

Un juego de batalla de ninjas inspirado en la serie Ninjago, desarrollado con HTML5, CSS3 y JavaScript.

## 🎮 Características

### **🎯 Modo Original (Local)**
- **4 Mundos Únicos**: Ice World, Lava World, Jungle World y Lego City
- **6 Personajes Ninja**: Kai, Zane, Lloyd, Cole, Jay y Nya
- **Modo Aventura**: Explora la ciudad de Lego y participa en torneos
- **Sistema de Combate**: Ataques básicos y especiales
- **Sistema de Progresión**: Cash, niveles y dificultad de IA
- **Tienda**: Compra personajes y habilidades

### **🌐 Modo Online (Multijugador)**
- **Sistema de Salas**: Crea o únete a salas con ID único
- **2 Jugadores**: Combate en tiempo real contra otros jugadores
- **Chat en Vivo**: Comunicación instantánea entre jugadores
- **Sincronización**: Movimiento y acciones en tiempo real
- **4 Personajes**: Kai, Zane, Jay y Cole disponibles
- **Interfaz Moderna**: Diseño optimizado para multijugador

## 🎯 Cómo Jugar

### Modo Batalla Tradicional
1. Selecciona "Start Battle"
2. Elige un mundo
3. Selecciona tu ninja
4. ¡Combate contra la IA!

### Modo Aventura (Lego City)
1. Selecciona "Start Battle" → "🏙️ Lego City"
2. Explora la ciudad con Lloyd
3. Encuentra torneos (marcadores brillantes)
4. Presiona ENTER para participar
5. Gana cash y niveles

## 🎮 Controles

- **WASD** o **Flechas**: Mover personaje
- **Ctrl**: Ataque básico
- **Enter**: Ataque especial / Interactuar
- **Space**: Saltar
- **Shift**: Escudo
- **ESC**: Salir (en modo aventura)

## 🏆 Torneos en Lego City

- 🥉 **Torneo Principiante** (Fácil) - 500 cash
- 🥈 **Torneo Intermedio** (Medio) - 1000 cash
- 🥇 **Torneo Maestro** (Difícil) - 2000 cash
- 🏆 **Campeonato Supremo** (Extremo) - 5000 cash

## 🛠️ Tecnologías

- HTML5 Canvas
- CSS3
- JavaScript (Vanilla)
- Node.js (servidor local)

## 🚀 Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone https://github.com/matiasarrietareyes/ninjagobattlegrounds.git
cd ninjagobattlegrounds
```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el servidor:
   ```bash
   npm start
   ```

4. Abre tu navegador:
- **Modo Online**: `http://localhost:3000`
- **Modo Original**: `http://localhost:3000/original`

## 🌐 Jugar Online

### **Crear una Partida**
1. Ve a `http://localhost:3000`
2. Haz clic en **"Crear Sala"**
3. Comparte el **ID de sala** con tu amigo
4. Ambos seleccionan personajes
5. ¡Combate en tiempo real!

### **Unirse a una Partida**
1. Ve a `http://localhost:3000`
2. Ingresa el **ID de sala** que te compartieron
3. Haz clic en **"Unirse a Sala"**
4. Selecciona tu personaje
5. ¡A jugar!

## 📁 Estructura del Proyecto

```
ninjagobattlegrounds/
├── index.html          # Archivo principal del juego
├── app.js              # Lógica de la aplicación
├── animations.js       # Sistema de animaciones
├── spriteAnimations.js # Animaciones de sprites
├── server.js           # Servidor Node.js
├── styles.css          # Estilos CSS
├── images/             # Imágenes del juego
│   ├── ciudad lego.jpg
│   ├── iceworld.png.png
│   ├── mundolava.png.png
│   └── ...
└── README.md           # Este archivo
```

## 🎨 Personajes

- **Kai** 🔥 - Maestro del Fuego
- **Zane** ❄️ - Maestro del Hielo
- **Lloyd** 🌿 - Ninja Verde
- **Cole** 🌍 - Maestro de la Tierra
- **Jay** ⚡ - Maestro del Rayo
- **Nya** 💧 - Maestra del Agua

## 🌍 Mundos

- **❄️ Ice World** - Campo de batalla congelado
- **🌋 Lava World** - Terreno volcánico
- **🌿 Jungle World** - Selva densa con ruinas
- **🏙️ Lego City** - Ciudad vibrante con torneos

## 📝 Notas de Desarrollo

- El juego usa un sistema de renderizado basado en Canvas
- Las animaciones están deshabilitadas para mejor rendimiento
- El modo aventura permite exploración libre por la ciudad
- Sistema de guardado local para progreso del jugador

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres agregar nuevas características:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎯 Roadmap

- [ ] Modo multijugador online
- [ ] Más mundos y personajes
- [ ] Sistema de inventario
- [ ] Misiones y quests
- [ ] Efectos de sonido
- [ ] Animaciones mejoradas

---

¡Disfruta jugando Ninjago Battlegrounds! 🥷⚔️