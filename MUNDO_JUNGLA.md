# 🌿 Mundo de Jungla - Ninjago Battlegrounds

## 🎯 **Descripción del Mundo**

El **Mundo de Jungla** es el tercer mundo disponible en Ninjago Battlegrounds, ofreciendo un entorno único lleno de vegetación exuberante y ruinas antiguas.

### **Características Visuales:**
- **Fondo:** Imagen de jungla densa (`ChatGPT Image Sep 4, 2025, 03_07_48 PM.png`)
- **Atmósfera:** Ambiente verde exuberante con partículas de hojas
- **Plataforma:** Plataforma de piedra antigua con enredaderas y musgo
- **Colores:** Paleta de verdes naturales (#228B22, #32CD32, #90EE90)

## 🎮 **Cómo Acceder**

1. **Inicia el juego** desde el menú principal
2. **Selecciona "Choose Your Battle World"**
3. **Haz clic en la tarjeta del Mundo de Jungla** 🌿
4. **Elige tu personaje ninja**
5. **¡Comienza la batalla en la jungla!**

## ✨ **Efectos Especiales**

### **🎨 Efectos Ambientales:**
- **Atmósfera verde:** Overlay sutil de color verde para crear ambiente
- **Partículas de hojas:** 30 partículas verdes que se mueven por la pantalla
- **Niebla de jungla:** 6 nubes de niebla verde que flotan suavemente

### **⚔️ Efectos de Ataque:**
- **Rayo verde:** Línea de ataque de 5px de grosor en color verde
- **Hojas de jungla:** 6 hojas verdes que siguen la trayectoria del ataque
- **Rastro natural:** Línea secundaria en verde claro para efectos

### **🔥 Efectos de Poder Especial:**
- **Explosión verde:** Círculo de explosión en verde brillante
- **Enredaderas:** 8 enredaderas que se extienden desde el centro
- **Partículas naturales:** 15 partículas verdes que se dispersan
- **Estallido de hojas:** 10 hojas que se expanden en todas direcciones

### **🏗️ Plataforma de Batalla:**
- **Base de piedra:** Plataforma semi-transparente con borde marrón
- **Enredaderas:** 4 enredaderas verdes que crecen en la plataforma
- **Patrones antiguos:** 3 líneas horizontales que simulan piedras talladas

## 🎨 **Colores del Mundo**

| Elemento | Color | Código |
|----------|-------|--------|
| **Atmósfera** | Verde bosque | `#228B22` |
| **Partículas** | Verde lima | `#32CD32` |
| **Efectos** | Verde claro | `#90EE90` |
| **Plataforma** | Marrón piedra | `rgba(139, 115, 85, 0.4)` |
| **Bordes** | Marrón oscuro | `rgba(101, 67, 33, 0.6)` |

## 🔧 **Implementación Técnica**

### **Archivos Modificados:**
- `index.html` - Lógica del juego y efectos visuales

### **Funciones Agregadas:**
- **Efectos ambientales** en la función de renderizado
- **Efectos de ataque** en `createAttackEffect()`
- **Efectos de poder especial** en `createSpecialEffect()`
- **Plataforma personalizada** en el renderizado del mundo

### **Configuración del Mundo:**
```javascript
jungle: {
  name: "🌿 Jungle World",
  background: "images/ChatGPT Image Sep 4, 2025, 03_07_48 PM.png",
  description: "Dense jungle with ancient ruins",
  ambientColor: "#228B22",
  particleColor: "#32CD32"
}
```

## 🌟 **Características Únicas**

### **🎭 Ambiente Inmersivo:**
- **Partículas de hojas** que se mueven constantemente
- **Niebla de jungla** que crea profundidad visual
- **Atmósfera verde** que envuelve toda la pantalla

### **⚡ Efectos Dinámicos:**
- **Enredaderas animadas** que crecen en la plataforma
- **Hojas que siguen** las trayectorias de ataque
- **Explosiones naturales** con elementos de la jungla

### **🏛️ Estilo Visual:**
- **Plataforma de piedra antigua** con detalles tallados
- **Enredaderas y musgo** que crecen naturalmente
- **Patrones arqueológicos** que sugieren ruinas antiguas

## 🎯 **Compatibilidad**

### **✅ Funciona con:**
- Todos los personajes ninja (Kai, Zane, Jay, Lloyd)
- Sistema de animaciones de sprites
- Efectos de partículas existentes
- Interfaz de usuario del juego

### **🔄 Integración:**
- **Selección de mundo** automática
- **Efectos personalizados** según el mundo
- **Plataforma adaptativa** para cada entorno
- **Sistema de partículas** específico del mundo

## 🚀 **Próximas Mejoras**

### **🎨 Posibles Adiciones:**
- **Sonidos de jungla** (aves, insectos, viento)
- **Animaciones de enredaderas** que se mueven
- **Efectos de lluvia** tropical
- **Animales de la jungla** como decoración

### **🔧 Optimizaciones:**
- **Partículas más eficientes** para mejor rendimiento
- **Efectos de sombra** para mayor profundidad
- **Animaciones de fondo** más suaves

## 📝 **Notas del Desarrollador**

El Mundo de Jungla fue diseñado para ofrecer una experiencia visual completamente diferente a los mundos de hielo y lava. Utiliza la imagen `ChatGPT Image Sep 4, 2025, 03_07_48 PM.png` y la transforma en un entorno de batalla inmersivo con efectos naturales únicos.

### **🎯 Objetivos de Diseño:**
- **Inmersión visual** a través de efectos ambientales
- **Coherencia temática** con elementos de la naturaleza
- **Rendimiento optimizado** con efectos eficientes
- **Integración perfecta** con el sistema existente

---

**🌿 ¡Disfruta batallando en el Mundo de Jungla! 🥋**
