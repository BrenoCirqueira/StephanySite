// Elementos principais
const body = document.body;
const audio = document.getElementById("audioplay");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const heartsContainer = document.getElementById("hearts-container");

// Elementos dos temas
const divEnrolados = document.getElementById("enrolados");
const divVelozes = document.getElementById("veloz");
const divkitty = document.getElementById("helloKitty");
const divPotter = document.getElementById("herryPotter");

// ========== FUNCIONALIDADE DE ÁUDIO ==========
let isPlaying = false;

// Tentar tocar música automaticamente ao carregar
window.addEventListener('load', () => {
    // Pequeno delay para melhorar a experiência
    setTimeout(() => {
        try {
            audio.volume = 0.7; // Volume moderado
            audio.play().then(() => {
                isPlaying = true;
                updatePlayButton();
            }).catch(error => {
                console.log('Autoplay bloqueado pelo navegador. Clique no botão para tocar.');
                // Se autoplay for bloqueado, mostra o botão de play
                isPlaying = false;
                updatePlayButton();
            });
        } catch (error) {
            console.log('Erro ao tentar tocar música:', error);
        }
    }, 500);
});

// Controle de play/pause
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
    updatePlayButton();
});

// Atualizar ícone do botão
function updatePlayButton() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Atualizar quando o áudio terminar (não deve acontecer pois está em loop)
audio.addEventListener('ended', () => {
    isPlaying = false;
    updatePlayButton();
});

// ========== CORAÇÕES FLUTUANTES ==========
const heartEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🖤', '💯', '💋', '🌹', '✨', '⭐', '💫'];

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

// ========== SCROLL SUAVE E EFEITOS ==========
// Adicionar efeito de fade-in nas seções ao fazer scroll
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

// Observar todas as seções
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== EFEITOS NAS FOTOS ==========
const photoItems = document.querySelectorAll('.conteiner li');
photoItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        // Adicionar efeito de brilho
        item.style.filter = 'brightness(1.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.filter = 'brightness(1)';
    });
});

// ========== EFEITOS NAS LEMBRANÇAS ==========
const lembrancas = document.querySelectorAll('.lembranca');
lembrancas.forEach((lembranca, index) => {
    // Adicionar animação de entrada
    setTimeout(() => {
        lembranca.style.opacity = '0';
        lembranca.style.transform = 'translateX(-50px)';
        lembranca.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            lembranca.style.opacity = '1';
            lembranca.style.transform = 'translateX(0)';
        }, 100);
    }, index * 100);
});

// ========== EFEITOS NOS CARDS ==========
const cards = document.querySelectorAll('.story-card, .declaration-card, .reflection-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ========== ANIMAÇÃO DE ESTATÍSTICAS ==========
function animateStats() {
    const statFills = document.querySelectorAll('.stat-fill');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statFills.forEach(fill => {
        statsObserver.observe(fill);
    });
}

animateStats();

// ========== EFEITOS NOS TEMAS ==========
// Emojis relacionados a cada tema
const temaEmojis = {
    enrolados: ['👑', '🏰', '💇‍♀️', '🦎', '🐴', '🎨', '🌼', '✨', '💫', '🌟', '🎭', '🎪', '🌺', '🎵', '🎤', '💐', '🦋', '🌙', '☀️', '🌈'],
    veloz: ['🚗', '🏎️', '💨', '⚡', '🔥', '🏁', '🏆', '💪', '🌃', '🌆', '💥', '🎯', '🚙', '🏍️', '⛽', '🔧', '🛠️', '🌉', '🌇', '💎'],
    helloKitty: ['🐱', '🎀', '💕', '🌸', '🍰', '🎂', '🍓', '🦄', '💖', '💗', '🎈', '🎁', '🍭', '🧁', '🍪', '🍨', '🍧', '🌷', '🦋', '💝'],
    harryPotter: ['⚡', '🦉', '🧙‍♂️', '🪄', '🏰', '📚', '🕯️', '🔮', '✨', '🌟', '💫', '🎩', '🧙‍♀️', '🦅', '🐉', '🦁', '🐍', '🦌', '📖', '🔑']
};

// Temas de cores para cada desenho
const temaCores = {
    enrolados: {
        primary: '#FFD700',      // Dourado (coroa)
        secondary: '#FFA500',    // Laranja
        accent: '#FFE4B5',       // Bege claro
        bg1: '#FFF8DC',          // Creme
        bg2: '#FFEBCD',          // Branco amêndoa
        gradient1: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        gradient2: 'linear-gradient(135deg, #FFF8DC 0%, #FFE4B5 100%)',
        gradient3: 'linear-gradient(135deg, #FFEBCD 0%, #FFD700 50%, #FFA500 100%)',
        gradient4: 'linear-gradient(135deg, #FFE4B5 0%, #FFD700 100%)',
        gradient5: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 100%)',
        header: 'linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 165, 0, 0.95))'
    },
    veloz: {
        primary: '#1a1a1a',      // Preto
        secondary: '#FF0000',    // Vermelho
        accent: '#FFD700',       // Dourado
        bg1: '#2d2d2d',          // Cinza escuro
        bg2: '#1a1a1a',          // Preto
        gradient1: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        gradient2: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
        gradient3: 'linear-gradient(135deg, #1a1a1a 0%, #FF0000 50%, #2d2d2d 100%)',
        gradient4: 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)',
        gradient5: 'linear-gradient(135deg, #1a1a1a 0%, #FF0000 100%)',
        header: 'linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(255, 0, 0, 0.95))'
    },
    helloKitty: {
        primary: '#FF69B4',      // Rosa choque
        secondary: '#FFB6C1',   // Rosa claro
        accent: '#FFC0CB',      // Rosa
        bg1: '#FFE4E1',         // Rosa muito claro
        bg2: '#FFF0F5',         // Lavanda blush
        gradient1: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
        gradient2: 'linear-gradient(135deg, #FFE4E1 0%, #FFC0CB 100%)',
        gradient3: 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 50%, #FF69B4 100%)',
        gradient4: 'linear-gradient(135deg, #FFC0CB 0%, #FF69B4 100%)',
        gradient5: 'linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%)',
        header: 'linear-gradient(135deg, rgba(255, 105, 180, 0.95), rgba(255, 182, 193, 0.95))'
    },
    harryPotter: {
        primary: '#8B4513',      // Marrom
        secondary: '#DAA520',    // Dourado
        accent: '#F4A460',       // Marrom areia
        bg1: '#2F4F4F',          // Cinza ardósia escuro
        bg2: '#1C1C1C',          // Preto quase
        gradient1: 'linear-gradient(135deg, #8B4513 0%, #DAA520 100%)',
        gradient2: 'linear-gradient(135deg, #2F4F4F 0%, #1C1C1C 100%)',
        gradient3: 'linear-gradient(135deg, #8B4513 0%, #DAA520 50%, #2F4F4F 100%)',
        gradient4: 'linear-gradient(135deg, #1C1C1C 0%, #8B4513 100%)',
        gradient5: 'linear-gradient(135deg, #2F4F4F 0%, #DAA520 100%)',
        header: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95), rgba(218, 165, 32, 0.95))'
    },
    default: {
        primary: '#ff6b9d',
        secondary: '#c71936',
        accent: '#ffb3d1',
        bg1: '#ff9a9e',
        bg2: '#fecfef',
        gradient1: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        gradient2: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        gradient3: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        gradient4: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        gradient5: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
        header: 'linear-gradient(135deg, rgba(255, 107, 157, 0.95), rgba(199, 25, 54, 0.95))'
    }
};

// Função para aplicar tema de cores
function aplicarTema(temaNome) {
    const cores = temaCores[temaNome] || temaCores.default;
    const root = document.documentElement;
    
    // Aplicar variáveis CSS
    root.style.setProperty('--theme-primary', cores.primary);
    root.style.setProperty('--theme-secondary', cores.secondary);
    root.style.setProperty('--theme-accent', cores.accent);
    root.style.setProperty('--theme-bg-1', cores.bg1);
    root.style.setProperty('--theme-bg-2', cores.bg2);
    root.style.setProperty('--theme-gradient-1', cores.gradient1);
    root.style.setProperty('--theme-gradient-2', cores.gradient2);
    root.style.setProperty('--theme-gradient-3', cores.gradient3);
    root.style.setProperty('--theme-gradient-4', cores.gradient4);
    root.style.setProperty('--theme-gradient-5', cores.gradient5);
    root.style.setProperty('--theme-header', cores.header);
    
    // Salvar tema no localStorage
    localStorage.setItem('temaAtivo', temaNome);
}

// Carregar tema salvo ao carregar a página
window.addEventListener('load', () => {
    const temaSalvo = localStorage.getItem('temaAtivo');
    if (temaSalvo && temaCores[temaSalvo]) {
        aplicarTema(temaSalvo);
    }
});

function createTemaEmojis(temaId, emojis, temaNome) {
    // Efeito de clique
    const tema = document.getElementById(temaId);
    if (!tema) return;
    
    // Aplicar tema de cores
    aplicarTema(temaNome);
    
    // Efeito visual de clique
    tema.style.transform = 'scale(0.95)';
    tema.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
        tema.style.transform = '';
    }, 200);
    
    // Criar emojis grandes caindo de cima para baixo
    const numEmojis = 30; // Mais emojis para efeito mais impactante
    
    for (let i = 0; i < numEmojis; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.textContent = randomEmoji;
            emoji.className = 'falling-emoji';
            
            // Posição aleatória no topo da tela
            emoji.style.left = Math.random() * 100 + '%';
            emoji.style.top = '-100px';
            
            // Tamanho grande e variado
            const size = Math.random() * 40 + 50; // Entre 50px e 90px
            emoji.style.fontSize = size + 'px';
            
            // Velocidade variada
            const duration = Math.random() * 2 + 3; // Entre 3s e 5s
            emoji.style.animationDuration = duration + 's';
            
            // Delay aleatório para não cairem todos juntos
            emoji.style.animationDelay = (Math.random() * 0.5) + 's';
            
            document.body.appendChild(emoji);
            
            // Remover após animação
            setTimeout(() => {
                if (emoji.parentNode) {
                    emoji.parentNode.removeChild(emoji);
                }
            }, (duration + 0.5) * 1000);
        }, i * 100); // Delay entre cada emoji
    }
}

// Adicionar eventos de clique para cada tema
if (divEnrolados) {
    divEnrolados.addEventListener('click', () => {
        createTemaEmojis('enrolados', temaEmojis.enrolados, 'enrolados');
    });
}

if (divVelozes) {
    divVelozes.addEventListener('click', () => {
        createTemaEmojis('veloz', temaEmojis.veloz, 'veloz');
    });
}

if (divkitty) {
    divkitty.addEventListener('click', () => {
        createTemaEmojis('helloKitty', temaEmojis.helloKitty, 'helloKitty');
    });
}

if (divPotter) {
    divPotter.addEventListener('click', () => {
        createTemaEmojis('herryPotter', temaEmojis.harryPotter, 'harryPotter');
    });
}

// ========== EFEITO DE TYPING NO TÍTULO (OPCIONAL) ==========
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========== MELHORAR NAVEGAÇÃO ==========
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remover classe ativa de todos
        navLinks.forEach(l => l.classList.remove('active'));
        // Adicionar classe ativa ao clicado
        link.classList.add('active');
        
        // Scroll suave
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== DETECTAR SEÇÃO ATIVA NO SCROLL ==========
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========== EFEITO DE PARALLAX SUAVE ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('#inicio, .stars, .stars2, .stars3');
    
    parallaxElements.forEach(element => {
        if (element && element.offsetTop < window.innerHeight + scrolled) {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });
});

// ========== PREVENIR COMPORTAMENTO PADRÃO DO ÁUDIO ==========
// Garantir que o áudio não seja bloqueado
audio.addEventListener('canplay', () => {
    // Áudio está pronto para tocar
});

audio.addEventListener('error', (e) => {
    console.log('Erro no áudio:', e);
    playPauseBtn.style.display = 'none';
});

// ========== MENSAGEM ESPECIAL NO CONSOLE ==========
console.log('%c💕 Para Minha Amada Stephany 💕', 'color: #ff6b9d; font-size: 20px; font-weight: bold;');
console.log('%cEste site foi feito com muito amor e carinho!', 'color: #c71936; font-size: 14px;');

// ========== ADICIONAR MAIS FOTOS À GALERIA (se houver mais imagens) ==========
// Função para adicionar mais fotos dinamicamente se necessário
function addMorePhotos() {
    // Esta função pode ser expandida para adicionar mais fotos
    // quando novas imagens forem adicionadas à pasta
}

// ========== EFEITO DE CONFETTI AO CARREGAR ==========
function createConfetti() {
    const confettiEmojis = ['💕', '💖', '💗', '💓', '💝', '💞', '❤️', '🌹', '✨', '⭐'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-50px';
            confetti.style.fontSize = (Math.random() * 20 + 20) + 'px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }, i * 100);
    }
}

// Adicionar animação de confetti ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Criar confetti ao carregar
window.addEventListener('load', () => {
    setTimeout(createConfetti, 1000);
});
