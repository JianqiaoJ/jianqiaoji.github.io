/* Every piece uses one 600 × 690 sewing pattern, anchored at the flower centre.
   SVG coordinates keep the silhouette, beadwork and lettering together at any size. */
const ribbonPalettes = {
  sun: ['#fff3ab', '#edbd29', '#956306'], cream: ['#fffdf1', '#e8d9c3', '#a98f70'],
  pink: ['#ffeef3', '#e594b1', '#9b446c'], violet: ['#efe5fb', '#bba2dc', '#8069a6'],
  sky: ['#e8faff', '#9bcedf', '#5a97b0'], mint: ['#e9f8eb', '#a0d3b7', '#63997c']
};

function ribbonDyeFilter(prefix, id, hex) {
  const rgb = [1, 3, 5].map(start => parseInt(hex.slice(start, start + 2), 16) / 255);
  return `<filter id="${prefix}-${id}" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer>${rgb.map((value, i) =>
    `<feFunc${["R", "G", "B"][i]} type="gamma" amplitude="${value * .9}" exponent=".7" offset="${value * .2 + .1}"/>`
  ).join("")}</feComponentTransfer></filter>`;
}

function corsageArtwork(config, prefix = 'art', embeddedBadge = '', embeddedFabric = {}) {
  const [light, mid, dark] = ribbonPalettes[config.satin];
  const [secondaryLight, secondaryMid, secondaryDark] = ribbonPalettes[config.satinSecondary] || ribbonPalettes.sky;
  const laceColor = { ivory:'#fff6df', rose:'#fbd4e4', gold:'#ead292', white:'#fffaf7', hotpink:'#ed9fbe', smoke:'#877786' }[config.lace];
  const pearlColor = { white:'#fff9e9', gold:'#e8ca7c', pink:'#f6c2d6', mixed:'#ede0f3' }[config.pearl];
  const ref = name => `url(#${prefix}-${name})`;
  const ringCount = { 3:2, 5:3, 7:4, 9:5 }[config.layers];
  // A ribbon is an open folded strip, not a filled leaf. Keep separate faces,
  // a recessed inner return, a narrow cut edge and a small shadow at the pinch.
  const pointedFace = 'M 27 -16 L 173 -41 L 207 0 L 173 42 L 27 17 L 133 0 Z';
  const silkId = (band,i) => `${prefix}-loop-${band}-${i}`;
  const texturePath = embeddedFabric.horizontal || (typeof satinTextureData === 'undefined' ? './satin-weave-horizontal.jpg' : satinTextureData.horizontal);
  const loopSpritePath = embeddedFabric.loop || (typeof satinLoopSprite === 'undefined' ? './assets/materials/satin-loop-neutral-v1.png' : satinLoopSprite);
  const tailTexturePath = embeddedFabric.vertical || (typeof satinTextureData === 'undefined' ? './satin-weave.jpg' : satinTextureData.vertical);
  const gemShape = {
    heart:'M 0 11 C -20 -1 -12 -17 0 -7 C 12 -17 20 -1 0 11 Z',
    diamond:'M 0 -12 L 11 0 L 0 12 L -11 0 Z', drop:'M 0 -14 C 3 -6 14 3 7 10 C -7 20 -17 0 0 -14 Z',
    star:'M 0 -14 L 4 -4 L 14 -4 L 6 3 L 9 14 L 0 7 L -9 14 L -6 3 L -14 -4 L -4 -4 Z',
    bow:'M 0 0 Q -20 -20 -17 0 Q -20 20 0 0 Q 20 -20 17 0 Q 20 20 0 0 Z',
    crown:'M -14 -7 L -7 0 L 0 -12 L 7 0 L 14 -7 L 10 11 L -10 11 Z'
  }[config.gem];
  const gemMounts = getGemMounts(config);
  // Mount on the front fabric face in petal-local coordinates, away from the loop opening.
  const mountedGem = (shade, mount, scale = .6, angle = 90) => `<g class="ribbon-jewel" data-gem="${config.gem}" data-jewel-id="${mount.id}" transform="${gemMountTransform(mount, scale, angle)}" ${prefix === 'art' ? `role="button" tabindex="0" aria-label="移动第${mount.id + 1}枚钻饰"` : ''}>
    ${prefix === 'art' ? `<title>移动第${mount.id + 1}枚钻饰</title><circle class="gem-hit" r="16" fill="transparent" stroke="transparent" stroke-width="32" vector-effect="non-scaling-stroke"/>` : ''}
    <path class="gem-contact-shadow" d="${gemShape}" transform="translate(.6 .8)" fill="${shade}" opacity=".48" filter="${ref('gem-contact')}"/>
    <path class="gem-setting" d="${gemShape}" fill="#b4a4af" stroke="#827483" stroke-width=".8" stroke-linejoin="round"/>
    <g transform="scale(.88)">
      <path class="gem-face" d="${gemShape}" fill="${ref('jewel')}" stroke="#fffafc" stroke-width=".9" stroke-linejoin="round"/>
      <g clip-path="${ref('gem-cut')}">
        <path d="M -17 1 L -2 3 L 15 -9 L 8 16 L -10 15 Z" fill="#9c83b6" opacity=".32"/>
        <path d="M -13 -9 L -1 -3 L 12 -10 M -1 -3 L 2 4 L 9 13 M 2 4 L -12 8" stroke="#fdfbff" stroke-width=".7" opacity=".85"/>
        <path d="M -5 -6 L -1 -8" stroke="#fffdfd" stroke-width="1.5" stroke-linecap="round"/>
      </g>
    </g>
  </g>`;
  let petals = '', surfaceDefs = '';
  for (let band = 0; band < ringCount; band++) {
    const isLace = band === 0;
    const scale = 1 - band * (.40 / (ringCount - 1));
    const count = config.fold === 'round' ? (isLace ? 12 : 9) : config.fold === 'fan' ? 9 : config.fold === 'star' ? 8 : 4;
    let angles = Array.from({length:count}, (_, i) => config.fold === 'fan' ? -166 + i * 19 : -90 + i*360/count + (band%2 ? 18 : -6));
    if (config.fold === 'bow') angles = [-22,22,158,202];
    for (let i=0; i<angles.length; i++) {
      const id = silkId(band,i);
      const isSecondary = !isLace && (i+band)%3 === 0;
      const material = isSecondary ? 'secondary' : 'satin';
      const shade = isSecondary ? secondaryDark : dark;
      const edge = isSecondary ? secondaryMid : (config.satin === 'sun' ? '#a9790a' : mid);
      const highlight = isSecondary ? secondaryLight : light;
      const angle = angles[i] + (config.fold === 'star' ? 0 : Math.sin(i*2.1+band)*3);
      const width = config.fold === 'bow' ? 1.28 : config.fold === 'fan' ? .94 : 1.02;
      const face = pointedFace;
      if (config.fold === 'star') surfaceDefs += `<clipPath id="${id}"><path d="${face}"/></clipPath>`;
      const illumination = .045 + (1+Math.sin((angle+35)*Math.PI/180))*.045;
      const surface = `petal-${band}-${i}`;
      petals += `<g class="petal" data-band="${band}" data-petal="${i}" ${isLace ? '' : `data-ribbon-surface="${surface}"`} transform="translate(300 255) rotate(${angle}) scale(${scale} ${scale*width})">
        ${isLace ? `<path d="M 22 -17 L 165 -48 Q 220 -43 211 16 L 183 46 L 22 17 Z" fill="${ref('lace')}" stroke="${laceColor}" stroke-opacity=".65" stroke-width="1.2"/><path d="M 163 -48 Q 223 -43 211 16 L 183 46" stroke="${laceColor}" stroke-width="6" stroke-linecap="round" stroke-dasharray="1 7"/>` : config.fold !== 'star' ? `
          <g filter="${ref('contact-shadow')}"><g filter="${ref(isSecondary ? 'secondary-dye' : 'dye')}"><use class="satin-photo-loop" href="#${prefix}-loop-sprite" x="22" y="-61" width="190" height="104"/></g></g>
          ${!isSecondary && i%3 === 1 ? `<rect x="22" y="-61" width="190" height="104" fill="${ref('dots')}" opacity=".55" mask="${ref('loop-alpha')}"/>` : ''}
        ` : `
          <path class="fold-contact-shadow" d="${face}" transform="translate(2 4)" fill="${shade}" opacity=".19"/>
          <path class="satin-fold-face" d="${face}" fill="${ref(material)}" stroke="${shade}" stroke-width=".7"/>
          <g clip-path="url(#${id})">
            <path d="${face}" fill="${ref(material+'-cloth')}" opacity=".48"/>
            <path d="${face}" fill="${ref('warp')}" opacity=".65"/>
            <path d="M 56 -60 L 116 -60 L 153 56 L 97 56 Z" fill="${ref('sheen')}" opacity="${.5+illumination}"/>
            ${isSecondary ? `<path d="M 30 -10 L 211 -30 M 28 8 L 211 -10" stroke="${secondaryDark}" stroke-width="1.1" opacity=".68"/>` : i%3 === 1 ? `<path d="${face}" fill="${ref('dots')}" opacity=".65"/>` : ''}
          </g>
          <path d="M 30 16 L 173 42 L 207 0 L 171 30 Z" fill="${ref(isSecondary ? 'secondary-fold' : 'fold')}"/><path d="M 173 -41 L 207 0 L 173 42" stroke="${edge}" stroke-width="1.4"/>
          <path d="M 26 -16 L 71 -14 L 31 0 L 77 18 L 29 17 Z" fill="${shade}" opacity=".26"/>
          <path d="M 30 -11 L 80 -17 M 32 12 L 86 24" stroke="${highlight}" stroke-width=".8" opacity=".8"/>
        `}
        ${isLace ? '' : gemMounts.filter(mount => mount.surface === surface).map(mount => mountedGem(shade, mount, scale)).join('')}
      </g>`;
    }
  }
  const tails = tailArtwork(config, prefix, tailTexturePath, mountedGem, gemMounts);
  const centerFolds = Array.from({length:10},(_,i)=>`<g transform="translate(300 255) rotate(${i*36})"><path d="M -15 -25 L 2 -78 L 30 -47 L 14 0 Z" fill="${ref(i%2 ? 'secondary' : 'satin')}" stroke="${i%2 ? secondaryDark : dark}" stroke-width=".7"/><path d="M 2 -78 L 8 -41 L 30 -47 Z" fill="${i%2 ? secondaryLight : light}" opacity=".62"/></g>`).join('');
  const pearl = (x,y,r=5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ref('pearl')}" stroke="#bca28c" stroke-width=".6"/>`;
  let beads = '';
  for (let i=0;i<24;i++) {
    const angle = i*Math.PI*2/24;
    const bead = pearl(300+Math.cos(angle)*60,255+Math.sin(angle)*60,4.2);
    beads += config.pearl === 'mixed' && i % 3 === 1 ? bead.replace(`fill="${ref('pearl')}"`, 'fill="#f2c2d6"') : config.pearl === 'mixed' && i % 3 === 2 ? bead.replace(`fill="${ref('pearl')}"`, 'fill="#ead8a7"') : bead;
  }
  const badge = badges[config.badge];
  const badgeSize = config.badge === 'bow' || config.badge === 'rose' ? 111 : 100;
  return `<svg class="corsage-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 690" fill="none" ${prefix === 'art' ? 'role="group" aria-label="胸花设计"' : 'aria-hidden="true"'}>
    <defs>
      <symbol id="${prefix}-loop-sprite" viewBox="60 55 1875 738" preserveAspectRatio="none"><image href="${loopSpritePath}" width="1983" height="793"/></symbol>
      <mask id="${prefix}-loop-alpha" maskUnits="userSpaceOnUse" x="20" y="-65" width="198" height="120" style="mask-type:alpha"><use href="#${prefix}-loop-sprite" x="22" y="-61" width="190" height="104"/></mask>
      <filter id="${prefix}-contact-shadow" x="-10%" y="-10%" width="125%" height="125%"><feDropShadow dx="1" dy="2.5" stdDeviation="1.2" flood-color="${dark}" flood-opacity=".22"/></filter>
      <filter id="${prefix}-gem-contact" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".45"/></filter>
      <clipPath id="${prefix}-gem-cut"><path d="${gemShape}"/></clipPath>
      ${crystalLetteringDefs(prefix)}
      ${surfaceDefs}
      ${tails.defs}
      ${ribbonDyeFilter(prefix, 'dye', mid)}${ribbonDyeFilter(prefix, 'secondary-dye', secondaryMid)}
      <pattern id="${prefix}-satin-cloth" width="280" height="190" patternUnits="userSpaceOnUse" x="0" y="-60"><image href="${texturePath}" width="280" height="190" preserveAspectRatio="none" filter="${ref('dye')}"/></pattern>
      <pattern id="${prefix}-secondary-cloth" width="280" height="190" patternUnits="userSpaceOnUse" x="0" y="-60"><image href="${texturePath}" width="280" height="190" preserveAspectRatio="none" filter="${ref('secondary-dye')}"/></pattern>
      <pattern id="${prefix}-warp" width="4.8" height="2.4" patternUnits="userSpaceOnUse"><path d="M 0 .5 H 4.8" stroke="#fff9e8" stroke-width=".45" opacity=".46"/><path d="M 0 1.2 H 4.8" stroke="${dark}" stroke-width=".35" opacity=".3"/><path d="M .7 .3 V 1.5 M 3.1 1.5 V 2.4" stroke="#fff8e9" stroke-width=".45" opacity=".36"/></pattern>
      <pattern id="${prefix}-dots" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="8" cy="7" r="3.2" fill="#fffaf0"/><circle cx="23" cy="22" r="3.2" fill="#fffaf0"/></pattern>
      <linearGradient id="${prefix}-satin" x1=".04" y1="1" x2=".38" y2="0"><stop stop-color="${dark}"/><stop offset=".09" stop-color="${mid}"/><stop offset=".39" stop-color="${mid}"/><stop offset=".63" stop-color="${light}"/><stop offset=".74" stop-color="${mid}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
      <linearGradient id="${prefix}-secondary" x1=".04" y1="1" x2=".38" y2="0"><stop stop-color="${secondaryDark}"/><stop offset=".09" stop-color="${secondaryMid}"/><stop offset=".39" stop-color="${secondaryMid}"/><stop offset=".63" stop-color="${secondaryLight}"/><stop offset=".74" stop-color="${secondaryMid}"/><stop offset="1" stop-color="${secondaryMid}"/></linearGradient>
      <linearGradient id="${prefix}-inner"><stop stop-color="${dark}"/><stop offset=".48" stop-color="${dark}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
      <linearGradient id="${prefix}-fold"><stop stop-color="${dark}"/><stop offset="1" stop-color="${mid}"/></linearGradient>
      <linearGradient id="${prefix}-secondary-fold"><stop stop-color="${secondaryDark}"/><stop offset="1" stop-color="${secondaryMid}"/></linearGradient>
      <linearGradient id="${prefix}-sheen"><stop stop-color="#fffbed" stop-opacity="0"/><stop offset=".53" stop-color="#fffbed" stop-opacity=".48"/><stop offset="1" stop-color="#fffbed" stop-opacity="0"/></linearGradient>
      <linearGradient id="${prefix}-tail-sheen" x2="0" y2="1"><stop stop-color="#fffbed" stop-opacity="0"/><stop offset=".35" stop-color="#fffbed" stop-opacity=".55"/><stop offset="1" stop-color="#fffbed" stop-opacity="0"/></linearGradient>
      <radialGradient id="${prefix}-pearl" cx=".32" cy=".25" r=".72"><stop stop-color="#fffdf8"/><stop offset=".45" stop-color="${pearlColor}"/><stop offset=".85" stop-color="#cdb6a3"/><stop offset="1" stop-color="${pearlColor}"/></radialGradient>
      <linearGradient id="${prefix}-jewel" x2="1" y2="1"><stop stop-color="#fffef9"/><stop offset=".32" stop-color="#d6eaf1"/><stop offset=".6" stop-color="#e8bcd3"/><stop offset="1" stop-color="#fff4d1"/></linearGradient>
      <pattern id="${prefix}-lace" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M 0 0 H 18 V 18 H 0 Z" fill="${laceColor}" fill-opacity=".42"/><circle cx="9" cy="9" r="5.5" stroke="${laceColor}" stroke-width="2.2"/><path d="M 0 0 L 18 18 M 18 0 L 0 18" stroke="${laceColor}" stroke-width=".8"/></pattern>
    </defs>
    <g class="flower-body">
      <g class="ribbon-tails" transform="translate(${tails.offset} 0)">${tails.markup}</g>
      <g class="flower-petals">${petals}</g>
      <g class="center-rosette">${centerFolds}<circle cx="300" cy="255" r="62" fill="${ref('secondary')}" stroke="${mid}" stroke-width="3"/><circle cx="300" cy="255" r="51" fill="${ref('satin')}"/>${beads}</g>
      <g class="badge-art"><image href="${embeddedBadge || badge.src}" x="${300-badgeSize/2}" y="${255-badgeSize/2}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet"/></g>
      <g class="finish-sparkles" opacity="${config.glitter ? 1 : 0}">${[[170,182],[435,230],[259,133],[371,381],[235,511]].map(([x,y])=>`<path d="M ${x-9} ${y} Q ${x} ${y-1} ${x} ${y-12} Q ${x+1} ${y} ${x+9} ${y} Q ${x} ${y+1} ${x} ${y+12} Q ${x-1} ${y} ${x-9} ${y} Z" fill="#fffaf0" stroke="#dfba7f" stroke-width=".8"/>`).join('')}</g>
    </g>
  </svg>`;
}
