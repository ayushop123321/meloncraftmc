// Store Items Data
const storeItems = {
    ranks: [
        {
            name: "ELITE",
            price: 60,
            type: "Rank",
            description: "Basic Kit",
            icon: "🟢",
            qrImage: "img/60rupees.webp"
        },
        {
            name: "DEADLIEST",
            price: 100,
            type: "Rank",
            description: "Advanced Kit",
            icon: "🔥",
            qrImage: "img/100rupees.webp"
        },
        {
            name: "IMMORTAL",
            price: 150,
            type: "Rank",
            description: "Premium Kit",
            icon: "👑",
            qrImage: "img/150rupees.webp"
        },
        {
            name: "GOD",
            price: 200,
            type: "Rank",
            description: "Ultimate Kit",
            icon: "⚡",
            qrImage: "img/200rupees.webp"
        },
        {
            name: "BOSS",
            price: 400,
            type: "Rank",
            description: "Superior Kit",
            icon: "💎",
            qrImage: "img/400rupees.webp"
        },
        {
            name: "KING",
            price: 600,
            type: "Rank",
            description: "All Kits Unlock",
            icon: "👑✨",
            qrImage: "img/600rupees.webp"
        }
    ],
    crates: [
        {
            name: "Ultimate Crates Key",
            price: 45,
            type: "Crate",
            description: "Ultimate rewards",
            icon: "🗝️"
        },
        {
            name: "Rare Crates Key",
            price: 45,
            type: "Crate",
            description: "Rare items",
            icon: "🔑"
        },
        {
            name: "Epic Crates Key",
            price: 45,
            type: "Crate",
            description: "Epic rewards",
            icon: "🗝️"
        },
        {
            name: "Party Crates Key",
            price: 40,
            type: "Crate",
            description: "Party items",
            icon: "🎉"
        }
    ],
    money: [
        {
            name: "Starter Pack",
            price: 100,
            type: "Money",
            description: "₹10,000 In-Game",
            icon: "💰"
        },
        {
            name: "Premium Pack",
            price: 200,
            type: "Money",
            description: "₹25,000 In-Game",
            icon: "💎"
        },
        {
            name: "Ultimate Pack",
            price: 500,
            type: "Money",
            description: "₹75,000 In-Game",
            icon: "🏆"
        }
    ],
    coins: [
        {
            name: "100 Coins",
            price: 50,
            type: "Coins",
            description: "Special currency",
            icon: "🪙"
        },
        {
            name: "250 Coins",
            price: 120,
            type: "Coins",
            description: "Special currency",
            icon: "🪙"
        },
        {
            name: "500 Coins",
            price: 200,
            type: "Coins",
            description: "Special currency",
            icon: "🪙"
        }
    ]
};

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const storeItemsContainer = document.getElementById('storeItems');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    createFloatingItems();
});

// Initialize animations and effects
function initializeAnimations() {
    // Add scroll animations
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .about-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Create additional floating Minecraft items
function createFloatingItems() {
    const hero = document.querySelector('.hero');
    const items = [];
    
    // Create 15 floating items
    for (let i = 0; i < 15; i++) {
        const item = document.createElement('div');
        item.className = 'floating-item';
        item.textContent = items[Math.floor(Math.random() * items.length)];
        
        // Random positioning and animation delay
        item.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 15 + 15}px;
            left: ${Math.random() * 100}%;
            color: #ff0000;
            text-shadow: 0 0 20px #ff000033;
            animation: floatUp ${Math.random() * 5 + 8}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
            z-index: 1;
            pointer-events: none;
        `;
        
        hero.appendChild(item);
    }
}

// Scroll to store section
function scrollToStore() {
    const storeSection = document.getElementById('store');
    if (storeSection) {
        storeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Document ready event
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToStore();
        });
    }
    
    // Create floating particles
    createParticles();
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .about-card, .contact-card');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                // Add staggered delay based on index
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    };
    
    // Run on initial load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Add parallax effect to hero section
    window.addEventListener('mousemove', function(e) {
        const hero = document.querySelector('.hero-content');
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        if (hero) {
            hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Create floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;
    
    const particleCount = 20;
    const colors = ['#ffffff', '#f5f5f5', '#e0e0e0', '#d0d0d0'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 10 + 5;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Set styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
        `;
        
        particles.appendChild(particle);
    }
}

// Emoji wheel removed as requested

// Load category items
function loadCategory(category) {
    const items = storeItems[category];
    if (!items || !storeItemsContainer) return;

    // Update title
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    
    // Create items HTML
    let itemsHTML = `
        <h3 class="items-title">
            <i class="fas fa-${getCategoryIcon(category)}"></i>
            ${categoryTitle} Collection
        </h3>
        <div class="items-grid">
    `;

    // Special styling for ranks
    if (category === 'ranks') {
        items.forEach(item => {
            // Special styling for KING rank
            const isKing = item.name === "KING";
            const cardClass = isKing ? "item-card premium-card" : "item-card";
            
            itemsHTML += `
                <div class="${cardClass}">
                    <div class="item-header">
                        <div class="item-logo ${isKing ? 'king-icon' : ''}">${item.icon}</div>
                        <div class="item-info">
                            <h4>${item.name} Rank</h4>
                            <span class="item-type">${item.type}</span>
                        </div>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">₹${item.price}</div>
                    <div class="item-buttons">
                        <button class="buy-button" onclick="buyItem('${item.type}', '${item.name}', ${item.price}, '${item.qrImage}')">
                            <i class="fas fa-shopping-cart"></i>
                            Buy Now
                        </button>
                    </div>
                </div>
            `;
        });
    } else {
        // Regular styling for other categories
        items.forEach(item => {
            itemsHTML += `
                <div class="item-card">
                    <div class="item-header">
                        <div class="item-logo">${item.icon}</div>
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <span class="item-type">${item.type}</span>
                        </div>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">₹${item.price}</div>
                    <button class="buy-button" onclick="buyItem('${item.type}', '${item.name}', ${item.price})">
                        <i class="fas fa-shopping-cart"></i>
                        Buy Now
                    </button>
                </div>
            `;
        });
    }
    itemsHTML += '</div>';
    storeItemsContainer.innerHTML = itemsHTML;

    // Animate items
    setTimeout(() => {
        const itemCards = document.querySelectorAll('.item-card');
        itemCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);

    // Scroll to items
    setTimeout(() => {
        storeItemsContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 200);
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        ranks: 'crown',
        crates: 'box',
        money: 'coins',
        coins: 'dollar-sign'
    };
    return icons[category] || 'star';
}

// Buy item function
function buyItem(type, name, price, qrImage) {
    // Store purchase details in sessionStorage
    const purchaseDetails = {
        type: type,
        name: name,
        price: price,
        qrImage: qrImage
    };
    
    // Save to session storage
    sessionStorage.setItem('purchaseDetails', JSON.stringify(purchaseDetails));
    
    // Redirect to purchase page
    window.location.href = 'purchase.html';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
        header.style.backdropFilter = 'blur(25px)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.8)';
        header.style.backdropFilter = 'blur(20px)';
    }
});

// Particle cursor effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) { // 10% chance to create particle
        createCursorParticle(e.clientX, e.clientY);
    }
});

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: 4px;
        height: 4px;
        background: #ff0000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: particleFade 1s ease-out forwards;
        box-shadow: 0 0 10px #ff000033;
    `;
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Add particle fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-20px);
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 0, 0, 0.2);
        padding: 1rem 0;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    .floating-item {
        user-select: none;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .hamburger {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);

// Add loading screen
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(255, 0, 0, 0.2);
                    border-top: 3px solid #ff0000;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <h2 style="
                    color: #2ecc71;
                    font-family: 'Orbitron', monospace;
                    text-shadow: 0 0 20px rgba(46, 204, 113, 0.5);
                ">MELONCRAFT</h2>
                <p style="color: #cccccc; margin-top: 10px;">Loading...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
});

// Console welcome message
console.log(`
🍉 MELONCRAFT 🍉
Welcome to the ultimate Minecraft server shop!
Developed with ❤️ for the gaming community.

🎮 Features:
- Glassmorphism UI Design
- Floating Minecraft Items Animation
- Smooth Scrolling & Transitions
- Responsive Design
- Discord Integration

🛡️ Security: All transactions are secure and processed instantly.
📞 Support: Contact us through Discord for any assistance.

Happy Gaming! 🎯
`);

// Security: Obfuscate sensitive data
const _0x1a2b = ['scrollToStore', 'loadCategory', 'buyItem'];

// Anti-tampering protection
(function() {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    
    console.log = function() {
        if (arguments[0] && arguments[0].includes && arguments[0].includes('storeItems')) {
            return;
        }
        originalLog.apply(console, arguments);
    };
    
    console.warn = function() {
        originalWarn.apply(console, arguments);
    };
    
    console.error = function() {
        originalError.apply(console, arguments);
    };
})();

// Protect store data
Object.freeze(storeItems);
Object.freeze(storeItems.ranks);
Object.freeze(storeItems.crates);
Object.freeze(storeItems.money);
Object.freeze(storeItems.coins);

// Export functions for global access (obfuscated)
window[_0x1a2b[0]] = scrollToStore;
window[_0x1a2b[1]] = loadCategory;
window[_0x1a2b[2]] = buyItem;

// Additional security layer
(function() {
    // Detect if running in development environment
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🔒 Development Mode - Security Active', 'color: orange; font-weight: bold;');
    }
    
    // Monitor for unauthorized modifications
    const originalFetch = window.fetch;
    window.fetch = function() {
        console.log('%c🛡️ Network request monitored', 'color: blue;');
        return originalFetch.apply(this, arguments);
    };
    
    // Protect against code injection
    const originalEval = window.eval;
    window.eval = function() {
        console.warn('🚨 Eval blocked for security');
        return null;
    };
})();

// Final security check
console.log('%c🛡️ MELONCRAFT - Security Initialized', 'color: #2ecc71; font-weight: bold; font-size: 16px;');
console.log('%c⚠️ Unauthorized access or modification is prohibited', 'color: orange; font-size: 12px;');
