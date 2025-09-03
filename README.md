# 🎮 Ninjago Battlegrounds Online

Un juego multijugador en línea basado en Ninjago donde los jugadores pueden crear salas, seleccionar personajes y luchar en tiempo real.

## ✨ Características

- **Multijugador en tiempo real** usando Socket.IO
- **Sistema de salas** para organizar partidas
- **4 personajes únicos** de Ninjago para elegir
- **Chat en tiempo real** entre jugadores
- **Interfaz moderna** y responsive
- **Sincronización en tiempo real** de posiciones y acciones

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de instalación

1. **Clona o descarga** este proyecto en tu computadora

2. **Instala las dependencias** ejecutando en la terminal:
   ```bash
   npm install
   ```

3. **Asegúrate de tener las imágenes** necesarias en la carpeta del proyecto:
   - `fondojuego.png.png` - Fondo del juego
- `battlebutton.png.png` - Botón de batalla
- `ninjarojosinmascara.png.png` - Kai (Ninja Rojo)
- `ninjablanco.png-fotor-bg-remover-20250902204741.png` - Zane (Ninja Blanco)
- `ninjaazul.png-fotor-bg-remover-20250902204441.png` - Jay (Ninja Azul)
- `ChatGPT Image Sep 2, 2025, 09_04_04 PM-fotor-bg-remover-2025090221451.png` - Lloyd (Ninja Verde)

## 🎯 Cómo jugar

### Iniciar el servidor

1. **Ejecuta el servidor** en la terminal:
   ```bash
   npm start
   ```

2. **Abre tu navegador** y ve a:
   ```
   http://localhost:3000
   ```

### Crear una partida

1. **Crea una sala** haciendo clic en "Crear Sala"
2. **Selecciona tu personaje** favorito de Ninjago
3. **Espera** a que otro jugador se una
4. **Inicia la batalla** cuando ambos estén listos

### Unirse a una partida

1. **Haz clic en "Unirse a Sala"**
2. **Ingresa el ID de sala** que te compartió tu amigo
3. **Selecciona tu personaje** (debe estar disponible)
4. **Espera** a que el anfitrión inicie la batalla

### Durante la batalla

- **Haz clic** en el canvas para mover tu personaje
- **Usa el chat** para comunicarte con tu oponente
- **Observa** las barras de vida de ambos jugadores

## 🏗️ Estructura del proyecto

```
ninjago-online/
├── server.js              # Servidor Node.js con Socket.IO
├── ninjago-online.html    # Cliente del juego
├── package.json           # Dependencias del proyecto
├── README.md              # Este archivo
└── images/                # Carpeta con las imágenes del juego
    ├── fondojuego.png.png
├── battlebutton.png.png
├── ninjarojosinmascara.png.png
├── ninjablanco.png-fotor-bg-remover-20250902204741.png
├── ninjaazul.png-fotor-bg-remover-20250902204441.png
└── ChatGPT Image Sep 2, 2025, 09_04_04 PM-fotor-bg-remover-2025090221451.png
```

## 🔧 Tecnologías utilizadas

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Gráficos**: HTML5 Canvas
- **Comunicación en tiempo real**: Socket.IO

## 🌐 Despliegue en línea

Para hacer tu juego accesible desde internet:

### Opción 1: Heroku (Gratis)
1. Crea una cuenta en [Heroku](https://heroku.com)
2. Instala Heroku CLI
3. Ejecuta:
   ```bash
   heroku create tu-ninjago-game
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

### Opción 2: Vercel (Gratis)
1. Crea una cuenta en [Vercel](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Vercel desplegará automáticamente tu juego

### Opción 3: Railway (Gratis)
1. Crea una cuenta en [Railway](https://railway.app)
2. Conecta tu repositorio
3. Railway desplegará tu aplicación

## 🐛 Solución de problemas

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Asegúrate de haber ejecutado `npm install`
- Verifica que el puerto 3000 no esté en uso

### Los jugadores no se conectan
- Verifica que el firewall no bloquee el puerto 3000
- Asegúrate de que ambos jugadores estén en la misma red o servidor

### Las imágenes no se cargan
- Verifica que todos los archivos de imagen estén en la carpeta correcta
- Asegúrate de que los nombres de archivo coincidan exactamente

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Haz fork del proyecto
2. Crea una rama para tu feature: `git checkout -b nueva-feature`
3. Haz commit de tus cambios: `git commit -am 'Agregar nueva feature'`
4. Haz push a la rama: `git push origin nueva-feature`
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- LEGO por crear el universo de Ninjago
- La comunidad de desarrolladores de Node.js y Socket.IO
- Todos los contribuyentes que ayudan a mejorar este proyecto

---

**¡Disfruta jugando Ninjago Battlegrounds Online!** 🥋⚡


