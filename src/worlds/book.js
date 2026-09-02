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
import { worldNav } from "../chrome.js";

export function renderBook(app) {
  document.documentElement.className = "is-book";
  document.body.className = "is-book";
  document.title = "Andrew Chuang · Book";

  app.innerHTML = `
    <div class="book" id="stage">
      <div class="book__ribbon" aria-hidden="true"></div>
      ${worldNav("book", "wnav--book")}

      <header class="leaf leaf--title" data-leaf>
        <p class="leaf__num">i</p>
        <p class="leaf__running">Chuang · 承翰</p>
        <h1>Andrew Chuang</h1>
        <p class="leaf__zh" lang="zh-Hant">莊承翰</p>
        <p class="drop">${mission.line}</p>
        <p>Creator at heart. Started by building communities in Taiwan, connecting students to do passion projects. <a href="${L.genzIg}">GenZ Taiwan</a>. At Berkeley found passion in building products: AI Voice Messenger. Now 1st cohort of Product Builders at LinkedIn. Join me in bringing joy to the world.</p>
        <aside class="marg">a sewn copy, not a résumé</aside>
      </header>

      <section class="leaf leaf--spread" data-leaf>
        <div class="recto">
          <p class="leaf__num">3</p>
          <h2>II. Place</h2>
          <p>${about.dance}</p>
          <p>${about.warrior}</p>
          <p>${about.place}</p>
          <p>${about.cherish}</p>
          <p class="leaf__links">
            <a href="/diet" data-nav>My Info Diet</a>
            <a href="${L.medium}">My Writings</a>
            <a href="${L.models}">My Mental Models</a>
          </p>
        </div>
        <figure class="verso">
          <img src="${photos.portrait}" alt="Andrew looking back over his shoulder in a geometric light tunnel." width="1400" height="1662" />
          <figcaption>A plate. Not a headshot for LinkedIn.</figcaption>
        </figure>
      </section>

      <section class="leaf" data-leaf>
        <p class="leaf__num">7</p>
        <h2>III. Five keepers</h2>
        <p>I wrote them on a train to Strasbourg. <a href="${L.lifeArticle}">All I need for life</a>.</p>
        <ol class="keepers">
          ${priorities
            .map(
              (p) =>
                `<li><strong>${p.title}</strong>${p.line ? ` ${p.line}` : ""}</li>`
            )
            .join("")}
        </ol>
        <aside class="marg marg--low">keep the order. body first.</aside>
      </section>

      <section class="leaf" data-leaf>
        <p class="leaf__num">11</p>
        <h2>IV. Make</h2>
        <p><a href="${L.blaze}">${products.blaze.name}</a>. ${products.blaze.what} ${products.blaze.users} ${products.blaze.craft} ${products.blaze.retention}</p>
        <p><a href="${L.feelable}">${products.feelable.name}</a>, ${products.feelable.what}.</p>
        <p>${products.linkedin.name}. ${products.linkedin.what}</p>
      </section>

      <section class="leaf leaf--spread" data-leaf>
        <figure class="verso">
          <img src="${photos.tedx}" alt="Empty chairs facing a homemade TEDx stage at Rongxing Garden." width="1600" height="1066" />
          <figcaption>TEDx Youth at Rongxing Garden. Cardboard letters.</figcaption>
        </figure>
        <div class="recto">
          <p class="leaf__num">15</p>
          <h2>V. Rooms</h2>
          <p><a href="${L.genzIg}">${genz.name}</a>. ${genz.what} <a href="${L.tedx}">${genz.tedx}</a> ${genz.seminars} ${genz.reach}</p>
          <p><a href="${L.genzStory}">The story of GenZ</a> is on Medium. The pitchdeck lives elsewhere. I am not pasting a deck into a book.</p>
        </div>
      </section>

      <section class="leaf" data-leaf>
        <p class="leaf__num">19</p>
        <h2>VI. Curiosity</h2>
        <p>${readsCallout}</p>
        <div class="shelf">${readsMarkup("shelf")}</div>
        <p><a href="/diet" data-nav>Open the diet cabinet</a>.</p>
      </section>

      <section class="leaf leaf--spread" data-leaf>
        <div class="recto">
          <p class="leaf__num">25</p>
          <h2>VII. Hands</h2>
          <p>${hobbies.writing} ${hobbies.films} ${hobbies.reading}</p>
          <p>${hobbies.travel}</p>
          <p>${hobbies.dance} ${hobbies.sports}</p>
          <p>${hobbies.acting} ${hobbies.cooking} ${hobbies.drawing} ${hobbies.content} <a href="${L.instagram}">Instagram</a> · <a href="${L.tiktok}">TikTok</a></p>
        </div>
        <div class="verso verso--stack">
          <img src="${photos.letterboxd}" alt="A Letterboxd grid of films Andrew has watched." width="900" height="1600" />
          <img src="${photos.medium}" alt="Andrew’s Medium page." width="728" height="796" />
        </div>
      </section>

      <section class="leaf leaf--end" data-leaf>
        <p class="leaf__num">31</p>
        <h2>VIII.</h2>
        <blockquote>${close.quote}</blockquote>
        <p>${close.chat} <a href="${L.instagram}">Instagram</a> or <a href="${L.linkedin}">LinkedIn</a>.</p>
        <figure class="endplate">
          <img src="${photos.cover}" alt="Andrew paddleboarding at sunset." width="2200" height="1650" />
        </figure>
      </section>
    </div>
  `;

  bindBook();
}

function bindBook() {
  const leaves = document.querySelectorAll("[data-leaf]");
  if (!("IntersectionObserver" in window)) {
    leaves.forEach((l) => l.classList.add("is-open"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.target.classList.toggle("is-open", e.isIntersecting));
    },
    { threshold: 0.2 }
  );
  leaves.forEach((l) => io.observe(l));
}
