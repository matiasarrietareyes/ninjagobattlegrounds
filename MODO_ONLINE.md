# 🌐 Modo Online - Ninjago Battlegrounds

## 🎮 Características del Modo Online

### **🏠 Sistema de Salas**
- **Crear Sala**: Genera un ID único de 6 caracteres
- **Unirse a Sala**: Ingresa el ID de una sala existente
- **Máximo 2 jugadores** por sala
- **Estado de sala**: Esperando, Listo, En batalla

### **🥷 Selección de Personajes**
- **4 Personajes disponibles**: Kai, Zane, Jay, Cole
- **Selección única**: Solo un jugador por personaje
- **Sistema de disponibilidad**: Personajes no disponibles se muestran grises

### **💬 Chat en Tiempo Real**
- **Mensajes instantáneos** entre jugadores
- **Diferentes colores**: Sistema (dorado), Jugadores (verde)
- **Historial de chat** visible durante toda la partida

### **🎯 Combate Multijugador**
- **Movimiento sincronizado** en tiempo real
- **Posiciones actualizadas** instantáneamente
- **Sistema de ataque** entre jugadores
- **Renderizado en vivo** de ambos jugadores

## 🚀 Cómo Usar el Modo Online

### **1. Iniciar el Servidor**
```bash
npm install
npm start
```

### **2. Acceder al Juego**
- **Modo Online**: `http://localhost:3000`
- **Modo Original**: `http://localhost:3000/original`

### **3. Crear una Partida**
1. Haz clic en **"Crear Sala"**
2. Comparte el **ID de sala** con tu amigo
3. Espera a que se una el segundo jugador

### **4. Unirse a una Partida**
1. Ingresa el **ID de sala** que te compartieron
2. Haz clic en **"Unirse a Sala"**
3. Selecciona tu personaje

### **5. Jugar**
1. Ambos jugadores seleccionan personajes
2. Haz clic en **"Iniciar Juego"**
3. ¡Combate en tiempo real!

## 🎮 Controles Online

- **WASD** o **Flechas**: Mover personaje
- **CTRL**: Ataque básico
- **ENTER**: Ataque especial
- **Chat**: Escribe y presiona Enter

## 🔧 Características Técnicas

### **Tecnologías**
- **Backend**: Node.js + Express
- **WebSockets**: Socket.IO para tiempo real
- **Frontend**: HTML5 Canvas + JavaScript
- **Comunicación**: Eventos bidireccionales

### **Sincronización**
- **Posiciones**: Actualizadas cada frame
- **Estados**: Sincronizados instantáneamente
- **Chat**: Mensajes en tiempo real
- **Personajes**: Disponibilidad en vivo

### **Arquitectura**
```
Cliente 1 ←→ Servidor ←→ Cliente 2
    ↓           ↓           ↓
  Canvas    Socket.IO    Canvas
    ↓           ↓           ↓
  Movimiento  Sincronización  Movimiento
```

## 🌍 Despliegue Online

### **Para GitHub Pages**
El modo online requiere un servidor, por lo que GitHub Pages no es compatible. Usa:

- **Heroku**: `git push heroku main`
- **Vercel**: Conecta tu repositorio
- **Railway**: Despliega automáticamente
- **Render**: Servicio gratuito

### **Variables de Entorno**
```bash
PORT=3000
NODE_ENV=production
```

## 🎯 Diferencias con el Modo Original

| Característica | Modo Original | Modo Online |
|----------------|---------------|-------------|
| Jugadores | 1 vs IA | 2 jugadores |
| Conexión | Local | Internet |
| Salas | No | Sí |
| Chat | No | Sí |
| Sincronización | No | Tiempo real |
| Personajes | 6 | 4 |
| Mundos | 4 | 1 (batalla) |

## 🐛 Solución de Problemas

### **No puedo conectarme**
- Verifica que el servidor esté ejecutándose
- Comprueba la URL: `http://localhost:3000`
- Revisa la consola del navegador

### **No veo al otro jugador**
- Ambos deben estar en la misma sala
- Verifica que ambos hayan seleccionado personajes
- Comprueba la conexión a internet

### **El chat no funciona**
- Asegúrate de estar en una sala
- Verifica que el mensaje no esté vacío
- Presiona Enter después de escribir

### **Movimiento laggy**
- Verifica tu conexión a internet
- Cierra otras aplicaciones que usen ancho de banda
- Reinicia el servidor si es necesario

## 🚀 Próximas Características

- [ ] **Más jugadores** por sala (hasta 4)
- [ ] **Sistema de puntuación** y ranking
- [ ] **Diferentes mundos** en modo online
- [ ] **Sistema de amigos** y salas privadas
- [ ] **Espectadores** para ver partidas
- [ ] **Replay system** para partidas pasadas
- [ ] **Sistema de torneos** online
- [ ] **Chat de voz** integrado

---

¡Disfruta jugando Ninjago Battlegrounds Online! 🥷⚔️🌐
