const tailPatterns = { plain: "纯色", dots: "波点", plaid: "格纹", stripes: "条纹" };
const tailVisualOrder = [0, 2, 4, 3, 1];
const tailPaths = [
  "M 250 282 C 235 374 211 489 164 590 L 204 578 L 222 613 C 263 505 281 386 283 288 Z",
  "M 319 285 C 324 396 349 530 390 622 L 407 586 L 441 591 C 396 483 374 370 355 282 Z",
  "M 252 291 C 250 403 224 514 206 638 L 237 616 L 266 648 C 274 505 301 385 294 290 Z",
  "M 310 291 C 318 399 322 502 345 645 L 371 618 L 404 634 C 375 498 370 384 352 286 Z",
  "M 274 297 Q 272 450 273 636 L 300 617 L 327 636 Q 323 462 326 297 Z"
];
const tailStitches = [
  "M 254 316 C 240 430 210 535 181 589",
  "M 350 316 C 370 430 400 550 421 589",
  "M 257 331 Q 246 460 220 624",
  "M 349 333 Q 360 480 391 615",
  "M 280 350 L 280 616 M 320 350 L 320 616"
];
let selectedTail = 4;

function createTailDesigns(primary = "pink", secondary = "sky") {
  return Array.from({ length: 5 }, (_, index) => ({
    color: index < 2 ? secondary : primary,
    pattern: index === 3 ? "dots" : "plain"
  }));
}

function sanitizeTailDesigns(value, primary, secondary) {
  return createTailDesigns(primary, secondary).map((fallback, index) => {
    const saved = Array.isArray(value) && value[index];
    return {
      color: saved && runtime.hasOwn(ribbonPalettes, saved.color) ? saved.color : fallback.color,
      pattern: saved && runtime.hasOwn(tailPatterns, saved.pattern) ? saved.pattern : fallback.pattern
    };
  });
}

function visibleTailIds(count = 5) {
  return { 1: [4], 2: [2, 4], 3: [2, 3, 4], 4: [0, 2, 3, 4], 5: [0, 1, 2, 3, 4] }[count] || [0, 1, 2, 3, 4];
}

function tailDescription(config) {
  const visible = visibleTailIds(config.tailCount);
  const designs = config.tailDesigns || createTailDesigns(config.satin, config.satinSecondary);
  const labels = tailVisualOrder.filter(id => visible.includes(id)).map((id, index) =>
    `第${index + 1}条${getItem("satin", designs[id].color).name}${tailPatterns[designs[id].pattern]}`
  );
  return `${visible.length}条绶带（${labels.join("、")}）`;
}

function tailArtwork(config, prefix, texturePath, mountedGem, gemMounts) {
  let defs = "";
  const visible = visibleTailIds(config.tailCount);
  const designs = config.tailDesigns || createTailDesigns(config.satin, config.satinSecondary);
  const markup = visible.map(id => {
    const { color, pattern } = designs[id];
    const [light, mid, dark] = ribbonPalettes[color];
    const key = `${prefix}-tail-${id}`;
    const d = tailPaths[id];
    const print = color === "cream" ? dark : "#fffaf0";
    const printMarks = {
      plain: "",
      dots: `<circle cx="8" cy="8" r="3.3" fill="${print}"/><circle cx="23" cy="23" r="3.3" fill="${print}"/>`,
      plaid: `<path d="M 8 0 V 32 M 24 0 V 32 M 0 8 H 32 M 0 24 H 32" stroke="${dark}" stroke-width="7" opacity=".4"/>
        <path d="M 0 0 V 32 M 16 0 V 32 M 0 0 H 32 M 0 16 H 32" stroke="${light}" stroke-width="2.2"/>`,
      stripes: `<path d="M -16 32 L 32 -16 M 0 48 L 48 0" stroke="${print}" stroke-width="7"/>
        <path d="M -8 32 L 32 -8 M 8 48 L 48 8" stroke="${dark}" stroke-width="1.2" opacity=".5"/>`
    }[pattern];
    defs += `<clipPath id="${key}"><path d="${d}"/></clipPath>
      ${ribbonDyeFilter(prefix, `tail-${id}-dye`, mid)}
      <linearGradient id="${key}-satin" x1="0" y1=".03" x2="1" y2=".17">
        <stop stop-color="${dark}"/><stop offset=".07" stop-color="${mid}"/><stop offset=".46" stop-color="${mid}"/>
        <stop offset=".64" stop-color="${light}"/><stop offset=".76" stop-color="${mid}"/><stop offset=".96" stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/>
      </linearGradient>
      <pattern id="${key}-cloth" width="190" height="330" patternUnits="userSpaceOnUse">
        <image href="${texturePath}" width="190" height="330" preserveAspectRatio="none" filter="url(#${key}-dye)"/>
      </pattern>
      <pattern id="${key}-weft" width="2.4" height="4.8" patternUnits="userSpaceOnUse">
        <path d="M .5 0 V 4.8" stroke="${light}" stroke-width=".45" opacity=".46"/>
        <path d="M 1.2 0 V 4.8" stroke="${dark}" stroke-width=".35" opacity=".28"/>
      </pattern>
      ${printMarks ? `<pattern id="${key}-print" width="${pattern === 'dots' ? 30 : 32}" height="${pattern === 'dots' ? 30 : 32}" patternUnits="userSpaceOnUse">${printMarks}</pattern>` : ""}`;
    return `<g class="ribbon-tail" data-ribbon-surface="tail-${id}" data-tail-color="${color}" data-tail-pattern="${pattern}">
      <path d="${d}" transform="translate(2 3)" fill="${dark}" opacity=".18"/>
      <path class="satin-tail-face" d="${d}" fill="url(#${key}-satin)" stroke="${dark}" stroke-width=".65"/>
      <g clip-path="url(#${key})">
        <path d="${d}" fill="url(#${key}-cloth)" opacity=".52"/>
        ${printMarks ? `<path class="tail-print" d="${d}" fill="url(#${key}-print)" opacity="${pattern === 'plaid' ? .7 : .72}"/>` : ""}
        <path d="${d}" fill="url(#${key}-weft)" opacity=".54"/>
        <path d="M 140 416 Q 285 357 444 421 L 444 464 Q 290 421 140 465 Z M 140 543 Q 290 498 444 559 L 444 602 Q 290 543 140 583 Z" fill="url(#${prefix}-tail-sheen)" opacity=".46"/>
        <path d="${tailStitches[id]}" stroke="${dark}" stroke-width="1.1" opacity=".65"/>
        <path d="${tailStitches[id]}" transform="translate(1.8)" stroke="${light}" stroke-width="1" stroke-dasharray="1 2.5"/>
      </g>
      ${gemMounts.filter(mount => mount.surface === `tail-${id}`).map(mount => mountedGem(dark, mount, 1, gemSurfaceAngle(mount.surface))).join("")}
      ${id === 4 ? crystalLettering(config, prefix) : ""}
    </g>`;
  }).join("");
  // Keep the shorter, asymmetric arrangements centered without changing saved local mounts.
  return { markup, defs, offset: config.tailCount === 2 ? 33 : config.tailCount === 4 ? 16 : 0 };
}

function makeTailControls() {
  const root = document.querySelector("#tail-panel");
  root.innerHTML = `<h2>绶带 <small id="tail-count-label"></small></h2>
    <div class="segmented tail-count" data-key="tailCount" role="group" aria-label="绶带条数">
      ${[1, 2, 3, 4, 5].map(count => `<button type="button" data-value="${count}">${count}条</button>`).join("")}
    </div>
    <div class="tail-tabs" role="tablist" aria-label="选择绶带">
      ${tailVisualOrder.map(id => `<button id="tail-tab-${id}" type="button" role="tab" data-tail-slot="${id}" aria-controls="tail-editor">
        <i class="tail-sample" aria-hidden="true"></i><span></span>
      </button>`).join("")}
    </div>
    <div id="tail-editor" role="tabpanel">
      <h3>颜色 <small id="tail-color-label"></small></h3>
      <div class="swatch-grid tail-colors" role="group" aria-label="绶带颜色">
        ${materials.satin.map(item => `<button type="button" data-tail-color="${item.id}" aria-label="${item.name}" title="${item.name}" style="--swatch:${item.swatch}"></button>`).join("")}
      </div>
      <h3>花纹 <small id="tail-pattern-label"></small></h3>
      <div class="tail-patterns" role="group" aria-label="绶带花纹">
        ${Object.entries(tailPatterns).map(([id, name]) => `<button type="button" data-tail-pattern="${id}" aria-label="${name}" title="${name}">
          <i class="tail-sample" data-pattern="${id}" aria-hidden="true"></i><span>${name}</span>
        </button>`).join("")}
      </div>
      <button id="tail-apply-all" class="tail-apply-all" type="button">全部同款</button>
    </div>`;
  root.addEventListener("click", event => {
    const tab = event.target.closest("[data-tail-slot]");
    if (tab) {
      selectedTail = Number(tab.dataset.tailSlot);
      updateTailControls();
      playSound("ui");
      return;
    }
    const color = event.target.closest("button[data-tail-color]");
    const pattern = event.target.closest("button[data-tail-pattern]");
    const all = event.target.closest("#tail-apply-all");
    if (!color && !pattern && !all) return;
    const current = state.tailDesigns[selectedTail];
    const next = color ? Object.assign({}, current, { color: color.dataset.tailColor }) :
      pattern ? Object.assign({}, current, { pattern: pattern.dataset.tailPattern }) : current;
    const visible = visibleTailIds(state.tailCount);
    const tailDesigns = state.tailDesigns.map((design, id) =>
      (all ? visible.includes(id) : id === selectedTail) ? Object.assign({}, next) : design
    );
    if (JSON.stringify(tailDesigns) !== JSON.stringify(state.tailDesigns)) setState({ tailDesigns });
  });
  root.querySelector(".tail-tabs").addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const visible = tailVisualOrder.filter(id => visibleTailIds(state.tailCount).includes(id));
    const index = visible.indexOf(selectedTail);
    const next = event.key === "Home" ? 0 : event.key === "End" ? visible.length - 1 :
      (index + (event.key === "ArrowRight" ? 1 : -1) + visible.length) % visible.length;
    selectedTail = visible[next];
    updateTailControls();
    root.querySelector(`#tail-tab-${selectedTail}`).focus();
  });
}

function updateTailControls() {
  const visible = tailVisualOrder.filter(id => visibleTailIds(state.tailCount).includes(id));
  if (!visible.includes(selectedTail)) selectedTail = 4;
  document.querySelector("#tail-count-label").textContent = `${visible.length}条`;
  document.querySelector(".tail-tabs").style.setProperty("--tail-count", visible.length);
  for (const id of tailVisualOrder) {
    const tab = document.querySelector(`#tail-tab-${id}`);
    const design = state.tailDesigns[id];
    tab.hidden = !visible.includes(id);
    tab.setAttribute("aria-selected", String(id === selectedTail));
    tab.tabIndex = id === selectedTail ? 0 : -1;
    tab.querySelector("span").textContent = `第${visible.indexOf(id) + 1}条`;
    tab.setAttribute("aria-label", `第${visible.indexOf(id) + 1}条绶带`);
    tab.title = `${getItem("satin", design.color).name} · ${tailPatterns[design.pattern]}`;
    tab.style.setProperty("--tail-mid", ribbonPalettes[design.color][1]);
    tab.style.setProperty("--tail-dark", ribbonPalettes[design.color][2]);
    tab.querySelector(".tail-sample").dataset.pattern = design.pattern;
  }
  const current = state.tailDesigns[selectedTail];
  const editor = document.querySelector("#tail-editor");
  editor.setAttribute("aria-labelledby", `tail-tab-${selectedTail}`);
  editor.style.setProperty("--tail-mid", ribbonPalettes[current.color][1]);
  editor.style.setProperty("--tail-dark", ribbonPalettes[current.color][2]);
  document.querySelector("#tail-color-label").textContent = getItem("satin", current.color).name;
  document.querySelector("#tail-pattern-label").textContent = tailPatterns[current.pattern];
  for (const [attribute, value] of [["color", current.color], ["pattern", current.pattern]]) {
    editor.querySelectorAll(`button[data-tail-${attribute}]`).forEach(button => {
      const selected = button.getAttribute(`data-tail-${attribute}`) === value;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }
}
