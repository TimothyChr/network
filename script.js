// ===========================
// script.js
// Updated interactions: photo toggle boxes, detail expansion
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const photoContainer = document.getElementById('photoContainer');
    const spriteImg = document.getElementById('spriteImg');
    const photoImg = document.getElementById('photoImg');
    const introParagraph = document.getElementById('introParagraph');
    const boxesLayer = document.getElementById('boxesLayer');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailTitle = document.getElementById('detailTitle');
    const closeDetailBtn = document.getElementById('closeDetail');

    // All four corner boxes
    const cornerBoxes = document.querySelectorAll('.corner-box');

    // --- State flags ---
    let boxesVisible = false;
    let detailVisible = false;
    let isAnimating = false;

    // --- Helper: pulse & glow (visual feedback) ---
    function pulseAndGlow() {
        if (spriteImg) {
            spriteImg.classList.remove('pulse');
            void spriteImg.offsetWidth;
            spriteImg.classList.add('pulse');
        }
        if (photoImg) {
            photoImg.classList.add('glow');
        }
        if (introParagraph) {
            introParagraph.classList.add('highlight');
        }
        setTimeout(() => {
            if (photoImg) photoImg.classList.remove('glow');
            if (introParagraph) introParagraph.classList.remove('highlight');
            if (spriteImg) spriteImg.classList.remove('pulse');
        }, 650);
    }

    // --- Show the four corner boxes ---
    function showBoxes() {
        if (boxesVisible) return;
        boxesLayer.classList.add('visible');
        boxesVisible = true;
    }

    // --- Hide the four corner boxes ---
    function hideBoxes() {
        if (!boxesVisible) return;
        boxesLayer.classList.remove('visible');
        boxesVisible = false;
    }

    // --- Show detail overlay with given title ---
    function showDetail(title) {
        if (detailVisible) return;
        detailTitle.textContent = title;
        detailOverlay.classList.add('visible');
        detailVisible = true;
        // Hide the corner boxes when detail appears
        hideBoxes();
    }

    // --- Hide detail overlay and show boxes again ---
    function hideDetail() {
        if (!detailVisible) return;
        detailOverlay.classList.remove('visible');
        detailVisible = false;
        // Bring back the four boxes
        showBoxes();
    }

    // --- Toggle boxes from photo tap ---
    function toggleBoxes() {
        if (isAnimating) return;
        if (detailVisible) {
            // If detail is open, first close detail (which will show boxes)
            hideDetail();
            return;
        }
        // Otherwise toggle the small boxes
        if (boxesVisible) {
            hideBoxes();
        } else {
            showBoxes();
            // Pulse & glow whenever boxes appear
            pulseAndGlow();
        }
        // Small lock to prevent rapid double‑taps
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 350);
    }

    // --- Handle corner box click ---
    function handleBoxClick(event) {
        event.stopPropagation(); // Prevent toggling the photo container
        const category = this.getAttribute('data-category');
        if (category) {
            showDetail(category);
            pulseAndGlow();
        }
    }

    // --- Handle close button on detail ---
    function handleCloseDetail(event) {
        event.stopPropagation();
        hideDetail();
    }

    // --- Main photo tap handler ---
    function handlePhotoInteraction(event) {
        // Prevent default only for touch to avoid double-firing
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        toggleBoxes();
    }

    // --- Attach listeners ---
    if (photoContainer) {
        photoContainer.addEventListener('click', handlePhotoInteraction);
        photoContainer.addEventListener('touchstart', handlePhotoInteraction, { passive: false });

        // Keyboard accessibility
        photoContainer.setAttribute('tabindex', '0');
        photoContainer.setAttribute('role', 'button');
        photoContainer.setAttribute('aria-label', 'Touch or click to reveal options');
        photoContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBoxes();
            }
        });
    }

    // Bind click to each corner box
    cornerBoxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleBoxClick.call(box, e);
        }, { passive: false });
    });

    // Close detail via button
    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', handleCloseDetail);
        closeDetailBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleCloseDetail(e);
        }, { passive: false });
    }

    // Also allow clicking the detail overlay background to close
    if (detailOverlay) {
        detailOverlay.addEventListener('click', function(e) {
            // Only close if the click is on the overlay itself, not a child button
            if (e.target === detailOverlay) {
                hideDetail();
            }
        });
    }

    console.log('✨ Ready! Tap the photo to reveal Experiences, Tools, Hobbies, and Socials.');
});