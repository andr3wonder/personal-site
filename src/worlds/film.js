import {
  L,
  photos,
  mission,
  about,
  priorities,
  products,
  genz,
  readsCallout,
  readsMarkup,
  hobbies,
  close,
} from "../content.js";
import { worldNav, reducedMotion } from "../chrome.js";

export function renderFilm(app) {
  document.documentElement.className = "is-film";
  document.body.className = "is-film";
  document.title = "Andrew Chuang · Film";

  app.innerHTML = `
    <div class="film" id="stage">
      <div class="letterbox" aria-hidden="true"></div>
      ${worldNav("film", "wnav--film")}

      <section class="scene scene--card" data-scene>
        <p class="slate">SCENE 00 · TITLE</p>
        <h1>ANDREW<br />CHUANG</h1>
        <p class="vname" lang="zh-Hant">承翰</p>
        <p class="card-sub">A TELLING IN STILLS</p>
      </section>

      <section class="scene scene--still" data-scene>
        <div class="still-wrap still-wrap--water">
          <img class="ken" src="${photos.cover}" alt="Andrew paddleboarding at sunset, looking toward the horizon." width="2200" height="1650" />
          <div class="grain-local"></div>
        </div>
        <div class="on-still">
          <p class="slate">SCENE 01 · MISSION</p>
          <p class="on-still__lead">${mission.line}</p>
          <p>Creator at heart. I started by building communities in Taiwan, connecting students to do passion projects. <a href="${L.genzIg}">GenZ Taiwan</a>.</p>
          <p>At Berkeley I found passion in building products: AI Voice Messenger. Now 1st cohort of Product Builders at LinkedIn. Join me in bringing joy to the world.</p>
        </div>
      </section>

      <section class="scene scene--split" data-scene>
        <div class="still-wrap still-wrap--pull">
          <img class="ken" src="${photos.portrait}" alt="Andrew looking back over his shoulder in a geometric light tunnel." width="1400" height="1662" />
          <div class="grain-local"></div>
        </div>
        <div class="on-still on-still--right">
          <p class="slate">SCENE 02 · ABOUT</p>
          <p>${about.dance}</p>
          <p>${about.warrior}</p>
          <p>${about.place}</p>
          <p>${about.cherish}</p>
          <p class="scene-links">
            <a href="/diet" data-nav>My Info Diet</a>
            <a href="${L.medium}">My Writings</a>
            <a href="${L.models}">My Mental Models</a>
          </p>
        </div>
      </section>

      <section class="scene scene--pri" data-scene>
        <p class="slate">SCENE 03 · FIVE THINGS I KEEP</p>
        <p class="pri-note">Written on a train to Strasbourg. <a href="${L.lifeArticle}">The essay</a>.</p>
        <ol class="pri">
          ${priorities
            .map(
              (p) =>
                `<li><span>${p.n}</span><strong>${p.title}</strong>${p.line ? `<em>${p.line}</em>` : ""}</li>`
            )
            .join("")}
        </ol>
      </section>

      <section class="scene scene--work" data-scene>
        <p class="slate">SCENE 04 · WHAT I BUILD</p>
        <article>
          <h2><a href="${L.blaze}">${products.blaze.name}</a></h2>
          <p>${products.blaze.what} ${products.blaze.users}</p>
          <p>${products.blaze.craft} ${products.blaze.retention}</p>
        </article>
        <article>
          <h2><a href="${L.feelable}">${products.feelable.name}</a></h2>
          <p>${products.feelable.what}</p>
        </article>
        <article>
          <h2>${products.linkedin.name}</h2>
          <p>${products.linkedin.what}</p>
        </article>
      </section>

      <section class="scene scene--still" data-scene>
        <div class="still-wrap">
          <img class="ken" src="${photos.tedx}" alt="Empty chairs facing a homemade TEDx stage at Rongxing Garden." width="1600" height="1066" />
          <div class="grain-local"></div>
        </div>
        <div class="on-still">
          <p class="slate">SCENE 05 · GENZ TAIWAN</p>
          <p><a href="${L.genzIg}">${genz.name}</a>. ${genz.what}</p>
          <p><a href="${L.tedx}">${genz.tedx}</a> ${genz.seminars}</p>
          <p>${genz.reach} <a href="${L.genzStory}">The story of GenZ</a>.</p>
        </div>
      </section>

      <section class="scene scene--hobbies" data-scene>
        <p class="slate">SCENE 06 · HANDS</p>
        <div class="hobby-stills">
          <figure>
            <img src="${photos.letterboxd}" alt="A Letterboxd grid of films Andrew has watched." width="900" height="1600" />
            <figcaption>${hobbies.films}</figcaption>
          </figure>
          <figure>
            <img src="${photos.medium}" alt="Andrew’s Medium page with essays including All I need for life." width="728" height="796" />
            <figcaption>${hobbies.writing}</figcaption>
          </figure>
        </div>
        <ul class="hobby-lines">
          <li>${hobbies.reading}</li>
          <li>${hobbies.travel}</li>
          <li>${hobbies.dance}</li>
          <li>${hobbies.sports}</li>
          <li>${hobbies.acting} ${hobbies.cooking} ${hobbies.drawing}</li>
          <li>${hobbies.content} <a href="${L.instagram}">Instagram</a> · <a href="${L.tiktok}">TikTok</a></li>
        </ul>
      </section>

      <section class="scene scene--credits" data-scene>
        <p class="slate">SCENE 07 · CURIOSITY</p>
        <p class="credits-call">${readsCallout}</p>
        <div class="credits">${readsMarkup("credits")}</div>
        <p class="credits-more"><a href="/diet" data-nav>The diet cabinet</a></p>
      </section>

      <section class="scene scene--end" data-scene>
        <p class="slate">SCENE 08 · END CARD</p>
        <blockquote>${close.quote}</blockquote>
        <p>${close.chat} <a href="${L.instagram}">Instagram</a> · <a href="${L.linkedin}">LinkedIn</a></p>
      </section>
    </div>
  `;

  bindFilm();
}

function bindFilm() {
  const scenes = document.querySelectorAll("[data-scene]");
  if (!("IntersectionObserver" in window)) {
    scenes.forEach((s) => s.classList.add("is-on"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.target.classList.toggle("is-on", e.isIntersecting));
    },
    { threshold: 0.45 }
  );
  scenes.forEach((s) => io.observe(s));

  if (reducedMotion()) {
    document.querySelectorAll(".ken").forEach((img) => {
      img.style.animation = "none";
      img.style.filter = "none";
    });
  }
}
