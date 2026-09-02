import {
  L,
  photos,
  flags,
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

export function renderTaiwan(app) {
  document.documentElement.className = "is-taiwan";
  document.body.className = "is-taiwan";
  document.title = "Andrew Chuang · 承翰";

  app.innerHTML = `
    <div class="tw" id="stage">
      ${worldNav("taiwan", "wnav--tw")}
      <aside class="route" aria-hidden="true">
        <svg viewBox="0 0 40 1200" preserveAspectRatio="none">
          <path id="hitch" d="M20 8 C 20 80, 8 140, 20 210 S 32 340, 18 430 S 8 560, 22 660 S 30 820, 16 940 S 20 1100, 20 1188" fill="none" stroke="#e8a54b" stroke-width="1.6" stroke-dasharray="3 7" />
        </svg>
      </aside>

      <header class="stop stop--ticket">
        <p class="serial">R7 · 承翰 · TPE-SFO</p>
        <h1>台北 <span>to a living room</span></h1>
        <p class="chop" lang="zh-Hant" aria-hidden="true">翰</p>
        <p data-ink>${mission.line} Creator at heart. I started in Taiwan, connecting students to do passion projects. Berkeley taught me products. LinkedIn Product Builder is the seat I hold now. Join me in bringing joy to the world.</p>
      </header>

      <section class="stop" id="taipei">
        <p class="km">01 · 台北 Taipei</p>
        <h2>Night air, not a postcard.</h2>
        <p data-ink>${about.dance} ${about.warrior}</p>
        <p data-ink>Born and raised in Taipei. ${about.place} ${about.cherish}</p>
        <p data-ink><a href="/diet" data-nav>My Info Diet</a> · <a href="${L.medium}">My Writings</a> · <a href="${L.models}">My Mental Models</a></p>
        <figure class="still">
          <img src="${photos.portrait}" alt="Andrew looking back over his shoulder in a geometric light tunnel." width="1400" height="1662" />
        </figure>
      </section>

      <section class="stop" id="hitchhike">
        <p class="km">02 · hitch</p>
        <h2>USD 15 across the island.</h2>
        <p data-ink>${hobbies.travel}</p>
        <p data-ink>${hobbies.dance} ${hobbies.sports} ${hobbies.acting} ${hobbies.cooking} ${hobbies.drawing}</p>
        <p class="flags">${flags}</p>
      </section>

      <section class="stop" id="rooms">
        <p class="km">03 · 人們 people</p>
        <h2>GenZ Taiwan</h2>
        <p data-ink>I founded a nonprofit. <a href="${L.genzIg}">${genz.name}</a>. <a href="${L.tedx}">${genz.tedx}</a> ${genz.seminars} ${genz.reach} <a href="${L.genzStory}">The story</a>.</p>
        <figure class="still">
          <img src="${photos.tedx}" alt="Empty chairs facing a homemade TEDx stage at Rongxing Garden." width="1600" height="1066" />
        </figure>
      </section>

      <section class="stop" id="berkeley">
        <p class="km">04 · Berkeley</p>
        <h2>Voice, then a journal.</h2>
        <p data-ink><a href="${L.blaze}">${products.blaze.name}</a>. ${products.blaze.what} ${products.blaze.users} ${products.blaze.craft} ${products.blaze.retention}</p>
        <p data-ink><a href="${L.feelable}">${products.feelable.name}</a>, ${products.feelable.what}.</p>
      </section>

      <section class="stop" id="sf">
        <p class="km">05 · SF living room</p>
        <h2>Five things I keep.</h2>
        <p data-ink>Written on a train to Strasbourg. <a href="${L.lifeArticle}">The essay</a>.</p>
        <ol>
          ${priorities
            .map((p) => `<li><strong>${p.title}</strong>${p.line ? ` · ${p.line}` : ""}</li>`)
            .join("")}
        </ol>
        <p data-ink>${products.linkedin.what}</p>
        <figure class="still still--water">
          <img src="${photos.cover}" alt="Andrew paddleboarding at sunset." width="2200" height="1650" />
        </figure>
      </section>

      <section class="stop" id="bag">
        <p class="km">06 · the bag</p>
        <h2>What I carry.</h2>
        <p data-ink>${hobbies.writing} ${hobbies.films} ${hobbies.reading} ${hobbies.content} <a href="${L.instagram}">Instagram</a> · <a href="${L.tiktok}">TikTok</a></p>
        <div class="bag-stills">
          <img src="${photos.letterboxd}" alt="A Letterboxd grid of films Andrew has watched." width="900" height="1600" />
          <img src="${photos.medium}" alt="Andrew’s Medium page." width="728" height="796" />
        </div>
        <p data-ink>${readsCallout}</p>
        <div class="tw-reads">${readsMarkup("tw-reads")}</div>
        <p><a href="/diet" data-nav>Full cabinet</a></p>
      </section>

      <footer class="stop stop--end">
        <p class="km">07 · again</p>
        <blockquote>${close.quote}</blockquote>
        <p>${close.chat} <a href="${L.instagram}">Instagram</a> · <a href="${L.linkedin}">LinkedIn</a></p>
      </footer>
    </div>
  `;

  bindTaiwan();
}

function bindTaiwan() {
  const path = document.getElementById("hitch");
  if (!path || reducedMotion()) return;
  const len = path.getTotalLength();
  path.style.strokeDasharray = `${len}`;
  path.style.strokeDashoffset = `${len}`;

  const onScroll = () => {
    const el = document.documentElement;
    const t = el.scrollTop / Math.max(1, el.scrollHeight - innerHeight);
    path.style.strokeDashoffset = String(len * (1 - t));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.__onLeave = () => window.removeEventListener("scroll", onScroll);
}
