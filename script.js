// ===========================
// script.js
// Dynamic overlay content rendering
// ===========================

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
    const cornerBoxes = document.querySelectorAll('.corner-box');

    let boxesVisible = false;
    let detailVisible = false;
    let isAnimating = false;

    // ---------- Content renderers ----------
    function renderExperiences() {
        detailContent.innerHTML = `
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-text">Started my journey as a junior designer – learned the fundamentals of visual storytelling.</div>
                </div>
                <div class="timeline-line"></div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-text">Evolved into a full‑stack creative, bridging design and code to build seamless experiences.</div>
                </div>
            </div>
        `;
    }

    function renderSocials() {
        detailContent.innerHTML = `
            <div class="social-grid">
                <a href="tel:+1234567890" class="social-item" target="_blank" rel="noopener">
                    <div class="social-icon">📞</div>
                    <span>Phone</span>
                </a>
                <a href="mailto:hello@example.com" class="social-item" target="_blank" rel="noopener">
                    <div class="social-icon">✉️</div>
                    <span>Email</span>
                </a>
                <a href="https://instagram.com/yourhandle" class="social-item" target="_blank" rel="noopener">
                    <div class="social-icon">📷</div>
                    <span>Instagram</span>
                </a>
                <a href="https://linkedin.com/in/yourprofile" class="social-item" target="_blank" rel="noopener">
                    <div class="social-icon">🔗</div>
                    <span>LinkedIn</span>
                </a>
            </div>
        `;
    }

    function renderTools() {
        detailContent.innerHTML = `
            <div class="tools-list">
                <div class="tool-card">
                    <div class="tool-icon">📊</div>
                    <div class="tool-graph-placeholder">[Excel chart]</div>
                    <div class="tool-text">Excel – data cleaning, pivot tables, and dynamic dashboards.</div>
                </div>
                <div class="tool-card">
                    <div class="tool-icon">🐍</div>
                    <div class="tool-graph-placeholder">[Python plot]</div>
                    <div class="tool-text">Python – scripting, data analysis, and automation with pandas & matplotlib.</div>
                </div>
                <div class="tool-card">
                    <div class="tool-icon">🗄️</div>
                    <div class="tool-graph-placeholder">[SQL query]</div>
                    <div class="tool-text">SQL – complex queries, database design, and performance tuning.</div>
                </div>
                <div class="tool-card">
                    <div class="tool-icon">📈</div>
                    <div class="tool-graph-placeholder">[Tableau viz]</div>
                    <div class="tool-text">Tableau – interactive visualizations and storytelling with data.</div>
                </div>
            </div>
        `;
    }

    function renderHobbies() {
        detailContent.innerHTML = `
            <p style="color:#3e2b1c; text-align:center; font-size:1rem; line-height:1.6;">
                🌿 Hiking &nbsp;|&nbsp; 📚 Reading &nbsp;|&nbsp; 🎨 Painting &nbsp;|&nbsp; 🎮 Gaming
            </p>
        `;
    }

    function showDetail(category) {
        if (detailVisible) return;
        detailTitle.textContent = category;
        // Render appropriate content
        switch(category) {
            case 'Experiences': renderExperiences(); break;
            case 'Tools': renderTools(); break;
            case 'Socials': renderSocials(); break;
            case 'Hobbies': renderHobbies(); break;
            default: detailContent.innerHTML = '';
        }
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

    // ---------- Pulse & glow ----------
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

    // ---------- Event binding ----------
    if (photoContainer) {
        photoContainer.addEventListener('click', toggleBoxes);
        photoContainer.addEventListener('touchstart', (e) => { e.preventDefault(); toggleBoxes(); }, { passive: false });
        photoContainer.setAttribute('tabindex', '0');
        photoContainer.setAttribute('role', 'button');
        photoContainer.setAttribute('aria-label', 'Touch to reveal options');
        photoContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleBoxes(); }
        });
    }

    cornerBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            e.stopPropagation();
            const category = this.getAttribute('data-category');
            if (category) {
                showDetail(category);
                pulseAndGlow();
            }
        });
        box.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.click();
        }, { passive: false });
    });

    if (closeDetailBtn) {
        closeDetailBtn.addEventListener('click', (e) => { e.stopPropagation(); hideDetail(); });
        closeDetailBtn.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); hideDetail(); }, { passive: false });
    }

    if (detailOverlay) {
        detailOverlay.addEventListener('click', function(e) {
            if (e.target === detailOverlay) hideDetail();
        });
    }

    console.log('✨ Ready! Tap the photo to reveal Experiences, Tools, Hobbies, and Socials.');
});