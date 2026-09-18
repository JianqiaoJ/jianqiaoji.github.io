const runtime = (() => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const supports = (property, value) => Boolean(window.CSS && CSS.supports(property, value));
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const fromEntries = entries => entries.reduce((result, entry) => {
    result[entry[0]] = entry[1];
    return result;
  }, {});
  const point = (x = 0, y = 0) => {
    const value = svg.createSVGPoint();
    value.x = x;
    value.y = y;
    return value;
  };
  const matrix = value => {
    const result = svg.createSVGMatrix();
    ["a", "b", "c", "d", "e", "f"].forEach(key => { result[key] = value[key]; });
    return result;
  };
  const loadImage = source => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Image unavailable"));
    image.src = source;
  });
  // Only animate when we can also finish the motion before measuring gem surfaces.
  const canAnimate = Boolean(Element.prototype.animate && Element.prototype.getAnimations);
  const animate = (element, frames, options) => element && canAnimate ? element.animate(frames, options) : null;
  const animations = element => element && canAnimate ? element.getAnimations({ subtree: true }) : [];
  const previousFocus = new WeakMap();
  function openDialog(dialog) {
    if (dialog.open) return;
    previousFocus.set(dialog, document.activeElement);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else {
      const backdrop = document.createElement("div");
      backdrop.className = "dialog-backdrop";
      backdrop.addEventListener("click", () => closeDialog(dialog));
      dialog._backdrop = backdrop;
      document.body.appendChild(backdrop);
      dialog.setAttribute("open", "");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("role", "dialog");
      dialog.classList.add("fallback-dialog");
      const focusable = dialog.querySelector("button,input,[tabindex]");
      if (focusable) focusable.focus();
    }
  }
  function closeDialog(dialog) {
    if (typeof dialog.close === "function" && !dialog.classList.contains("fallback-dialog")) dialog.close();
    else {
      dialog.removeAttribute("open");
      dialog.classList.remove("fallback-dialog");
      if (dialog._backdrop) dialog._backdrop.remove();
      dialog._backdrop = null;
    }
    const focus = previousFocus.get(dialog);
    if (focus && focus.isConnected) focus.focus();
  }
  document.addEventListener("keydown", event => {
    const dialog = document.querySelector(".fallback-dialog[open]");
    if (!dialog) return;
    if (event.key === "Escape") { event.preventDefault(); closeDialog(dialog); }
    if (event.key !== "Tab") return;
    const items = Array.from(dialog.querySelectorAll("button:not(:disabled),input,[tabindex='0']"));
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  const flex = document.createElement("div");
  flex.style.cssText = "position:absolute;visibility:hidden;display:flex;flex-direction:column;row-gap:1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  document.documentElement.classList.add(flex.scrollHeight === 1 ? "supports-flex-gap" : "no-flex-gap");
  flex.remove();

  const needsArtworkSize = !supports("height", "1cqh") || !supports("aspect-ratio", "600 / 690");
  function fitViewport() {
    const viewport = window.visualViewport;
    document.documentElement.style.setProperty("--app-height", `${viewport ? viewport.height : window.innerHeight}px`);
    if (!needsArtworkSize) return;
    const stage = document.querySelector(".preview-stage");
    const artwork = document.querySelector("#corsage");
    const width = Math.min(stage.clientWidth * .94, window.innerWidth <= 700 ? 325 : stage.clientHeight * .74);
    artwork.style.width = `${width}px`;
    artwork.style.height = `${width * 690 / 600}px`;
  }
  window.addEventListener("resize", fitViewport);
  if (window.visualViewport) window.visualViewport.addEventListener("resize", fitViewport);
  fitViewport();
  const scrollTop = element => { element.scrollTop = 0; };
  return { hasOwn, fromEntries, point, matrix, loadImage, canAnimate, animate, animations, openDialog, closeDialog, scrollTop };
})();
