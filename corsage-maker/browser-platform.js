const corsagePlatform = (() => {
  let badgeDataPromise;
  function loadBadgeData() {
    if (!badgeDataPromise) badgeDataPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "./badge-data.js";
      script.onload = resolve;
      script.onerror = () => { badgeDataPromise = null; script.remove(); reject(new Error("badge-data")); };
      document.head.appendChild(script);
    });
    return badgeDataPromise;
  }
  function download(blob, name) {
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return {
    imageLabel: "下载作品图片 PNG",
    imageError: "图片暂时没装好，可以重试或保存设计单",
    designLabel: "保存设计单",
    async prepareArtwork(config) {
      await loadBadgeData();
      return { badge: badgeImageData[config.badge] };
    },
    async saveImage(canvas, config) {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("Image unavailable");
      download(blob, `胸花-${config.name || "定制"}.png`);
      return "作品图片已下载";
    },
    async saveDesign(payload, key) {
      download(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }), `${payload.code}-胸花设计单.json`);
      try { localStorage.setItem(key, JSON.stringify(payload.configuration)); } catch (error) {
        // The downloaded design remains available without local storage.
      }
      return "设计单已下载，可以发给手作师啦";
    }
  };
})();
