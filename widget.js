(function () {
  const FONT_KEY = "fontSizeScale";
  const DEFAULT_SCALE = 1;

  const getSavedScale = () => {
    const saved = localStorage.getItem(FONT_KEY);
    return saved ? parseFloat(saved) : DEFAULT_SCALE;
  };

  const applyScale = (scale) => {
    const content = document.getElementById("content-wrapper");
    if (content) {
      content.style.transform = `scale(${scale})`;
      content.style.transformOrigin = "top left";
    }
  };

  const createWidget = () => {
    const widget = document.createElement("div");
    widget.id = "fontsize-widget";
    widget.setAttribute("aria-label", "Font size controls");
    widget.innerHTML = `
      <button id="fs-increase" title="ফন্ট সাইজ বাড়ান">A+</button>
      <button id="fs-decrease" title="ফন্ট সাইজ কমান">A-</button>
    `;
    document.body.appendChild(widget);

    const scaleStep = 0.1;
    let currentScale = getSavedScale();
    applyScale(currentScale);

    const updateDisabled = () => {
      incBtn.disabled = currentScale >= 2;
      decBtn.disabled = currentScale <= 0.5;
    };

    const incBtn = document.getElementById("fs-increase");
    const decBtn = document.getElementById("fs-decrease");

    incBtn.onclick = () => {
      currentScale = Math.min(currentScale + scaleStep, 2);
      applyScale(currentScale);
      localStorage.setItem(FONT_KEY, currentScale);
      updateDisabled();
    };

    decBtn.onclick = () => {
      currentScale = Math.max(currentScale - scaleStep, 0.5);
      applyScale(currentScale);
      localStorage.setItem(FONT_KEY, currentScale);
      updateDisabled();
    };

    updateDisabled();
  };
  window.FontSizeWidget = {
    init: () => {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createWidget);
      } else {
        createWidget();
      }
    },
  };

})();
