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

export function renderStory(app) {
  document.documentElement.className = "is-story";
  document.body.className = "is-story";
  document.title = "Andrew Chuang · Story";

  const pri = priorities
    .map((p) => `${p.title}${p.line ? `: ${p.line}` : ""}`)
    .join(". ");

  app.innerHTML = `
    <div class="story" id="stage">
      ${worldNav("story", "wnav--story")}

      <article class="letter-scroll">
        <p class="breath" data-set>Joy.</p>
        <h1 data-set>Andrew. <span lang="zh-Hant">承翰</span>.</h1>
        <p data-set>${mission.line} Creator at heart.</p>
        <p data-set>I started by building communities in Taiwan, connecting students to do passion projects. <a href="${L.genzIg}">GenZ Taiwan</a> is that room. At Berkeley I found passion in building products: AI Voice Messenger. Now I am in the 1st cohort of Product Builders at LinkedIn. Join me in bringing joy to the world.</p>

        <figure class="flash">
          <img src="${photos.cover}" alt="Andrew paddleboarding at sunset, looking toward the horizon." width="2200" height="1650" />
        </figure>

        <p class="breath" data-set>Place.</p>
        <p data-set>${about.dance} ${about.warrior}</p>
        <p data-set>${about.place} ${about.cherish}</p>
        <p data-set>If you want the trail of what I am learning: <a href="/diet" data-nav>My Info Diet</a>. Writings live on <a href="${L.medium}">Medium</a>. Mental models sit quietly in <a href="${L.models}">Notion</a>.</p>

        <figure class="flash flash--portrait">
          <img src="${photos.portrait}" alt="Andrew looking back over his shoulder in a geometric light tunnel." width="1400" height="1662" />
        </figure>

        <p class="breath" data-set>Keepers.</p>
        <p data-set>I wrote my life priorities on a train to Strasbourg. <a href="${L.lifeArticle}">All I need for life</a>.</p>
        <p data-set>${pri}.</p>

        <p class="breath" data-set>Work.</p>
        <p data-set><a href="${L.blaze}">Blaze Messenger</a> is an AI voice messenger. It messages for you by voice. 200k users. 110k installs in the first month, 10k DAUs. A 0-1 launch. 25 usability tests, 100+ mockups, 70+ in the backlog. An LLM messaging agent. 30D retention up 12% from a 4-stage onboarding A/B.</p>
        <p data-set><a href="${L.feelable}">feelable.ai</a> is a mood journaling companion. LinkedIn Product Builder is the work in front of me now.</p>

        <p class="breath" data-set>Rooms.</p>
        <p data-set>I founded <a href="${L.genzIg}">GenZ Taiwan</a>, a nonprofit. We made the <a href="${L.tedx}">1st TW cross-school TEDx</a>, a hundred people. NPO Leadership Seminars with TW Ministry of Tech. IG + Podcast, 2k followers. I wrote <a href="${L.genzStory}">the story of GenZ</a>.</p>

        <figure class="flash">
          <img src="${photos.tedx}" alt="Empty chairs facing a homemade TEDx stage at Rongxing Garden." width="1600" height="1066" />
        </figure>

        <p class="breath" data-set>Hands.</p>
        <p data-set>${hobbies.writing} ${hobbies.films} ${hobbies.reading}</p>
        <p data-set>${hobbies.travel}</p>
        <p data-set>${hobbies.dance} ${hobbies.sports} ${hobbies.acting} ${hobbies.cooking} ${hobbies.drawing} ${hobbies.content} <a href="${L.instagram}">Instagram</a> · <a href="${L.tiktok}">TikTok</a></p>

        <div class="two-stills">
          <img src="${photos.letterboxd}" alt="A Letterboxd grid of films Andrew has watched." width="900" height="1600" />
          <img src="${photos.medium}" alt="Andrew’s Medium page." width="728" height="796" />
        </div>

        <p class="breath" data-set>Curiosity.</p>
        <p data-set>${readsCallout}</p>
        <div class="story-reads">${readsMarkup("story-reads")}</div>
        <p data-set><a href="/diet" data-nav>The rest of the diet is in the cabinet</a>.</p>

        <p class="breath" data-set>Again.</p>
        <p class="close-line" data-set>${close.quote}</p>
        <p data-set>${close.chat} <a href="${L.instagram}">Instagram</a> or <a href="${L.linkedin}">LinkedIn</a>.</p>
      </article>
    </div>
  `;

  bindStory();
}

function bindStory() {
  const nodes = document.querySelectorAll("[data-set]");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach((n) => n.classList.add("is-set"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-set");
      });
    },
    { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
  );
  nodes.forEach((n) => io.observe(n));
}
