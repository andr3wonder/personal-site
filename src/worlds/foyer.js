import { photos, worlds, mission } from "../content.js";

const stills = [photos.cover, photos.portrait, photos.tedx];

export function renderFoyer(app) {
  document.documentElement.className = "is-foyer";
  document.body.className = "is-foyer";
  document.title = "Andrew Chuang 承翰";

  app.innerHTML = `
    <div class="foyer" id="stage">
      <header class="foyer__top">
        <p class="foyer__shop">Prints &amp; tellings</p>
        <h1>Andrew Chuang <span lang="zh-Hant">承翰</span></h1>
        <p class="foyer__ask">Pick one. Same life, four objects.</p>
      </header>

      <div class="foyer__counter">
        ${worlds
          .map(
            (w, i) => `
          <a class="obj obj--${w.id}" href="${w.href}" data-nav>
            <span class="obj__kind">${w.object}</span>
            ${objectInner(w, i)}
            <span class="obj__name">${w.label}</span>
          </a>`
          )
          .join("")}
      </div>

      <p class="foyer__note">
        The <a href="/diet" data-nav>info diet</a> sits in a cabinet, not on the counter.
      </p>
    </div>
  `;
}

function objectInner(w, i) {
  if (w.id === "film") {
    return `<span class="strip" aria-hidden="true">
      ${stills
        .map((src) => `<span class="strip__frame"><img src="${src}" alt="" /></span>`)
        .join("")}
    </span>`;
  }
  if (w.id === "book") {
    return `<span class="sig" aria-hidden="true">
      <span class="sig__block"></span>
      <span class="sig__thread"></span>
      <span class="sig__title">Chuang</span>
    </span>`;
  }
  if (w.id === "story") {
    return `<span class="letter" aria-hidden="true">
      <span class="letter__fold">${mission.line}</span>
    </span>`;
  }
  return `<span class="tix" aria-hidden="true">
    <span class="tix__serial">R7 · ${String(i + 1).padStart(2, "0")}</span>
    <span class="tix__from">台北</span>
    <span class="tix__to">SF</span>
  </span>`;
}
