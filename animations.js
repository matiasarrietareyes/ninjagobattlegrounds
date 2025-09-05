// Sistema de animaciones para Ninjago Battlegrounds
class CharacterAnimations {
    constructor() {
        this.animations = {
            idle: { frames: 4, speed: 0.1, loop: true },
            run: { frames: 6, speed: 0.15, loop: true },
            jump: { frames: 8, speed: 0.12, loop: false },
            attack: { frames: 6, speed: 0.08, loop: false },
            special: { frames: 12, speed: 0.06, loop: false },
            shield: { frames: 4, speed: 0.1, loop: true },
            hurt: { frames: 3, speed: 0.1, loop: false },
            victory: { frames: 8, speed: 0.1, loop: true }
        };
        
        this.particles = [];
        this.specialEffects = [];
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

        const anim = this.animations[player.animation.current];
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

    // Dibujar personaje con animación
    drawCharacter(ctx, player, world) {
        if (!player.image || !player.image.complete) return;

        ctx.save();
        
        // Aplicar transformaciones para la animación
        const scaleX = player.facing === -1 ? -1 : 1;
        const scaleY = 1;
        
        // Efectos de animación
        let offsetY = 0;
        let scale = 1;
        
        switch (player.animation.current) {
            case 'jump':
                offsetY = Math.sin(player.animation.frame * 0.5) * 10;
                scale = 1.1;
                break;
            case 'run':
                offsetY = Math.sin(player.animation.frame * 0.8) * 3;
                break;
            case 'attack':
                scale = 1.2;
                offsetY = -5;
                break;
            case 'special':
                scale = 1.3;
                offsetY = -10;
                break;
            case 'shield':
                scale = 1.1;
                break;
            case 'hurt':
                offsetY = Math.sin(player.animation.frame * 2) * 5;
                break;
        }

        // Aplicar transformaciones
        ctx.translate(player.x, player.y + offsetY);
        ctx.scale(scaleX * scale, scaleY * scale);
        
        // Dibujar personaje más grande en batalla
        const size = 80; // Personajes más grandes
        const drawX = player.facing === -1 ? size/2 : -size/2;
        const drawY = -size/2;
        
        ctx.drawImage(player.image, drawX, drawY, size, size);
        
        // Efectos especiales según la animación
        this.drawAnimationEffects(ctx, player, world);
        
        ctx.restore();
        
        // Dibujar partículas y efectos
        this.drawParticles(ctx);
        this.drawSpecialEffects(ctx);
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
                ctx.arc(0, 0, 45, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'attack':
                // Efecto de ataque
                ctx.strokeStyle = '#FF4500';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 50, 0, Math.PI * 2);
                ctx.stroke();
                break;
                
            case 'shield':
                // Efecto de escudo
                ctx.strokeStyle = '#4169E1';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(0, 0, 55, 0, Math.PI * 2);
                ctx.stroke();
                
                // Escudo protector
                ctx.strokeStyle = 'rgba(65, 105, 225, 0.6)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, 0, 60, 0, Math.PI * 2);
                ctx.stroke();
                break;
        }
    }

    // Dibujar poder especial con bola de fuego
    drawSpecialAttack(ctx, player, world) {
        if (player.animation.current !== 'special') return;
        
        const frame = player.animation.frame;
        const progress = frame / this.animations.special.frames;
        
        // Crear bola de fuego
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

    // Agregar partículas
    addParticle(x, y, color, vx, vy, life) {
        this.particles.push({
            x, y, vx, vy, color, life, maxLife: life
        });
    }

    // Actualizar partículas
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

    // Dibujar partículas
    drawParticles(ctx) {
        this.particles.forEach(particle => {
            const alpha = particle.life / particle.maxLife;
            ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Agregar efecto especial
    addSpecialEffect(type, x, y, data = {}) {
        this.specialEffects.push({
            type, x, y, timer: 0, data
        });
    }

    // Actualizar efectos especiales
    updateSpecialEffects(deltaTime) {
        for (let i = this.specialEffects.length - 1; i >= 0; i--) {
            const effect = this.specialEffects[i];
            effect.timer += deltaTime;
            
            if (effect.timer > 2) { // 2 segundos de duración
                this.specialEffects.splice(i, 1);
            }
        }
    }

    // Dibujar efectos especiales
    drawSpecialEffects(ctx) {
        this.specialEffects.forEach(effect => {
            const alpha = 1 - (effect.timer / 2);
            
            switch (effect.type) {
                case 'fireball':
                    this.drawFireballEffect(ctx, effect.x, effect.y, alpha);
                    break;
                case 'ice':
                    this.drawIceEffect(ctx, effect.x, effect.y, alpha);
                    break;
                case 'lightning':
                    this.drawLightningEffect(ctx, effect.x, effect.y, alpha);
                    break;
                case 'energy':
                    this.drawEnergyEffect(ctx, effect.x, effect.y, alpha);
                    break;
            }
        });
    }

    // Efecto de bola de fuego
    drawFireballEffect(ctx, x, y, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40);
        gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(139, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    // Efecto de hielo
    drawIceEffect(ctx, x, y, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        
        ctx.strokeStyle = 'rgba(135, 206, 235, 0.8)';
        ctx.lineWidth = 3;
        
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 30 + Math.sin(Date.now() / 200 + i) * 5;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(px, py);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    // Efecto de rayo
    drawLightningEffect(ctx, x, y, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
        ctx.lineWidth = 4;
        
        // Rayo zigzag
        ctx.beginPath();
        ctx.moveTo(x - 30, y - 30);
        ctx.lineTo(x - 10, y - 10);
        ctx.lineTo(x + 10, y - 20);
        ctx.lineTo(x + 30, y + 10);
        ctx.stroke();
        
        ctx.restore();
    }

    // Efecto de energía
    drawEnergyEffect(ctx, x, y, alpha) {
        ctx.save();
        ctx.globalAlpha = alpha;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 35);
        gradient.addColorStop(0, 'rgba(50, 205, 50, 1)');
        gradient.addColorStop(0.7, 'rgba(34, 139, 34, 0.6)');
        gradient.addColorStop(1, 'rgba(0, 100, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }

    // Actualizar todo el sistema de animaciones
    update(deltaTime) {
        this.updateParticles(deltaTime);
        this.updateSpecialEffects(deltaTime);
    }
}

// Exportar la clase para uso global
window.CharacterAnimations = CharacterAnimations;
