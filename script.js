// DOM elements
const questionSection = document.getElementById('question-section');
const birthdaySection = document.getElementById('birthday-section');
const bookSection = document.getElementById('book-section');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Sad messages when clicking "No"
const sadMessages = [
    "hong thưn thiệt hã :(((",
    "nhma tui thưn embe nhieuuu",
    "huhuuu :(((",
    "tui buồn thiệc thiệc đo :((("
];

let noClickCount = 0;
let yesBtnScale = 1;

// Event listeners
yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);

// Handle "Yes" button click
function handleYesClick() {
    // Animate the yes button to grow 4 times
    yesBtnScale = 4;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    
    // Make the no button disappear
    noBtn.style.opacity = '0';
    noBtn.style.transform = 'scale(0)';
    
    // Wait a moment then show birthday celebration
    setTimeout(() => {
        showBirthdaySection();
    }, 1000);
}

// Handle "No" button click
function handleNoClick() {
    noClickCount++;
    
    // Make the yes button bigger
    yesBtnScale += 0.5;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
    
    // Show sad message
    showSadMessage();
    
    // Move the no button to a random position
    moveNoButtonToRandomPosition();
    
    // If clicked too many times, make no button disappear
    if (noClickCount >= 4) {
        noBtn.style.opacity = '0';
        noBtn.style.transform = 'scale(0)';
    }
}

// Move no button to random position
function moveNoButtonToRandomPosition() {
    const maxX = window.innerWidth - 150; // Account for button width
    const maxY = window.innerHeight - 60; // Account for button height
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '1000';
    
    // Add bounce animation
    noBtn.style.animation = 'bounceIn 0.5s ease-out';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

// Show sad message
function showSadMessage() {
    const message = sadMessages[Math.min(noClickCount - 1, sadMessages.length - 1)];
    
    // Create temporary message element
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 107, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: 600;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(messageEl);
    
    // Remove message after animation
    setTimeout(() => {
        document.body.removeChild(messageEl);
    }, 2000);
}

// Show birthday section
function showBirthdaySection() {
    questionSection.classList.remove('active');
    birthdaySection.classList.add('active');
    
    // Add confetti effect
    createConfetti();
}

// Variables for cake functionality
let blownCandles = 0;
const totalCandles = 3;

// Function to blow out candles
function blowCandle(candleIndex) {
    const flame = document.getElementById(`flame-${candleIndex}`);
    if (flame && !flame.classList.contains('blown')) {
        flame.classList.add('blown');
        blownCandles++;
        
        // Add blow effect
        createBlowEffect(flame);
        
        // Check if all candles are blown
        if (blownCandles >= totalCandles) {
            setTimeout(() => {
                hideCakeAndShowGift();
            }, 1000);
        }
    }
}

// Create blow effect
function createBlowEffect(flame) {
    const blowEffect = document.createElement('div');
    blowEffect.innerHTML = '💨';
    blowEffect.style.cssText = `
        position: fixed;
        top: ${flame.getBoundingClientRect().top}px;
        left: ${flame.getBoundingClientRect().left}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: blowEffect 1s ease-out forwards;
    `;
    
    document.body.appendChild(blowEffect);
    
    setTimeout(() => {
        if (blowEffect.parentNode) {
            document.body.removeChild(blowEffect);
        }
    }, 1000);
}

// Hide cake and show gift
function hideCakeAndShowGift() {
    const cake = document.getElementById('birthday-cake');
    const giftContainer = document.getElementById('gift-container');
    
    if (cake) {
        cake.style.animation = 'cakeDisappear 1s ease-in forwards';
        setTimeout(() => {
            cake.style.display = 'none';
            if (giftContainer) {
                giftContainer.style.display = 'flex';
                giftContainer.style.animation = 'giftAppear 1s ease-out';
            }
        }, 1000);
    }
}

// Book navigation variables
let currentPageIndex = 0;
const totalPages = 20;

// Show book section
function openBook() {
    birthdaySection.classList.remove('active');
    bookSection.classList.add('active');
    
    // Show book pages after a short delay
    setTimeout(() => {
        const bookPages = document.querySelector('.book-pages');
        bookPages.classList.add('active');
        showPage(0); // Show first page
    }, 500);
}

// Close book and return to birthday section
function closeBook() {
    // Check if we're on the last page before closing
    const wasOnLastPage = currentPageIndex === totalPages - 1;
    
    bookSection.classList.remove('active');
    birthdaySection.classList.add('active');
    
    // Hide book pages
    const bookPages = document.querySelector('.book-pages');
    bookPages.classList.remove('active');
    
    // Reset to first page
    currentPageIndex = 0;
    showPage(0);
    
    // Create falling effect if we were on the last page
    if (wasOnLastPage) {
        createFallingEffect();
    }
}

// Create falling effect with icons and images
function createFallingEffect() {
    const icons = ['🎉', '🎊', '🎈', '🎂', '🎁', '💝', '💖', '💕', '💗', '💓', '💘', '💞', '💟', '💌', '💋', '✨', '🌟', '⭐', '🦛', '🦛'];
    const images = [
        'photo/chanbobot.jpg', 'photo/hongha.jpg', 'photo/gd1.jpg', 'photo/gd2.jpg', 
        'photo/thuthiem1.jpg', 'photo/thuthiem2.jpg', 'photo/cangio1.jpg', 'photo/cangio2.jpg',
        'photo/bua2.jpg', 'photo/locket1.jpg', 'photo/cafe1jpg.jpg', 'photo/call1.jpg',
        'photo/hoatdong1.jpg', 'photo/ngoaiduong.jpg', 'photo/gd5.jpg', 'photo/cat.jpg'
    ];
    
    // Create falling icons
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const icon = document.createElement('div');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.className = 'falling-item falling-icon';
            icon.style.left = `${Math.random() * 100}vw`;
            icon.style.animationDelay = `${Math.random() * 0.5}s`;
            
            document.body.appendChild(icon);
            
            // Remove after animation
            setTimeout(() => {
                if (icon.parentNode) {
                    document.body.removeChild(icon);
                }
            }, 3000);
        }, i * 200);
    }
    
    // Create falling images
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const img = document.createElement('img');
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = 'falling-item falling-image';
            img.style.left = `${Math.random() * 100}vw`;
            img.style.animationDelay = `${Math.random() * 0.5}s`;
            
            document.body.appendChild(img);
            
            // Remove after animation
            setTimeout(() => {
                if (img.parentNode) {
                    document.body.removeChild(img);
                }
            }, 3500);
        }, i * 300);
    }
}

// Show specific page
function showPage(pageIndex) {
    const pages = document.querySelectorAll('.page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    
    // Show current page
    if (pages[pageIndex]) {
        pages[pageIndex].classList.add('active');
    }
    
    // Update page indicator
    if (currentPageSpan) currentPageSpan.textContent = pageIndex + 1;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Add page flip animation
    addPageFlipEffect();
}

// Next page
function nextPage() {
    if (currentPageIndex < totalPages - 1) {
        currentPageIndex++;
        showPage(currentPageIndex);
    }
}

// Previous page
function previousPage() {
    if (currentPageIndex > 0) {
        currentPageIndex--;
        showPage(currentPageIndex);
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.nav-btn:first-child');
    const nextBtn = document.querySelector('.nav-btn:last-child');
    
    if (prevBtn) {
        prevBtn.disabled = currentPageIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentPageIndex === totalPages - 1;
    }
}

// Add page flip effect
function addPageFlipEffect() {
    const currentPage = document.querySelector('.page.active');
    if (currentPage) {
        currentPage.style.animation = 'pageFlip 0.5s ease-in-out';
        setTimeout(() => {
            currentPage.style.animation = '';
        }, 500);
    }
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}vw;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    document.body.removeChild(confetti);
                }
            }, 3000);
        }, i * 100);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    .btn {
        transition: all 0.3s ease !important;
    }
    
    .section {
        transition: opacity 0.5s ease-in-out !important;
    }
    
    .book-pages {
        transition: all 0.5s ease-in-out !important;
    }
`;

document.head.appendChild(style);

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (questionSection.classList.contains('active')) {
            handleYesClick();
        }
    }
    
    // Book navigation with arrow keys
    if (bookSection.classList.contains('active')) {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            nextPage();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            previousPage();
        }
    }
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add floating hearts
    createFloatingHearts();
    
    // Add sparkle effect to gift box
    addSparkleEffect();
    
    // Add keyboard navigation for book
    addKeyboardNavigation();
    
    // Add more fun effects
    addFunEffects();
});

// Create floating hearts
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💞', '💟', '💌', '💋', '💘'];
    
    setInterval(() => {
        if (questionSection.classList.contains('active')) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                top: 100vh;
                left: ${Math.random() * 100}vw;
                font-size: ${1.2 + Math.random() * 1}rem;
                pointer-events: none;
                z-index: 5;
                animation: floatUp ${3 + Math.random() * 2}s linear forwards;
                opacity: 0.9;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    document.body.removeChild(heart);
                }
            }, 5000);
        }
    }, 1500);
}

// Add sparkle effect to gift box
function addSparkleEffect() {
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    }
}

// Create sparkles
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            top: ${rect.top + Math.random() * rect.height}px;
            left: ${rect.left + Math.random() * rect.width}px;
            font-size: 1rem;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnim 1s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                document.body.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add keyboard navigation for book
function addKeyboardNavigation() {
    // Already handled in the main keydown event listener
}

// Add more fun effects
function addFunEffects() {
    // Add rainbow effect to buttons
    addRainbowEffect();
    
    // Add music notes
    addMusicNotes();
    
    // Add surprise messages
    addSurpriseMessages();
    
    // Add floating icons
    addFloatingIcons();
    
    // Add emoji rain
    addEmojiRain();
}

// Add rainbow effect to buttons
function addRainbowEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach((btn, index) => {
        btn.addEventListener('mouseenter', function() {
            const colors = ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#ff9ff3'];
            this.style.background = `linear-gradient(45deg, ${colors[index % colors.length]}, ${colors[(index + 1) % colors.length]})`;
        });
        
        btn.addEventListener('mouseleave', function() {
            if (this.classList.contains('yes-btn')) {
                this.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
            } else {
                this.style.background = 'linear-gradient(45deg, #74b9ff, #0984e3)';
            }
        });
    });
}

// Add music notes
function addMusicNotes() {
    const notes = ['🎵', '🎶', '🎼', '🎤', '🎧', '🎹', '🎸', '🎺', '🎻', '🥁', '🎪', '🎭', '🎨', '🎬'];
    
    setInterval(() => {
        if (birthdaySection.classList.contains('active')) {
            const note = document.createElement('div');
            note.textContent = notes[Math.floor(Math.random() * notes.length)];
            note.style.cssText = `
                position: fixed;
                top: 100vh;
                left: ${Math.random() * 100}vw;
                font-size: ${1.2 + Math.random() * 1}rem;
                pointer-events: none;
                z-index: 5;
                animation: floatUp ${2 + Math.random() * 2}s linear forwards;
                opacity: 0.8;
            `;
            
            document.body.appendChild(note);
            
            setTimeout(() => {
                if (note.parentNode) {
                    document.body.removeChild(note);
                }
            }, 4000);
        }
    }, 2000);
}

// Add surprise messages
function addSurpriseMessages() {
    const messages = [
        "thunnn embeeeee! 💕",
        "ngiu tui s1 vu tru! 💖",
        "ngiu tui tuyet voi nhatttt the gioiii! 🌟",
        "tui iu embeeeee! 😊",
        "iuuu embeee! 🎉",
    ];
    
    setInterval(() => {
        if (questionSection.classList.contains('active')) {
            const message = document.createElement('div');
            message.textContent = messages[Math.floor(Math.random() * messages.length)];
            message.style.cssText = `
                position: fixed;
                top: ${20 + Math.random() * 60}vh;
                left: ${10 + Math.random() * 80}vw;
                background: rgba(255, 107, 107, 0.9);
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                pointer-events: none;
                z-index: 1000;
                animation: fadeInOut 3s ease-in-out;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                if (message.parentNode) {
                    document.body.removeChild(message);
                }
            }, 3000);
        }
    }, 8000);
}

// Add floating icons
function addFloatingIcons() {
    const icons = [
        '🎈', '🎊', '🎉', '🎂', '🎁', '💝', '💖', '💕', '💗', '💓',
        '💘', '💙', '🦛', '💛', '🧡', '💜', '🦛', '🦛', '🦛', '💯',
        '✨', '🌟', '⭐', '🦛', '🦛', '🦛', '🦛', '🦛', '🦛', '🌺',
        '🌸', '🌼', '🌻', '🌹', '🌷', '🌱', '🌿', '🍃', '🌳', '🌴',
        '🎵', '🎶', '🎼', '🎤', '🎧', '🎹', '🎸', '🎺', '🎻', '🥁',
        '🦛', '🦛', '🎨', '🎬', '🎤', '🎧', '🎮', '🦛', '🎯', '🎳',
        '🦛', '🎱', '🏆', '🏅', '🥇', '🥈', '🥉', '🎖️', '🏵️', '🎗️'
    ];
    
    setInterval(() => {
        if (questionSection.classList.contains('active')) {
            const icon = document.createElement('div');
            icon.textContent = icons[Math.floor(Math.random() * icons.length)];
            icon.style.cssText = `
                position: fixed;
                top: 100vh;
                left: ${Math.random() * 100}vw;
                font-size: ${1.5 + Math.random() * 2}rem;
                pointer-events: none;
                z-index: 5;
                animation: floatUp ${3 + Math.random() * 4}s linear forwards;
                opacity: 0.8;
            `;
            
            document.body.appendChild(icon);
            
            setTimeout(() => {
                if (icon.parentNode) {
                    document.body.removeChild(icon);
                }
            }, 7000);
        }
    }, 1500);
}

// Add emoji rain
function addEmojiRain() {
    const rainEmojis = ['💕', '💖', '💗', '💓', '💘', '💝', '💞', '🦛', '🦛', '🦛'];
    
    setInterval(() => {
        if (questionSection.classList.contains('active') && Math.random() < 0.3) {
            // Create multiple emojis at once for rain effect
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const emoji = document.createElement('div');
                    emoji.textContent = rainEmojis[Math.floor(Math.random() * rainEmojis.length)];
                    emoji.style.cssText = `
                        position: fixed;
                        top: -50px;
                        left: ${Math.random() * 100}vw;
                        font-size: 2rem;
                        pointer-events: none;
                        z-index: 5;
                        animation: emojiRain 2s linear forwards;
                    `;
                    
                    document.body.appendChild(emoji);
                    
                    setTimeout(() => {
                        if (emoji.parentNode) {
                            document.body.removeChild(emoji);
                        }
                    }, 2000);
                }, i * 100);
            }
        }
    }, 5000);
}

// Add more CSS animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes pageFlip {
        0% {
            transform: rotateY(0deg);
        }
        50% {
            transform: rotateY(-10deg);
        }
        100% {
            transform: rotateY(0deg);
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes emojiRain {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes wiggle {
        0%, 100% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(-5deg);
        }
        75% {
            transform: rotate(5deg);
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .title {
        animation: bounceIn 1s ease-out, pulse 2s ease-in-out infinite 1s;
    }
    
    .gift-box {
        animation: bounceIn 1s ease-out 0.5s both;
    }
    
    .book-cover {
        animation: bounceIn 1s ease-out 0.3s both;
    }
    
    .no-btn:hover {
        animation: wiggle 0.5s ease-in-out;
    }
    
    .yes-btn:hover {
        animation: rainbow 2s linear infinite;
    }
`;

document.head.appendChild(additionalStyle); 