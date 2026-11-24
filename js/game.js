/**
 * NIKA: A LITTLE ADVENTURE THROUGH US
 * Core Game Engine — Irfan Chase, Online Chat, LHJ Leap, bored Race, & DD Badge Celebration
 */

// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================
const VIRTUAL_WIDTH = 480;
const VIRTUAL_HEIGHT = 270;
const GRAVITY = 0.28;
const MAX_FALL_SPEED = 7.0;
const PLAYER_SPEED = 2.3;
const JUMP_FORCE = -6.2;
const FRICTION = 0.82;

// ==========================================
// AUDIO SYNTHESIZER
// ==========================================
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playJump() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playJumpPad() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.26);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.26);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch (e) {}
  }

  playCollect() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.32);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.32);
    } catch (e) {}
  }

  playDialogueBlip(pitch = 380) {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playMemoryFanfare() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.09 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.09 + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.3);
      });
    } catch (e) {}
  }

  playPortal() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(640, this.ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.38);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch (e) {}
  }

  playWhack() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playExplosion() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playShoot() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playDamage() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch (e) {}
  }

  playBuzzer() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }
}

const sound = new SoundSynth();
// ==========================================
// CHAPTER MUSIC MANAGER
// ==========================================
// Edit this map to change tracks. Key = chapter id from chapters.js.
// volume is 0 to 1. Remove or leave out a chapter to give it no music.
const MUSIC_TRACKS = {
  intro:       { src: 'audio/prologue.mp3', volume: 0.30 },
  ch1:         { src: 'audio/ch1.mp3',      volume: 0.30 },
  ch2:         { src: 'audio/ch2.mp3',      volume: 0.30 },
  ch3:         { src: 'audio/ch3.mp3',      volume: 0.30 },
  ch4:         { src: 'audio/ch4.mp3',      volume: 0.30 },
  ch5_boss:    { src: 'audio/boss.mp3',     volume: 0.30 },
  ch6:         { src: 'audio/ch6.mp3',      volume: 0.30 },
  final_scene: { src: 'audio/birthday.mp3', volume: 0.35 }
};
const MUSIC_FADE_MS = 1200;

const music = {
  audio: null,       // currently playing Audio element
  track: null,       // currently wanted track entry
  unlocked: false,   // true after first user tap/keypress (autoplay rule)
  muted: false,

  // Called by loadChapter() every time a chapter loads
  setChapter(chapterId) {
    const next = MUSIC_TRACKS[chapterId] || null;
    if (next === this.track) return;       // same track: keep playing, no restart
    this.track = next;
    if (this.unlocked) this._switch();
  },

  // Called on the first user interaction
  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    this._switch();
  },

  setMuted(m) {
    this.muted = m;
    if (!this.audio) return;
    if (m) this.audio.pause();
    else this.audio.play().catch(() => {});
  },

  _switch() {
    const old = this.audio;
    this.audio = null;
    if (old) this._fade(old, 0, () => { old.pause(); old.src = ''; });

    if (!this.track) return;
    const a = new Audio(this.track.src);
    a.loop = true;
    a.volume = 0;
    this.audio = a;
    if (!this.muted) a.play().catch(() => {});
    this._fade(a, this.track.volume);
  },

  _fade(a, target, done) {
    clearInterval(a._fadeTimer);
    const stepMs = 50;
    const delta = (target - a.volume) / (MUSIC_FADE_MS / stepMs);
    a._fadeTimer = setInterval(() => {
      const v = a.volume + delta;
      if ((delta >= 0 && v >= target) || (delta < 0 && v <= target)) {
        a.volume = Math.max(0, Math.min(1, target));
        clearInterval(a._fadeTimer);
        if (done) done();
      } else {
        a.volume = Math.max(0, Math.min(1, v));
      }
    }, stepMs);
  }
};

// Browsers block autoplay, so start on the first interaction
['pointerdown', 'keydown', 'touchstart'].forEach(evt =>
  window.addEventListener(evt, () => music.unlock(), { once: true })
);

// ==========================================
// DOM ELEMENTS
// ==========================================
const gameContainer = document.getElementById('game-container');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const rotateWarning = document.getElementById('rotate-device-screen');
const interactionPrompt = document.getElementById('interaction-prompt');
const promptText = document.getElementById('prompt-text');
const dialogueBox = document.getElementById('dialogue-box');
const dialogueSpeaker = document.getElementById('dialogue-speaker');
const dialogueText = document.getElementById('dialogue-text');
const btnInteract = document.getElementById('btn-interact');
const btnAction = document.getElementById('btn-action');
const btnAudio = document.getElementById('btn-audio');
const btnJournal = document.getElementById('btn-journal');
const journalCounter = document.getElementById('journal-counter');
const hudChapterBadge = document.getElementById('hud-chapter-badge');
const heart1 = document.getElementById('heart-1');
const heart2 = document.getElementById('heart-2');
const heart3 = document.getElementById('heart-3');
const trapToast = document.getElementById('trap-toast');
const raceBanner = document.getElementById('race-banner');
const raceBannerText = document.getElementById('race-banner-text');
const memoryToast = document.getElementById('memory-toast');
const toastTitle = document.getElementById('toast-title');
const toastDesc = document.getElementById('toast-desc');
const chapterBanner = document.getElementById('chapter-banner');
const chapterNum = document.getElementById('chapter-num');
const chapterTitle = document.getElementById('chapter-title');
const chapterSubtitle = document.getElementById('chapter-subtitle');
const journalModal = document.getElementById('journal-modal');
const journalList = document.getElementById('journal-list');
const btnCloseJournal = document.getElementById('btn-close-journal');
const letterModal = document.getElementById('letter-modal');
const letterSalutation = document.getElementById('letter-salutation');
const letterSubtitle = document.getElementById('letter-subtitle');
const letterBody = document.getElementById('letter-body');
const letterClosing = document.getElementById('letter-closing');
const letterSignature = document.getElementById('letter-signature');
const btnCloseLetter = document.getElementById('btn-close-letter');

// Online Chat Overlay Elements
const chatOverlay = document.getElementById('chat-overlay');
const chatMessagesList = document.getElementById('chat-messages-list');
const chatTypingIndicator = document.getElementById('chat-typing-indicator');
const btnChatNext = document.getElementById('btn-chat-next');
const btnCloseChat = document.getElementById('btn-close-chat');

// Death Defier Celebration Modal
const ddCelebrationModal = document.getElementById('dd-celebration-modal');
const btnCloseDD = document.getElementById('btn-close-dd');

// Input tracking
const keys = {
  left: false,
  right: false,
  jump: false,
  interact: false,
  action: false,
  jumpPressedThisFrame: false,
  interactPressedThisFrame: false,
  actionPressedThisFrame: false
};

// Camera
const camera = {
  x: 0,
  y: 0,
  targetX: 0,
  targetY: 0
};

// Player object
const player = {
  x: 50,
  y: 200,
  w: 14,
  h: 22,
  vx: 0,
  vy: 0,
  onGround: false,
  facing: 1,
  state: 'idle',
  animFrame: 0,
  animTimer: 0,
  blinkTimer: 0,
  checkpoint: { x: 50, y: 200 },
  activeTarget: null,
  health: 3,
  maxHealth: 3,
  invincibilityTimer: 0,
  hasStick: false,
  isSwingingStick: false,
  swingTimer: 0,
  unlockedMemories: new Map()
};

const projectiles = [];
const bossProjectiles = [];
const hitSparks = [];

// Load memories from storage
try {
  const saved = localStorage.getItem('nika_adventures_memories');
  if (saved) {
    const list = JSON.parse(saved);
    list.forEach(item => player.unlockedMemories.set(item.id, item));
    journalCounter.textContent = player.unlockedMemories.size;
  }
} catch (e) {}

let currentChapterIndex = 0;
let currentChapter = null;

// Dialogue engine
let activeDialogue = null;
let dialogueStep = 0;
let typewriterText = '';
let typewriterIndex = 0;
let isTyping = false;
let typewriterTimer = null;
let activeDialogueCallback = null;

// Online Chat State
let activeChatConfig = null;
let activeChatMessageIndex = 0;

// ==========================================
// HEALTH & HUD MANAGEMENT
// ==========================================
function updateHealthUI() {
  heart1.className = player.health >= 1 ? 'heart' : 'heart heart-lost';
  heart2.className = player.health >= 2 ? 'heart' : 'heart heart-lost';
  heart3.className = player.health >= 3 ? 'heart' : 'heart heart-lost';
}

// Boss arena only: bosses back to full strength, Nika back at the chapter start.
function resetBossBattle() {
  currentChapter.bosses = JSON.parse(JSON.stringify(CHAPTERS[currentChapterIndex].bosses));
  currentChapter.bosses.forEach((b, idx) => {
    b.shootTimer = -idx * 50; // same staggered start as a fresh fight
  });
  projectiles.length = 0;
  bossProjectiles.length = 0;
  hitSparks.length = 0;

  player.x = currentChapter.spawn.x;
  player.y = currentChapter.spawn.y;
  player.checkpoint = { x: currentChapter.spawn.x, y: currentChapter.spawn.y };
  player.vx = 0;
  player.vy = 0;
  player.health = player.maxHealth;
  updateHealthUI();
}

function damagePlayer(amount = 1, source = null) {
  if (player.invincibilityTimer > 0) return;
  player.health = Math.max(0, player.health - amount);
  player.invincibilityTimer = 75;
  player.vy = -3.5;
  player.vx = -player.facing * 3;
  updateHealthUI();
  sound.playDamage();

  gameContainer.classList.add('screen-shake');
  setTimeout(() => gameContainer.classList.remove('screen-shake'), 300);

  if (player.health <= 0) {
    setTimeout(() => {
      player.x = player.checkpoint.x;
      player.y = player.checkpoint.y;
      player.vx = 0;
      player.vy = 0;
      player.health = player.maxHealth;
      updateHealthUI();

      // Reset the boss fight
      if (currentChapter && currentChapter.isBossChapter && currentChapter.bosses) {
        currentChapter.bosses.forEach((b, idx) => {
          b.hp = b.maxHp;
          b.hitFlash = 0;
          b.shootTimer = -idx * 10; // keep the staggered start
        });
        currentChapter.victoryAchieved = false;
        bossProjectiles.length = 0;
        projectiles.length = 0;
      }
    }, 400);
  }
}

// ==========================================
// CHAPTER MANAGEMENT
// ==========================================
function loadChapter(index, keepPosition = false) {
  if (index < 0 || index >= CHAPTERS.length) return;
  currentChapterIndex = index;
  currentChapter = JSON.parse(JSON.stringify(CHAPTERS[index]));
  music.setChapter(currentChapter.id); 

  player.health = player.maxHealth;
  player.invincibilityTimer = 0;
  updateHealthUI();

  projectiles.length = 0;
  bossProjectiles.length = 0;
  hitSparks.length = 0;

  for (const c of currentChapter.collectibles) {
    if (player.unlockedMemories.has(c.id)) {
      c.collected = true;
    }
  }

  if (!keepPosition) {
    player.x = currentChapter.spawn.x;
    player.y = currentChapter.spawn.y;
    player.checkpoint = { x: currentChapter.spawn.x, y: currentChapter.spawn.y };
    player.vx = 0;
    player.vy = 0;
  }

  hudChapterBadge.textContent = currentChapter.number;

  if (currentChapter.isBossChapter) {
    btnAction.textContent = '✨';
    btnAction.classList.remove('hidden');
    currentChapter.bossShootingActive = false;

    // Auto-trigger coach dialogue with Gautam before the fight begins
    const coach = currentChapter.npcs ? currentChapter.npcs.find(n => n.id === 'gautam_boss_coach') : null;
    if (coach && coach.dialogue) {
      setTimeout(() => {
        startDialogue(coach.dialogue, coach.memoryOnComplete, () => {
          currentChapter.bossShootingActive = true;
          if (currentChapter.bosses) {
            currentChapter.bosses.forEach((b, idx) => {
              b.shootTimer = -idx * 50; // Stagger initial shots
            });
          }
        });
      }, 500);
    }
  } else if (player.hasStick) {
    btnAction.textContent = '⚔️';
    btnAction.classList.remove('hidden');
  } else {
    btnAction.classList.add('hidden');
  }

  chapterNum.textContent = currentChapter.number;
  chapterTitle.textContent = currentChapter.title;
  chapterSubtitle.textContent = currentChapter.subtitle;
  chapterBanner.style.opacity = '1';
  chapterBanner.classList.remove('hidden');

  setTimeout(() => {
    chapterBanner.style.opacity = '0';
    setTimeout(() => {
      chapterBanner.classList.add('hidden');
      chapterBanner.style.opacity = '1';
    }, 600);
  }, 2300);

  try {
    localStorage.setItem('nika_current_chapter', index);
  } catch (e) {}
}

// ==========================================
// RESIZING & RESPONSIVE CANVAS
// ==========================================
function resizeCanvas() {
  document.documentElement.style.setProperty('--app-h', window.innerHeight + 'px');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const isPortrait = windowHeight > windowWidth && windowWidth < 768;
  if (isPortrait) {
    rotateWarning.classList.remove('hidden');
  } else {
    rotateWarning.classList.add('hidden');
  }

  const scale = Math.min(windowWidth / VIRTUAL_WIDTH, windowHeight / VIRTUAL_HEIGHT);
  const displayWidth = Math.floor(VIRTUAL_WIDTH * scale);
  const displayHeight = Math.floor(VIRTUAL_HEIGHT * scale);

  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 200));
resizeCanvas();
// Go fullscreen on first tap (touch devices only)
function enterFullscreen() {
  if (!window.matchMedia('(pointer: coarse)').matches) return;
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (!req || document.fullscreenElement) return;
  Promise.resolve(req.call(el)).then(() => {
    document.removeEventListener('pointerdown', enterFullscreen);
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(() => {});
    }
  }).catch(() => {});
}
document.addEventListener('pointerdown', enterFullscreen);

btnAudio.addEventListener('click', () => {
  sound.init();
  sound.muted = !sound.muted;
  music.setMuted(sound.muted);
  btnAudio.textContent = sound.muted ? '🔇' : '🔊';
});

window.addEventListener('pointerdown', () => sound.init(), { once: true });
window.addEventListener('keydown', () => sound.init(), { once: true });

// ==========================================
// INPUT HANDLING
// ==========================================
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    keys.jump = true;
    keys.jumpPressedThisFrame = true;
  }
  if (e.code === 'KeyE') {
    keys.interact = true;
    keys.interactPressedThisFrame = true;
    handleInteraction();
  }
  if (e.code === 'KeyF' || e.code === 'KeyJ') {
    keys.action = true;
    keys.actionPressedThisFrame = true;
    handleAction();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') keys.jump = false;
  if (e.code === 'KeyE') keys.interact = false;
  if (e.code === 'KeyF' || e.code === 'KeyJ') keys.action = false;
});

function bindTouchButton(elementId, onStart, onEnd) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const handleStart = (e) => {
    e.preventDefault();
    sound.init();
    onStart();
  };
  const handleEnd = (e) => {
    e.preventDefault();
    onEnd();
  };

  el.addEventListener('touchstart', handleStart, { passive: false });
  el.addEventListener('touchend', handleEnd, { passive: false });
  el.addEventListener('touchcancel', handleEnd, { passive: false });
  el.addEventListener('mousedown', handleStart);
  el.addEventListener('mouseup', handleEnd);
  el.addEventListener('mouseleave', handleEnd);
}

bindTouchButton('btn-left', () => { keys.left = true; }, () => { keys.left = false; });
bindTouchButton('btn-right', () => { keys.right = true; }, () => { keys.right = false; });
bindTouchButton('btn-jump', () => {
  keys.jump = true;
  keys.jumpPressedThisFrame = true;
}, () => {
  keys.jump = false;
});
bindTouchButton('btn-interact', () => {
  keys.interact = true;
  keys.interactPressedThisFrame = true;
  handleInteraction();
}, () => {
  keys.interact = false;
});
bindTouchButton('btn-action', () => {
  keys.action = true;
  keys.actionPressedThisFrame = true;
  handleAction();
}, () => {
  keys.action = false;
});

dialogueBox.addEventListener('click', () => advanceDialogue());

// ==========================================
// ACTION / COMBAT
// ==========================================
function handleAction() {
  if (currentChapter && currentChapter.isBossChapter) {
    shootPlayerProjectile();
    return;
  }

  if (player.hasStick) {
    swingStick();
  }
}

function shootPlayerProjectile() {
  sound.playShoot();
  projectiles.push({
    x: player.x + (player.facing === 1 ? player.w + 2 : -8),
    y: player.y + player.h / 2 - 4,
    vx: player.facing * 5.5,
    w: 8,
    h: 8,
    type: 'heart'
  });
}

function swingStick() {
  if (player.isSwingingStick) return;
  player.isSwingingStick = true;
  player.swingTimer = 18;
  sound.playWhack();

  if (currentChapter && currentChapter.npcs) {
    for (const npc of currentChapter.npcs) {
      if (npc.isBoredBoss && !npc.defeated) {
        const dist = Math.hypot(
          (player.x + player.w / 2) - (npc.x + npc.w / 2),
          (player.y + player.h / 2) - (npc.y + npc.h / 2)
        );
        if (dist < 48) {
          hitBoredBoss(npc);
          break;
        }
      }
    }
  }
}

function hitBoredBoss(npc) {
  npc.hp = Math.max(0, npc.hp - 1);
  npc.hitFlash = 15;
  npc.x += player.facing * 8;

  for (let i = 0; i < 8; i++) {
    hitSparks.push({
      x: npc.x + npc.w / 2,
      y: npc.y + npc.h / 2,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 20,
      color: '#ffd152'
    });
  }

  if (npc.hp <= 0) {
    npc.defeated = true;
    npc.poofTimer = 35;
    sound.playMemoryFanfare();

    player.hasStick = false;
    btnAction.classList.add('hidden');

    unlockMemory({
      id: 'mem_bored_whacked',
      title: 'bored got WHACKED! ⚔️',
      desc: 'Taught him a lesson with Gautam\'s stick! He vanished in smoke!'
    });
  }
}

// ==========================================
// CHAPTER 2: ONLINE CHAT SCREEN ENGINE
// ==========================================
function openOnlineChat(config) {
  activeChatConfig = config;
  activeChatMessageIndex = 0;
  chatMessagesList.innerHTML = '';
  chatTypingIndicator.classList.add('hidden');
  chatOverlay.classList.remove('hidden');
  renderNextChatMessage();
}

function renderNextChatMessage() {
  if (!activeChatConfig || activeChatMessageIndex >= activeChatConfig.messages.length) {
    if (activeChatConfig && activeChatConfig.memoryReward) {
      unlockMemory(activeChatConfig.memoryReward);
    }
    chatOverlay.classList.add('hidden');
    activeChatConfig = null;
    return;
  }

  const msg = activeChatConfig.messages[activeChatMessageIndex];

  // Show typing indicator
  chatTypingIndicator.querySelector('.typing-name').textContent = msg.sender;
  chatTypingIndicator.classList.remove('hidden');

  setTimeout(() => {
    chatTypingIndicator.classList.add('hidden');
    sound.playDialogueBlip(msg.sender === 'Nika' ? 440 : 340);

    const row = document.createElement('div');
    row.className = `chat-msg-row ${msg.sender === 'Nika' ? 'chat-msg-nika' : ''}`;
    row.innerHTML = `
      <div class="chat-avatar ${msg.sender === 'Nika' ? 'nika-avatar' : 'gautam-avatar'}">
        ${msg.sender[0]}
      </div>
      <div class="chat-msg-content">
        <div class="chat-msg-header">
          <span class="msg-sender-name ${msg.sender === 'Nika' ? 'sender-nika' : 'sender-gautam'}">${msg.sender}</span>
          <span class="msg-time">${msg.time}</span>
        </div>
        <div class="chat-msg-text">${msg.text}</div>
      </div>
    `;
    chatMessagesList.appendChild(row);
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;

    activeChatMessageIndex++;
  }, 400);
}

btnChatNext.addEventListener('click', () => renderNextChatMessage());
btnCloseChat.addEventListener('click', () => {
  if (activeChatConfig && activeChatConfig.memoryReward) {
    unlockMemory(activeChatConfig.memoryReward);
  }
  chatOverlay.classList.add('hidden');
  activeChatConfig = null;
});

// ==========================================
// DEATH DEFIER (DD) BADGE CELEBRATION
// ==========================================
function triggerDDCelebration() {
  sound.playMemoryFanfare();
  ddCelebrationModal.classList.remove('hidden');

  // Spawn 40 golden celebration particles
  for (let i = 0; i < 40; i++) {
    hitSparks.push({
      x: player.x + (Math.random() - 0.5) * 80,
      y: player.y + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6 - 2,
      life: 60,
      color: Math.random() > 0.5 ? '#f1c40f' : '#f39c12'
    });
  }

  unlockMemory({
    id: 'golden_dd_badge',
    title: 'DEATH DEFIER (DD BADGE)',
    desc: 'Over 2 months of relentless grind. You earned this legend! 🏆'
  });
}

btnCloseDD.addEventListener('click', () => {
  ddCelebrationModal.classList.add('hidden');
});

// ==========================================
// INTERACTION & DIALOGUE
// ==========================================
function handleInteraction() {
  if (activeDialogue) {
    advanceDialogue();
    return;
  }

  if (player.activeTarget) {
    const target = player.activeTarget;

    // Portal
    if (target.type === 'portal') {
      sound.playPortal();
      loadChapter(target.targetChapter);
      return;
    }

    // Birthday Letter
    if (target.type === 'letter') {
      openBirthdayLetter();
      return;
    }

    // Online Chat (Chapter 2)
    if (target.type === 'online_chat') {
      openOnlineChat(target);
      return;
    }

    // Stick Pickup
    if (target.type === 'stick_pickup') {
      player.hasStick = true;
      target.collected = true;
      btnAction.textContent = '⚔️';
      btnAction.classList.remove('hidden');
      sound.playCollect();
      startDialogue([
        { speaker: 'Gautam', text: 'Take this stick Nika!' },
        { speaker: 'Gautam', text: 'Go teach bored a lesson! Press [F] or tap ⚔️ to whack him!' },
        { speaker: 'Nika', text: 'With pleasure! He\'s going down!' }
      ]);
      return;
    }

    // Start Bored Race when player presses [E] near bored
    if (target.isBoredRacer && !target.raceActive && !target.raceFinished) {
      startBoredRace(target);
      return;
    }

    // NPC / Object Dialogue
    if (target.dialogue) {
      startDialogue(target.dialogue, target.memoryOnComplete, () => {
        // Special callback: LHJ Gautam leaps to high platform!
        if (target.isLhjGautam && !target.hasLeaped) {
          triggerLhjLeap(target);
        }
        if (target.id === 'gautam_boss_coach') {
          currentChapter.bossShootingActive = true;
        }
      });
      return;
    }
  }
}

// Start bored's race countdown
function startBoredRace(bored) {
  bored.raceActive = true;
  raceBanner.classList.remove('hidden');
  raceBannerText.textContent = 'READY... SET... GO!';
  sound.playJumpPad();

  setTimeout(() => {
    raceBanner.classList.add('hidden');
  }, 1500);
}

// Gautam's epic LHJ Lag Jump Leap Animation!
function triggerLhjLeap(gautam) {
  gautam.hasLeaped = true;
  sound.playJumpPad();

  // Leap physics
  let leapFrame = 0;
  const startX = gautam.x;
  const startY = gautam.y;
  const endX = gautam.targetX;
  const endY = gautam.targetY;

  const leapInterval = setInterval(() => {
    leapFrame++;
    const progress = leapFrame / 30; // 0.5s arc
    if (progress >= 1) {
      gautam.x = endX;
      gautam.y = endY;
      clearInterval(leapInterval);
      sound.playWhack();
      // Celebratory remark
      startDialogue([
        { speaker: 'Gautam', text: 'Boom! Flexing on PC haha!' },
        { speaker: 'Nika', text: 'CHEATER!! You know I\'m on mobile!' },
        { speaker: 'Gautam', text: 'Step on the green jump pad below, you can reach me!' }
      ]);
      return;
    }
    // High parabolic arc
    gautam.x = startX + (endX - startX) * progress;
    const arcHeight = 110;
    gautam.y = startY + (endY - startY) * progress - Math.sin(progress * Math.PI) * arcHeight;
  }, 16);
}

function startDialogue(dialogueLines, memoryReward, onComplete) {
  activeDialogue = dialogueLines;
  activeDialogueCallback = memoryReward;
  dialogueStep = 0;
  dialogueBox.classList.remove('hidden');
  showDialogueLine();
  activeDialogue.onCompleteCallback = onComplete;
}

function showDialogueLine() {
  if (!activeDialogue || dialogueStep >= activeDialogue.length) {
    finishDialogue();
    return;
  }

  const line = activeDialogue[dialogueStep];
  dialogueSpeaker.textContent = line.speaker;

  if (line.speaker === 'Nika') {
    dialogueSpeaker.style.color = '#c0392b';
    dialogueSpeaker.style.background = '#fcedea';
  } else if (line.speaker.includes('Gautam')) {
    dialogueSpeaker.style.color = '#1c1c1c';
    dialogueSpeaker.style.background = '#eaecee';
  } else {
    dialogueSpeaker.style.color = '#8b5a19';
    dialogueSpeaker.style.background = '#fcf3cf';
  }

  if (typewriterTimer) clearInterval(typewriterTimer);
  typewriterText = line.text;
  typewriterIndex = 0;
  dialogueText.textContent = '';
  isTyping = true;

  const pitch = line.speaker === 'Nika' ? 440 : 340;

  typewriterTimer = setInterval(() => {
    if (typewriterIndex < typewriterText.length) {
      dialogueText.textContent += typewriterText[typewriterIndex];
      if (typewriterIndex % 2 === 0 && typewriterText[typewriterIndex] !== ' ') {
        sound.playDialogueBlip(pitch);
      }
      typewriterIndex++;
    } else {
      clearInterval(typewriterTimer);
      isTyping = false;
    }
  }, 24);
}

function advanceDialogue() {
  if (!activeDialogue) return;

  if (isTyping) {
    clearInterval(typewriterTimer);
    dialogueText.textContent = typewriterText;
    isTyping = false;
    return;
  }

  dialogueStep++;
  if (dialogueStep < activeDialogue.length) {
    showDialogueLine();
  } else {
    finishDialogue();
  }
}

function finishDialogue() {
  if (activeDialogueCallback) {
    unlockMemory(activeDialogueCallback);
  }
  const cb = activeDialogue ? activeDialogue.onCompleteCallback : null;
  closeDialogue();
  if (cb) cb();
}

function closeDialogue() {
  if (typewriterTimer) clearInterval(typewriterTimer);
  activeDialogue = null;
  activeDialogueCallback = null;
  dialogueStep = 0;
  dialogueBox.classList.add('hidden');
}

// Memory Toast Notification
let toastTimeout = null;
function unlockMemory(mem) {
  if (!mem || player.unlockedMemories.has(mem.id)) return;
  player.unlockedMemories.set(mem.id, mem);
  journalCounter.textContent = player.unlockedMemories.size;

  try {
    const list = Array.from(player.unlockedMemories.values());
    localStorage.setItem('nika_adventures_memories', JSON.stringify(list));
  } catch (e) {}

  sound.playMemoryFanfare();

  toastTitle.textContent = mem.title;
  toastDesc.textContent = mem.desc;
  memoryToast.classList.remove('hidden');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    memoryToast.classList.add('hidden');
  }, 4200);
}

let trapTimeout = null;
function triggerLostDDTrap(trap) {
  sound.playBuzzer();
  damagePlayer(1);
  trapToast.classList.remove('hidden');

  if (trapTimeout) clearTimeout(trapTimeout);
  trapTimeout = setTimeout(() => {
    trapToast.classList.add('hidden');
  }, 2800);

  player.x = trap.respawnX || player.checkpoint.x;
  player.y = trap.respawnY || player.checkpoint.y;
  player.vx = 0;
  player.vy = 0;
}

// ==========================================
// MEMORY JOURNAL MODAL
// ==========================================
btnJournal.addEventListener('click', () => openJournal());
btnCloseJournal.addEventListener('click', () => journalModal.classList.add('hidden'));

function openJournal() {
  journalList.innerHTML = '';

  const allKnownMemories = [
    { id: 'mem_coldest_impression', title: 'Coldest First Impression', desc: '"its k" — Obby Royale, 2024' },
    { id: 'mem_irfan_blown', title: 'Irfan\'s Boost Denied! 💥', desc: 'Irfan chased Nika for a boost and walked straight into a landmine!' },
    { id: 'mem_alt_account', title: 'The Mystery Alt Account', desc: 'Fooled for a solid hour before adding on Discord!' },
    { id: 'mem_dream_girl', title: 'The Dream Girl Question', desc: '"I would pick my dream girl and i would be going home with u"' },
    { id: 'mem_dont_be_mad', title: 'The "Don\'t Be Mad" Test', desc: '"okay so ur assuming im a bum? thx a lot."' },
    { id: 'mem_late_night_gamer', title: 'Late-Night Obby Addict', desc: 'Bumming Obby Royale till 4 am and suffering in the morning.' },
    { id: 'mem_halloween_night', title: 'Halloween Night Guardian', desc: 'Staying on the phone until you were safe and sound with family.' },
    { id: 'mem_lashes', title: 'The Lash Cluster Artist', desc: 'Perfection in every little detail ✨' },
    { id: 'mem_gymnast', title: 'The Determined Gymnast', desc: 'Years of flexibility, discipline and strength 🤸‍♀️' },
    { id: 'mem_teacher_dream', title: 'The Future Teacher', desc: 'Patient, caring, and inspiring the next generation 📚👩‍🏫' },
    { id: 'mem_reassurance', title: 'Reassurance & Comfort', desc: 'Always making sure I go to sleep feeling safe, heard and loved.' },
    { id: 'mem_death_penalty', title: 'Death Penalty Ragebait', desc: 'Sarcastically claiming the most hated mode as your favourite!' },
    { id: 'mem_lag_jump', title: 'The PC Lag Jump Incident', desc: '"CHEATER!!" — flexing PC jumps while Nika was on mobile.' },
    { id: 'mem_bored_whacked', title: 'bored got WHACKED! ⚔️', desc: 'Taught him a lesson with Gautam\'s stick! He vanished in smoke!' },
    { id: 'golden_dd_badge', title: 'DEATH DEFIER (DD BADGE)', desc: 'Over 2 months of relentless grind. You earned this legend! 🏆' },
    { id: 'mem_bosses_defeated', title: 'Squad Defeated! 👑', desc: 'Conquered brok, toast, honie and traces in the boss arena!' },
    { id: 'mem_each_others_person', title: 'Each Other\'s Person', desc: 'We kept finding our way back until you became my person.' }
  ];

  allKnownMemories.forEach(m => {
    const isUnlocked = player.unlockedMemories.has(m.id);
    const item = document.createElement('div');
    item.className = `journal-item ${isUnlocked ? 'journal-item-unlocked' : ''}`;
    item.innerHTML = `
      <div class="journal-badge-icon">${isUnlocked ? '★' : '🔒'}</div>
      <div class="journal-info">
        <h4>${isUnlocked ? m.title : '??? Locked Memory'}</h4>
        <p>${isUnlocked ? m.desc : 'Explore earlier chapters to discover this memory...'}</p>
      </div>
    `;
    journalList.appendChild(item);
  });

  journalModal.classList.remove('hidden');
}

// ==========================================
// BIRTHDAY LETTER MODAL
// ==========================================
function openBirthdayLetter() {
  sound.playMemoryFanfare();
  letterSalutation.textContent = BIRTHDAY_LETTER_DATA.salutation;
  letterSubtitle.textContent = BIRTHDAY_LETTER_DATA.subtitle;
  letterClosing.textContent = BIRTHDAY_LETTER_DATA.closing;
  letterSignature.textContent = BIRTHDAY_LETTER_DATA.signature;

  letterBody.innerHTML = '';
  BIRTHDAY_LETTER_DATA.paragraphs.forEach(p => {
    const pElem = document.createElement('p');
    pElem.textContent = p;
    letterBody.appendChild(pElem);
  });

  letterModal.classList.remove('hidden');
}

btnCloseLetter.addEventListener('click', () => {
  letterModal.classList.add('hidden');
});

// ==========================================
// PHYSICS & PLAYER UPDATE
// ==========================================
function updatePlayer() {
  if (player.invincibilityTimer > 0) player.invincibilityTimer--;
  if (player.swingTimer > 0) {
    player.swingTimer--;
    if (player.swingTimer <= 0) player.isSwingingStick = false;
  }

  if (activeDialogue || activeChatConfig) {
    player.vx = 0;
    player.state = 'idle';
    return;
  }

  // Horizontal input
  if (keys.left) {
    player.vx = -PLAYER_SPEED;
    player.facing = -1;
  } else if (keys.right) {
    player.vx = PLAYER_SPEED;
    player.facing = 1;
  } else {
    player.vx *= FRICTION;
    if (Math.abs(player.vx) < 0.1) player.vx = 0;
  }

  // Jump input
  if ((keys.jump || keys.jumpPressedThisFrame) && player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
    sound.playJump();
  }
  keys.jumpPressedThisFrame = false;

  player.vy += GRAVITY;
  if (player.vy > MAX_FALL_SPEED) player.vy = MAX_FALL_SPEED;

  player.x += player.vx;
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > currentChapter.levelWidth) player.x = currentChapter.levelWidth - player.w;

  player.y += player.vy;
  player.onGround = false;

  // Platform collision
  for (const plat of currentChapter.platforms) {
    if (
      player.x + player.w > plat.x &&
      player.x < plat.x + plat.w
    ) {
      if (plat.type === 'jumppad') {
        if (
          player.vy >= 0 &&
          player.y + player.h >= plat.y &&
          player.y + player.h - player.vy <= plat.y + 12
        ) {
          player.vy = -9.2;
          player.onGround = false;
          sound.playJumpPad();
          continue;
        }
      }

      // Normal platform top landing
      if (
        player.vy >= 0 &&
        player.y + player.h >= plat.y &&
        player.y + player.h - player.vy <= plat.y + 10
      ) {
        player.y = plat.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }
  }

  // Surprise traps
  if (currentChapter.traps) {
    for (const trap of currentChapter.traps) {
      if (
        player.x + player.w > trap.x &&
        player.x < trap.x + trap.w &&
        player.y + player.h > trap.y
      ) {
        triggerLostDDTrap(trap);
      }
    }
  }

  // Abyss respawn
  if (player.y > 360) {
    damagePlayer(1);
    player.x = player.checkpoint.x;
    player.y = player.checkpoint.y;
    player.vx = 0;
    player.vy = 0;
  }

  // Animation states
  if (!player.onGround) {
    player.state = player.vy < 0 ? 'jump' : 'fall';
  } else if (Math.abs(player.vx) > 0.2) {
    player.state = 'run';
  } else {
    player.state = 'idle';
  }

  player.animTimer++;
  if (player.animTimer % 8 === 0) {
    player.animFrame = (player.animFrame + 1) % 4;
  }

  player.blinkTimer++;
  if (player.blinkTimer > 200) player.blinkTimer = 0;

  if (player.onGround && player.x > player.checkpoint.x + 180) {
    player.checkpoint = { x: player.x, y: player.y };
  }

  // Collectibles
  for (const c of currentChapter.collectibles) {
    if (!c.collected) {
      if (
        player.x < c.x + c.w &&
        player.x + player.w > c.x &&
        player.y < c.y + c.h &&
        player.y + player.h > c.y
      ) {
        c.collected = true;

        // Check if Golden DD badge!
        if (c.type === 'golden_dd') {
          triggerDDCelebration();
        } else {
          sound.playCollect();
          unlockMemory({ id: c.id, title: c.title, desc: c.desc });
        }
      }
    }
  }

  // Interactions
  let foundTarget = null;

  if (currentChapter.npcs) {
    for (const npc of currentChapter.npcs) {
      if (npc.defeated) continue;
      const dist = Math.hypot(
        (player.x + player.w / 2) - (npc.x + npc.w / 2),
        (player.y + player.h / 2) - (npc.y + npc.h / 2)
      );
      if (dist < 36) {
        foundTarget = npc;
        if (npc.isBoredRacer && !npc.raceActive && !npc.raceFinished) {
          foundTarget.promptLabel = `Race ${npc.name}!`;
        } else {
          foundTarget.promptLabel = `Talk with ${npc.name}`;
        }
        break;
      }
    }
  }

  if (!foundTarget && currentChapter.interactives) {
    for (const obj of currentChapter.interactives) {
      if (obj.collected) continue;
      if (obj.lockedByBosses && currentChapter.bosses) {
        const remaining = currentChapter.bosses.filter(b => b.hp > 0).length;
        if (remaining > 0) continue;
      }
      const dist = Math.hypot(
        (player.x + player.w / 2) - (obj.x + obj.w / 2),
        (player.y + player.h / 2) - (obj.y + obj.h / 2)
      );
      if (dist < 38) {
        foundTarget = obj;
        foundTarget.promptLabel = obj.label;
        break;
      }
    }
  }

  player.activeTarget = foundTarget;

  if (foundTarget && !activeDialogue && !activeChatConfig) {
    interactionPrompt.classList.remove('hidden');
    promptText.textContent = foundTarget.promptLabel;
    btnInteract.classList.remove('hidden');
  } else {
    interactionPrompt.classList.add('hidden');
    if (!activeDialogue && !activeChatConfig) {
      btnInteract.classList.add('hidden');
    }
  }
}

// ==========================================
// CHAPTER 1: IRFAN CHASE & LANDMINE EXPLOSION
// ==========================================
function updateIrfanChase() {
  if (!currentChapter || currentChapter.id !== 'ch1' || !currentChapter.npcs) return;

  const irfan = currentChapter.npcs.find(n => n.isIrfanChaser);
  if (!irfan || !irfan.alive) return;

  // Start following only once Nika has passed him, so he's always BEHIND her
  if (!irfan.chasing && player.x > irfan.x + 30) {
    irfan.chasing = true;
    irfan.trail = [];
    irfan.trailIdx = 0;
  }

  if (irfan.chasing) {
    // 1) Record Nika's route (feet position), only when she has actually moved
    const feetY = player.y + player.h;
    const last = irfan.trail[irfan.trail.length - 1];
    if (!last || Math.abs(player.x - last.x) + Math.abs(feetY - last.fy) >= 1) {
      irfan.trail.push({ x: player.x, fy: feetY });
    }

    // 2) Walk along that route at Irfan's speed (no teleporting, no gravity)
    let budget = irfan.speed;
    irfan.isMoving = false;
    while (budget > 0 && irfan.trailIdx < irfan.trail.length) {
      const target = irfan.trail[irfan.trailIdx];
      const dx = target.x - irfan.x;
      const dy = (target.fy - irfan.h) - irfan.y;
      const dist = Math.hypot(dx, dy);
      if (dist <= budget) {
        irfan.x = target.x;
        irfan.y = target.fy - irfan.h;
        budget -= dist;
        irfan.trailIdx++;
      } else {
        irfan.x += (dx / dist) * budget;
        irfan.y += (dy / dist) * budget;
        budget = 0;
      }
      if (Math.abs(dx) > 0.05) irfan.facing = dx > 0 ? 1 : -1;
      irfan.isMoving = true;
    }
    irfan.onGround = true;

    // Speech cycling
    irfan.shoutTimer = (irfan.shoutTimer || 0) + 1;
    if (irfan.shoutTimer > 160) {
      irfan.shoutTimer = 0;
      const shouts = [
        'hi nikii can u boost me plss',
        'plss nikii boost me',
        'nikii wait for me!!',
        'boost plss nikii!'
      ];
      irfan.shoutText = shouts[Math.floor(Math.random() * shouts.length)];
    }

    // Check hit Landmine
    if (currentChapter.hazards) {
      for (const h of currentChapter.hazards) {
        if (h.type === 'landmine' && !h.exploded) {
          const irfanCenterX = irfan.x + irfan.w / 2;
          const hCenterX = h.x + h.w / 2;
          const feet = irfan.y + irfan.h;
          const mineBottom = h.y + h.h;
          const dyMine = mineBottom - feet; // positive = Irfan is above the mine
          if (Math.abs(irfanCenterX - hCenterX) < 22 && dyMine > -10 && dyMine < 60) {
            // BOOM!
            h.exploded = true;
            irfan.alive = false;
            sound.playExplosion();

            // Spawn explosion smoke & sparks
            for (let i = 0; i < 25; i++) {
              hitSparks.push({
                x: h.x + (Math.random() - 0.5) * 30,
                y: h.y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6 - 2,
                life: 35,
                color: Math.random() > 0.5 ? '#e74c3c' : '#f39c12'
              });
            }

            // Screen shake
            gameContainer.classList.add('screen-shake');
            setTimeout(() => gameContainer.classList.remove('screen-shake'), 300);

            // Toast banner
            trapToast.querySelector('.trap-text').textContent = '💥 Irfan got blown up!';
            trapToast.classList.remove('hidden');
            setTimeout(() => trapToast.classList.add('hidden'), 3000);

            unlockMemory({
              id: 'mem_irfan_blown',
              title: 'Irfan\'s Boost Denied! 💥',
              desc: 'Irfan chased Nika for a boost and walked straight into a landmine!'
            });
            break;
          }
        }
      }
    }
  }
}

// ==========================================
// CHAPTER 4: BORED MINI-RACE
// ==========================================
function updateBoredRace() {
  if (!currentChapter || currentChapter.id !== 'ch4' || !currentChapter.npcs) return;

  const bored = currentChapter.npcs.find(n => n.isBoredRacer);
  if (!bored || bored.defeated || bored.raceFinished) return;

  // Race ONLY triggers when player interacts with bored near the starting line!
  // bored runs along the track jumping over hurdles
  if (bored.raceActive && !bored.raceFinished) {
    bored.x += 1.15; // Slowed down so Nika can comfortably race and jump hurdles!

    // bored jumps over hurdles
    const hurdles = [760, 840, 920];
    for (const hx of hurdles) {
      if (Math.abs(bored.x - hx) < 12) {
        bored.y = 270 - 45; // Jump over hurdle!
      } else if (Math.abs(bored.x - hx) >= 20) {
        bored.y = 270 - 24;
      }
    }

    // Finish line check (x = 980)
    if (player.x >= 980 && !bored.raceFinished) {
      bored.raceFinished = true;
      sound.playMemoryFanfare();
      raceBanner.classList.remove('hidden');
      raceBannerText.textContent = '🏆 NIKA WINS THE RACE!';

      setTimeout(() => {
        raceBanner.classList.add('hidden');
        // bored arrives frustrated
        bored.x = 960;
        bored.y = 270 - 24;
        startDialogue(bored.dialogue);
      }, 1800);
    }
  }
}

// ==========================================
// BOSS BATTLE (Chapter 5)
// ==========================================
function updateBossBattle() {
  if (!currentChapter || !currentChapter.isBossChapter || !currentChapter.bosses) return;

  // MAIN FIX: Bosses ONLY shoot once the conversation before it is over, and never while dialogue is active!
  if (!currentChapter.bossShootingActive || activeDialogue) return;

  for (const boss of currentChapter.bosses) {
    if (boss.hp <= 0) continue;

    boss.shootTimer = (boss.shootTimer || 0) + 1;
    if (boss.shootTimer >= boss.shootCooldown) {
      boss.shootTimer = 0;
      const angle = Math.atan2(
        (player.y + player.h / 2) - (boss.y + boss.h / 2),
        (player.x + player.w / 2) - (boss.x + boss.w / 2)
      );
      bossProjectiles.push({
        x: boss.x + boss.w / 2,
        y: boss.y + boss.h / 2,
        vx: Math.cos(angle) * 1.7, // Slowed down fire velocity
        vy: Math.sin(angle) * 1.7,
        w: 6,
        h: 6,
        color: boss.bulletColor || '#e74c3c'
      });
    }
  }

  for (let i = bossProjectiles.length - 1; i >= 0; i--) {
    const bp = bossProjectiles[i];
    bp.x += bp.vx;
    bp.y += bp.vy;

    if (
      player.x < bp.x + bp.w &&
      player.x + player.w > bp.x &&
      player.y < bp.y + bp.h &&
      player.y + player.h > bp.y
    ) {
      damagePlayer(1, 'boss');
      bossProjectiles.splice(i, 1);
      continue;
    }

    if (bp.x < 0 || bp.x > currentChapter.levelWidth || bp.y < 0 || bp.y > VIRTUAL_HEIGHT) {
      bossProjectiles.splice(i, 1);
    }
  }

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const p = projectiles[i];
    p.x += p.vx;

    let hitBoss = false;
    for (const boss of currentChapter.bosses) {
      if (boss.hp <= 0) continue;
      if (
        p.x < boss.x + boss.w &&
        p.x + p.w > boss.x &&
        p.y < boss.y + boss.h &&
        p.y + p.h > boss.y
      ) {
        boss.hp = Math.max(0, boss.hp - 1);
        boss.hitFlash = 15;
        hitBoss = true;
        sound.playWhack();

        for (let s = 0; s < 6; s++) {
          hitSparks.push({
            x: boss.x + boss.w / 2,
            y: boss.y + boss.h / 2,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 20,
            color: '#f9e79f'
          });
        }
        break;
      }
    }

    if (hitBoss || p.x < 0 || p.x > currentChapter.levelWidth) {
      projectiles.splice(i, 1);
    }
  }

  const remaining = currentChapter.bosses.filter(b => b.hp > 0).length;
  if (remaining === 0 && !currentChapter.victoryAchieved) {
    currentChapter.victoryAchieved = true;
    sound.playMemoryFanfare();
    unlockMemory({
      id: 'mem_bosses_defeated',
      title: 'Squad Defeated! 👑',
      desc: 'Conquered brok, toast, honie and traces in the boss arena!'
    });
  }
}

function updateHitSparks() {
  for (let i = hitSparks.length - 1; i >= 0; i--) {
    const s = hitSparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.life--;
    if (s.life <= 0) hitSparks.splice(i, 1);
  }
}

// ==========================================
// CAMERA
// ==========================================
function updateCamera() {
  camera.targetX = player.x + player.w / 2 - VIRTUAL_WIDTH / 2;
  camera.targetY = player.y + player.h / 2 - VIRTUAL_HEIGHT / 2 - 10;

  camera.x += (camera.targetX - camera.x) * 0.1;
  camera.y += (camera.targetY - camera.y) * 0.1;

  camera.x = Math.max(0, Math.min(camera.x, currentChapter.levelWidth - VIRTUAL_WIDTH));
  camera.y = Math.max(0, Math.min(camera.y, 90));
}

// ==========================================
// RENDERING
// ==========================================
function drawBackground() {
  const theme = currentChapter.theme || 'garden_dawn';

  if (theme === 'boss_arena') {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    skyGrad.addColorStop(0, '#111827');
    skyGrad.addColorStop(0.5, '#1f2937');
    skyGrad.addColorStop(1, '#374151');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
    ctx.lineWidth = 1;
    for (let x = 0; x < VIRTUAL_WIDTH; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, VIRTUAL_HEIGHT);
      ctx.stroke();
    }
  } else if (theme === 'obby_royale' || theme === 'obby_championship') {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    skyGrad.addColorStop(0, '#1a5276');
    skyGrad.addColorStop(0.5, '#2980b9');
    skyGrad.addColorStop(1, '#a9cce3');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
    const offset = camera.x * 0.2;
    for (let i = 0; i < 6; i++) {
      const bx = ((i * 180 - offset) % (VIRTUAL_WIDTH + 100)) - 50;
      ctx.fillRect(bx, 60 + (i % 3) * 35, 30, 30);
    }
  } else if (theme === 'cozy_room') {
    ctx.fillStyle = '#2c2523';
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    ctx.fillStyle = '#382f2c';
    for (let x = 0; x < VIRTUAL_WIDTH; x += 24) {
      ctx.fillRect(x, 0, 12, VIRTUAL_HEIGHT);
    }
  } else if (theme === 'sunset_bridge') {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    skyGrad.addColorStop(0, '#6c3483');
    skyGrad.addColorStop(0.35, '#c0392b');
    skyGrad.addColorStop(0.7, '#e67e22');
    skyGrad.addColorStop(1, '#f9e79f');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    const sunX = 240 - camera.x * 0.05;
    ctx.fillStyle = '#faeed9';
    ctx.beginPath();
    ctx.arc(sunX, 110, 38, 0, Math.PI * 2);
    ctx.fill();
  } else if (theme === 'starlit_hill') {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    skyGrad.addColorStop(0, '#0b132b');
    skyGrad.addColorStop(0.6, '#1c2541');
    skyGrad.addColorStop(1, '#3a506b');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    ctx.fillStyle = '#fffbe0';
    ctx.beginPath();
    ctx.arc(380, 50, 22, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, VIRTUAL_HEIGHT);
    skyGrad.addColorStop(0, '#5e796e');
    skyGrad.addColorStop(0.35, '#8fa68c');
    skyGrad.addColorStop(0.7, '#d2dcbe');
    skyGrad.addColorStop(1, '#faeed9');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);

    const mountainOffset = camera.x * 0.12;
    ctx.fillStyle = '#7a8e73';
    ctx.beginPath();
    ctx.moveTo(0, VIRTUAL_HEIGHT);
    for (let x = 0; x <= VIRTUAL_WIDTH; x += 25) {
      const worldX = x + mountainOffset;
      const y = VIRTUAL_HEIGHT - 90 - Math.sin(worldX * 0.007) * 45;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    ctx.closePath();
    ctx.fill();
  }
}

function drawPlatforms() {
  const time = Date.now() * 0.003;

  for (const plat of currentChapter.platforms) {
    const screenX = Math.floor(plat.x - camera.x);
    const screenY = Math.floor(plat.y - camera.y);

    if (screenX + plat.w < 0 || screenX > VIRTUAL_WIDTH) continue;

    if (plat.type === 'race_hurdle') {
      // Race Hurdle Obstacle
      ctx.fillStyle = '#e67e22';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(screenX + 2, screenY + 4, plat.w - 4, 3);
      ctx.fillRect(screenX + 2, screenY + 12, plat.w - 4, 3);

    } else if (plat.type === 'ground' || plat.type === 'garden_soil') {
      ctx.fillStyle = '#658238';
      ctx.fillRect(screenX, screenY, plat.w, 6);
      ctx.fillStyle = '#7ea247';
      for (let gx = screenX; gx < screenX + plat.w; gx += 5) {
        ctx.fillRect(gx, screenY - 2, 3, 2);
      }
      ctx.fillStyle = '#4a3b32';
      ctx.fillRect(screenX, screenY + 6, plat.w, plat.h - 6);

    } else if (plat.type === 'boss_metal_floor') {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(screenX, screenY, plat.w, 4);

    } else if (plat.type === 'boss_platform') {
      ctx.fillStyle = '#334155';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(screenX, screenY, plat.w, 3);

    } else if (plat.type === 'obby_block') {
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#34495e';
      ctx.fillRect(screenX, screenY, plat.w, 4);

    } else if (plat.type === 'neon_platform') {
      ctx.fillStyle = '#1abc9c';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#a3e4d7';
      ctx.fillRect(screenX, screenY, plat.w, 3);

    } else if (plat.type === 'neon_red') {
      ctx.fillStyle = '#c0392b';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#f1948a';
      ctx.fillRect(screenX, screenY, plat.w, 3);

    } else if (plat.type === 'gold_platform') {
      ctx.fillStyle = '#f39c12';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#f9e79f';
      ctx.fillRect(screenX, screenY, plat.w, 3);

    } else if (plat.type === 'jumppad') {
      ctx.fillStyle = '#27ae60';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#2ecc71';
      ctx.fillRect(screenX + 2, screenY, plat.w - 4, 3);
      ctx.fillStyle = '#ffffff';
      ctx.font = '8px monospace';
      ctx.fillText('▲', screenX + plat.w / 2 - 4, screenY + 7);

    } else if (plat.type === 'bridge_wood' || plat.type === 'garden_bridge') {
      ctx.fillStyle = '#78281f';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#b03a2e';
      ctx.fillRect(screenX, screenY, plat.w, 4);

    } else {
      ctx.fillStyle = '#8b6f47';
      ctx.fillRect(screenX, screenY, plat.w, plat.h);
      ctx.fillStyle = '#b18f5e';
      ctx.fillRect(screenX, screenY, plat.w, 3);
      ctx.fillStyle = '#5c482f';
      ctx.fillRect(screenX, screenY + plat.h - 3, plat.w, 3);

      if (plat.vines) {
        for (let v = 0; v < plat.vines; v++) {
          const vineX = screenX + 12 + v * (plat.w / (plat.vines + 1));
          const vineLen = 10 + (v % 2) * 8;
          const sway = Math.sin(time + v) * 2;
          ctx.strokeStyle = '#4e6b28';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(vineX, screenY + plat.h);
          ctx.quadraticCurveTo(vineX + sway, screenY + plat.h + vineLen * 0.6, vineX + sway * 1.5, screenY + plat.h + vineLen);
          ctx.stroke();
        }
      }
    }
  }

  // Hazards (e.g. Landmine)
  if (currentChapter.hazards) {
    for (const h of currentChapter.hazards) {
      if (h.exploded) continue;
      const screenX = Math.floor(h.x - camera.x);
      const screenY = Math.floor(h.y - camera.y);
      if (h.type === 'landmine') {
        ctx.fillStyle = '#475569';
        ctx.fillRect(screenX, screenY + 4, h.w, h.h - 4);
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.arc(screenX + h.w / 2, screenY + 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(screenX + h.w / 2 - 1, screenY, 2, 2);
      }
    }
  }
}

function drawDecorations() {
  for (const dec of currentChapter.decorations) {
    const screenX = Math.floor(dec.x - camera.x);
    const screenY = Math.floor(dec.y - camera.y);
    if (screenX < -60 || screenX > VIRTUAL_WIDTH + 60) continue;

    if (dec.type === 'tree') {
      const h = dec.height || 70;
      ctx.fillStyle = '#533c27';
      ctx.fillRect(screenX + 20, screenY - h, 10, h);
      ctx.fillStyle = '#556b2f';
      ctx.beginPath();
      ctx.arc(screenX + 25, screenY - h - 14, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7c9454';
      ctx.beginPath();
      ctx.arc(screenX + 23, screenY - h - 22, 14, 0, Math.PI * 2);
      ctx.fill();

    } else if (dec.type === 'cherry_tree') {
      const h = dec.height || 75;
      ctx.fillStyle = '#4a235a';
      ctx.fillRect(screenX + 20, screenY - h, 10, h);
      ctx.fillStyle = '#f1948a';
      ctx.beginPath();
      ctx.arc(screenX + 25, screenY - h - 14, 26, 0, Math.PI * 2);
      ctx.fill();

    } else if (dec.type === 'lantern_post') {
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(screenX + 4, screenY - 28, 4, 28);
      ctx.fillStyle = '#f39c12';
      ctx.fillRect(screenX + 1, screenY - 32, 10, 8);

    } else if (dec.type === 'kaki_rose') {
      ctx.fillStyle = '#466827';
      ctx.fillRect(screenX + 2, screenY - 9, 2, 9);
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(screenX, screenY - 13, 6, 5);
      ctx.fillStyle = '#faeed9';
      ctx.fillRect(screenX + 2, screenY - 11, 2, 2);

    } else if (dec.type === 'sign') {
      ctx.fillStyle = '#5c482f';
      ctx.fillRect(screenX + 5, screenY - 14, 4, 14);
      ctx.fillStyle = '#c7a36c';
      ctx.fillRect(screenX - 10, screenY - 28, 38, 14);
      ctx.fillStyle = '#2b1b0e';
      ctx.font = '6px "Press Start 2P", monospace';
      ctx.fillText(dec.text ? dec.text.slice(0, 10) : 'SIGN', screenX - 8, screenY - 18);
    }
  }
}

function drawInteractives() {
  const time = Date.now() * 0.005;
  if (!currentChapter.interactives) return;

  for (const obj of currentChapter.interactives) {
    if (obj.collected) continue;

    const screenX = Math.floor(obj.x - camera.x);
    const screenY = Math.floor(obj.y - camera.y);
    if (screenX < -30 || screenX > VIRTUAL_WIDTH + 30) continue;

    if (obj.type === 'portal') {
      if (obj.lockedByBosses && currentChapter.bosses) {
        const remaining = currentChapter.bosses.filter(b => b.hp > 0).length;
        if (remaining > 0) continue;
      }

      const glow = Math.sin(time * 2) * 4;
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(screenX, screenY, obj.w, obj.h);
      ctx.fillStyle = '#a8b890';
      ctx.fillRect(screenX + 3, screenY + 3, obj.w - 6, obj.h - 6);
      ctx.fillStyle = '#faeed9';
      ctx.fillRect(screenX + 6, screenY + 6, obj.w - 12, obj.h - 12);
      ctx.fillStyle = '#f4a261';
      ctx.font = '8px monospace';
      ctx.fillText('✨', screenX + 6, screenY - 4 + glow);

    } else if (obj.type === 'letter') {
      const floatY = Math.sin(time * 3) * 3;
      ctx.fillStyle = '#fcf8ee';
      ctx.fillRect(screenX, screenY + floatY, obj.w, obj.h);
      ctx.strokeStyle = '#c0392b';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(screenX, screenY + floatY, obj.w, obj.h);
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.arc(screenX + obj.w / 2, screenY + obj.h / 2 + floatY, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '10px monospace';
      ctx.fillText('💌', screenX + 4, screenY - 6 + floatY);

    } else if (obj.type === 'stick_pickup') {
      const floatY = Math.sin(time * 3) * 2;
      ctx.fillStyle = '#8b5a2b';
      ctx.fillRect(screenX + 4, screenY + 4 + floatY, 12, 4);
      ctx.fillStyle = '#ffd152';
      ctx.fillText('🪵', screenX + 2, screenY - 4 + floatY);

    } else if (obj.type === 'online_chat' || obj.type === 'scenery_object') {
      if (obj.objType === 'pc') {
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(screenX + 4, screenY, 18, 14);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(screenX + 6, screenY + 2, 14, 10);
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(screenX + 11, screenY + 14, 4, 4);
        ctx.fillRect(screenX + 8, screenY + 18, 10, 2);

      } else if (obj.objType === 'phone') {
        ctx.fillStyle = '#111827';
        ctx.fillRect(screenX + 3, screenY + 4, 10, 16);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(screenX + 5, screenY + 6, 6, 12);

      } else if (obj.objType === 'clock') {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(screenX + 2, screenY + 2, 14, 14);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(screenX + 4, screenY + 4, 10, 10);
        ctx.fillStyle = '#111';
        ctx.fillRect(screenX + 8, screenY + 6, 2, 4);

      } else if (obj.objType === 'window') {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(screenX, screenY, 32, 44);
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(screenX + 22, screenY + 12, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, screenY, 32, 44);

      } else if (obj.objType === 'vanity') {
        ctx.fillStyle = '#fbcfe8';
        ctx.fillRect(screenX, screenY + 6, 22, 16);
        ctx.fillStyle = '#a5f3fc';
        ctx.fillRect(screenX + 4, screenY - 6, 14, 12);

      } else if (obj.objType === 'ribbon') {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(screenX + 10, screenY + 12, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(screenX + 8, screenY + 2, 4, 8);

      } else if (obj.objType === 'book') {
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(screenX + 2, screenY + 4, 16, 14);
        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(screenX + 4, screenY + 6, 12, 10);

      } else if (obj.objType === 'star_stand') {
        ctx.fillStyle = '#eab308';
        ctx.font = '12px monospace';
        ctx.fillText('⭐', screenX + 2, screenY + 14);

      } else {
        ctx.fillStyle = '#64748b';
        ctx.fillRect(screenX + 4, screenY + 6, 12, 18);
        ctx.fillStyle = '#e2e8f0';
        ctx.fillRect(screenX + 2, screenY + 4, 16, 4);
      }
    }
  }
}

function drawCollectibles() {
  const time = Date.now() * 0.005;
  for (const c of currentChapter.collectibles) {
    if (c.collected) continue;
    const floatY = Math.sin(time + c.x) * 4;
    const screenX = Math.floor(c.x - camera.x);
    const screenY = Math.floor(c.y + floatY - camera.y);

    if (screenX < -20 || screenX > VIRTUAL_WIDTH + 20) continue;

    if (c.type === 'golden_dd') {
      // Golden Death Defier Badge with glowing radial rays!
      const pulse = Math.sin(time * 3) * 3;
      ctx.fillStyle = 'rgba(241, 196, 15, 0.35)';
      ctx.beginPath();
      ctx.arc(screenX + c.w / 2, screenY + c.h / 2, c.w * 0.8 + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f39c12';
      ctx.fillRect(screenX, screenY, c.w, c.h);
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(screenX + 2, screenY + 2, c.w - 4, c.h - 4);
      ctx.fillStyle = '#7d6608';
      ctx.font = '10px "Press Start 2P", monospace';
      ctx.fillText('DD', screenX + 4, screenY + 17);

    } else if (c.type === 'star') {
      ctx.fillStyle = '#ffd152';
      ctx.fillRect(screenX + 5, screenY, 4, 14);
      ctx.fillRect(screenX, screenY + 5, 14, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(screenX + 5, screenY + 5, 4, 4);

    } else if (c.type === 'discord') {
      ctx.fillStyle = '#5865f2';
      ctx.fillRect(screenX, screenY, c.w, c.h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(screenX + 3, screenY + 4, 3, 3);
      ctx.fillRect(screenX + 10, screenY + 4, 3, 3);

    } else if (c.type === 'kaki_flower') {
      ctx.fillStyle = '#556b2f';
      ctx.fillRect(screenX + 2, screenY + 1, 10, 10);
      ctx.fillStyle = '#faeed9';
      ctx.fillRect(screenX + 6, screenY + 5, 2, 2);

    } else if (c.type === 'insta_heart') {
      ctx.fillStyle = '#e1306c';
      ctx.font = '12px monospace';
      ctx.fillText('❤️', screenX + 2, screenY + 12);

    } else {
      ctx.fillStyle = '#e07a5f';
      ctx.fillRect(screenX, screenY, c.w, c.h);
    }
  }
}

function drawBosses() {
  if (!currentChapter || !currentChapter.bosses) return;

  for (const boss of currentChapter.bosses) {
    if (boss.hp <= 0) continue;

    const screenX = Math.floor(boss.x - camera.x);
    const screenY = Math.floor(boss.y - camera.y);

    if (boss.hitFlash && boss.hitFlash > 0) {
      boss.hitFlash--;
      ctx.fillStyle = '#ffffff';
    } else {
      ctx.fillStyle = boss.color;
    }

    ctx.fillRect(screenX + 3, screenY + 7, 10, 8);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(screenX + 3, screenY + 14, 4, 8);
    ctx.fillRect(screenX + 9, screenY + 14, 4, 8);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(screenX + 3, screenY, 10, 8);
    ctx.fillStyle = '#111827';
    ctx.fillRect(screenX + 2, screenY - 2, 12, 4);

    ctx.fillStyle = '#ffffff';
    ctx.font = '7px "Press Start 2P", monospace';
    ctx.fillText(boss.name, screenX - 4, screenY - 14);

    for (let h = 0; h < boss.maxHp; h++) {
      ctx.fillStyle = h < boss.hp ? '#ef4444' : '#4b5563';
      ctx.fillRect(screenX + h * 6, screenY - 8, 4, 4);
    }
  }
}

function drawNpc(npc) {
  if (npc.defeated) return;

  const screenX = Math.floor(npc.x - camera.x);
  const screenY = Math.floor(npc.y - camera.y);

  // Irfan Chaser
  if (npc.isIrfanChaser) {
    if (!npc.alive) return;
    const isMoving = npc.chasing && npc.isMoving;
    const walkTimer = Date.now() * 0.012;
    const legOffset = isMoving ? Math.sin(walkTimer) * 3 : 0;
    const bobY = isMoving ? Math.abs(Math.sin(walkTimer)) * 2 : 0;

    ctx.save();
    if (npc.facing === -1) {
      ctx.translate(screenX + npc.w, screenY);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(screenX, screenY);
    }

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(2, npc.h - 1, 12, 2);

    // Legs / Pants (#2c3e50) with leg swing animation
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(3 - legOffset, 14, 4, 8);
    ctx.fillRect(9 + legOffset, 14, 4, 8);
    // Shoes
    ctx.fillStyle = '#111827';
    ctx.fillRect(2 - legOffset, 21, 5, 3);
    ctx.fillRect(8 + legOffset, 21, 5, 3);

    // Orange Shirt (#e67e22) with bobbing
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(3, 7 - bobY, 10, 8);
    ctx.fillStyle = '#d35400';
    ctx.fillRect(4, 7 - bobY, 8, 2);

    // Skin / Face
    ctx.fillStyle = '#fad7a0';
    ctx.fillRect(3, 0 - bobY, 10, 8);

    // Hair
    ctx.fillStyle = '#111';
    ctx.fillRect(2, -2 - bobY, 12, 4);
    ctx.fillRect(1, 0 - bobY, 2, 4);

    // Eyes
    ctx.fillStyle = '#111';
    ctx.fillRect(8, 2 - bobY, 2, 2);

    ctx.restore();

    // Floating speech bubble with shout
    if (npc.chasing) {
      const bubbleW = 104;
      const bubbleX = screenX - (bubbleW - npc.w) / 2;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bubbleX, screenY - 20, bubbleW, 14);
      ctx.strokeStyle = '#e67e22';
      ctx.lineWidth = 1;
      ctx.strokeRect(bubbleX, screenY - 20, bubbleW, 14);
      ctx.fillStyle = '#c0392b';
      ctx.font = '6px "Press Start 2P", monospace';
      ctx.fillText(npc.shoutText || 'boost plss!', bubbleX + 4, screenY - 10);
    }
    return;
  }

  // bored NPC
  if (npc.isBoredBoss) {
    if (npc.hitFlash && npc.hitFlash > 0) {
      npc.hitFlash--;
      ctx.fillStyle = '#ff6b6b';
    } else {
      ctx.fillStyle = '#64748b';
    }
    ctx.fillRect(screenX + 3, screenY + 7, 10, 8);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(screenX + 3, screenY + 14, 4, 8);
    ctx.fillRect(screenX + 9, screenY + 14, 4, 8);
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(screenX + 3, screenY, 10, 8);
    ctx.fillStyle = '#475569';
    ctx.fillRect(screenX + 2, screenY - 2, 12, 4);

    for (let h = 0; h < 3; h++) {
      ctx.fillStyle = h < npc.hp ? '#ef4444' : '#475569';
      ctx.fillRect(screenX + h * 6, screenY - 14, 4, 4);
    }
    return;
  }

  // Gautam NPC (Consistent sprite across Chapter 1, Chapter 6 and everywhere)
  const isGautam = npc.isGautam || npc.sprite === 'gautam' || (npc.name && npc.name.includes('Gautam')) || (npc.id && npc.id.toLowerCase().includes('gautam'));

  if (isGautam) {
    const idleBob = Math.floor(Date.now() / 450) % 2 === 0 ? 0 : 1;

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(screenX + 3, screenY + 14, 4, 8);
    ctx.fillRect(screenX + 9, screenY + 14, 4, 8);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(screenX + 2, screenY + 21, 5, 3);
    ctx.fillRect(screenX + 9, screenY + 21, 5, 3);

    // Black Hoodie
    ctx.fillStyle = '#111827';
    ctx.fillRect(screenX + 3, screenY + 7 + idleBob, 10, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(screenX + 6, screenY + 8 + idleBob, 1, 4);
    ctx.fillRect(screenX + 9, screenY + 8 + idleBob, 1, 4);

    ctx.fillStyle = '#fad7a0';
    ctx.fillRect(screenX + 3, screenY + idleBob, 10, 8);

    // Gautam's Long Hair
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(screenX + 2, screenY - 3 + idleBob, 12, 5);
    ctx.fillRect(screenX + 1, screenY + idleBob, 3, 13);
    ctx.fillRect(screenX + 12, screenY + idleBob, 3, 13);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(screenX + 5, screenY + 3 + idleBob, 2, 2);

  } else {
    ctx.fillStyle = '#2980b9';
    ctx.fillRect(screenX + 3, screenY + 7, 10, 8);
    ctx.fillStyle = '#1f2937';
    ctx.fillRect(screenX + 3, screenY + 14, 4, 8);
    ctx.fillRect(screenX + 9, screenY + 14, 4, 8);
    ctx.fillStyle = '#fad7a0';
    ctx.fillRect(screenX + 3, screenY, 10, 8);
    ctx.fillStyle = '#1c1c1c';
    ctx.fillRect(screenX + 2, screenY - 2, 12, 4);
  }

  const bounce = Math.sin(Date.now() * 0.006) * 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(screenX + 3, screenY - 14 + bounce, 10, 8);
  ctx.fillStyle = '#556b2f';
  ctx.fillRect(screenX + 5, screenY - 11 + bounce, 6, 2);
}

// NIKA SPRITE (Blonde Hair, Red Top/Dress, Blue Short Jeans)
function drawPlayer() {
  if (player.invincibilityTimer > 0 && Math.floor(Date.now() / 60) % 2 === 0) {
    return;
  }

  const screenX = Math.floor(player.x - camera.x);
  const screenY = Math.floor(player.y - camera.y);

  ctx.save();

  if (player.facing === -1) {
    ctx.translate(screenX + player.w, screenY);
    ctx.scale(-1, 1);
  } else {
    ctx.translate(screenX, screenY);
  }

  if (player.onGround) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(2, player.h - 1, player.w - 4, 2);
  }

  let bobY = 0;
  let legOffset = 0;

  if (player.state === 'run') {
    bobY = (player.animFrame % 2 === 0) ? -1 : 0;
    legOffset = (player.animFrame % 2 === 0) ? 2 : -2;
  } else if (player.state === 'jump') {
    bobY = -2;
    legOffset = -1;
  } else if (player.state === 'fall') {
    bobY = 1;
    legOffset = 1;
  } else {
    bobY = (Math.floor(Date.now() / 400) % 2 === 0) ? 0 : 1;
  }

  // 1. Shoes
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(2 - legOffset, player.h - 3, 4, 3);
  ctx.fillRect(8 + legOffset, player.h - 3, 4, 3);
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(3 - legOffset, player.h - 1, 3, 1);
  ctx.fillRect(9 + legOffset, player.h - 1, 3, 1);

  // 2. BLUE SHORT JEANS
  ctx.fillStyle = '#2980b9';
  ctx.fillRect(3 - legOffset, player.h - 7, 4, 5);
  ctx.fillRect(7 + legOffset, player.h - 7, 4, 5);
  ctx.fillStyle = '#1f618d';
  ctx.fillRect(4, player.h - 7, 6, 1);

  // 3. RED DRESS / TOP
  ctx.fillStyle = '#e74c3c';
  ctx.fillRect(2, 7 + bobY, 10, 8);
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(3, 7 + bobY, 8, 2);

  // 4. Head & Skin
  ctx.fillStyle = '#fdebd0';
  ctx.fillRect(3, 0 + bobY, 8, 7);

  // 5. RADIANT BLONDE HAIR
  ctx.fillStyle = '#f9d71c';
  ctx.fillRect(2, -3 + bobY, 10, 5);
  ctx.fillRect(1, -1 + bobY, 3, 8);
  ctx.fillRect(10, 0 + bobY, 3, 7);
  ctx.fillStyle = '#f4d03f';
  ctx.fillRect(3, -2 + bobY, 8, 2);
  ctx.fillStyle = '#d4ac0d';
  ctx.fillRect(1, 4 + bobY, 2, 4);
  ctx.fillRect(10, 4 + bobY, 2, 4);

  // 6. Eyes & Rosy Blush
  const isBlinking = player.blinkTimer > 192;
  if (isBlinking) {
    ctx.fillStyle = '#8b5a2b';
    ctx.fillRect(7, 3 + bobY, 3, 1);
  } else {
    ctx.fillStyle = '#1c2833';
    ctx.fillRect(7, 2 + bobY, 2, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(7, 2 + bobY, 1, 1);
    ctx.fillStyle = '#f1948a';
    ctx.fillRect(6, 4 + bobY, 2, 1);
  }

  // 7. WEAPON: WOODEN STICK IN HAND
  if (player.hasStick) {
    ctx.fillStyle = '#8b5a2b';
    if (player.isSwingingStick) {
      ctx.fillRect(9, 4 + bobY, 12, 3);
      ctx.fillRect(17, 2 + bobY, 3, 6);
    } else {
      ctx.fillRect(8, 7 + bobY, 4, 10);
    }
  }

  ctx.restore();
}

function drawCombatFX() {
  for (const p of projectiles) {
    const screenX = Math.floor(p.x - camera.x);
    const screenY = Math.floor(p.y - camera.y);
    ctx.fillStyle = '#ff4757';
    ctx.font = '8px monospace';
    ctx.fillText('❤️', screenX, screenY + 6);
  }

  for (const bp of bossProjectiles) {
    const screenX = Math.floor(bp.x - camera.x);
    const screenY = Math.floor(bp.y - camera.y);
    ctx.fillStyle = bp.color;
    ctx.beginPath();
    ctx.arc(screenX + 3, screenY + 3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(screenX + 2, screenY + 2, 2, 2);
  }

  for (const s of hitSparks) {
    const screenX = Math.floor(s.x - camera.x);
    const screenY = Math.floor(s.y - camera.y);
    ctx.fillStyle = s.color;
    ctx.fillRect(screenX, screenY, 3, 3);
  }
}

// ==========================================
// MAIN GAME LOOP
// ==========================================
let lastTime = 0;

function gameLoop(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  if (deltaTime < 100) {
    updatePlayer();
    updateIrfanChase();
    updateBoredRace();
    updateBossBattle();
    updateHitSparks();
    updateCamera();
  }

  ctx.clearRect(0, 0, VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
  drawBackground();
  drawDecorations();
  drawPlatforms();
  drawInteractives();
  drawCollectibles();

  if (currentChapter.npcs) {
    for (const npc of currentChapter.npcs) {
      drawNpc(npc);
    }
  }

  drawBosses();
  drawPlayer();
  drawCombatFX();

  requestAnimationFrame(gameLoop);
}

loadChapter(0);
requestAnimationFrame(gameLoop);