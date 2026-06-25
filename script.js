// ===========================
// script.js
// Dimmer, timeline, hobbies, tools
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
    const overlayBackdrop = document.getElementById('overlayBackdrop');
    const bgDimmer = document.getElementById('bgDimmer');
    const cornerBoxes = document.querySelectorAll('.corner-box');

    let boxesVisible = false;
    let detailVisible = false;

    // ---------- Dimmer control ----------
    function activateDimmer() {
        bgDimmer.classList.add('active');
    }
    function deactivateDimmer() {
        if (!detailVisible && !boxesVisible) {
            bgDimmer.classList.remove('active');
        }
    }

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
        activateDimmer();
    }
    function hideBoxes() {
        if (!boxesVisible) return;
        boxesLayer.classList.remove('visible');
        boxesVisible = false;
        deactivateDimmer();
    }

    // ---------- Detail overlay ----------
    function openDetail(category) {
        if (detailVisible) return;
        detailTitle.textContent = category;
        detailContent.innerHTML = '';

        switch (category) {
            case 'Experiences':
                renderExperiences();
                break;
            case 'Tools':
                renderToolsSelection();
                break;
            case 'Hobbies':
                renderHobbies();
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
        }

        detailOverlay.classList.add('visible');
        overlayBackdrop.classList.add('visible');
        detailVisible = true;
        activateDimmer();
        hideBoxes();
    }

    function closeDetail() {
        if (!detailVisible) return;
        detailOverlay.classList.remove('visible');
        overlayBackdrop.classList.remove('visible');
        detailVisible = false;
        deactivateDimmer();
        showBoxes();
    }

    // ---------- EXPERIENCES: 5-node timeline ----------
    function renderExperiences() {
        const activities = [
            { date: '2020, Jan', activity: 'Activity 1 – Started learning design fundamentals' },
            { date: '2020, Aug', activity: 'Activity 2 – Built first portfolio website' },
            { date: '2021, Jun', activity: 'Activity 3 – Joined creative agency as intern' },
            { date: '2022, Mar', activity: 'Activity 4 – Led first major client project' },
            { date: '2023, Dec', activity: 'Activity 5 – Launched independent studio' }
        ];

        let html = '<div class="timeline-wrapper">';
        activities.forEach((item, index) => {
            html += `
                <div class="timeline-node">
                    <div class="timeline-dot"></div>
                    <div class="timeline-info">
                        <div class="timeline-date">${item.date}</div>
                        <div class="timeline-activity">${item.activity}</div>
                    </div>
                </div>`;
            // Add line between nodes (not after last)
            if (index < activities.length - 1) {
                html += '<div class="timeline-line"></div>';
            }
        });
        html += '</div>';
        detailContent.innerHTML = html;
    }

    // ---------- HOBBIES: image placeholders + text ----------
    function renderHobbies() {
        const hobbies = [
            { icon: '🌿', name: 'Hiking', desc: 'Exploring mountain trails and national parks on weekends.' },
            { icon: '📚', name: 'Reading', desc: 'Fiction, philosophy, and design books are my escape.' },
            { icon: '🎨', name: 'Painting', desc: 'Watercolor and acrylic – expressing ideas visually.' },
            { icon: '🎮', name: 'Gaming', desc: 'Indie games and immersive RPGs in my free time.' }
        ];

        let html = '<div class="hobbies-grid">';
        hobbies.forEach(hobby => {
            html += `
                <div class="hobby-item">
                    <div class="hobby-img-placeholder">${hobby.icon}</div>
                    <div class="hobby-text">
                        <strong>${hobby.name}</strong><br>
                        ${hobby.desc}
                    </div>
                </div>`;
        });
        html += '</div>';
        detailContent.innerHTML = html;
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
                showToolDetail(btn.getAttribute('data-tool'));
            });
        });
    }

    function showToolDetail(toolName) {
        detailTitle.textContent = toolName;
        detailContent.innerHTML = `
            <button class="back-button" id="backToTools">← Back to all tools</button>
            <div class="tool-detail-container">
                <div class="tool-detail-chart">[${toolName} chart]</div>
                <div class="tool-detail-text">
                    <strong>${toolName}</strong> – Your skills, experience, and projects with this tool go here. 
                    Describe what you've achieved and how you use it in your workflow.
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
            if (!boxesVisible) pulseAndGlow();
        }
    });
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

    // Dimmer click also closes everything
    bgDimmer.addEventListener('click', () => {
        if (detailVisible) closeDetail();
        else if (boxesVisible) hideBoxes();
    });

    detailOverlay.addEventListener('click', (e) => e.stopPropagation());
    detailOverlay.addEventListener('touchstart', (e) => e.stopPropagation());

    // Keyboard
    photoContainer.setAttribute('tabindex', '0');
    photoContainer.setAttribute('role', 'button');
    photoContainer.setAttribute('aria-label', 'Touch to reveal options');
    photoContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            photoContainer.click();
        }
    });

    console.log('✨ Ready!');
});