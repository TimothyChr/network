// ===========================
// script.js
// Same interaction logic, no change needed
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.getElementById('photoContainer');
    const spriteImg = document.getElementById('spriteImg');
    const photoImg = document.getElementById('photoImg');
    const introParagraph = document.getElementById('introParagraph');
    const boxesLayer = document.getElementById('boxesLayer');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailTitle = document.getElementById('detailTitle');
    const closeDetailBtn = document.getElementById('closeDetail');
    const cornerBoxes = document.querySelectorAll('.corner-box');

    let boxesVisible = false;
    let detailVisible = false;
    let isAnimating = false;

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

    function showBoxes() {
        if (boxesVisible) return;
        boxesLayer.classList.add('visible');
        boxesVisible = true;
    }

    function hideBoxes() {
        if (!boxesVisible) return;
        boxesLayer.classList.remove('visible');
        boxesVisible = false;
    }

    function showDetail(title) {
        if (detailVisible) return;
        detailTitle.textContent = title;
        detailOverlay.classList.add('visible');
        detailVisible = true;
        hideBoxes();
    }

    function hideDetail() {
        if (!detailVisible) return;
        detailOverlay.classList.remove('visible');
        detailVisible = false;
        showBoxes();
    }

    function toggleBoxes() {
        if (isAnimating) return;
        if (detailVisible) {
            hideDetail();
            return;
        }
        if (boxesVisible) {
            hideBoxes();
        } else {
            showBoxes();
            pulseAndGlow();
        }
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 350);
    }

    function handleBoxClick(event) {
        event.stopPropagation();
        const category = this.getAttribute('data-category');
        if (category) {
            showDetail(category);
            pulseAndGlow();
        }
    }

    function handleCloseDetail(event) {
        event.stopPropagation();
        hideDetail();
    }

    function handlePhotoInteraction(event) {
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        toggleBoxes();
    }

    if (photoContainer) {
        photoContainer.addEventListener('click', handlePhotoInteraction);
        photoContainer.addEventListener('touchstart', handlePhotoInteraction, { passive: false });
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

    cornerBoxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleBoxClick.call(box, e);
        }, { passive: false });
    });

    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', handleCloseDetail);
        closeDetailBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleCloseDetail(e);
        }, { passive: false });
    }

    if (detailOverlay) {
        detailOverlay.addEventListener('click', function(e) {
            if (e.target === detailOverlay) {
                hideDetail();
            }
        });
    }

    console.log('✨ Ready! Tap the photo to reveal Experiences, Tools, Hobbies, and Socials.');
});