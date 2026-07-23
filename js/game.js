const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const dialogOverlay = document.getElementById('dialog-overlay');
const dialogName = document.getElementById('dialog-name');
const dialogContent = document.getElementById('dialog-content');
const dialogClose = document.getElementById('dialog-close');
const interactBtn = document.getElementById('interact-btn');
const startOverlay = document.getElementById('start-overlay');
const startBtn = document.getElementById('start-btn');

const SPRITE_RATIO = 800 / 1200; // ancho / alto de los PNG de los personajes

let W = 0;
let H = 0;
let dpr = 1;
let CHAR = { width: 100, height: 150 };

const player = {
  image: loadImage('assets/personajes/Carme.png'),
  x: 0,
  y: 0,
  speed: 4
};

const visited = new Set();
let giftUnlocked = false;

const bgVertical = loadImage('assets/fondo/fondoflores.png');
const bgHorizontal = loadImage('assets/fondo/fondofloreshorizontal.png');

NPCS.forEach((npc) => { npc.img = loadImage(npc.image); });
GIFT.img = loadImage(GIFT.image);

const keys = {};
let dialogOpen = false;
let nearbyNpc = null;
let gameStarted = false;

startBtn.addEventListener('click', () => {
  gameStarted = true;
  startOverlay.classList.add('hidden');
});

document.querySelectorAll('.animal-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.animal-btn').forEach((b) => b.classList.remove('selected'));
    btn.classList.add('selected');
    document.querySelectorAll('.floaties span').forEach((span) => {
      span.textContent = btn.dataset.emoji;
    });
  });
});

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

function activeNpcs() {
  return giftUnlocked ? NPCS.concat([GIFT]) : NPCS;
}

function charSize() {
  const height = Math.max(70, Math.min(260, Math.min(W, H) * 0.3));
  return { width: height * SPRITE_RATIO, height };
}

const MOBILE_BREAKPOINT = 700;

function npcBox(npc) {
  const isMobile = Math.min(W, H) <= MOBILE_BREAKPOINT;
  const ny = isMobile && npc.nyMobile !== undefined ? npc.nyMobile : npc.ny;
  return {
    x: npc.nx * W - CHAR.width / 2,
    y: ny * H - CHAR.height / 2,
    width: CHAR.width,
    height: CHAR.height
  };
}

function resize() {
  dpr = window.devicePixelRatio || 1;
  W = window.innerWidth;
  H = window.innerHeight;

  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.width = `${W}px`;
  canvas.style.height = `${H}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const prevCenterX = player.x + CHAR.width / 2;
  const prevCenterY = player.y + CHAR.height / 2;

  CHAR = charSize();

  const centerX = prevCenterX || W / 2;
  const centerY = prevCenterY || H / 2;
  player.x = Math.max(0, Math.min(W - CHAR.width, centerX - CHAR.width / 2));
  player.y = Math.max(0, Math.min(H - CHAR.height, centerY - CHAR.height / 2));
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);

const DIR_KEYS = { up: 'arrowup', down: 'arrowdown', left: 'arrowleft', right: 'arrowright' };

document.querySelectorAll('#dpad button').forEach((btn) => {
  const dir = DIR_KEYS[btn.dataset.dir];
  const press = (e) => { e.preventDefault(); keys[dir] = true; };
  const release = (e) => { e.preventDefault(); keys[dir] = false; };
  btn.addEventListener('pointerdown', press);
  btn.addEventListener('pointerup', release);
  btn.addEventListener('pointerleave', release);
  btn.addEventListener('pointercancel', release);
});

interactBtn.addEventListener('click', () => {
  if (nearbyNpc && !dialogOpen) openDialog(nearbyNpc);
});

window.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;

  if (dialogOpen) {
    if (e.key === 'Escape') closeDialog();
    return;
  }

  if (e.key.toLowerCase() === 'e' && nearbyNpc) {
    openDialog(nearbyNpc);
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

dialogClose.addEventListener('click', closeDialog);
dialogOverlay.addEventListener('click', (e) => {
  if (e.target === dialogOverlay) closeDialog();
});

function distanceToNpc(npc) {
  const box = npcBox(npc);
  const playerCenterX = player.x + CHAR.width / 2;
  const playerCenterY = player.y + CHAR.height / 2;
  const npcCenterX = box.x + box.width / 2;
  const npcCenterY = box.y + box.height / 2;
  return Math.hypot(playerCenterX - npcCenterX, playerCenterY - npcCenterY);
}

function updatePlayer() {
  if (dialogOpen || !gameStarted) return;

  let dx = 0;
  let dy = 0;

  if (keys['arrowup'] || keys['w']) dy -= 1;
  if (keys['arrowdown'] || keys['s']) dy += 1;
  if (keys['arrowleft'] || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;

  if (dx !== 0 && dy !== 0) {
    dx *= Math.SQRT1_2;
    dy *= Math.SQRT1_2;
  }

  player.x += dx * player.speed;
  player.y += dy * player.speed;

  player.x = Math.max(0, Math.min(W - CHAR.width, player.x));
  player.y = Math.max(0, Math.min(H - CHAR.height, player.y));

  const interactionRange = CHAR.height * 0.85;
  nearbyNpc = activeNpcs().find((npc) => distanceToNpc(npc) <= interactionRange) || null;

  interactBtn.classList.toggle('hidden', !nearbyNpc);
  if (nearbyNpc) {
    interactBtn.textContent = nearbyNpc.id === GIFT.id ? 'Abrir regalo' : 'Hablar';
  }
}

function drawBackground() {
  const img = W >= H ? bgHorizontal : bgVertical;
  if (!img.complete || img.naturalWidth === 0) {
    ctx.fillStyle = '#6bbf59';
    ctx.fillRect(0, 0, W, H);
    return;
  }

  const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
  const dw = img.naturalWidth * scale;
  const dh = img.naturalHeight * scale;
  const dx = (W - dw) / 2;
  const dy = (H - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

function drawSprite(img, box) {
  if (!img.complete || img.naturalWidth === 0) return;
  ctx.drawImage(img, box.x, box.y, box.width, box.height);
}

function drawLabel(box, text) {
  ctx.font = 'bold 13px Arial';
  const textWidth = ctx.measureText(text).width;
  const boxX = box.x + box.width / 2 - textWidth / 2 - 6;
  const boxY = box.y - 24;

  ctx.fillStyle = 'rgba(43, 31, 46, 0.85)';
  ctx.fillRect(boxX, boxY, textWidth + 12, 20);

  ctx.fillStyle = '#ffc2d1';
  ctx.textAlign = 'center';
  ctx.fillText(text, box.x + box.width / 2, boxY + 14);
}

function drawGiftGlow(box, t) {
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const pulse = 0.5 + 0.5 * Math.sin(t / 450);
  const radius = Math.max(box.width, box.height) * (0.6 + 0.15 * pulse);

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
  gradient.addColorStop(0, `rgba(255, 255, 255, ${0.55 + 0.25 * pulse})`);
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawNpcs(t) {
  activeNpcs().forEach((npc) => {
    const box = npcBox(npc);
    const isGift = npc.id === GIFT.id;

    if (isGift) {
      const bob = Math.sin(t / 500) * (CHAR.height * 0.06);
      drawGiftGlow(box, t);
      drawSprite(npc.img, { ...box, y: box.y + bob });
    } else {
      drawSprite(npc.img, box);
    }

    const isNear = npc === nearbyNpc && !dialogOpen;
    if (isNear) {
      drawLabel(box, isGift ? 'abrir regalo' : 'hablar');
    }
  });
}

function draw(t) {
  ctx.clearRect(0, 0, W, H);
  drawBackground();
  drawNpcs(t);
  const playerBox = { x: player.x, y: player.y, width: CHAR.width, height: CHAR.height };
  drawSprite(player.image, playerBox);
}

function openDialog(npc) {
  dialogOpen = true;
  dialogName.textContent = npc.title || npc.name;
  dialogContent.innerHTML = '';

  npc.dialogue.forEach(({ type, content }) => {
    if (type === 'texto') {
      const p = document.createElement('p');
      p.textContent = content;
      dialogContent.appendChild(p);
    } else if (type === 'imagen') {
      const img = document.createElement('img');
      img.src = content;
      dialogContent.appendChild(img);
    } else if (type === 'audio') {
      const audio = document.createElement('audio');
      audio.src = content;
      audio.controls = true;
      dialogContent.appendChild(audio);
    } else if (type === 'video') {
      const video = document.createElement('video');
      video.src = content;
      video.controls = true;
      dialogContent.appendChild(video);
    }
  });

  dialogOverlay.classList.remove('hidden');

  if (npc.id !== GIFT.id) {
    visited.add(npc.id);
    if (!giftUnlocked && visited.size >= NPCS.length) {
      giftUnlocked = true;
    }
  }
}

function closeDialog() {
  dialogOpen = false;
  dialogOverlay.classList.add('hidden');
  dialogContent.innerHTML = '';
}

function loop(t) {
  if (W !== window.innerWidth || H !== window.innerHeight) resize();
  updatePlayer();
  draw(t);
  requestAnimationFrame(loop);
}

resize();
CHAR = charSize();
player.x = W / 2 - CHAR.width / 2;
player.y = Math.max(0, H * 0.3 - CHAR.height / 2);

requestAnimationFrame(loop);
