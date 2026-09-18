const materials = {
  satin: [
    { id: "sun", name: "向日葵黄", swatch: "linear-gradient(135deg,#ffe67a,#f4b300 58%,#fff4a9)", ribbon: "linear-gradient(90deg,#c98a00 0%,#efae14 10%,#ffe58a 25%,#eeb21c 41%,#ffed9a 55%,#e0a20d 72%,#ffd45a 89%,#bd7b00 100%)", pattern: "radial-gradient(circle,#fff 0 18%,transparent 20%) 0 0 / 28px 28px" },
    { id: "cream", name: "奶油白", swatch: "linear-gradient(135deg,#fff,#f4e6c5)", ribbon: "linear-gradient(90deg,#cdb688 0%,#f0ddb8 10%,#fffbed 26%,#e6ca9a 42%,#fffdf2 56%,#d9bd8d 72%,#f8e8c6 89%,#c1a476 100%)", pattern: "repeating-linear-gradient(90deg,transparent 0 24px,rgba(205,145,0,.45) 25px 27px)" },
    { id: "pink", name: "樱花粉", swatch: "linear-gradient(135deg,#ffd4ed,#ff8cc7)", ribbon: "linear-gradient(90deg,#bd5689 0%,#ee78b1 10%,#ffd4e7 25%,#ea6ca7 41%,#ffe1ed 55%,#db5d9b 71%,#fb9fc6 89%,#b5477c 100%)", pattern: "radial-gradient(circle,#fff 0 16%,transparent 18%) 0 0 / 27px 27px" },
    { id: "violet", name: "葡萄紫", swatch: "linear-gradient(135deg,#e7c5ff,#7c44cf)", ribbon: "linear-gradient(90deg,#563284 0%,#8052bb 10%,#d7b7f5 25%,#7444ad 41%,#e4cff9 55%,#63349c 71%,#a878d5 89%,#492674 100%)", pattern: "repeating-linear-gradient(45deg,transparent 0 16px,rgba(255,255,255,.35) 18px 20px)" },
    { id: "sky", name: "薄荷蓝", swatch: "linear-gradient(135deg,#e3fbff,#81d8ef)", ribbon: "linear-gradient(90deg,#3d8da0 0%,#6cbdd0 10%,#d5f5f8 25%,#5bb1c4 41%,#e3f9fb 55%,#4ca1b4 71%,#9ddfe7 89%,#337c90 100%)", pattern: "radial-gradient(circle,#fff 0 16%,transparent 18%) 0 0 / 28px 28px" },
    { id: "mint", name: "糖霜绿", swatch: "linear-gradient(135deg,#dfffe8,#81e6b1)", ribbon: "linear-gradient(90deg,#3b9365 0%,#6bc694 10%,#d8f9e3 25%,#5aba82 41%,#e5faeb 55%,#49a972 71%,#9ce1b7 89%,#328157 100%)", pattern: "repeating-linear-gradient(135deg,transparent 0 18px,rgba(255,255,255,.38) 19px 21px)" }
  ],
  lace: [
    { id: "ivory", name: "象牙蕾丝", swatch: "radial-gradient(circle,#fff 0 18%,transparent 20%) 0 0/18px 18px,#fff3d2", lace: "rgba(255,248,225,.78)" },
    { id: "rose", name: "玫瑰蕾丝", swatch: "radial-gradient(circle,#fff 0 18%,transparent 20%) 0 0/18px 18px,#ffc8e8", lace: "rgba(255,205,234,.72)" },
    { id: "gold", name: "金线蕾丝", swatch: "repeating-linear-gradient(45deg,#fff7d5 0 8px,#d6a200 9px 11px)", lace: "rgba(255,239,183,.78)" },
    { id: "white", name: "透明白纱", swatch: "linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.42))", lace: "rgba(255,255,255,.68)" },
    { id: "hotpink", name: "桃粉蕾丝", swatch: "repeating-radial-gradient(circle,#fff 0 2px,#ff6bb4 3px 8px)", lace: "rgba(255,131,196,.66)" },
    { id: "smoke", name: "烟灰蕾丝", swatch: "radial-gradient(circle,#fff 0 18%,transparent 20%) 0 0/18px 18px,#454050", lace: "rgba(54,50,64,.58)" }
  ],
  pearl: [
    { id: "white", name: "白珍珠", swatch: "radial-gradient(circle,#fff 0 26%,#eed7ac 28% 42%,transparent 44%) 0 0/25px 25px" },
    { id: "gold", name: "金珠链", swatch: "radial-gradient(circle,#fff7b6 0 24%,#d99b00 26% 42%,transparent 44%) 0 0/24px 24px" },
    { id: "pink", name: "粉珍珠", swatch: "radial-gradient(circle,#ffe2f0 0 26%,#ef9ac5 28% 42%,transparent 44%) 0 0/25px 25px" },
    { id: "mixed", name: "混合珠", swatch: "radial-gradient(circle at 30% 30%,#fff 0 14%,transparent 16%),radial-gradient(circle at 65% 55%,#ffd8ed 0 14%,transparent 16%),#fff2fb" }
  ],
  gem: [
    { id: "heart", name: "水钻心", swatch: "linear-gradient(135deg,#fff,#bff7ff,#ff9fde)" },
    { id: "diamond", name: "圆钻", swatch: "radial-gradient(circle,#fff 0 16%,#a9f1ff 28%,#e9e9ff 56%,#fff)" },
    { id: "drop", name: "水滴钻", swatch: "linear-gradient(135deg,#d7fcff,#77e0f4 58%,#fff)" },
    { id: "star", name: "星星钻", swatch: "linear-gradient(135deg,#fff,#ffe682,#ffb0dd)" },
    { id: "bow", name: "钻蝴蝶", swatch: "linear-gradient(135deg,#fff,#ffd2ec,#aef6ff)" },
    { id: "crown", name: "皇冠钻", swatch: "linear-gradient(135deg,#fff3aa,#ffbf1e,#fff)" }
  ],
  fold: [
    { id: "round", name: "圆环窝法", swatch: "linear-gradient(135deg,#fff6fb,#ffc3e2)" },
    { id: "fan", name: "扇形窝法", swatch: "linear-gradient(90deg,#fff6fb,#ffc3e2 45%,#fff6fb)" },
    { id: "star", name: "星芒窝法", swatch: "conic-gradient(from 20deg,#fff,#ffc3e2,#fff,#ffc3e2,#fff)" },
    { id: "bow", name: "蝴蝶窝法", swatch: "radial-gradient(circle at 30% 45%,#ffc3e2 0 24%,transparent 25%),radial-gradient(circle at 70% 45%,#ffc3e2 0 24%,transparent 25%),#fff6fb" }
  ]
};

const defaults = {
  satin: "pink",
  satinSecondary: "sky",
  tailCount: 5,
  tailDesigns: createTailDesigns(),
  lace: "white",
  pearl: "white",
  gem: "heart",
  gemPlacements: {},
  fold: "round",
  layers: 5,
  badge: "bow",
  name: "JQ",
  zoom: 1,
  favorited: false,
  glitter: false
};

const storageKey = "corsage-maker-draft-v2";
// Keep saved layout keys unchanged while displaying the actual ribbon-layer count.
const layerLabels = { 3: "1层", 5: "2层", 7: "3层", 9: "4层" };
const groupLabels = { satin: ["第一层缎带", "✦"], satinSecondary: ["第二层缎带", "✦"], lace: ["蕾丝", "♧"], pearl: ["珍珠", "●"], gem: ["钻饰", "◆"] };
const badges = {
  grad: { name: "黑金毕业帽", short: "毕业帽", src: "./assets/badges/badge-grad.png", size: "64%", x: "0%", y: "0%", rotate: "0deg", showsYear: true },
  bow: { name: "粉缎珍珠蝴蝶结", short: "缎面蝴蝶结", src: "./assets/badges/badge-bow.png", size: "69%", x: "0%", y: "0%", rotate: "-1deg" },
  crown: { name: "香槟金水钻皇冠", short: "水钻皇冠", src: "./assets/badges/badge-crown.png", size: "64%", x: "0%", y: "0%", rotate: "0deg" },
  heart: { name: "玫瑰金水晶爱心", short: "水晶爱心", src: "./assets/badges/badge-heart.png", size: "62%", x: "0%", y: "0%", rotate: "1deg" },
  pearl: { name: "双圈珍珠花环", short: "珍珠花环", src: "./assets/badges/badge-pearl.png", size: "62%", x: "0%", y: "0%", rotate: "0deg" },
  star: { name: "幻彩水晶星芒", short: "水晶星芒", src: "./assets/badges/badge-star.png", size: "61%", x: "0%", y: "0%", rotate: "2deg" },
  rose: { name: "象牙纱珍珠玫瑰", short: "纱缎玫瑰", src: "./assets/badges/badge-rose.png", size: "69%", x: "0%", y: "0%", rotate: "-2deg" },
  moon: { name: "鎏金月亮星星", short: "月亮星星", src: "./assets/badges/badge-moon.png", size: "62%", x: "0%", y: "0%", rotate: "2deg" }
};
const badgeNames = runtime.fromEntries(Object.entries(badges).map(([id, badge]) => [id, badge.name]));

function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || typeof saved !== "object") return Object.assign({}, defaults);
    const safe = Object.assign({}, defaults);
    Object.keys(defaults).forEach(key => {
      if (runtime.hasOwn(saved, key) && typeof saved[key] === typeof defaults[key]) safe[key] = saved[key];
    });
    ["satin", "satinSecondary", "lace", "pearl", "gem", "fold"].forEach(key => {
      if (!getMaterialOptions(key).some(item => item.id === safe[key])) safe[key] = defaults[key];
    });
    if (![3, 5, 7, 9].includes(safe.layers)) safe.layers = defaults.layers;
    if (![1, 2, 3, 4, 5].includes(safe.tailCount)) safe.tailCount = defaults.tailCount;
    safe.tailDesigns = sanitizeTailDesigns(saved.tailDesigns, safe.satin, safe.satinSecondary);
    if (!runtime.hasOwn(badges, safe.badge)) safe.badge = defaults.badge;
    safe.name = sanitizeName(safe.name);
    safe.zoom = Number.isFinite(safe.zoom) ? Math.min(1.2, Math.max(.82, safe.zoom)) : 1;
    safe.gemPlacements = sanitizeGemPlacements(safe.gemPlacements);
    return safe;
  } catch (error) {
    return Object.assign({}, defaults);
  }
}

let state = loadDraft();
let gemInteraction = null;
let undoStack = [];
let redoStack = [];
let activeStep = "materials";
const stepOrder = ["materials", "shape", "personalize"];
let maxStepReached = 0;

const panel = document.querySelector(".material-panel");
const corsage = document.querySelector("#corsage");
const previewStage = document.querySelector(".preview-stage");
const toast = document.querySelector("#toast");
const finishDialog = document.querySelector("#finish-dialog");
const soundButton = document.querySelector("#sound-button");
const nextStepButton = document.querySelector("#next-step-button");
const nextStepHint = document.querySelector("#next-step-hint");
const nextStepLabel = document.querySelector("#next-step-label");
const stageNumber = document.querySelector("#stage-number");
const fxLayer = document.querySelector("#fx-layer");
const fxNote = document.querySelector("#fx-note");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const soundStorageKey = "corsage-maker-sound-v1";
let soundEnabled = loadSoundSetting();
let audioContext = null;
let masterGain = null;
let activeVoices = new Set();
let soundTimes = new Map();
let feedbackNoteAt = 0;

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
}

function getMaterialOptions(group) {
  return materials[group === "satinSecondary" ? "satin" : group];
}

function getItem(group, id) {
  const options = getMaterialOptions(group);
  return options.find(item => item.id === id) || options[0];
}

function ribbonColorDescription() {
  return `第一层${getItem("satin", state.satin).name} · 第二层${getItem("satinSecondary", state.satinSecondary).name}`;
}

function sanitizeName(value) {
  if (!sanitizeName.pattern) {
    try { sanitizeName.pattern = new RegExp("[^\\p{L}\\p{N}]", "gu"); }
    catch (error) { sanitizeName.pattern = /[^A-Z0-9\u00C0-\u024F\u3400-\u9FFF\uF900-\uFAFF]/g; }
  }
  return [...String(value).normalize("NFC").toUpperCase().replace(sanitizeName.pattern, "")].slice(0, 8).join("");
}

function pushState() {
  undoStack.push(Object.assign({}, state));
  if (undoStack.length > 40) undoStack.shift();
  redoStack = [];
}

function activateStep(step) {
  activeStep = stepOrder.includes(step) ? step : "materials";
  maxStepReached = Math.max(maxStepReached, stepOrder.indexOf(activeStep));
}

function setState(patch, { record = true, feedback = "auto" } = {}) {
  const changedKeys = Object.entries(patch).filter(([key, value]) => state[key] !== value).map(([key]) => key);
  if (!changedKeys.length) return false;
  if (record) pushState();
  else if (changedKeys.some(key => !["zoom", "favorited"].includes(key))) redoStack = [];
  state = Object.assign({}, state, patch);
  renderAll();
  if (feedback !== false) emitFeedback(feedback === "auto" ? feedbackKind(changedKeys) : feedback, changedKeys);
  return true;
}

function makeMaterialPanel() {
  const headingNode = panel.querySelector(".panel-heading");
  const heading = headingNode ? headingNode.outerHTML : "";
  panel.innerHTML = heading + Object.entries(groupLabels).map(([key, [label, icon]]) => `
    <section class="material-group">
      <h2><span aria-hidden="true">${icon}</span>${label}<small data-selected-label="${key}"></small></h2>
      <div class="swatch-grid" data-key="${key}" role="group" aria-label="${label}">
        ${getMaterialOptions(key).map(item => `<button type="button" aria-label="${item.name}" title="${label}：${item.name}" data-value="${item.id}" style="--swatch:${item.swatch}"></button>`).join("")}
      </div>
    </section>
  `).join("");
}

function makeBadgePanel() {
  const grid = document.querySelector(".badge-grid");
  grid.innerHTML = Object.entries(badges).map(([id, badge], index) => `
    <button type="button" data-value="${id}" aria-label="${badge.name}实物胸针" title="${badge.name}">
      <img src="${badge.src}" alt="" width="512" height="512" ${index === 0 ? "" : 'loading="lazy"'} decoding="async" draggable="false" />
      <small>${badge.short}</small>
    </button>
  `).join("");
}

function renderCorsage() {
  if (gemInteraction) gemInteraction.cancel();
  const focused = document.activeElement && document.activeElement.closest(".ribbon-jewel");
  const focusedJewel = focused ? focused.dataset.jewelId : undefined;
  corsage.style.setProperty("--scale", state.zoom);
  corsage.dataset.fold = state.fold;
  corsage.dataset.layers = String(state.layers);
  const signature = JSON.stringify(runtime.fromEntries(Object.entries(state).filter(([key]) => !["zoom", "favorited"].includes(key))));
  if (signature !== renderCorsage.signature) {
    corsage.innerHTML = corsageArtwork(state);
    renderCorsage.signature = signature;
    const nextFocus = focusedJewel === undefined ? null : corsage.querySelector(`.ribbon-jewel[data-jewel-id="${focusedJewel}"]`);
    if (nextFocus) nextFocus.focus({ preventScroll: true });
  }
}

function updateActiveButtons() {
  updateTailControls();
  document.querySelectorAll("[data-key]").forEach(group => {
    const key = group.dataset.key;
    group.querySelectorAll("[data-value]").forEach(button => {
      const active = String(state[key]) === button.dataset.value;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  });
  document.querySelectorAll("[data-selected-label]").forEach(label => {
    label.textContent = getItem(label.dataset.selectedLabel, state[label.dataset.selectedLabel]).name;
  });
  const currentStepIndex = stepOrder.indexOf(activeStep);
  document.querySelector(".game").dataset.step = activeStep;
  document.querySelectorAll("[data-jump]").forEach((button, index) => {
    const current = button.dataset.jump === activeStep;
    const completed = index < maxStepReached && !current;
    button.classList.toggle("current", current);
    button.classList.toggle("completed", completed);
    if (current) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
    button.setAttribute("aria-label", `${button.querySelector("span").textContent}${current ? "，当前关卡" : completed ? "，已完成" : ""}`);
  });
  const nextCopy = [
    { hint: "材料选好了吗？", label: "去叠花型", aria: "进入下一步：叠花型" },
    { hint: "花型满意吗？", label: "去贴文字", aria: "进入下一步：贴文字" },
    { hint: "最后检查一下", label: "完成！", aria: "完成胸花定制" }
  ][currentStepIndex];
  stageNumber.textContent = String(currentStepIndex + 1);
  stageNumber.parentElement.setAttribute("aria-label", `第${currentStepIndex + 1}关，共3关`);
  nextStepHint.textContent = nextCopy.hint;
  nextStepLabel.textContent = nextCopy.label;
  nextStepButton.setAttribute("aria-label", nextCopy.aria);
  nextStepButton.dataset.final = String(currentStepIndex === stepOrder.length - 1);
  const footerNextButton = document.querySelector("#finish-button");
  const isFinalStep = currentStepIndex === stepOrder.length - 1;
  footerNextButton.querySelector("b").textContent = isFinalStep ? "✓" : "➜";
  footerNextButton.querySelector("span").textContent = isFinalStep ? "完成定制" : "下一关";
  footerNextButton.setAttribute("aria-label", nextCopy.aria);
  const settingsKicker = document.querySelector("#settings-step-kicker");
  const settingsTitle = document.querySelector("#settings-step-title");
  settingsKicker.textContent = activeStep === "personalize" ? "STEP 03" : "STEP 02";
  settingsTitle.textContent = activeStep === "personalize" ? "绶带 · 闪钻字" : "叠花型 · 别胸针";
  document.querySelector("#undo-button").disabled = undoStack.length === 0;
  document.querySelector("#redo-button").disabled = redoStack.length === 0;
  document.querySelector('#glitter-button').setAttribute('aria-pressed', String(state.glitter));
  document.querySelector('#glitter-button span').textContent = state.glitter ? '收起星星' : '撒点星星';
  document.querySelector('#glitter-button').setAttribute('aria-label', state.glitter ? '移除星光装饰' : '添加星光装饰');
  document.querySelector('#helper-copy').textContent = {materials:'点一点材料，也可以拖过来哦',shape:'别上喜欢的宝物，再轻戳一下',personalize:'把心意贴上绶带，送给喜欢的人'}[activeStep];
  document.querySelector('#stage-number').textContent = String(currentStepIndex + 1);
}

function updateSummary() {
  const colors = ribbonColorDescription();
  const fold = getItem("fold", state.fold);
  previewStage.dataset.tone = state.satin;
  document.querySelector("#selection-summary").textContent = `${colors} · ${fold.name} · ${layerLabels[state.layers]} · ${state.tailCount}条绶带 · ${badgeNames[state.badge]}`;
  document.querySelector("#material-name").textContent = `${colors}缎带`;
  document.querySelector("#layer-count").textContent = `${fold.name.replace("窝法", "")} · ${layerLabels[state.layers]}`;
  if (document.activeElement !== document.querySelector("#name-input")) document.querySelector("#name-input").value = state.name;
  corsage.setAttribute("aria-label", `${colors}、${fold.name}、${layerLabels[state.layers]}、${state.tailCount}条绶带、${badgeNames[state.badge]}徽章、${state.name ? `贴字${state.name}、` : ""}胸花，轻戳让它回弹`);
}

function renderAll() {
  renderCorsage();
  updateSummary();
  updateActiveButtons();
}

function showToast(message, actionLabel = "") {
  toast.innerHTML = `<span>${escapeHTML(message)}</span>${actionLabel ? `<button type="button">${escapeHTML(actionLabel)}</button>` : ""}`;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function loadSoundSetting() {
  try {
    return localStorage.getItem(soundStorageKey) !== "off";
  } catch (error) {
    return true;
  }
}

function saveSoundSetting() {
  try {
    localStorage.setItem(soundStorageKey, soundEnabled ? "on" : "off");
  } catch (error) {
    // Sound still works for this visit when local storage is unavailable.
  }
}

function updateSoundButton() {
  const supported = Boolean(window.AudioContext || window.webkitAudioContext);
  soundButton.disabled = !supported;
  soundButton.setAttribute("aria-pressed", String(soundEnabled && supported));
  soundButton.setAttribute("aria-label", supported ? (soundEnabled ? "关闭音效" : "开启音效") : "当前浏览器不支持音效");
  soundButton.querySelector(".action-tooltip").textContent = soundButton.getAttribute("aria-label");
}

function unlockAudio() {
  if (!soundEnabled || document.visibilityState === "hidden") return null;
  const AudioConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioConstructor) return null;
  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioConstructor();
    masterGain = audioContext.createGain();
    masterGain.gain.value = .11;
    masterGain.connect(audioContext.destination);
  }
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  return audioContext;
}

function scheduleTone(context, note, baseTime) {
  if (!masterGain || activeVoices.size >= 7) return;
  const oscillator = context.createOscillator();
  const envelope = context.createGain();
  const start = baseTime + (note.at || 0);
  const end = start + note.duration;
  oscillator.type = note.type || "sine";
  oscillator.frequency.setValueAtTime(note.from, start);
  oscillator.frequency.exponentialRampToValueAtTime(note.to || note.from, end);
  envelope.gain.setValueAtTime(.0001, start);
  envelope.gain.exponentialRampToValueAtTime(note.gain || .24, start + .012);
  envelope.gain.exponentialRampToValueAtTime(.0001, end);
  oscillator.connect(envelope);
  envelope.connect(masterGain);
  activeVoices.add(oscillator);
  oscillator.onended = () => {
    activeVoices.delete(oscillator);
    oscillator.disconnect();
    envelope.disconnect();
  };
  oscillator.start(start);
  oscillator.stop(end + .01);
}

function playSound(kind) {
  if (!soundEnabled || document.visibilityState === "hidden") return;
  const cooldown = kind === "personalize" ? 135 : kind === "ui" ? 75 : 55;
  const now = performance.now();
  if (now - (soundTimes.get(kind) || 0) < cooldown) return;
  const context = unlockAudio();
  if (!context) return;
  soundTimes.set(kind, now);
  const sounds = {
    material: [{ from: 520, to: 650, duration: .11, gain: .22, type: "triangle" }],
    jewel: [{ from: 860, to: 1120, duration: .1, gain: .22 }, { from: 1180, to: 980, at: .035, duration: .11, gain: .16 }],
    shape: [{ from: 330, to: 440, duration: .12, gain: .24, type: "triangle" }, { from: 550, to: 580, at: .07, duration: .09, gain: .14 }],
    badge: [{ from: 660, to: 700, duration: .12, gain: .24 }, { from: 990, to: 1080, at: .055, duration: .14, gain: .2 }],
    personalize: [{ from: 690, to: 760, duration: .065, gain: .14, type: "triangle" }],
    ui: [{ from: 440, to: 500, duration: .055, gain: .12, type: "triangle" }],
    undo: [{ from: 590, to: 460, duration: .12, gain: .18, type: "triangle" }, { from: 420, to: 360, at: .07, duration: .1, gain: .13 }],
    redo: [{ from: 390, to: 480, duration: .11, gain: .17, type: "triangle" }, { from: 560, to: 640, at: .065, duration: .1, gain: .14 }],
    stage: [{ from: 420, to: 560, duration: .1, gain: .17, type: "triangle" }, { from: 690, to: 820, at: .07, duration: .13, gain: .16 }],
    back: [{ from: 640, to: 520, duration: .1, gain: .15, type: "triangle" }, { from: 450, to: 370, at: .06, duration: .12, gain: .13 }],
    reset: [{ from: 410, to: 260, duration: .15, gain: .19, type: "sine" }],
    random: [{ from: 440, to: 470, duration: .09, gain: .18 }, { from: 660, to: 700, at: .065, duration: .1, gain: .18 }, { from: 880, to: 940, at: .13, duration: .11, gain: .17 }, { from: 1170, to: 1240, at: .2, duration: .15, gain: .14 }],
    favorite: [{ from: 620, to: 760, duration: .12, gain: .2 }, { from: 880, to: 920, at: .07, duration: .13, gain: .15 }],
    save: [{ from: 720, to: 820, duration: .12, gain: .2 }, { from: 980, to: 1040, at: .075, duration: .14, gain: .17 }],
    share: [{ from: 520, to: 660, duration: .1, gain: .17, type: "triangle" }, { from: 820, to: 960, at: .065, duration: .13, gain: .15 }],
    success: [{ from: 523, to: 560, duration: .13, gain: .2 }, { from: 659, to: 700, at: .085, duration: .14, gain: .19 }, { from: 784, to: 850, at: .17, duration: .16, gain: .18 }, { from: 1047, to: 1120, at: .26, duration: .18, gain: .15 }],
    error: [{ from: 260, to: 220, duration: .12, gain: .13, type: "triangle" }]
  };
  (sounds[kind] || sounds.ui).forEach(note => scheduleTone(context, note, context.currentTime + .008));
}

function feedbackKind(keys) {
  if (keys.includes("badge")) return "badge";
  if (keys.includes("layers") || keys.includes("fold") || keys.includes("tailCount")) return "shape";
  if (keys.includes("glitter") || keys.includes("pearl") || keys.includes("gem") || keys.includes("gemPlacements")) return "jewel";
  if (keys.includes("satin") || keys.includes("satinSecondary") || keys.includes("lace") || keys.includes("tailDesigns")) return "material";
  if (keys.includes("name")) return "personalize";
  if (keys.includes("favorited")) return "favorite";
  return "ui";
}

function feedbackMessage(kind, keys = []) {
  const primary = keys[0];
  const messages = {
    satin: "第一层缎面换好啦 ✦", satinSecondary: "第二层缎面换好啦 ✦", lace: "蕾丝叠上啦 ♡", pearl: "珍珠串好啦 ·", gem: "水钻闪起来 ✦",
    fold: "花型窝好啦 ↻", layers: "花体叠好啦 ✦", badge: "徽章别好啦 ✦",
    tailCount: "绶带排好啦", tailDesigns: "绶带换好啦",
    name: "文字贴好啦", random: "灵感大变身！", reset: "回到粉蓝双层款",
    undo: "撤回上一针 ↶", redo: "重新绣回来 ↷", favorite: "收进心动搭配 ♡", save: "作品收好啦",
    share: "准备分享作品", success: "专属胸花完成！"
  };
  if (["random", "reset", "undo", "redo", "favorite", "save", "share", "success"].includes(kind)) return messages[kind];
  return messages[primary] || messages[kind] || "搭配更新啦 ✦";
}

function animateFeedbackTarget(kind) {
  if (reduceMotion.matches || !runtime.canAnimate) return;
  const body = corsage.querySelector('.flower-body');
  runtime.animations(body).forEach(animation => animation.cancel());
  runtime.animate(body, [
    { transform:'scale(1,1) rotate(0deg)', offset:0 },
    { transform:'scale(1.07,.93) rotate(-1.5deg)', offset:.18 },
    { transform:'scale(.96,1.05) rotate(1deg)', offset:.44 },
    { transform:'scale(1.018,.987) rotate(-.3deg)', offset:.72 },
    { transform:'scale(1,1) rotate(0deg)', offset:1 }
  ], {duration:kind === 'personalize' ? 330 : 480, easing:'ease-out'});
  const target = kind === 'badge' ? corsage.querySelector('.badge-art') : kind === 'shape' || kind === 'random' ? corsage.querySelector('.flower-petals') : null;
  runtime.animate(target, [
    {transform:kind === 'badge' ? 'translateY(-25px) scale(.7) rotate(-12deg)' : 'scale(.8) rotate(-8deg)',opacity:.5},
    {transform:'scale(1.07) rotate(3deg)',opacity:1,offset:.6},
    {transform:'scale(1) rotate(0deg)',opacity:1}
  ],{duration:460,easing:'ease-out'});
}

function animateMaterialArrival(option) {
  if (reduceMotion.matches || !runtime.canAnimate) return;
  const start = option.getBoundingClientRect();
  const finish = corsage.getBoundingClientRect();
  const chip = document.createElement('div');
  chip.className = 'drag-chip';
  chip.setAttribute('aria-hidden','true');
  chip.style.left='0'; chip.style.top='0';
  chip.style.setProperty('--swatch',option.style.getPropertyValue('--swatch') || '#fff2ef');
  const icon=option.querySelector('img');
  if(icon) chip.append(icon.cloneNode());
  else chip.textContent = option.style.getPropertyValue('--swatch') ? '' : '✿';
  document.body.append(chip);
  const animation = chip.animate([
    {transform:`translate(${start.x+start.width/2-28}px,${start.y+start.height/2-28}px) scale(.7) rotate(-10deg)`,opacity:.9},
    {transform:`translate(${finish.x+finish.width*.5-28}px,${finish.y+finish.height*.37-28}px) scale(.2) rotate(12deg)`,opacity:0}
  ],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'});
  animation.onfinish=()=>chip.remove(); animation.oncancel=()=>chip.remove();
  option.animate([{transform:'scale(.93,.86)'},{transform:'scale(1.07,1.04)',offset:.55},{transform:'scale(1)'}],{duration:350,easing:'ease-out'});
}

function starBurst(x, y, count=7) {
  if (reduceMotion.matches || !runtime.canAnimate) return;
  const bounds = previewStage.getBoundingClientRect();
  const left = x == null ? bounds.width*.5 : x, top = y == null ? bounds.height*.42 : y;
  for(let i=0; i<count; i++) {
    const star = document.createElement('span');
    star.className = 'star-particle';
    star.textContent = i%3 ? '✧' : '♡';
    star.style.left = `${left}px`; star.style.top = `${top}px`;
    const angle = i*Math.PI*2/count;
    fxLayer.append(star);
    const animation = star.animate([
      {transform:'translate(-50%,-50%) scale(.35)',opacity:0},
      {opacity:1,offset:.15},
      {transform:`translate(${Math.cos(angle)*70}px,${Math.sin(angle)*64-25}px) rotate(${i%2 ? 35 : -25}deg) scale(1)`,opacity:0}
    ],{duration:620+i*20,easing:'cubic-bezier(.22,1,.36,1)'});
    animation.onfinish = () => star.remove();
    animation.oncancel = () => star.remove();
  }
}

function emitFeedback(kind, keys = []) {
  playSound(kind);
  if (kind === 'ui' || kind === 'error') return;
  animateFeedbackTarget(kind);
  starBurst(undefined, undefined, ['success','random'].includes(kind) ? 12 : 5);
  const now = performance.now();
  if (kind === 'personalize' && now - feedbackNoteAt < 450) return;
  feedbackNoteAt = now;
  fxNote.textContent = feedbackMessage(kind, keys);
  fxNote.classList.remove('show');
  void fxNote.offsetWidth;
  fxNote.classList.add('show');
  clearTimeout(emitFeedback.noteTimer);
  emitFeedback.noteTimer = setTimeout(() => fxNote.classList.remove('show'), 980);
}

function randomize() {
  const looks = [
    {satin:'pink',satinSecondary:'sky',lace:'white',pearl:'white',gem:'heart',fold:'round',badge:'bow',layers:5},
    {satin:'sky',satinSecondary:'violet',lace:'white',pearl:'mixed',gem:'star',fold:'star',badge:'star',layers:5},
    {satin:'mint',satinSecondary:'pink',lace:'ivory',pearl:'white',gem:'drop',fold:'fan',badge:'rose',layers:7},
    {satin:'violet',satinSecondary:'sky',lace:'rose',pearl:'pink',gem:'star',fold:'bow',badge:'moon',layers:5},
    {satin:'sun',satinSecondary:'mint',lace:'gold',pearl:'gold',gem:'diamond',fold:'round',badge:'grad',layers:3},
    {satin:'cream',satinSecondary:'pink',lace:'ivory',pearl:'white',gem:'heart',fold:'round',badge:'heart',layers:7}
  ].filter(look => look.satin !== state.satin);
  const look = looks[Math.floor(Math.random()*looks.length)];
  setState(Object.assign({}, look, { tailDesigns: createTailDesigns(look.satin, look.satinSecondary) }), {feedback:'random'});
  showToast("灵感搭配已生成，看看这朵怎么样？");
}

function designDescription() {
  return `${state.name ? `贴字：${state.name}` : "无贴字"} · ${ribbonColorDescription()} · ${getItem("lace", state.lace).name} · ${getItem("fold", state.fold).name} · ${layerLabels[state.layers]} · ${tailDescription(state)} · ${badgeNames[state.badge]}`;
}

function openFinishDialog() {
  activateStep("personalize");
  updateActiveButtons();
  const code = `COR-${Date.now().toString().slice(-6)}`;
  document.querySelector("#finish-summary").textContent = designDescription();
  document.querySelector("#design-code").textContent = code;
  document.querySelector("#finish-preview").innerHTML = corsageArtwork(state,"postcard");
  runtime.openDialog(finishDialog);
  emitFeedback("success");
}

async function saveDesignSheet() {
  const button = document.querySelector("#confirm-save-button");
  if (button.disabled) return;
  button.disabled = true;
  const payload = {
    code: document.querySelector("#design-code").textContent,
    createdAt: new Date().toISOString(),
    description: designDescription(),
    configuration: Object.assign({}, state)
  };
  try {
    const message = await corsagePlatform.saveDesign(payload, storageKey);
    runtime.closeDialog(finishDialog);
    showToast(message);
    emitFeedback("save");
  } catch (error) {
    showToast("设计未能保存，当前搭配仍在，请重试");
  } finally {
    button.disabled = false;
  }
}

makeMaterialPanel();
makeBadgePanel();
makeTailControls();
updateSoundButton();
renderAll();
document.querySelector("#export-button").textContent = corsagePlatform.imageLabel;
document.querySelector("#confirm-save-button").textContent = corsagePlatform.designLabel;

window.addEventListener("pointerdown", unlockAudio, { capture: true, once: true });
window.addEventListener("keydown", unlockAudio, { capture: true, once: true });

document.addEventListener("click", event => {
  const option = event.target.closest("[data-key] [data-value]");
  if (option) {
    if (performance.now() < suppressClickUntil) return;
    const key = option.closest("[data-key]").dataset.key;
    const value = ["layers", "tailCount"].includes(key) ? Number(option.dataset.value) : option.dataset.value;
    const changed = setState({ [key]: value });
    const optionName = option.getAttribute("aria-label") || option.textContent.trim();
    if (changed) {
      animateMaterialArrival(option);
    } else {
      option.classList.remove("reselect");
      void option.offsetWidth;
      option.classList.add("reselect");
      clearTimeout(option.reselectTimer);
      option.reselectTimer = setTimeout(() => option.classList.remove("reselect"), 260);
      showToast(`${optionName}已经选中`);
      emitFeedback(feedbackKind([key]), [key]);
    }
    return;
  }
  const jumpButton = event.target.closest("button[data-jump]");
  if (jumpButton) {
    goToStep(jumpButton.dataset.jump);
    return;
  }
});

function goToStep(step, { announce = true } = {}) {
  if (step === activeStep) return false;
  const previousStepIndex = stepOrder.indexOf(activeStep);
  activateStep(step);
  updateActiveButtons();
  const activePanel = activeStep === "materials" ? panel : document.querySelector(".settings-panel");
  runtime.scrollTop(activePanel);
  if (window.matchMedia("(max-width:700px)").matches) previewStage.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
  const targetHeading = activeStep === "materials"
    ? document.querySelector("#materials-step-title")
    : document.querySelector("#settings-step-title");
  targetHeading.focus({ preventScroll: true });
  if (announce) {
    const message = { materials: "LEVEL 1 · 挑选闪亮材料", shape: "LEVEL 2 · 叠出喜欢的花型", personalize: "LEVEL 3 · 贴上专属文字" }[activeStep];
    showToast(message);
  }
  playSound(stepOrder.indexOf(activeStep) < previousStepIndex ? "back" : "stage");
  previewStage.classList.remove("level-shift");
  void previewStage.offsetWidth;
  previewStage.classList.add("level-shift");
  clearTimeout(goToStep.timer);
  goToStep.timer = setTimeout(() => previewStage.classList.remove("level-shift"), 360);
  return true;
}

nextStepButton.addEventListener("click", () => {
  const currentStepIndex = stepOrder.indexOf(activeStep);
  if (currentStepIndex === stepOrder.length - 1) {
    openFinishDialog();
    return;
  }
  goToStep(stepOrder[currentStepIndex + 1]);
});

let nameEditOpen = false;
const nameInput = document.querySelector('#name-input');
function applyNameInput(event) {
  if (event.isComposing) return;
  const caret = nameInput.selectionStart;
  const raw = nameInput.value;
  const clean = sanitizeName(raw);
  const beforeCaret = sanitizeName(raw.slice(0,caret)).length;
  const changed = setState({name:clean},{record:!nameEditOpen});
  if (changed) nameEditOpen = true;
  nameInput.value = clean;
  nameInput.setSelectionRange(beforeCaret,beforeCaret);
}
nameInput.addEventListener('input', applyNameInput);
nameInput.addEventListener('compositionend', applyNameInput);
nameInput.addEventListener('blur', () => { nameEditOpen = false; });

document.querySelector("#undo-button").addEventListener("click", () => {
  if (!undoStack.length) {
    showToast("已经是第一步啦");
    emitFeedback("error");
    return;
  }
  redoStack.push(Object.assign({}, state));
  state = Object.assign({}, undoStack.pop(), { zoom:state.zoom, favorited:state.favorited });
  nameEditOpen = false;
  renderAll();
  nameInput.value = state.name;
  emitFeedback("undo");
});

document.querySelector("#redo-button").addEventListener("click", () => {
  if (!redoStack.length) {
    showToast("没有可重做的步骤");
    emitFeedback("error");
    return;
  }
  undoStack.push(Object.assign({}, state));
  state = Object.assign({}, redoStack.pop(), { zoom:state.zoom, favorited:state.favorited });
  nameEditOpen = false;
  renderAll();
  nameInput.value = state.name;
  emitFeedback("redo");
});

document.querySelector("#clear-button").addEventListener("click", () => {
  activeStep = "materials";
  maxStepReached = 0;
  setState(Object.assign({}, defaults), { feedback: "reset" });
  updateActiveButtons();
  runtime.scrollTop(panel);
  runtime.scrollTop(document.querySelector(".settings-panel"));
  showToast("已恢复草莓奶油款");
});

document.querySelector("#random-button").addEventListener("click", randomize);

soundButton.addEventListener("click", () => {
  if (soundEnabled) playSound("ui");
  soundEnabled = !soundEnabled;
  saveSoundSetting();
  updateSoundButton();
  if (soundEnabled) {
    unlockAudio();
    playSound("save");
  }
  showToast(soundEnabled ? "音效开启，来听听水晶叮咚吧" : "已静音，设计动效会继续保留");
});

document.querySelectorAll("[data-zoom]").forEach(button => {
  button.addEventListener("click", () => {
    const step = Number(button.dataset.zoom);
    const zoom = step === 0 ? 1 : Math.min(1.2, Math.max(.82, state.zoom + step * .08));
    const changed = setState({ zoom }, { record: false });
    if (changed) {
      showToast(`预览缩放 ${Math.round(zoom * 100)}%`);
    } else {
      showToast(step === 0 ? "预览已经是原始大小" : step > 0 ? "已经放到最大啦" : "已经缩到最小啦");
      emitFeedback("ui");
    }
  });
});

document.querySelector("#finish-button").addEventListener("click", () => nextStepButton.click());
document.querySelector("#back-button").addEventListener("click", () => {
  const currentStepIndex = stepOrder.indexOf(activeStep);
  if (currentStepIndex > 0) {
    goToStep(stepOrder[currentStepIndex - 1]);
    return;
  }
  showToast("已经在第一关啦，设计还在这里");
  emitFeedback("ui");
});
document.querySelector("#confirm-save-button").addEventListener("click", saveDesignSheet);

document.querySelectorAll("[data-close]").forEach(button => button.addEventListener("click", () => {
  runtime.closeDialog(button.closest("dialog"));
  emitFeedback("ui");
}));
document.querySelectorAll("dialog").forEach(dialog => dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
    runtime.closeDialog(dialog);
    emitFeedback("ui");
  }
}));

document.addEventListener("keydown", event => {
  if (event.target.closest("input,textarea,select,[contenteditable=true]")) return;
  if (!(event.ctrlKey || event.metaKey)) return;
  if (event.key.toLowerCase() === "z" && !event.shiftKey) {
    event.preventDefault();
    document.querySelector("#undo-button").click();
  }
  if (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey)) {
    event.preventDefault();
    document.querySelector("#redo-button").click();
  }
});

// Tactile tools also work by keyboard. They never create permanent animation loops.
function fluffFlower() {
  emitFeedback('shape');
  document.querySelector('#helper-copy').textContent = '噗叽！花瓣又蓬松一点点 ♡';
}
document.querySelector('#fluff-button').addEventListener('click',fluffFlower);
corsage.addEventListener('click', event => {
  if (event.target.closest(".ribbon-jewel") || performance.now() < suppressClickUntil) return;
  fluffFlower();
});
corsage.addEventListener('keydown',event=>{
  if (event.target.closest(".ribbon-jewel")) return;
  if(['Enter',' '].includes(event.key)) { event.preventDefault(); fluffFlower(); }
});
document.querySelector('#glitter-button').addEventListener('click',()=>{
  setState({glitter:!state.glitter}, {feedback:'jewel'});
  document.querySelector('#helper-copy').textContent = state.glitter ? '五颗小星星，亮晶晶的刚刚好 ✧' : '星星收进小口袋啦';
});

// Mouse / pen dragging is optional; tapping is the equivalent touch and keyboard action.
let drag = null;
let suppressClickUntil = 0;
// A new press is intentional; only suppress the synthetic click from the previous drag.
document.addEventListener('pointerdown', () => { suppressClickUntil = 0; }, { capture: true });
document.addEventListener('pointerdown',event=>{
  const option = event.target.closest('[data-key] [data-value]');
  if(!option || event.pointerType === 'touch' || event.button !== 0) return;
  drag = {button:option,id:event.pointerId,startX:event.clientX,startY:event.clientY,chip:null};
});
document.addEventListener('pointermove',event=>{
  if(!drag || event.pointerId !== drag.id) return;
  if(!drag.chip && Math.hypot(event.clientX-drag.startX,event.clientY-drag.startY)<7) return;
  if(!drag.chip) {
    drag.chip = document.createElement('div');
    drag.chip.className = 'drag-chip';
    drag.chip.style.setProperty('--swatch',drag.button.style.getPropertyValue('--swatch') || '#fff2ef');
    const img = drag.button.querySelector('img');
    if(img) drag.chip.append(img.cloneNode());
    else if(!drag.button.style.getPropertyValue('--swatch')) drag.chip.textContent=drag.button.textContent;
    document.body.append(drag.chip);
    drag.button.setPointerCapture(event.pointerId);
  }
  event.preventDefault();
  drag.chip.style.transform=`translate(${event.clientX+10}px,${event.clientY-28}px)`;
  drag.chip.style.left='0'; drag.chip.style.top='0';
  const box=previewStage.getBoundingClientRect();
  previewStage.classList.toggle('drop-ready',event.clientX>=box.left && event.clientX<=box.right && event.clientY>=box.top && event.clientY<=box.bottom);
});
function endDrag(event) {
  if(!drag) return;
  if(drag.chip) {
    suppressClickUntil=performance.now()+400;
    if(event.type==='pointerup' && previewStage.classList.contains('drop-ready')) {
      const key=drag.button.closest('[data-key]').dataset.key;
      const value=['layers','tailCount'].includes(key) ? Number(drag.button.dataset.value) : drag.button.dataset.value;
      if(!setState({[key]:value})) emitFeedback(feedbackKind([key]),[key]);
      showToast('轻轻放好啦 ♡');
    }
    drag.chip.remove();
    if(drag.button.hasPointerCapture(drag.id)) drag.button.releasePointerCapture(drag.id);
  }
  previewStage.classList.remove('drop-ready'); drag=null;
}
document.addEventListener('pointerup',endDrag);
document.addEventListener('pointercancel',endDrag);
window.addEventListener('blur',endDrag);

async function exportPostcard() {
  const button=document.querySelector('#export-button');
  if (button.disabled) return;
  const config = Object.assign({}, state);
  button.disabled=true; button.textContent='正在装进小相框…';
  try {
    const resources = await corsagePlatform.prepareArtwork(config);
    const art=corsageArtwork(config,'export',resources.badge,resources.fabric);
    const inner=art.slice(art.indexOf('>')+1,art.lastIndexOf('</svg>'));
    const postcard=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1100" viewBox="0 0 900 1100"><rect width="900" height="1100" rx="36" fill="#f8e8eb"/><rect x="35" y="35" width="830" height="1030" rx="28" fill="#fffaf1" stroke="#dfbdc9" stroke-width="2"/><text x="450" y="104" text-anchor="middle" fill="#9e6e80" font-family="Georgia,serif" font-size="20" letter-spacing="4">LITTLE RIBBON ROOM</text><text x="450" y="156" text-anchor="middle" fill="#965971" font-family="PingFang SC,sans-serif" font-size="32">我的小小胸花</text><g transform="translate(105 173) scale(1.15)" fill="none">${inner}</g><text x="450" y="1003" text-anchor="middle" fill="#987481" font-family="PingFang SC,sans-serif" font-size="20">Handmade with love</text></svg>`;
    const svgUrl=URL.createObjectURL(new Blob([postcard],{type:'image/svg+xml;charset=utf-8'}));
    try {
      const image = await runtime.loadImage(svgUrl);
      const canvas=document.createElement('canvas'); canvas.width=900;canvas.height=1100;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas unavailable');
      context.drawImage(image,0,0);
      showToast(await corsagePlatform.saveImage(canvas, config));
    } finally { URL.revokeObjectURL(svgUrl); }
  } catch (error) { showToast(corsagePlatform.imageError); }
  finally {button.disabled=false;button.textContent=corsagePlatform.imageLabel;}
}
document.querySelector('#export-button').addEventListener('click',exportPostcard);
gemInteraction = initGemDragging();
