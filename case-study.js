const scenes = [...document.querySelectorAll("[data-scene]")];
const chapterName = document.getElementById("chapter-name");
const sceneCount = document.getElementById("scene-count");
const sceneScrollHint = document.getElementById("scene-scroll-hint");
const controlCount = document.getElementById("control-count");
const progressFill = document.getElementById("progress-fill");
const previous = document.getElementById("previous-scene");
const next = document.getElementById("next-scene");
const contentsToggle = document.getElementById("contents-toggle");
const contentsPanel = document.getElementById("contents-panel");
const mobileMode = window.matchMedia("(max-width: 700px)");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentIndex = 0;
let componentCatalogPromise;

const padded = (number) => String(number).padStart(2, "0");
const clampIndex = (index) => Math.min(scenes.length - 1, Math.max(0, index));

function focusFrame(frame) {
  const focusSection = frame.dataset.focusSection;
  const focusSelector = frame.dataset.focusSelector;
  if (!focusSection && !focusSelector) return;
  const previewSelectors = frame.dataset.previewHide?.split(",").map((selector) => selector.trim()).filter(Boolean) || [];
  const applyFocus = () => {
    const frameDocument = frame.contentDocument;
    previewSelectors.forEach((selector) => {
      frameDocument?.querySelectorAll(selector).forEach((element) => {
        element.style.setProperty("display", "none", "important");
      });
    });
    const target = focusSelector
      ? frameDocument?.querySelector(focusSelector)
      : frameDocument?.getElementById(focusSection);
    if (target) {
      target.scrollIntoView({ block: "start", behavior: "instant" });
      return true;
    }
    return false;
  };
  try {
    if (applyFocus() || !focusSelector) return;
    let attempts = 0;
    const waitForTarget = window.setInterval(() => {
      try {
        if (applyFocus() || ++attempts >= 20) window.clearInterval(waitForTarget);
      } catch {
        window.clearInterval(waitForTarget);
      }
    }, 100);
  } catch {
    // Cross-origin frames keep their normal initial view.
  }
}

function loadFrame(frame) {
  if (!frame) return;
  if (frame.dataset.loaded === "true") {
    focusFrame(frame);
    return;
  }
  if (frame.dataset.focusSection || frame.dataset.focusSelector) {
    frame.addEventListener("load", () => focusFrame(frame), { once: true });
  }
  frame.src = frame.dataset.src;
  frame.dataset.loaded = "true";
}

async function loadComponentPreview(frame) {
  if (!frame || frame.dataset.loaded === "true") return;
  frame.dataset.loaded = "true";
  try {
    componentCatalogPromise ||= import("./demos/sop-07-current/src/library-catalog.js?v=scene-14-previews");
    const { renderComponentPreview } = await componentCatalogPromise;
    const component = frame.dataset.componentPreview;
    const brand = frame.dataset.brand;
    const variant = frame.dataset.variant;
    const markup = renderComponentPreview(component, brand, variant ? { variant } : {});
    const base = new URL("./demos/sop-07-current/", location.href).href;
    const theme = brand === "shared" ? "" : `<link rel="stylesheet" href="${base}brands/${brand}/theme.css">`;
    const interaction = component === "LisaaProgramFinder"
      ? `<script type="module">import { bindLisaaProgramFinder } from "${base}brands/lisaa/components.js?v=scene-14-preview"; bindLisaaProgramFinder(document);</script>`
      : "";
    frame.srcdoc = `<!doctype html><html lang="fr" data-brand="${brand}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="${base}"><link rel="stylesheet" href="${base}src/styles/tokens.css"><link rel="stylesheet" href="${base}src/styles/base.css">${theme}<link rel="stylesheet" href="${base}src/library.css"><style>
      html,body{margin:0;min-height:100%;overflow:hidden}body{padding:8px;background:var(--color-page);font-size:14px}.component-preview{height:100%;max-height:100%;overflow:auto;border:0;background:var(--color-page);scrollbar-width:thin}.component-preview>.hero{min-height:0;grid-template-columns:1fr}.component-preview .hero-copy,.component-preview .hero--cover .hero-copy{min-height:0;padding:8px 10px}.component-preview .hero h1{margin:3px 0;font-size:15px;line-height:1}.component-preview .hero-copy>p{margin:3px 0;font-size:11px;line-height:1.3}.component-preview .demo-label{font-size:10px;line-height:1.15}.component-preview .hero-description,.component-preview .hero-actions,.component-preview .hero-media-fallback{display:none!important}.component-preview .hero-media{display:none}.component-preview .button{min-height:38px}.component-preview .section{padding:7px}.component-preview .section-heading{margin:0;gap:4px}.component-preview .section-heading h2{margin:0;font-size:18px}.component-preview .section-heading p{margin:0;font-size:12px;line-height:1.35}.component-preview>.program-card,.component-preview>.formation-card{min-height:0!important;justify-content:flex-start;padding:7px}.component-preview .program-card__family,.component-preview .program-card__summary,.component-preview .program-card__attributes,.component-preview .formation-card-caption{display:none!important}.component-preview .formation-card h3{margin:5px 0 0;font-size:14px}.component-preview .lisaa-program-finder{padding:8px}.component-preview .lisaa-program-finder__intro .section-heading h2{font-size:16px}.component-preview .lisaa-program-finder__intro .section-heading p,.component-preview .lisaa-program-finder__intro>p{display:none}.component-preview .lisaa-program-finder__filters{grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}.component-preview .lisaa-program-finder__filters select{min-height:31px;padding:4px;font-size:10px}.component-preview .lisaa-program-finder__filters .button{grid-column:1/-1;justify-self:start;min-height:30px;font-size:10px}.component-preview .lisaa-finder-status,.component-preview .lisaa-program-finder>.source-note{font-size:10px}.component-preview .lisaa-finder-result .formation-card{grid-template-columns:1fr;gap:4px;padding:7px}.component-preview .lisaa-finder-result .program-card__topline,.component-preview .lisaa-finder-result .formation-card h3,.component-preview .lisaa-finder-result .program-card__summary,.component-preview .lisaa-finder-result .program-card__attributes,.component-preview .lisaa-finder-result .formation-card-caption{grid-column:1;grid-row:auto}.component-preview .lisaa-finder-result .formation-card h3{font-size:14px}.component-preview .lisaa-finder-result .program-card__summary,.component-preview .lisaa-finder-result .program-card__attributes,.component-preview .lisaa-finder-result .formation-card-caption{display:none}.component-preview .psb-recognition-panel{padding:7px}.component-preview .psb-recognition-panel .section-heading h2{font-size:15px}.component-preview .psb-recognition-panel .section-heading p,.component-preview .psb-recognition-panel>.source-note,.component-preview .psb-recognition-item span{display:none}.component-preview .psb-recognition-item{padding:6px}.component-preview .psb-recognition-item h3{font-size:14px}.component-preview .psb-recognition-item a{font-size:10px}
    </style></head><body><div class="component-preview">${markup}</div>${interaction}</body></html>`;
  } catch (error) {
    frame.srcdoc = `<!doctype html><html lang="fr"><meta charset="utf-8"><body style="margin:0;padding:12px;font:14px/1.4 sans-serif;color:#8b2e25">Aperçu indisponible : ${String(error?.message || error)}</body></html>`;
    frame.dataset.loaded = "error";
  }
}

function updateScene(index, { fromScroll = false, updateHash = true } = {}) {
  currentIndex = clampIndex(index);
  scenes.forEach((scene, sceneIndex) => {
    scene.hidden = !mobileMode.matches && sceneIndex !== currentIndex;
    scene.setAttribute("aria-label", `Scène ${padded(sceneIndex + 1)} sur ${padded(scenes.length)} : ${scene.querySelector("h1,h2")?.textContent.trim() ?? ""}`);
  });

  const active = scenes[currentIndex];
  sceneScrollHint.hidden = mobileMode.matches || active.scrollHeight <= active.clientHeight + 2;
  const countText = `${padded(currentIndex + 1)} / ${padded(scenes.length)}`;
  chapterName.textContent = active.dataset.chapter;
  sceneCount.textContent = countText;
  controlCount.textContent = countText;
  progressFill.style.width = `${((currentIndex + 1) / scenes.length) * 100}%`;
  previous.disabled = currentIndex === 0;
  next.disabled = currentIndex === scenes.length - 1;
  active.querySelectorAll("iframe[data-src]").forEach(loadFrame);
  active.querySelectorAll("iframe[data-component-preview]").forEach(loadComponentPreview);

  if (updateHash && location.hash !== `#${active.id}`) {
    history.replaceState(null, "", `#${active.id}`);
  }
  if (mobileMode.matches && !fromScroll) {
    active.scrollIntoView({ behavior: reduceMotion.matches ? "instant" : "smooth", block: "start" });
  }
}

function goTo(index) {
  updateScene(index);
  contentsPanel.hidden = true;
  contentsToggle.setAttribute("aria-expanded", "false");
}

previous.addEventListener("click", () => goTo(currentIndex - 1));
next.addEventListener("click", () => goTo(currentIndex + 1));

document.querySelectorAll("[data-go]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    goTo(Number(link.dataset.go));
  });
});

contentsToggle.addEventListener("click", () => {
  const willOpen = contentsPanel.hidden;
  contentsPanel.hidden = !willOpen;
  contentsToggle.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) contentsPanel.querySelector("a")?.focus();
});

contentsPanel.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    contentsPanel.hidden = true;
    contentsToggle.setAttribute("aria-expanded", "false");
    contentsToggle.focus();
  }
});

document.querySelectorAll("[data-switch]").forEach((button) => {
  button.addEventListener("click", () => {
    const groupName = button.dataset.switch;
    const frameId = { diagnostic: "diagnostic-frame", comparison: "comparison-frame", schools: "school-frame", adapter: "adapter-frame" }[groupName];
    const frame = document.getElementById(frameId);
    if (!frame) return;
    document.querySelectorAll(`[data-switch="${groupName}"]`).forEach((option) => {
      option.setAttribute("aria-pressed", String(option === button));
    });
    frame.dataset.src = button.dataset.src;
    frame.dataset.loaded = "false";
    frame.title = button.dataset.title;
    if (!scenes[currentIndex].contains(frame)) return;
    loadFrame(frame);
    const openLink = document.getElementById(button.dataset.open);
    if (openLink) openLink.href = button.dataset.src;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || target.closest("a,button,input,textarea,select,summary,[role='menu'],[role='dialog']"))) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goTo(currentIndex + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goTo(currentIndex - 1);
  }
});

function syncResponsiveMode() {
  updateScene(currentIndex, { updateHash: false });
}
mobileMode.addEventListener("change", syncResponsiveMode);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    if (!mobileMode.matches) return;
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) updateScene(scenes.indexOf(visible.target), { fromScroll: true });
  }, { threshold: [0.2, 0.4, 0.65] });
  scenes.forEach((scene) => observer.observe(scene));
}

const initialScene = scenes.findIndex((scene) => `#${scene.id}` === location.hash);
updateScene(initialScene >= 0 ? initialScene : 0, { updateHash: false });
