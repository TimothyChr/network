document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.getElementById('photoContainer');
    const spriteImg = document.getElementById('spriteImg');
    const photoImg = document.getElementById('photoImg');
    const introParagraph = document.getElementById('introParagraph');
    const boxesLayer = document.getElementById('boxesLayer');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailTitle = document.getElementById('detailTitle');
    const detailContent = document.getElementById('detailContent');
    const closeDetailBtn = document.getElementById('closeDetail');
    const overlayBackdrop = document.getElementById('overlayBackdrop');
    const cornerBoxes = document.querySelectorAll('.corner-box');

    let boxesVisible = false;
    let detailVisible = false;

    // ---------- Visual feedback ----------
    function pulseAndGlow() {
        if (spriteImg) {
            spriteImg.classList.remove('pulse');
            void spriteImg.offsetWidth;
            spriteImg.classList.add('pulse');
        }
        if (photoImg) photoImg.classList.add('glow');
        if (introParagraph) introParagraph.classList.add('highlight');
        setTimeout(() => {
            if (photoImg) photoImg.classList.remove('glow');
            if (introParagraph) introParagraph.classList.remove('highlight');
            if (spriteImg) spriteImg.classList.remove('pulse');
        }, 650);
    }

    // ---------- Boxes toggling ----------
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

    // ---------- Detail overlay control ----------
    function openDetail(category) {
        if (detailVisible) return;
        detailTitle.textContent = category;
        detailContent.innerHTML = '';  // Clear previous listeners

        switch (category) {
            case 'Experiences':
                detailContent.innerHTML = `
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-text">Started as junior designer – learned visual storytelling.</div>
                        </div>
                        <div class="timeline-line"></div>
                        <div class="timeline-item">
                            <div class="timeline-dot"></div>
                            <div class="timeline-text">Became a full‑stack creative, merging design & code.</div>
                        </div>
                    </div>`;
                break;

            case 'Tools':
                renderToolsSelection();
                break;

            case 'Socials':
                detailContent.innerHTML = `
                    <div class="social-grid">
                        <a href="tel:+1234567890" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">📞</div><span>Phone</span>
                        </a>
                        <a href="mailto:hello@example.com" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">✉️</div><span>Email</span>
                        </a>
                        <a href="https://instagram.com/yourhandle" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">📷</div><span>Instagram</span>
                        </a>
                        <a href="https://linkedin.com/in/yourprofile" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">🔗</div><span>LinkedIn</span>
                        </a>
                    </div>`;
                break;

            case 'Hobbies':
                detailContent.innerHTML = `
                    <p style="color:#3e2b1c; text-align:center; font-size:1.1rem; line-height:1.8;">
                        🌿 Hiking &nbsp;|&nbsp; 📚 Reading &nbsp;|&nbsp; 🎨 Painting &nbsp;|&nbsp; 🎮 Gaming
                    </p>`;
                break;
        }

        detailOverlay.classList.add('visible');
        overlayBackdrop.classList.add('visible');
        detailVisible = true;
        hideBoxes();
    }

    function closeDetail() {
        if (!detailVisible) return;
        detailOverlay.classList.remove('visible');
        overlayBackdrop.classList.remove('visible');
        detailVisible = false;
        showBoxes();
    }

    // ---------- Tools sub-views ----------
    function renderToolsSelection() {
        detailContent.innerHTML = `
            <div class="tools-selection">
                <button class="tool-choice" data-tool="Excel">
                    <span class="tool-choice-icon">📊</span> Excel
                </button>
                <button class="tool-choice" data-tool="Python">
                    <span class="tool-choice-icon">🐍</span> Python
                </button>
                <button class="tool-choice" data-tool="SQL">
                    <span class="tool-choice-icon">🗄️</span> SQL
                </button>
                <button class="tool-choice" data-tool="Tableau">
                    <span class="tool-choice-icon">📈</span> Tableau
                </button>
            </div>`;
        attachToolChoiceListeners();
    }

    function attachToolChoiceListeners() {
        document.querySelectorAll('.tool-choice').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tool = btn.getAttribute('data-tool');
                showToolDetail(tool);
            });
        });
    }

    function showToolDetail(toolName) {
        detailTitle.textContent = toolName;
        detailContent.innerHTML = `
            <button class="back-button" id="backToTools">← Back to all tools</button>
            <div class="tool-detail-container">
                <div class="tool-detail-chart">[${toolName} chart placeholder]</div>
                <div class="tool-detail-text">
                    Detailed information about <strong>${toolName}</strong>. 
                    Here you can describe your skills, experience, and projects related to this tool.
                </div>
            </div>`;
        document.getElementById('backToTools').addEventListener('click', (e) => {
            e.stopPropagation();
            detailTitle.textContent = 'Tools';
            renderToolsSelection();
        });
    }

    // ---------- Event listeners ----------
    photoContainer.addEventListener('click', (e) => {
        e.stopPropagation();
        if (detailVisible) {
            closeDetail();
        } else {
            boxesVisible ? hideBoxes() : showBoxes();
            if (!boxesVisible) pulseAndGlow(); // only when showing boxes
        }
    });

    // Touch support
    photoContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        photoContainer.click();
    }, { passive: false });

    cornerBoxes.forEach(box => {
        box.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = box.getAttribute('data-category');
            if (category) openDetail(category);
        });
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            box.click();
        }, { passive: false });
    });

    closeDetailBtn.addEventListener('click', closeDetail);
    closeDetailBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        closeDetail();
    }, { passive: false });

    overlayBackdrop.addEventListener('click', closeDetail);
    overlayBackdrop.addEventListener('touchstart', (e) => {
        e.preventDefault();
        closeDetail();
    }, { passive: false });

    // Prevent overlay content clicks from closing
    detailOverlay.addEventListener('click', (e) => e.stopPropagation());
    detailOverlay.addEventListener('touchstart', (e) => e.stopPropagation());

    // Keyboard accessibility
    photoContainer.setAttribute('tabindex', '0');
    photoContainer.setAttribute('role', 'button');
    photoContainer.setAttribute('aria-label', 'Touch to reveal options');
    photoContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            photoContainer.click();
        }
    });

    console.log('✨ Ready! Tap the photo to explore.');
});