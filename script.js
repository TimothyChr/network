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

    const toolsData = {
        Excel: [
            {
                title: 'Pivot Table Analysis',
                description: 'Summarised sales data using pivot tables and conditional formatting.',
                chartPlaceholder: '[Excel chart]'
            },
            {
                title: 'Forecasting Model',
                description: 'Linear regression forecast for quarterly revenue.',
                chartPlaceholder: '[Excel forecast]'
            }
        ],
        Python: [
            {
                title: 'Cohort Retention',
                description: 'Monthly retention curves using pandas and matplotlib.',
                chartPlaceholder: '[Python cohort plot]'
            },
            {
                title: 'A/B Test Results',
                description: 'Statistical significance testing with scipy.',
                chartPlaceholder: '[Python A/B plot]'
            }
        ],
        SQL: [
            {
                title: 'Customer Segmentation',
                description: 'RFM analysis using window functions.',
                chartPlaceholder: '<img src="Funnel Analysis.png">'
            },
            {
                title: 'Funnel Analysis',
                description: 'Conversion funnel built with CTEs and aggregations.',
                chartPlaceholder: '[SQL funnel]'
            },
            {
                title: 'Simple Table',
                description: 'Basic aggregation and filtering examples.',
                chartPlaceholder: '[SQL table]'
            }
        ],
        Tableau: [
            {
                title: 'Sales Dashboard',
                description: 'Interactive dashboard with KPIs and drill-downs.',
                chartPlaceholder: '[Tableau viz]'
            },
            {
                title: 'Geospatial Map',
                description: 'Regional performance mapped with custom geocoding.',
                chartPlaceholder: '[Tableau map]'
            }
        ]
    };

    // Position boxes relative to photo container
    function positionBoxes() {
        const rect = photoContainer.getBoundingClientRect();
        const boxWidth = cornerBoxes[0].offsetWidth;
        const boxHeight = cornerBoxes[0].offsetHeight;
        const offset = 0.03;        // changed from 0.08 to 0.05 – brings boxes closer to centre

        cornerBoxes[0].style.left = (rect.left + rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[0].style.top  = (rect.top  + rect.height * offset - boxHeight / 2) + 'px';

        cornerBoxes[1].style.left = (rect.right - rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[1].style.top  = (rect.top   + rect.height * offset - boxHeight / 2) + 'px';

        cornerBoxes[2].style.left = (rect.right  - rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[2].style.top  = (rect.bottom - rect.height * offset - boxHeight / 2) + 'px';

        cornerBoxes[3].style.left = (rect.left   + rect.width * offset - boxWidth / 2) + 'px';
        cornerBoxes[3].style.top  = (rect.bottom - rect.height * offset - boxHeight / 2) + 'px';
    }

    window.addEventListener('resize', positionBoxes);
    window.addEventListener('scroll', positionBoxes);
    positionBoxes();

    // Visual feedback
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

    // Boxes toggle
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

    // Detail overlay
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
                        <a href="tel:+6281230021624" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">📞</div><span>Phone</span>
                        </a>
                        <a href="mailto:timotiuskris09@gmail.com" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">✉️</div><span>Email</span>
                        </a>
                        <a href="https://instagram.com/kris_tito09" class="social-item" target="_blank" rel="noopener">
                            <div class="social-icon">📷</div><span>Instagram</span>
                        </a>
                        <a href="https://linkedin.com/in/timotius-kris-p" class="social-item" target="_blank" rel="noopener">
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

    // EXPERIENCES: image + markers row
    function renderExperiences() {
        const activities = [
            { date: '2021, Jan-Nov', label: 'Joined Panitia <br> Persiapan PEMIRA' },
            { date: '2023, Jan', label: 'Internship at <br> Pertamina NRE' },
            { date: '2024, Aug', label: 'Graduated from <br> Nanotechnology Engineering' },
            { date: '2025, Aug', label: 'Worked at Wings <br> Surya Driyorejo' },
            { date: 'Ongoing', label: 'Finding suitable <br> job while upskills' }
        ];

        let markersHTML = '';
        activities.forEach(act => {
            markersHTML += `
                <div class="marker-item">
                    <div class="marker-dot"></div>
                    <div class="marker-label">${act.label}</div>
                    <div class="marker-date">${act.date}</div>
                </div>`;
        });

        detailContent.innerHTML = `
            <div class="timeline-image-container">
                <!-- Replace "timeline.png" with your own image -->
                <img src="timeline.png" alt="Timeline" class="timeline-image">
            </div>
            <div class="markers-row">
                ${markersHTML}
            </div>
        `;
    }

    // HOBBIES
    function renderHobbies() {
        const hobbies = [
            { icon: '🎸', name: 'Music', desc: 'Love playing my guitar while singing, like pop, jazz, indie. Reality Club is my favourite!' },
            { icon: '📚', name: 'Reading', desc: 'Reading news, research paper, and article help improve and update to current situation and technology advancement.' },
            { icon: '🎥', name: 'Film', desc: 'While I am bored, sometime I watch film or netflix. I really like psychological horror, drama, and sci-fi.' },
            { icon: '🎮', name: 'Gaming', desc: 'Open world RPGs and story-based indie game is one of my favourite timekiller. I like to do modding and streaming too!' }
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

    // Tools
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
        const analyses = toolsData[toolName] || [];

        let entriesHTML = '';
        analyses.forEach(entry => {
            entriesHTML += `
                <div class="chart-entry">
                    <div class="chart-placeholder">${entry.chartPlaceholder}</div>
                    <div class="chart-info">
                        <h3 class="chart-entry-title">${entry.title}</h3>
                        <p class="chart-entry-desc">${entry.description}</p>
                    </div>
                </div>`;
        });

        detailContent.innerHTML = `
            <button class="back-button" id="backToTools">← Back to all tools</button>
            <div class="chart-entries-list">
                ${entriesHTML}
            </div>
            <p style="margin-top:1rem; color:#888; font-size:0.8rem;">
                Scroll to see more analyses ▼
            </p>
        `;
        
        document.getElementById('backToTools').addEventListener('click', (e) => {
            e.stopPropagation();
            detailTitle.textContent = 'Tools';
            renderToolsSelection();
        });
    }

    // Event listeners
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