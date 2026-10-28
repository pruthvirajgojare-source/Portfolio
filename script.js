/**
 * PRUTHVIRAJ GOJARE - GTA V PORTFOLIO CONTROLLER
 * Full Los Santos Immersion: Audio Engine, HUD, Radar, Wheel & Cheats
 */

(function () {
  'use strict';

  // =========================================================================
  // STATE MANAGEMENT
  // =========================================================================
  const state = {
    audioEnabled: false,
    wantedLevel: 2,
    activeCharIndex: 0,
    cashAmount: 2850000000,
    activeSection: 'hero',
    audioCtx: null
  };

  // Character Archetypes Data
  const characters = [
    {
      name: 'NEURAL ARCHITECT',
      code: 'ARCHETYPE 01 // CLASSIFIED',
      alias: '"The Deep Learning & LLM Specialist"',
      avatar: '🧠',
      special: 'ZERO-SHOT REASONING SURGE',
      quote: 'Why fine-tune blindly when you can architect low-rank adaptation swarms and orchestrate frontier LLMs with sub-50ms token generation?',
      stats: [
        { label: 'TRANSFORMERS & LLMs', val: '98%' },
        { label: 'PYTORCH & CUDA ACCELERATION', val: '95%' },
        { label: 'RAG & VECTOR DATABASES', val: '94%' },
        { label: 'DISTRIBUTED CLUSTER TRAINING', val: '91%' }
      ],
      tags: ['PyTorch', 'Hugging Face', 'Llama 3', 'LoRA / QLoRA', 'vLLM', 'DeepSpeed', 'LangChain']
    },
    {
      name: 'VISION HACKER',
      code: 'ARCHETYPE 02 // COVERT SENSORS',
      alias: '"Computer Vision & Real-Time Perception"',
      avatar: '👁️',
      special: 'SUB-10MS LATENCY LOCK',
      quote: 'If it moves in Los Santos, my distilled convolutional backbones and TensorRT acceleration track it in real-time at 120 FPS.',
      stats: [
        { label: 'OPENCV & COMPUTER VISION', val: '97%' },
        { label: 'YOLOv10 & REAL-TIME DETECTION', val: '96%' },
        { label: 'TENSORRT & EDGE EMBEDDED', val: '93%' },
        { label: 'DIFFUSION & GENERATIVE VISION', val: '90%' }
      ],
      tags: ['OpenCV', 'YOLOv10', 'TensorRT', 'CUDA C++', 'DeepStream', 'Stable Diffusion', 'ControlNet']
    },
    {
      name: 'AGENT COMMANDER',
      code: 'ARCHETYPE 03 // SWARM INTELLIGENCE',
      alias: '"Autonomous Agentic Systems & MLOps"',
      avatar: '🤖',
      special: 'AUTONOMOUS SELF-HEALING RECOVERY',
      quote: 'Orchestrating cyclic multi-agent graphs that plan, execute tool-calls, self-critique, and deploy code without human intervention.',
      stats: [
        { label: 'LANGGRAPH & MULTI-AGENT', val: '98%' },
        { label: 'KUBERNETES & CLOUD MLOPS', val: '94%' },
        { label: 'TRITON INFERENCE SERVER', val: '92%' },
        { label: 'VECTOR RETRIEVAL & MILVUS', val: '96%' }
      ],
      tags: ['LangGraph', 'Docker', 'Kubernetes', 'FastAPI', 'Milvus', 'MLflow', 'Triton Server', 'Ray']
    }
  ];

  // GTA V Tips for Loading Screen
  const loadingTips = [
    'Tip: Click the Wanted Stars in the HUD to alter your alert status and dispatch police choppers.',
    'Tip: Open the CHEATS menu or press "B" to test the WASTED screen easter egg.',
    'Tip: The iFruit smartphone allows direct mission contract transmissions via encrypted satellite link.',
    'Tip: Inspect the Ammu-Nation arsenal to view compute stats and deep learning firepower.',
    'Tip: The bottom-left GPS Radar tracks your current location across the Los Santos sections.'
  ];

  // =========================================================================
  // WEB AUDIO API SYNTHESIS ENGINE (ZERO EXTERNAL ASSETS REQUIRED)
  // =========================================================================
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        state.audioCtx = new AudioContextClass();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    state.audioEnabled = true;
    updateAudioIcon();
  }

  function updateAudioIcon() {
    const icon = document.getElementById('sound-icon');
    if (icon) {
      icon.textContent = state.audioEnabled ? '🔊' : '🔇';
    }
  }

  // GTA UI Hover Tick
  function playHoverTick() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, state.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, state.audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(state.audioCtx.currentTime + 0.04);
    } catch (e) { /* ignore audio errors */ }
  }

  // GTA UI Select Blip
  function playMenuSelect() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, state.audioCtx.currentTime);
      osc.frequency.setValueAtTime(1200, state.audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, state.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(state.audioCtx.currentTime + 0.12);
    } catch (e) { /* ignore audio errors */ }
  }

  // GTA Wanted Star Ding & Radio Chirp
  function playStarDing(level) {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'square';
      const baseFreq = 400 + (level * 180);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(now + 0.3);
    } catch (e) { /* ignore */ }
  }

  // Police Siren Dispatch (Triggered at 5 Stars)
  function playSirenSound() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(950, now + 0.6);
      osc.frequency.linearRampToValueAtTime(650, now + 1.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(now + 1.6);
    } catch (e) { /* ignore */ }
  }

  // GTA V "Mission Passed" Iconic Brass Fanfare
  function playMissionPassedFanfare() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const notes = [
        { f: 523.25, start: 0, dur: 0.15 },    // C5
        { f: 659.25, start: 0.15, dur: 0.15 }, // E5
        { f: 783.99, start: 0.3, dur: 0.2 },   // G5
        { f: 1046.50, start: 0.5, dur: 0.7 }  // C6
      ];

      notes.forEach(n => {
        const osc = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(n.f, now + n.start);
        gain.gain.setValueAtTime(0.12, now + n.start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);
        osc.connect(gain);
        gain.connect(state.audioCtx.destination);
        osc.start(now + n.start);
        osc.stop(now + n.start + n.dur);
      });
    } catch (e) { /* ignore */ }
  }

  // GTA V "WASTED" Sub-Bass Drop
  function playWastedAudio() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 1.8);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(now + 2.0);
    } catch (e) { /* ignore */ }
  }

  // Cash Register Coin Chime
  function playCashChime() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.setValueAtTime(2400, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(now + 0.25);
    } catch (e) { /* ignore */ }
  }

  // Phone Dial / Message Swoosh
  function playPhoneSwoosh() {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(state.audioCtx.destination);
      osc.start();
      osc.stop(now + 0.25);
    } catch (e) { /* ignore */ }
  }


  // =========================================================================
  // LOADING SCREEN & TRANSITIONS
  // =========================================================================
  function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const skipBtn = document.getElementById('skip-intro-btn');
    const tipEl = document.getElementById('loading-tip');
    const dateEl = document.getElementById('loading-date');

    // Set real-time date
    if (dateEl) {
      const d = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      dateEl.textContent = `LOS SANTOS, CA // ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    // Rotate tips
    let tipIdx = 0;
    setInterval(() => {
      if (tipEl) {
        tipIdx = (tipIdx + 1) % loadingTips.length;
        tipEl.textContent = loadingTips[tipIdx];
      }
    }, 4500);

    function enterLosSantos() {
      initAudio();
      playMenuSelect();
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        document.body.classList.remove('loading-active');
        setTimeout(() => {
          loadingScreen.remove();
        }, 800);
      }
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', enterLosSantos);
    }

    // Auto-enter if user doesn't click after 4.5 seconds
    setTimeout(() => {
      if (document.body.classList.contains('loading-active')) {
        enterLosSantos();
      }
    }, 4500);
  }


  // =========================================================================
  // REAL-TIME GTA CLOCK (LOS SANTOS TIME)
  // =========================================================================
  function initClock() {
    const hudClock = document.getElementById('hud-clock');
    const phoneClock = document.getElementById('phone-clock');

    function update() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const formatted = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

      if (hudClock) hudClock.textContent = formatted;
      if (phoneClock) phoneClock.textContent = formatted;
    }

    update();
    setInterval(update, 1000);
  }


  // =========================================================================
  // WANTED LEVEL CONTROLLER (INTERACTIVE 5 STARS)
  // =========================================================================
  function initWantedSystem() {
    const starsContainer = document.getElementById('wanted-stars');
    const wrapper = document.getElementById('wanted-wrapper');
    const stars = starsContainer ? starsContainer.querySelectorAll('.star') : [];

    function renderStars(level) {
      state.wantedLevel = level;
      stars.forEach((star, idx) => {
        const starNum = idx + 1;
        star.classList.remove('active', 'blinking');
        if (starNum <= level) {
          star.classList.add('active');
          if (level >= 4) {
            star.classList.add('blinking');
          }
        }
      });

      // Siren Mode trigger at 5 stars
      if (level === 5) {
        document.body.classList.add('siren-mode');
        playSirenSound();
      } else {
        document.body.classList.remove('siren-mode');
      }
    }

    stars.forEach(star => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        initAudio();
        const clickedVal = parseInt(star.getAttribute('data-star'), 10);
        const newLevel = (state.wantedLevel === clickedVal) ? Math.max(0, clickedVal - 1) : clickedVal;
        renderStars(newLevel);
        playStarDing(newLevel);
      });
    });

    if (wrapper) {
      wrapper.addEventListener('click', () => {
        initAudio();
        const next = (state.wantedLevel + 1) % 6;
        renderStars(next);
        playStarDing(next);
      });
    }

    // Initialize default stars
    renderStars(state.wantedLevel);
  }


  // =========================================================================
  // CHARACTER SPECIALIZATIONS SELECTOR (WHEEL & TABS)
  // =========================================================================
  function initCharacterSelector() {
    const wheelSegments = document.querySelectorAll('.wheel-segment');
    const profileCard = document.getElementById('char-profile-card');
    const charName = document.getElementById('char-name');
    const charCode = document.getElementById('char-code');
    const charAlias = document.getElementById('char-alias');
    const charSpecial = document.getElementById('char-special');
    const charQuote = document.getElementById('char-quote');
    const charAvatar = document.getElementById('char-avatar-badge');
    const charTags = document.getElementById('char-tags');

    function updateCharacter(index) {
      state.activeCharIndex = index;
      const data = characters[index];
      if (!data) return;

      playMenuSelect();

      // Update Active Segment Button
      wheelSegments.forEach((seg, i) => {
        seg.classList.toggle('active', i === index);
      });

      // Fade-out profile card slightly for smooth transition
      if (profileCard) {
        profileCard.style.opacity = '0.4';
        profileCard.style.transform = 'translateY(6px)';

        setTimeout(() => {
          if (charName) charName.textContent = data.name;
          if (charCode) charCode.textContent = data.code;
          if (charAlias) charAlias.textContent = data.alias;
          if (charSpecial) charSpecial.textContent = data.special;
          if (charQuote) charQuote.textContent = data.quote;
          if (charAvatar) charAvatar.textContent = data.avatar;

          // Update Progress Bars
          data.stats.forEach((st, idx) => {
            const fill = document.getElementById(`bar-fill-${idx + 1}`);
            const val = document.getElementById(`stat-val-${idx + 1}`);
            if (fill) fill.style.width = st.val;
            if (val) val.textContent = st.val;
          });

          // Update Tag Pills
          if (charTags) {
            charTags.innerHTML = data.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
          }

          profileCard.style.opacity = '1';
          profileCard.style.transform = 'translateY(0)';
        }, 150);
      }
    }

    wheelSegments.forEach((seg, idx) => {
      seg.addEventListener('click', () => {
        initAudio();
        updateCharacter(idx);
      });
      seg.addEventListener('mouseenter', playHoverTick);
    });
  }


  // =========================================================================
  // AMMU-NATION WEAPONS FILTER TABS
  // =========================================================================
  function initArsenalTabs() {
    const tabBtns = document.querySelectorAll('.arsenal-tab-btn');
    const weaponCards = document.querySelectorAll('.weapon-card');

    tabBtns.forEach(btn => {
      btn.addEventListener('mouseenter', playHoverTick);
      btn.addEventListener('click', () => {
        initAudio();
        playMenuSelect();

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-cat');
        weaponCards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          if (filter === 'all' || cardCat === filter) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }


  // =========================================================================
  // MISSIONS "MISSION PASSED" SOUND & BANNER
  // =========================================================================
  function initMissionButtons() {
    const missionBtns = document.querySelectorAll('.play-sound-btn');
    const banner = document.getElementById('mission-passed-banner');

    missionBtns.forEach(btn => {
      btn.addEventListener('mouseenter', playHoverTick);
      btn.addEventListener('click', () => {
        initAudio();
        playMissionPassedFanfare();
        playCashChime();
        incrementCash(350000);

        if (banner) {
          banner.classList.remove('hidden');
          setTimeout(() => {
            banner.classList.add('hidden');
          }, 3200);
        }
      });
    });
  }


  // =========================================================================
  // iFRUIT SMARTPHONE CONTROLLER
  // =========================================================================
  function initIFruitPhone() {
    const tabBtns = document.querySelectorAll('.phone-tab-btn');
    const tabPanes = document.querySelectorAll('.phone-tab-pane');
    const form = document.getElementById('contact-form');
    const statusToast = document.getElementById('msg-status');
    const emergencyBtn = document.getElementById('app-easter-egg');

    // Phone Navigation Tabs
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        initAudio();
        playMenuSelect();
        const targetTab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanes.forEach(pane => {
          pane.classList.remove('active');
          if (pane.id === `tab-${targetTab}`) {
            pane.classList.add('active');
          }
        });
      });
    });

    // Form Submit
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        initAudio();
        playPhoneSwoosh();

        const submitBtn = document.getElementById('phone-submit-btn');
        if (submitBtn) {
          submitBtn.innerHTML = '<span>TRANSMITTING... 🛰️</span>';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          if (statusToast) {
            statusToast.textContent = 'PAGER TRANSMITTED TO PRUTHVIRAJ! RESPONSE WITHIN <24H';
            statusToast.classList.add('success');
          }
          if (submitBtn) {
            submitBtn.innerHTML = '<span>PAGER TRANSMITTED ✓</span>';
          }
          playCashChime();
          incrementCash(150000);
          form.reset();
        }, 1000);
      });
    }

    // 911 Emergency App
    if (emergencyBtn) {
      emergencyBtn.addEventListener('click', () => {
        initAudio();
        executeCheat('FIVESTARS');
      });
    }
  }


  // =========================================================================
  // MINI-MAP RADAR SCROLL SPY
  // =========================================================================
  function initRadarScrollSpy() {
    const sections = ['hero', 'specializations', 'missions', 'arsenal', 'heist-board', 'contact'];
    const blipMap = {
      'hero': '.blip-hero',
      'specializations': '.blip-spec',
      'missions': '.blip-missions',
      'arsenal': '.blip-arsenal',
      'heist-board': '.blip-safehouse',
      'contact': '.blip-contact'
    };
    const captionMap = {
      'hero': 'SAN ANDREAS // VINEWOOD',
      'specializations': 'SAN ANDREAS // DOWNTOWN',
      'missions': 'SAN ANDREAS // MAZE BANK',
      'arsenal': 'SAN ANDREAS // AMMU-NATION',
      'heist-board': 'SAN ANDREAS // LESTER SAFEHOUSE',
      'contact': 'SAN ANDREAS // LOS SANTOS INT'
    };

    const captionEl = document.getElementById('radar-caption');
    const playerArrow = document.getElementById('radar-player');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 200;
      let currentSection = 'hero';

      sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el && el.offsetTop <= scrollPos) {
          currentSection = secId;
        }
      });

      if (currentSection !== state.activeSection) {
        state.activeSection = currentSection;

        // Update Radar Blips
        document.querySelectorAll('.radar-blip').forEach(b => b.classList.remove('active'));
        const activeBlip = document.querySelector(blipMap[currentSection]);
        if (activeBlip) activeBlip.classList.add('active');

        // Update Radar Caption
        if (captionEl && captionMap[currentSection]) {
          captionEl.textContent = captionMap[currentSection];
        }

        // Rotate Player Arrow to simulate GPS heading
        if (playerArrow) {
          const headings = { hero: 0, specializations: 45, missions: 120, arsenal: -90, 'heist-board': 180, contact: 60 };
          playerArrow.style.transform = `translate(-50%, -50%) rotate(${headings[currentSection] || 0}deg)`;
        }

        // Update Nav Menu Links
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('data-section') === currentSection);
        });
      }
    }, { passive: true });
  }


  // =========================================================================
  // CASH INCREMENT ANIMATION
  // =========================================================================
  function incrementCash(amount) {
    const cashEl = document.getElementById('cash-counter');
    if (!cashEl) return;

    state.cashAmount += amount;
    const formatted = state.cashAmount.toLocaleString();
    cashEl.textContent = formatted;

    cashEl.style.transform = 'scale(1.2)';
    cashEl.style.color = '#fff';
    setTimeout(() => {
      cashEl.style.transform = 'scale(1)';
      cashEl.style.color = '';
    }, 300);
  }


  // =========================================================================
  // CHEAT CODES & WASTED SCREEN SYSTEM
  // =========================================================================
  function initCheats() {
    const cheatsBtn = document.getElementById('cheats-btn');
    const cheatsModal = document.getElementById('cheats-modal');
    const cheatsClose = document.getElementById('cheats-close');
    const cheatCards = document.querySelectorAll('.cheat-card');
    const wastedOverlay = document.getElementById('wasted-overlay');
    const wastedRespawnBtn = document.getElementById('wasted-respawn-btn');

    function openModal() {
      initAudio();
      playMenuSelect();
      if (cheatsModal) cheatsModal.classList.remove('hidden');
    }

    function closeModal() {
      playMenuSelect();
      if (cheatsModal) cheatsModal.classList.add('hidden');
    }

    if (cheatsBtn) cheatsBtn.addEventListener('click', openModal);
    if (cheatsClose) cheatsClose.addEventListener('click', closeModal);
    if (cheatsModal) {
      cheatsModal.addEventListener('click', (e) => {
        if (e.target === cheatsModal) closeModal();
      });
    }

    cheatCards.forEach(card => {
      card.addEventListener('mouseenter', playHoverTick);
      card.addEventListener('click', () => {
        initAudio();
        const code = card.getAttribute('data-cheat');
        closeModal();
        executeCheat(code);
      });
    });

    // Respawn button on WASTED screen
    if (wastedRespawnBtn) {
      wastedRespawnBtn.addEventListener('click', () => {
        if (wastedOverlay) wastedOverlay.classList.add('hidden');
        playMenuSelect();
      });
    }

    // Keyboard Cheats Listener
    let typedBuffer = '';
    window.addEventListener('keydown', (e) => {
      // Ignore if typing in form inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      typedBuffer += e.key.toUpperCase();
      if (typedBuffer.length > 15) {
        typedBuffer = typedBuffer.substring(typedBuffer.length - 15);
      }

      ['FIVESTARS', 'LAWYERUP', 'BIGBANG', 'MAKEITRAIN', 'GODMODE', 'RESPECT'].forEach(code => {
        if (typedBuffer.endsWith(code)) {
          initAudio();
          executeCheat(code);
          typedBuffer = '';
        }
      });
    });
  }

  function executeCheat(code) {
    const banner = document.getElementById('mission-passed-banner');
    const wastedOverlay = document.getElementById('wasted-overlay');

    switch (code) {
      case 'FIVESTARS':
        state.wantedLevel = 5;
        document.querySelectorAll('.star').forEach(s => {
          s.classList.add('active', 'blinking');
        });
        document.body.classList.add('siren-mode');
        playStarDing(5);
        playSirenSound();
        break;

      case 'LAWYERUP':
        state.wantedLevel = 0;
        document.querySelectorAll('.star').forEach(s => {
          s.classList.remove('active', 'blinking');
        });
        document.body.classList.remove('siren-mode');
        playStarDing(1);
        break;

      case 'BIGBANG':
        if (wastedOverlay) {
          wastedOverlay.classList.remove('hidden');
          playWastedAudio();
          setTimeout(() => {
            wastedOverlay.classList.add('hidden');
          }, 3600);
        }
        break;

      case 'MAKEITRAIN':
        playCashChime();
        incrementCash(100000000);
        createMoneyRain();
        break;

      case 'RESPECT':
      case 'GODMODE':
        playMissionPassedFanfare();
        playCashChime();
        incrementCash(5000000);
        if (banner) {
          banner.classList.remove('hidden');
          setTimeout(() => {
            banner.classList.add('hidden');
          }, 3000);
        }
        break;
    }
  }

  // Cash Raining Animation Effect
  function createMoneyRain() {
    const rainContainer = document.createElement('div');
    rainContainer.style.position = 'fixed';
    rainContainer.style.inset = '0';
    rainContainer.style.pointerEvents = 'none';
    rainContainer.style.zIndex = '14000';
    rainContainer.style.overflow = 'hidden';
    document.body.appendChild(rainContainer);

    for (let i = 0; i < 40; i++) {
      const bill = document.createElement('div');
      bill.textContent = '💵';
      bill.style.position = 'absolute';
      bill.style.fontSize = `${Math.random() * 20 + 20}px`;
      bill.style.left = `${Math.random() * 100}vw`;
      bill.style.top = '-50px';
      bill.style.opacity = '0.9';
      bill.style.transform = `rotate(${Math.random() * 360}deg)`;
      bill.style.transition = `top ${Math.random() * 2 + 1.5}s linear, transform 2s ease`;
      rainContainer.appendChild(bill);

      setTimeout(() => {
        bill.style.top = '105vh';
        bill.style.transform = `rotate(${Math.random() * 720}deg)`;
      }, 50);
    }

    setTimeout(() => {
      rainContainer.remove();
    }, 4000);
  }


  // =========================================================================
  // SOUND TOGGLE & AUDIO TOAST
  // =========================================================================
  function initAudioControls() {
    const soundBtn = document.getElementById('sound-btn');
    const toast = document.getElementById('audio-toast');
    const toastClose = document.getElementById('toast-close-btn');

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        initAudio();
        state.audioEnabled = !state.audioEnabled;
        updateAudioIcon();
        if (state.audioEnabled) playMenuSelect();
      });
    }

    if (toastClose && toast) {
      toastClose.addEventListener('click', () => {
        toast.classList.add('dismissed');
      });
    }

    // Dismiss toast on any first user interaction
    const dismissFirstClick = () => {
      initAudio();
      if (toast) toast.classList.add('dismissed');
      window.removeEventListener('click', dismissFirstClick);
    };
    window.addEventListener('click', dismissFirstClick);
  }


  // =========================================================================
  // BOOTSTRAP ALL SYSTEMS ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initClock();
    initWantedSystem();
    initCharacterSelector();
    initArsenalTabs();
    initMissionButtons();
    initIFruitPhone();
    initRadarScrollSpy();
    initCheats();
    initAudioControls();

    // Attach hover sounds to all links & buttons
    document.querySelectorAll('a, button, .gta-btn, .nav-link').forEach(el => {
      el.addEventListener('mouseenter', playHoverTick);
    });
  });

})();
