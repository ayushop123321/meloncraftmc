// Main JavaScript file for MelonCraft
import { appSettings } from '../api/config.js';

// Store Items Data - Will be moved to database in future versions
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
            icon: "💸"
        }
    ],
    keys: [
        {
            name: "Vote Key",
            price: 20,
            type: "Key",
            description: "Basic rewards",
            icon: "🔑"
        },
        {
            name: "Legendary Key",
            price: 60,
            type: "Key",
            description: "Legendary rewards",
            icon: "🗝️✨"
        }
    ]
};

// Current category and selected item
let currentCategory = 'ranks';
let selectedItem = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the store
    loadCategory('ranks');
    
    // Setup navigation
    setupNavigation();
    
    // Setup animations
    setupAnimations();
    
    // Initialize particles
    initParticles();
});

// Load category items
function loadCategory(category) {
    currentCategory = category;
    selectedItem = null;
    
    const storeContainer = document.querySelector('.store-items');
    if (!storeContainer) return;
    
    // Clear previous items
    storeContainer.innerHTML = '';
    
    // Get items for the selected category
    const items = storeItems[category] || [];
    
    // Create item cards
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.setAttribute('data-name', item.name);
        itemCard.setAttribute('data-price', item.price);
        
        itemCard.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <h3 class="item-name">${item.name}</h3>
            <div class="item-type">${item.type}</div>
            <div class="item-description">${item.description}</div>
            <div class="item-price">${appSettings.currency}${item.price}</div>
            <button class="buy-button">Purchase</button>
        `;
        
        // Add click event
        itemCard.querySelector('.buy-button').addEventListener('click', () => {
            selectItem(item);
        });
        
        storeContainer.appendChild(itemCard);
    });
    
    // Update category buttons
    updateCategoryButtons(category);
}

// Update category buttons
function updateCategoryButtons(activeCategory) {
    const categoryButtons = document.querySelectorAll('.category-card');
    categoryButtons.forEach(button => {
        const category = button.textContent.trim().toLowerCase();
        if (category === activeCategory) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Select an item
function selectItem(item) {
    selectedItem = item;
    
    // Store selected item in session storage
    sessionStorage.setItem('selectedItem', JSON.stringify(item));
    
    // Redirect to purchase page
    window.location.href = 'purchase.html';
}

// Setup navigation
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Scroll to store section
function scrollToStore() {
    const storeSection = document.getElementById('store');
    if (storeSection) {
        storeSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup animations
function setupAnimations() {
    // Animate elements when they come into view
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize particles
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Export functions for use in other scripts
export { loadCategory, selectItem, scrollToStore };