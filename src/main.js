import "./styles/shared.css";
import "./styles/foyer.css";
import "./styles/film.css";
import "./styles/book.css";
import "./styles/story.css";
import "./styles/taiwan.css";
import "./styles/diet.css";

import { renderFoyer } from "./worlds/foyer.js";
import { renderFilm } from "./worlds/film.js";
import { renderBook } from "./worlds/book.js";
import { renderStory } from "./worlds/story.js";
import { renderTaiwan } from "./worlds/taiwan.js";
import { renderDiet } from "./worlds/diet.js";

const routes = {
  "/": renderFoyer,
  "/film": renderFilm,
  "/book": renderBook,
  "/story": renderStory,
  "/taiwan": renderTaiwan,
  "/diet": renderDiet,
};

function pathOf() {
  const raw = location.pathname.replace(/\/+$/, "") || "/";
  if (raw.endsWith("/index.html")) return "/";
  return raw;
}

async function render() {
  if (typeof window.__onLeave === "function") {
    window.__onLeave();
    window.__onLeave = null;
  }
  const app = document.getElementById("app");
  const path = pathOf();
  const fn = routes[path] || renderFoyer;
  window.scrollTo(0, 0);
  await fn(app);
}

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-nav]");
  if (!a || a.target === "_blank") return;
  const url = new URL(a.href, location.origin);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  if (url.pathname === location.pathname) return;
  history.pushState({}, "", url.pathname);
  render();
});

window.addEventListener("popstate", render);
render();
