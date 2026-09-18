const crystalGlyphCache = new Map();

function crystalGlyph(character) {
  if (crystalGlyphCache.has(character)) return crystalGlyphCache.get(character);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 192;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.font = '900 128px "PingFang SC", "Microsoft YaHei", sans-serif';
  context.fillText(character, 28, 148);
  const pixels = context.getImageData(0, 0, 192, 192).data;
  let left = 192, top = 192, right = 0, bottom = 0;
  for (let y = 0; y < 192; y++) {
    for (let x = 0; x < 192; x++) {
      if (pixels[(y * 192 + x) * 4 + 3] < 100) continue;
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
  }
  const height = Math.max(1, bottom - top + 1);
  const width = Math.max(1, right - left + 1);
  const pitch = height / (/^[A-Z0-9]$/.test(character) ? 15 : 25);
  const points = [];
  // Whole, separated stones follow the glyph mask; no clipped or printed text is drawn.
  for (let row = 0, y = top + pitch * .45; y <= bottom; row++, y += pitch * .866) {
    for (let x = left + pitch * (.45 + (row % 2) * .5); x <= right; x += pitch) {
      if (pixels[(Math.floor(y) * 192 + Math.floor(x)) * 4 + 3] < 128) continue;
      points.push({ x: (x - left - width / 2) / height, y: (y - top) / height });
    }
  }
  const glyph = { points, ratio: width / height, radius: pitch * .44 / height };
  if (crystalGlyphCache.size >= 128) crystalGlyphCache.delete(crystalGlyphCache.keys().next().value);
  crystalGlyphCache.set(character, glyph);
  return glyph;
}

function crystalLetteringDefs(prefix) {
  return `<radialGradient id="${prefix}-letter-crystal" cx=".28" cy=".2" r=".9">
    <stop stop-color="#fffefa"/><stop offset=".36" stop-color="#edf7fa"/>
    <stop offset=".66" stop-color="#b8c9da"/><stop offset="1" stop-color="#8d819d"/>
  </radialGradient>${[0, 1].map(variant => `<g id="${prefix}-letter-stone-${variant}">
    <ellipse class="letter-contact" cx=".12" cy=".2" rx="1.05" ry=".95" fill="#583847" opacity=".4"/>
    <path d="M -.42 -1 L .42 -1 L 1 -.42 L 1 .42 L .42 1 L -.42 1 L -1 .42 L -1 -.42 Z" fill="#aaa0ac" stroke="#756d7d" stroke-width=".12"/>
    <path d="M -.36 -.87 L .36 -.87 L .87 -.36 L .87 .36 L .36 .87 L -.36 .87 L -.87 .36 L -.87 -.36 Z" fill="url(#${prefix}-letter-crystal)"/>
    <path d="M -.87 -.36 L -.3 -.3 L .3 -.3 L .36 -.87 L -.36 -.87 Z" fill="#fffefa"/>
    <path d="M .3 -.3 L .87 -.36 L .87 .36 L .36 .87 L .3 .3 Z" fill="${variant ? '#c9a9c8' : '#9dbccf'}"/>
    <path d="M -.87 .36 L -.3 .3 L .3 .3 L .36 .87 L -.36 .87 Z" fill="${variant ? '#a6c9d7' : '#b8a3c3'}"/>
    <path d="M -.3 -.3 L .3 -.3 L .3 .3 L -.3 .3 Z" fill="#fffdf5" opacity=".86"/>
    <path d="M -.63 -.64 L -.25 -.64 M -.44 -.83 L -.44 -.45" stroke="#fffefa" stroke-width=".17" stroke-linecap="round"/>
  </g>`).join("")}`;
}

function crystalLettering(config, prefix) {
  const number = value => Number(value.toFixed(3));
  const glyphMarkup = (character, x, y, height, maxWidth) => {
    const glyph = crystalGlyph(character);
    const size = Math.min(height, maxWidth / (glyph.ratio + glyph.radius * 2));
    const radius = glyph.radius * size;
    return `<g class="rhinestone-glyph" data-character="${escapeHTML(character)}" transform="translate(${number(x)} ${number(y)})">${glyph.points.map((point, index) =>
      `<use class="letter-stone" href="#${prefix}-letter-stone-${index % 2}" transform="translate(${number(point.x * size)} ${number(point.y * size)}) scale(${number(radius)})"/>`
    ).join("")}</g>`;
  };
  const characters = [...config.name].slice(0, 8);
  if (!characters.length) return "";
  const gap = characters.length > 4 ? 3 : 5;
  const height = Math.min(34, (128 - (characters.length - 1) * gap) / characters.length);
  const totalHeight = characters.length * height + (characters.length - 1) * gap;
  const start = 480 + (128 - totalHeight) / 2;
  const lettering = characters.map((character, index) => glyphMarkup(
    character, 300, start + index * (height + gap), height, 34
  )).join("");
  return `<g class="sash-personalization" role="img" aria-label="${escapeHTML(config.name)} 闪钻贴字">
    <g class="rhinestone-text" data-lettering="name">${lettering}</g>
  </g>`;
}
