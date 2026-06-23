// ===========================
// script.js
// Landing Page Interactions
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const photoContainer = document.getElementById('photoContainer');
    const touchText = document.getElementById('touchText');
    const spriteImg = document.getElementById('spriteImg');
    const photoImg = document.getElementById('photoImg');
    const introParagraph = document.getElementById('introParagraph');

    // --- State ---
    let interactionTimeout = null;
    let isAnimating = false;

    // --- Interaction Handler ---
    function handleInteraction(event) {
        // Prevent rapid-fire animations from stacking oddly
        if (isAnimating) return;

        // Prevent default only for touch to avoid double-firing on mobile
        if (event.type === 'touchstart') {
            event.preventDefault();
        }

        isAnimating = true;

        // 1. Pulse the sprite
        if (spriteImg) {
            // Remove class to restart animation
            spriteImg.classList.remove('pulse');
            // Force reflow
            void spriteImg.offsetWidth;
            // Add pulse class
            spriteImg.classList.add('pulse');
        }

        // 2. Glow the photo
        if (photoImg) {
            photoImg.classList.add('glow');
        }

        // 3. Highlight the intro paragraph
        if (introParagraph) {
            introParagraph.classList.add('highlight');
        }

        // --- Cleanup after animation ---
        if (interactionTimeout) {
            clearTimeout(interactionTimeout);
        }

        interactionTimeout = setTimeout(() => {
            // Remove glow from photo
            if (photoImg) {
                photoImg.classList.remove('glow');
            }
            // Remove highlight from intro
            if (introParagraph) {
                introParagraph.classList.remove('highlight');
            }
            // Remove pulse from sprite (animation ends naturally, but clean up class)
            if (spriteImg) {
                spriteImg.classList.remove('pulse');
            }

            isAnimating = false;
            interactionTimeout = null;
        }, 650); // Slightly longer than the pulse animation (0.6s)
    }

    // --- Attach Event Listeners ---

    // Photo container (covers the sprite + photo area)
    if (photoContainer) {
        photoContainer.addEventListener('click', handleInteraction);
        photoContainer.addEventListener('touchstart', handleInteraction, { passive: false });
    }

    // "Touch me!" text is also tappable
    if (touchText) {
        touchText.addEventListener('click', handleInteraction);
        touchText.addEventListener('touchstart', handleInteraction, { passive: false });
    }

    // --- Optional: Keyboard accessibility for the photo container ---
    if (photoContainer) {
        photoContainer.setAttribute('tabindex', '0');
        photoContainer.setAttribute('role', 'button');
        photoContainer.setAttribute('aria-label', 'Touch or click to interact');

        photoContainer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleInteraction(event);
            }
        });
    }

    if (touchText) {
        touchText.setAttribute('tabindex', '0');
        touchText.setAttribute('role', 'button');
        touchText.setAttribute('aria-label', 'Touch me to know more');

        touchText.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleInteraction(event);
            }
        });
    }

    // --- Log for confirmation ---
    console.log('✨ Landing page ready! Tap the photo or "Touch me!" text to interact.');
});