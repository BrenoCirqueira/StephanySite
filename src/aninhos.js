// ========== CORAÇÕES FLUTUANTES ==========
const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '💯', '💋', '🌹', '✨', '⭐', '💫'];
const heartsContainer = document.getElementById('hearts-container');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    // Posição aleatória horizontal
    heart.style.left = Math.random() * 100 + '%';
    
    // Tamanho aleatório
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    // Velocidade aleatória
    const duration = Math.random() * 10 + 10;
    heart.style.animationDuration = duration + 's';
    
    // Delay aleatório
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remover após animação
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, (duration + 5) * 1000);
}

// Criar corações continuamente
function startHeartsAnimation() {
    // Criar corações iniciais
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createHeart(), i * 500);
    }
    
    // Continuar criando corações periodicamente
    setInterval(() => {
        if (Math.random() > 0.3) { // 70% de chance de criar um coração
            createHeart();
        }
    }, 2000);
}

// Iniciar animação de corações
startHeartsAnimation();

// ========== EFEITOS NAS POLAROIDS ==========
const polaroids = document.querySelectorAll('.polaroid');

polaroids.forEach((polaroid, index) => {
    // Adicionar efeito de entrada escalonado
    polaroid.style.animationDelay = `${index * 0.15}s`;
    
    // Efeito ao passar o mouse
    polaroid.addEventListener('mouseenter', () => {
        // Criar pequenos corações ao redor
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.position = 'absolute';
                heart.style.fontSize = '20px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                
                const rect = polaroid.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const angle = (Math.PI * 2 * i) / 5;
                const distance = 80;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                
                document.body.appendChild(heart);
                
                // Animar coração
                const finalY = y - 100;
                const finalX = x + (Math.random() - 0.5) * 50;
                
                heart.style.transition = 'all 1.5s ease-out';
                setTimeout(() => {
                    heart.style.transform = `translate(${finalX - x}px, ${finalY - y}px)`;
                    heart.style.opacity = '0';
                }, 10);
                
                // Remover após animação
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 1600);
            }, i * 100);
        }
    });
    
    // Efeito de clique
    polaroid.addEventListener('click', () => {
        // Efeito de pulso
        polaroid.style.transform = 'scale(0.95)';
        setTimeout(() => {
            polaroid.style.transform = '';
        }, 200);
        
        // Criar explosão de corações
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = '30px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                
                const rect = polaroid.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                
                document.body.appendChild(heart);
                
                // Animação de explosão
                const angle = (Math.PI * 2 * i) / 10;
                const distance = 150;
                const finalX = centerX + Math.cos(angle) * distance;
                const finalY = centerY + Math.sin(angle) * distance;
                const rotation = Math.random() * 720 - 360;
                
                heart.style.transition = 'all 1s ease-out';
                setTimeout(() => {
                    heart.style.transform = `translate(${finalX - centerX}px, ${finalY - centerY}px) rotate(${rotation}deg)`;
                    heart.style.opacity = '0';
                }, 10);
                
                // Remover após animação
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                }, 1100);
            }, i * 50);
        }
    });
});

// ========== SCROLL SUAVE ==========
// Adicionar efeito de fade-in ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar todas as polaroids
polaroids.forEach(polaroid => {
    observer.observe(polaroid);
});

// ========== EFEITO DE PARALLAX SUAVE ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const introSection = document.querySelector('.intro-section');
    
    if (introSection) {
        introSection.style.transform = `translateY(${scrolled * 0.3}px)`;
        introSection.style.opacity = 1 - (scrolled / 300);
    }
});

// ========== CARREGAR TEMA SALVO ==========
window.addEventListener('load', () => {
    const temaSalvo = localStorage.getItem('temaAtivo');
    if (temaSalvo) {
        // Aplicar tema se houver um salvo
        aplicarTemaAninhos(temaSalvo);
    }
});

// Função para aplicar tema (similar ao index.html)
function aplicarTemaAninhos(temaNome) {
    const temaCores = {
        enrolados: {
            primary: '#FFD700',
            secondary: '#FFA500',
            bg: 'linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 100%)',
            header: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 165, 0, 0.95))',
            footer: 'linear-gradient(135deg, #FFD700, #FFA500)'
        },
        veloz: {
            primary: '#1a1a1a',
            secondary: '#FF0000',
            bg: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
            header: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(255, 0, 0, 0.95))',
            footer: 'linear-gradient(135deg, #1a1a1a, #FF0000)'
        },
        helloKitty: {
            primary: '#FF69B4',
            secondary: '#FFB6C1',
            bg: 'linear-gradient(135deg, #FFE4E1 0%, #FFC0CB 100%)',
            header: 'linear-gradient(135deg, rgba(255, 105, 180, 0.95), rgba(255, 182, 193, 0.95))',
            footer: 'linear-gradient(135deg, #FF69B4, #FFB6C1)'
        },
        harryPotter: {
            primary: '#8B4513',
            secondary: '#DAA520',
            bg: 'linear-gradient(135deg, #2F4F4F 0%, #1C1C1C 100%)',
            header: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(218, 165, 32, 0.95))',
            footer: 'linear-gradient(135deg, #8B4513, #DAA520)'
        },
        default: {
            primary: '#ff6b9d',
            secondary: '#c71936',
            bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
            header: 'linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(199, 25, 54, 0.95))',
            footer: 'linear-gradient(135deg, #ff6b9d, #c71936)'
        }
    };
    
    const cores = temaCores[temaNome] || temaCores.default;
    const root = document.documentElement;
    
    root.style.setProperty('--primary-pink', cores.primary);
    root.style.setProperty('--primary-red', cores.secondary);
    root.style.setProperty('--bg-gradient', cores.bg);
    
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) {
        header.style.background = cores.header;
    }
    
    if (footer) {
        footer.style.background = cores.footer;
    }
}

// ========== MENSAGEM ESPECIAL NO CONSOLE ==========
console.log('%c💕 Nossos Aninhos Juntos 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cCada foto guarda um momento especial do nosso amor!', 'color: #c71936; font-size: 14px;');
