// ===========================
// script.js
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.getElementById('photoContainer');
    const fixedDimmer = document.getElementById('fixedDimmer');
    const fixedBoxesContainer = document.getElementById('fixedBoxesContainer');
    const cornerBoxes = document.querySelectorAll('.corner-box');
    const spriteImg = document.getElementById('spriteImg');
    const photoImg = document.getElementById('photoImg');
    const introParagraph = document.getElementById('introParagraph');
    const detailOverlay = document.getElementById('detailOverlay');
    const detailTitle = document.getElementById('detailTitle');
    const detailContent = document.getElementById('detailContent');
    const closeDetailBtn = document.getElementById('closeDetail');
    const overlayBackdrop = document.getElementById('overlayBackdrop');

    let boxesVisible = false;
    let detailVisible = false;

    // ---------- Position boxes relative to photo container ----------
    function positionBoxes() {
        const rect = photoContainer.getBoundingClientRect();
        const boxWidth = cornerBoxes[0].offsetWidth;
        const boxHeight = cornerBoxes[0].offsetHeight;
        const offset = 0.08;

        // Top-left (Experiences)
        cornerBoxes[0].style.left = (rect.left + rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[0].style.top  = (rect.top  + rect.height * offset - boxHeight / 2) + 'px';

        // Top-right (Tools)
        cornerBoxes[1].style.left = (rect.right - rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[1].style.top  = (rect.top   + rect.height * offset - boxHeight / 2) + 'px';

        // Bottom-right (Hobbies)
        cornerBoxes[2].style.left = (rect.right  - rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[2].style.top  = (rect.bottom - rect.height * offset - boxHeight / 2) + 'px';

        // Bottom-left (Socials)
        cornerBoxes[3].style.left = (rect.left   + rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[3].style.top  = (rect.bottom - rect.height * offset - boxHeight / 2) + 'px';
    }

    window.addEventListener('resize', positionBoxes);
    window.addEventListener('scroll', positionBoxes);
    positionBoxes();

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
        positionBoxes();
        fixedDimmer.classList.add('active');
        fixedBoxesContainer.classList.add('active');
        boxesVisible = true;
    }

    function hideBoxes() {
        if (!boxesVisible) return;
        fixedDimmer.classList.remove('active');
        fixedBoxesContainer.classList.remove('active');
        boxesVisible = false;
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
        hideBoxes();
    }

    function closeDetail() {
        if (!detailVisible) return;
        detailOverlay.classList.remove('visible');
        overlayBackdrop.classList.remove('visible');
        detailVisible = false;
        showBoxes();
    }

    // ---------- EXPERIENCES: Fluid timeline image + markers ----------
    function renderExperiences() {
        // Replace "timeline.png" with your image.
        // Marker positions are set in CSS (see .activity-marker left/top %)
        const activities = [
            { date: '2020, Jan', label: 'Activity 1' },
            { date: '2020, Aug', label: 'Activity 2' },
            { date: '2021, Jun', label: 'Activity 3' },
            { date: '2022, Mar', label: 'Activity 4' },
            { date: '2023, Dec', label: 'Activity 5' }
        ];

        let markersHTML = '';
        activities.forEach(act => {
            markersHTML += `
                <div class="activity-marker">
                    <div class="marker-dot"></div>
                    <div class="marker-label">${act.label}</div>
                    <div class="marker-date">${act.date}</div>
                </div>`;
        });

        detailContent.innerHTML = `
            <div class="timeline-fluid-wrapper">
                <!-- IMPORTANT: replace "timeline.png" with your own image -->
                <img src="timeline.png" alt="Timeline" class="timeline-image">
                ${markersHTML}
            </div>
            <p style="margin-top:0.8rem; color:#5a4a3a; font-size:0.8rem;">
                Design your timeline image at <strong>1200 × 200 px</strong> for best results.
                Adjust marker left/top percentages in CSS.
            </p>
        `;
    }

    // ---------- HOBBIES ----------
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

    detailOverlay.addEventListener('click', (e) => e.stopPropagation());
    detailOverlay.addEventListener('touchstart', (e) => e.stopPropagation());

    fixedDimmer.addEventListener('click', () => {
        if (detailVisible) closeDetail();
        else if (boxesVisible) hideBoxes();
    });

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