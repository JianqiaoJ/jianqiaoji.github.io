const gemPetalSlots = { round: [0, 3, 6], fan: [1, 4, 7], star: [0, 3, 5], bow: [0, 1, 2, 3] };

function gemLayoutKey(config) {
  return `${config.fold}-${config.layers}`;
}

function sanitizeGemPlacements(value) {
  const result = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return result;
  for (const fold of Object.keys(gemPetalSlots)) {
    for (const layers of [3, 5, 7, 9]) {
      const key = gemLayoutKey({ fold, layers });
      const saved = value[key];
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) continue;
      const mounts = {};
      for (let id = 0; id < gemPetalSlots[fold].length; id++) {
        const mount = saved[id];
        if (!mount || !Number.isFinite(mount.x) || !Number.isFinite(mount.y) || typeof mount.surface !== "string") continue;
        const petal = /^petal-([1-4])-([0-8])$/.exec(mount.surface);
        const tail = /^tail-([0-4])$/.test(mount.surface);
        const bandCount = { 3: 1, 5: 2, 7: 3, 9: 4 }[layers];
        const petalCount = { round: 9, fan: 9, star: 8, bow: 4 }[fold];
        const validPetal = petal && Number(petal[1]) <= bandCount && Number(petal[2]) < petalCount &&
          mount.x >= 22 && mount.x <= 212 && mount.y >= -61 && mount.y <= 43;
        const validTail = tail && mount.x >= 140 && mount.x <= 445 && mount.y >= 282 && mount.y <= 650;
        if (validPetal || validTail) mounts[id] = { surface: mount.surface, x: mount.x, y: mount.y };
      }
      if (Object.keys(mounts).length) result[key] = mounts;
    }
  }
  return result;
}

function getGemMounts(config) {
  const band = { 3: 1, 5: 2, 7: 3, 9: 4 }[config.layers];
  const custom = config.gemPlacements && config.gemPlacements[gemLayoutKey(config)] || {};
  const tails = visibleTailIds(config.tailCount);
  return gemPetalSlots[config.fold].map((petal, id) => {
    const saved = custom[id];
    const available = saved && (!saved.surface.startsWith("tail-") || tails.includes(Number(saved.surface.slice(5))));
    return Object.assign({ id }, available ? saved : { surface: `petal-${band}-${petal}`, x: 163, y: -18 });
  });
}

function gemMountTransform(mount, surfaceScale = .6, angle = 90) {
  const scale = .6 / surfaceScale;
  return `translate(${mount.x} ${mount.y}) rotate(${angle}) scale(${1.1 * scale} ${1.25 * scale})`;
}

function gemSurfaceAngle(surface) {
  return surface.startsWith("tail-") ? [12, -12, 5, -6, 0][Number(surface.slice(5))] : 90;
}

function initGemDragging() {
  const root = document.querySelector("#corsage");
  const spriteReady = runtime.loadImage(root.querySelector('[id$="-loop-sprite"] image').getAttribute("href")).catch(() => null);
  let active = null;
  let cachedSvg = null;
  let cachedAtlas = null;
  let keyboardRequest = 0;
  const svgPoint = (svg, x, y) => runtime.point(x, y).matrixTransform(svg.getScreenCTM().inverse());
  const finishAnimations = () => runtime.animations(root).forEach(animation => animation.finish());

  // Paint material IDs in artwork order; covered ribbon and transparent holes cannot receive a gem.
  async function ribbonAtlas(svg) {
    if (cachedSvg === svg) return cachedAtlas;
    const image = await spriteReady;
    if (!image || !svg.isConnected) throw new Error("Ribbon surface unavailable");
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 690;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const stamp = document.createElement("canvas");
    stamp.width = image.naturalWidth;
    stamp.height = image.naturalHeight;
    const stampContext = stamp.getContext("2d");
    const surfaces = [null];
    const rootInverse = svg.getScreenCTM().inverse();
    const setMatrix = matrix => context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
    for (const element of svg.querySelectorAll(".ribbon-tail, .petal")) {
      const matrix = rootInverse.multiply(element.getScreenCTM());
      setMatrix(matrix);
      const surface = element.dataset.ribbonSurface;
      if (!surface) {
        const lace = element.querySelector("path");
        if (lace) {
          context.globalCompositeOperation = "destination-out";
          context.fill(new Path2D(lace.getAttribute("d")));
          context.globalCompositeOperation = "source-over";
        }
        continue;
      }
      const id = surfaces.length;
      surfaces.push({ surface, matrix, inverse: matrix.inverse() });
      const color = `rgb(${id},0,0)`;
      const loop = element.querySelector(".satin-photo-loop");
      if (loop) {
        stampContext.clearRect(0, 0, stamp.width, stamp.height);
        stampContext.globalCompositeOperation = "source-over";
        stampContext.drawImage(image, 0, 0);
        stampContext.globalCompositeOperation = "source-in";
        stampContext.fillStyle = color;
        stampContext.fillRect(0, 0, stamp.width, stamp.height);
        const box = svg.querySelector('[id$="-loop-sprite"]').viewBox.baseVal;
        const declaration = svg.querySelector('[id$="-loop-sprite"] image');
        const sx = image.naturalWidth / declaration.width.baseVal.value;
        const sy = image.naturalHeight / declaration.height.baseVal.value;
        context.drawImage(stamp, box.x * sx, box.y * sy, box.width * sx, box.height * sy,
          loop.x.baseVal.value, loop.y.baseVal.value, loop.width.baseVal.value, loop.height.baseVal.value);
      } else {
        const face = element.querySelector(".satin-fold-face, .satin-tail-face");
        context.fillStyle = color;
        context.fill(new Path2D(face.getAttribute("d")));
      }
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(300, 255, 82, 0, Math.PI * 2);
    context.fill();
    for (const text of svg.querySelectorAll(".rhinestone-text")) {
      const bounds = text.getBBox();
      setMatrix(rootInverse.multiply(text.getScreenCTM()));
      context.fillRect(bounds.x - 1, bounds.y - 1, bounds.width + 2, bounds.height + 2);
    }
    context.setTransform(1, 0, 0, 1, 0, 0);
    const rgba = context.getImageData(0, 0, 600, 690).data;
    const ids = new Uint8Array(600 * 690);
    const distance = new Float32Array(ids.length);
    for (let i = 0; i < ids.length; i++) {
      ids[i] = rgba[i * 4 + 3] > 250 ? rgba[i * 4] : 0;
      distance[i] = ids[i] ? 1000 : 0;
    }
    // A small edge-distance pass prunes impossible centers before exact footprint checks.
    for (let y = 0; y < 690; y++) {
      for (let x = 0; x < 600; x++) {
        const i = y * 600 + x;
        if (!ids[i]) continue;
        distance[i] = Math.min(
          x && ids[i - 1] === ids[i] ? distance[i - 1] + 1 : 0,
          y && ids[i - 600] === ids[i] ? distance[i - 600] + 1 : 0,
          x && y && ids[i - 601] === ids[i] ? distance[i - 601] + Math.SQRT2 : 0,
          x < 599 && y && ids[i - 599] === ids[i] ? distance[i - 599] + Math.SQRT2 : 0
        );
      }
    }
    for (let y = 689; y >= 0; y--) {
      for (let x = 599; x >= 0; x--) {
        const i = y * 600 + x;
        if (!ids[i]) continue;
        distance[i] = Math.min(distance[i],
          x < 599 && ids[i + 1] === ids[i] ? distance[i + 1] + 1 : 0,
          y < 689 && ids[i + 600] === ids[i] ? distance[i + 600] + 1 : 0,
          x < 599 && y < 689 && ids[i + 601] === ids[i] ? distance[i + 601] + Math.SQRT2 : 0,
          x && y < 689 && ids[i + 599] === ids[i] ? distance[i + 599] + Math.SQRT2 : 0
        );
      }
    }
    const setting = svg.querySelector(".gem-setting");
    const shape = new Path2D(setting.getAttribute("d"));
    const bounds = setting.getBBox();
    context.lineWidth = 2.5;
    context.lineJoin = "round";
    for (const surface of surfaces.slice(1)) {
      const m = surface.matrix;
      const scale = .6 / Math.hypot(m.a, m.b);
      const matrix = runtime.matrix({ a: m.a, b: m.b, c: m.c, d: m.d, e: 0, f: 0 })
        .rotate(gemSurfaceAngle(surface.surface)).scaleNonUniform(1.1 * scale, 1.25 * scale);
      const inverse = matrix.inverse();
      const corners = [
        [bounds.x - 2, bounds.y - 2], [bounds.x + bounds.width + 2, bounds.y - 2],
        [bounds.x - 2, bounds.y + bounds.height + 2], [bounds.x + bounds.width + 2, bounds.y + bounds.height + 2]
      ].map(([x, y]) => runtime.point(x, y).matrixTransform(matrix));
      const footprint = [];
      for (let y = Math.floor(Math.min(...corners.map(p => p.y))); y <= Math.ceil(Math.max(...corners.map(p => p.y))); y++) {
        for (let x = Math.floor(Math.min(...corners.map(p => p.x))); x <= Math.ceil(Math.max(...corners.map(p => p.x))); x++) {
          const point = runtime.point(x, y).matrixTransform(inverse);
          if (context.isPointInPath(shape, point.x, point.y) || context.isPointInStroke(shape, point.x, point.y)) {
            footprint.push({ x, y });
          }
        }
      }
      surface.footprint = footprint;
    }
    const atlas = { ids, distance, surfaces, candidates: [] };
    for (let y = 0; y < 690; y += 2) {
      for (let x = 0; x < 600; x += 2) {
        const id = ids[y * 600 + x];
        if (fitsRibbon(atlas, x, y, id)) atlas.candidates.push({ x: x + .5, y: y + .5, id });
      }
    }
    const candidates = atlas.candidates;
    if (!candidates.length) throw new Error("No supported ribbon position");
    cachedSvg = svg;
    cachedAtlas = atlas;
    return atlas;
  }

  function fitsRibbon(atlas, x, y, id) {
    if (!id || x < 0 || x >= 600 || y < 0 || y >= 690 || atlas.distance[y * 600 + x] < 2) return false;
    return atlas.surfaces[id].footprint.every(offset => {
      const px = x + offset.x, py = y + offset.y;
      return px >= 0 && px < 600 && py >= 0 && py < 690 && atlas.ids[py * 600 + px] === id;
    });
  }

  function nearestMount(atlas, point) {
    const x = Math.floor(point.x), y = Math.floor(point.y);
    const index = y * 600 + x;
    let best = fitsRibbon(atlas, x, y, atlas.ids[index])
      ? { x: point.x, y: point.y, id: atlas.ids[index] } : null;
    if (!best) {
      let distance = Infinity;
      for (const candidate of atlas.candidates) {
        const next = (candidate.x - point.x) ** 2 + (candidate.y - point.y) ** 2;
        if (next < distance) { best = candidate; distance = next; }
      }
    }
    const surface = atlas.surfaces[best.id];
    const local = runtime.point(best.x, best.y).matrixTransform(surface.inverse);
    return { surface: surface.surface, x: Math.round(local.x * 100) / 100, y: Math.round(local.y * 100) / 100 };
  }

  function restore(drag) {
    if (drag.ghost) drag.ghost.remove();
    drag.source.style.removeProperty("visibility");
    root.classList.remove("dragging-jewel");
    if (root.hasPointerCapture(drag.pointerId)) root.releasePointerCapture(drag.pointerId);
  }

  function cancel() {
    keyboardRequest++;
    if (!active) return;
    const drag = active;
    active = null;
    if (drag.moved) suppressClickUntil = performance.now() + 350;
    restore(drag);
  }

  function commit(id, mount, focus = false) {
    const layout = gemLayoutKey(state);
    const current = getGemMounts(state).find(item => item.id === id);
    if (current.surface === mount.surface && Math.hypot(current.x - mount.x, current.y - mount.y) < .1) return;
    const gemPlacements = Object.assign({}, state.gemPlacements, {
      [layout]: Object.assign({}, state.gemPlacements[layout], { [id]: mount })
    });
    setState({ gemPlacements }, { feedback: false });
    const jewel = root.querySelector(`.ribbon-jewel[data-jewel-id="${id}"]`);
    if (focus && jewel) jewel.focus({ preventScroll: true });
    if (!reduceMotion.matches) runtime.animate(jewel, [{ opacity: .65 }, { opacity: 1 }], { duration: 150 });
    playSound("jewel");
  }

  // SVG groups do not consistently honor touch-action; only gem touches block page panning.
  root.addEventListener("touchstart", event => {
    if ((active || event.target.closest(".ribbon-jewel")) && event.cancelable) event.preventDefault();
  }, { passive: false });

  root.addEventListener("pointerdown", event => {
    const source = event.target.closest(".ribbon-jewel");
    if (!source || event.button !== 0 || !event.isPrimary || active) return;
    event.preventDefault();
    event.stopPropagation();
    finishAnimations();
    const svg = source.ownerSVGElement;
    const point = svgPoint(svg, event.clientX, event.clientY);
    const matrix = svg.getScreenCTM().inverse().multiply(source.getScreenCTM());
    const atlas = ribbonAtlas(svg).catch(() => null);
    source.focus({ preventScroll: true });
    active = {
      source, svg, matrix, atlas, pointerId: event.pointerId, id: Number(source.dataset.jewelId),
      startX: event.clientX, startY: event.clientY,
      offsetX: point.x - matrix.e, offsetY: point.y - matrix.f,
      point: { x: matrix.e, y: matrix.f }, moved: false, ending: false, ghost: null
    };
    root.setPointerCapture(event.pointerId);
  });

  root.addEventListener("pointermove", event => {
    const drag = active;
    if (!drag || drag.ending || event.pointerId !== drag.pointerId) return;
    if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) < 4) return;
    event.preventDefault();
    const point = svgPoint(drag.svg, event.clientX, event.clientY);
    drag.point = { x: point.x - drag.offsetX, y: point.y - drag.offsetY };
    if (!drag.moved) {
      drag.moved = true;
      drag.ghost = drag.source.cloneNode(true);
      drag.ghost.classList.add("jewel-drag-ghost");
      drag.ghost.removeAttribute("tabindex");
      drag.ghost.removeAttribute("role");
      drag.ghost.removeAttribute("data-jewel-id");
      drag.ghost.setAttribute("aria-hidden", "true");
      const hit = drag.ghost.querySelector(".gem-hit");
      if (hit) hit.remove();
      drag.source.style.visibility = "hidden";
      drag.svg.append(drag.ghost);
      root.classList.add("dragging-jewel");
    }
    const m = drag.matrix;
    drag.ghost.setAttribute("transform", `matrix(${m.a} ${m.b} ${m.c} ${m.d} ${drag.point.x} ${drag.point.y})`);
  });

  root.addEventListener("pointerup", async event => {
    const drag = active;
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    drag.ending = true;
    if (!drag.moved) { cancel(); return; }
    const point = svgPoint(drag.svg, event.clientX, event.clientY);
    drag.point = { x: point.x - drag.offsetX, y: point.y - drag.offsetY };
    const atlas = await drag.atlas;
    if (active !== drag) return;
    active = null;
    suppressClickUntil = performance.now() + 350;
    restore(drag);
    if (!atlas) { showToast("丝带暂时没接稳，请再拖一次"); return; }
    commit(drag.id, nearestMount(atlas, drag.point), true);
  });
  root.addEventListener("pointercancel", event => {
    if (active && event.pointerId === active.pointerId) cancel();
  });
  root.addEventListener("lostpointercapture", event => {
    if (active && event.pointerId === active.pointerId && !active.ending) cancel();
  });
  window.addEventListener("blur", cancel);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && active) { event.preventDefault(); cancel(); }
  });
  root.addEventListener("keydown", async event => {
    const jewel = event.target.closest(".ribbon-jewel");
    const direction = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
    if (!jewel || !direction || event.metaKey || event.ctrlKey || active) return;
    event.preventDefault();
    event.stopPropagation();
    finishAnimations();
    const request = ++keyboardRequest;
    const svg = jewel.ownerSVGElement;
    const center = runtime.point().matrixTransform(svg.getScreenCTM().inverse().multiply(jewel.getScreenCTM()));
    const amount = event.shiftKey ? 24 : 6;
    const atlas = await ribbonAtlas(svg).catch(() => null);
    if (!atlas || request !== keyboardRequest || !jewel.isConnected) return;
    commit(Number(jewel.dataset.jewelId), nearestMount(atlas, {
      x: center.x + direction[0] * amount, y: center.y + direction[1] * amount
    }), true);
  });
  return { cancel };
}
