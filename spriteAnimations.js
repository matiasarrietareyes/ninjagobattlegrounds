// Sistema de Sprites Animados para Ninjago Battlegrounds
class SpriteAnimations {
    constructor() {
        // Configuración de sprites para cada personaje
        this.characterSprites = {
            kai: {
                idle: { frames: 4, speed: 0.15, loop: true, spriteSheet: null },
                run: { frames: 8, speed: 0.1, loop: true, spriteSheet: null },
                jump: { frames: 6, speed: 0.12, loop: false, spriteSheet: null },
                attack: { frames: 6, speed: 0.08, loop: false, spriteSheet: null },
                special: { frames: 8, speed: 0.06, loop: false, spriteSheet: null },
                shield: { frames: 4, speed: 0.1, loop: true, spriteSheet: null },
                hurt: { frames: 3, speed: 0.1, loop: false, spriteSheet: null },
                victory: { frames: 8, speed: 0.1, loop: true, spriteSheet: null }
            },
            zane: {
                idle: { frames: 4, speed: 0.15, loop: true, spriteSheet: null },
                run: { frames: 8, speed: 0.1, loop: true, spriteSheet: null },
                jump: { frames: 6, speed: 0.12, loop: false, spriteSheet: null },
                attack: { frames: 6, speed: 0.08, loop: false, spriteSheet: null },
                special: { frames: 8, speed: 0.06, loop: false, spriteSheet: null },
                shield: { frames: 4, speed: 0.1, loop: true, spriteSheet: null },
                hurt: { frames: 3, speed: 0.1, loop: false, spriteSheet: null },
                victory: { frames: 8, speed: 0.1, loop: true, spriteSheet: null }
            },
            jay: {
                idle: { frames: 4, speed: 0.15, loop: true, spriteSheet: null },
                run: { frames: 8, speed: 0.1, loop: true, spriteSheet: null },
                jump: { frames: 6, speed: 0.12, loop: false, spriteSheet: null },
                attack: { frames: 6, speed: 0.08, loop: false, spriteSheet: null },
                special: { frames: 8, speed: 0.06, loop: false, spriteSheet: null },
                shield: { frames: 4, speed: 0.1, loop: true, spriteSheet: null },
                hurt: { frames: 3, speed: 0.1, loop: false, spriteSheet: null },
                victory: { frames: 8, speed: 0.1, loop: true, spriteSheet: null }
            },
            lloyd: {
                idle: { frames: 4, speed: 0.15, loop: true, spriteSheet: null },
                run: { frames: 8, speed: 0.1, loop: true, spriteSheet: null },
                jump: { frames: 6, speed: 0.12, loop: false, spriteSheet: null },
                attack: { frames: 6, speed: 0.08, loop: false, spriteSheet: null },
                special: { frames: 8, speed: 0.06, loop: false, spriteSheet: null },
                shield: { frames: 4, speed: 0.1, loop: true, spriteSheet: null },
                hurt: { frames: 3, speed: 0.1, loop: false, spriteSheet: null },
                victory: { frames: 8, speed: 0.1, loop: true, spriteSheet: null }
            }
        };
        
        this.particles = [];
        this.specialEffects = [];
        this.spriteSize = 64; // Tamaño de cada frame individual
        this.loadSpriteSheets();
    }

    // Cargar sprites sheets para cada personaje
    loadSpriteSheets() {
        Object.keys(this.characterSprites).forEach(characterId => {
            const character = this.characterSprites[characterId];
            Object.keys(character).forEach(animationName => {
                const anim = character[animationName];
                anim.spriteSheet = new Image();
                anim.spriteSheet.src = `images/sprites/${characterId}_${animationName}.png`;
                
                // Fallback si no existe el sprite sheet
                anim.spriteSheet.onerror = () => {
                    console.log(`Sprite sheet no encontrado: ${characterId}_${animationName}.png`);
                    anim.spriteSheet = null;
                };
            });
        });
    }

    // Actualizar animación del personaje
    updateAnimation(player, deltaTime) {
        if (!player.animation) {
            player.animation = {
                current: 'idle',
                frame: 0,
                timer: 0,
                finished: false
            };
        }

        const characterSprites = this.characterSprites[player.id];
        if (!characterSprites) return;

        const anim = characterSprites[player.animation.current];
        if (!anim) return;

        player.animation.timer += deltaTime;
        if (player.animation.timer >= anim.speed) {
            player.animation.timer = 0;
            player.animation.frame++;
            
            if (player.animation.frame >= anim.frames) {
                if (anim.loop) {
                    player.animation.frame = 0;
                } else {
                    player.animation.frame = anim.frames - 1;
                    player.animation.finished = true;
                    this.onAnimationComplete(player);
                }
            }
        }
    }

    // Cambiar animación del personaje
    setAnimation(player, animationName) {
        if (player.animation && player.animation.current === animationName) return;
        
        player.animation = {
            current: animationName,
            frame: 0,
            timer: 0,
            finished: false
        };
    }

    // Cuando una animación termina
    onAnimationComplete(player) {
        switch (player.animation.current) {
            case 'jump':
                this.setAnimation(player, 'idle');
                break;
            case 'attack':
                this.setAnimation(player, 'idle');
                player.isAttacking = false;
                break;
            case 'special':
                this.setAnimation(player, 'idle');
                player.isSpecialAttacking = false;
                break;
            case 'hurt':
                this.setAnimation(player, 'idle');
                break;
        }
    }

    // Dibujar personaje con sprite animado
    drawCharacter(ctx, player, world) {
        const characterSprites = this.characterSprites[player.id];
        if (!characterSprites) return;

        const anim = characterSprites[player.animation.current];
        if (!anim || !anim.spriteSheet || !anim.spriteSheet.complete) {
            // Fallback a imagen estática si no hay sprite sheet
            this.drawStaticCharacter(ctx, player, world);
            return;
        }

        ctx.save();
        
        // Aplicar transformaciones para la animación
        const scaleX = player.facing === -1 ? -1 : 1;
        const scaleY = 1;
        
        // Efectos de animación
        let offsetY = 0;
        let scale = 1;
        
        switch (player.animation.current) {
            case 'jump':
                offsetY = Math.sin(player.animation.frame * 0.5) * 5;
                scale = 1.1;
                break;
            case 'run':
                offsetY = Math.sin(player.animation.frame * 0.8) * 2;
                break;
            case 'attack':
                scale = 1.15;
                offsetY = -3;
                break;
            case 'special':
                scale = 1.2;
                offsetY = -5;
                break;
            case 'shield':
                scale = 1.05;
                break;
            case 'hurt':
                offsetY = Math.sin(player.animation.frame * 2) * 3;
                break;
        }

        // Aplicar transformaciones
        ctx.translate(player.x, player.y + offsetY);
        ctx.scale(scaleX * scale, scaleY * scale);
        
        // Calcular posición del frame en el sprite sheet
        const frameX = player.animation.frame * this.spriteSize;
        const frameY = 0;
        
        // Dibujar frame específico del sprite sheet
        const drawX = player.facing === -1 ? this.spriteSize/2 : -this.spriteSize/2;
        const drawY = -this.spriteSize/2;
        
        ctx.drawImage(
            anim.spriteSheet,
            frameX, frameY, this.spriteSize, this.spriteSize,
            drawX, drawY, this.spriteSize, this.spriteSize
        );
        
        // Efectos especiales según la animación
        this.drawAnimationEffects(ctx, player, world);
        
        ctx.restore();
        
        // Dibujar partículas y efectos
        this.drawParticles(ctx);
        this.drawSpecialEffects(ctx);
    }

    // Fallback: dibujar personaje estático
    drawStaticCharacter(ctx, player, world) {
        if (!player.image || !player.image.complete) return;

        ctx.save();
        
        const scaleX = player.facing === -1 ? -1 : 1;
        ctx.translate(player.x, player.y);
        ctx.scale(scaleX, 1);
        
        const size = 80;
        const drawX = player.facing === -1 ? size/2 : -size/2;
        const drawY = -size/2;
        
        ctx.drawImage(player.image, drawX, drawY, size, size);
        ctx.restore();
    }

    // Dibujar efectos de animación
    drawAnimationEffects(ctx, player, world) {
        const anim = player.animation.current;
        
        switch (anim) {
            case 'run':
                // Polvo al correr
                this.addParticle(player.x, player.y + 40, '#8B4513', 2, -2, 0.5);
                break;
                
            case 'jump':
                // Efecto de salto
                ctx.strokeStyle = world.ambientColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 35, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'attack':
                // Efecto de ataque
                ctx.strokeStyle = '#FF4500';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 40, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'shield':
                // Efecto de escudo
                ctx.strokeStyle = '#4169E1';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 45, 0, Math.PI * 2);
                ctx.stroke();
                
                // Escudo protector
                ctx.strokeStyle = 'rgba(65, 105, 225, 0.6)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 50, 0, Math.PI * 2);
                ctx.stroke();
                break;
        }
    }

    // Dibujar poder especial con efectos únicos
    drawSpecialAttack(ctx, player, world) {
        if (player.animation.current !== 'special') return;
        
        const frame = player.animation.frame;
        const progress = frame / this.characterSprites[player.id].special.frames;
        
        switch (player.id) {
            case 'kai':
                this.drawFireballSpecial(ctx, player, progress);
                break;
            case 'zane':
                this.drawIceSpecial(ctx, player, progress);
                break;
            case 'jay':
                this.drawLightningSpecial(ctx, player, progress);
                break;
            case 'lloyd':
                this.drawEnergySpecial(ctx, player, progress);
                break;
        }
    }

    // Bola de fuego de Kai
    drawFireballSpecial(ctx, player, progress) {
        const fireballX = player.x + (player.facing * 60);
        const fireballY = player.y - 20;
        const fireballSize = 30 + Math.sin(progress * Math.PI) * 10;
        
        // Gradiente de fuego
        const gradient = ctx.createRadialGradient(
            fireballX, fireballY, 0,
            fireballX, fireballY, fireballSize
        );
        gradient.addColorStop(0, '#FFFF00');
        gradient.addColorStop(0.3, '#FF4500');
        gradient.addColorStop(0.7, '#FF0000');
        gradient.addColorStop(1, '#8B0000');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fireballX, fireballY, fireballSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Efectos de partículas de fuego
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + progress * Math.PI * 4;
            const distance = fireballSize + 15;
            const px = fireballX + Math.cos(angle) * distance;
            const py = fireballY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `rgba(255, 69, 0, ${0.8 - progress * 0.5})`;
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Efecto de explosión
        if (progress > 0.8) {
            const explosionSize = (progress - 0.8) * 5 * 100;
            ctx.strokeStyle = `rgba(255, 165, 0, ${1 - progress})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(fireballX, fireballY, explosionSize, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Tormenta de hielo de Zane
    drawIceSpecial(ctx, player, progress) {
        const centerX = player.x + (player.facing * 50);
        const centerY = player.y - 15;
        
        // Cristales de hielo
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2 + progress * Math.PI * 2;
            const radius = 25 + progress * 20;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.strokeStyle = '#87CEEB';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + Math.cos(angle) * 15, y + Math.sin(angle) * 15);
            ctx.stroke();
        }
        
        // Efecto de congelación
        if (progress > 0.5) {
            ctx.strokeStyle = `rgba(135, 206, 235, ${progress - 0.5})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    // Rayo eléctrico de Jay
    drawLightningSpecial(ctx, player, progress) {
        const startX = player.x + (player.facing * 40);
        const startY = player.y - 10;
        const endX = startX + (player.facing * 80);
        const endY = startY + Math.sin(progress * Math.PI * 4) * 20;
        
        // Rayo principal
        ctx.strokeStyle = '#FFFF00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Rayo zigzag
        const segments = 8;
        for (let i = 1; i <= segments; i++) {
            const t = i / segments;
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t + Math.sin(progress * Math.PI * 8 + i) * 15;
            ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Efecto de electricidad
        if (progress > 0.3) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${progress - 0.3})`;
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // Explosión de energía de Lloyd
    drawEnergySpecial(ctx, player, progress) {
        const centerX = player.x + (player.facing * 45);
        const centerY = player.y - 15;
        const explosionSize = progress * 60;
        
        // Onda de energía
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, explosionSize
        );
        gradient.addColorStop(0, 'rgba(50, 205, 50, 1)');
        gradient.addColorStop(0.7, 'rgba(34, 139, 34, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, explosionSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Partículas de energía
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + progress * Math.PI * 3;
            const distance = explosionSize + 10;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `rgba(50, 205, 50, ${1 - progress})`;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Sistema de partículas
    addParticle(x, y, color, vx, vy, life) {
        this.particles.push({
            x, y, vx, vy, color, life, maxLife: life
        });
    }

    updateParticles(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= deltaTime;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    drawParticles(ctx) {
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Actualizar todo el sistema
    update(deltaTime) {
        this.updateParticles(deltaTime);
    }
}

// Exportar la clase para uso global
window.SpriteAnimations = SpriteAnimations;
