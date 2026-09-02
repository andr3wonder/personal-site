import { L, readsCallout, readsMarkup } from "../content.js";
import { worldNav } from "../chrome.js";

export async function renderDiet(app) {
  document.documentElement.className = "is-diet";
  document.body.className = "is-diet";
  document.title = "Andrew Chuang · Info Diet";

  let snap = { books: [], articles: [], snapshotDate: "", fullDiet: L.dietNotion };
  try {
    snap = await fetch("/data/diet.json").then((r) => r.json());
  } catch {
    /* static snapshot missing; shelves still render */
  }

  app.innerHTML = `
    <div class="diet" id="stage">
      ${worldNav("diet", "wnav--diet")}
      <header class="diet__head">
        <p class="diet__kicker">cabinet</p>
        <h1>My Info Diet</h1>
        <p>${readsCallout}</p>
        <p class="diet__trust">The live shelf lives in Notion, for people I trust. <a href="${snap.fullDiet || L.dietNotion}">Full diet</a>. Writings: <a href="${L.medium}">Medium</a>. Films: Letterboxd, in the other tellings.</p>
      </header>

      <section class="diet__spine">
        <h2>Favorite reads</h2>
        <div class="cabinet">${readsMarkup("cabinet")}</div>
      </section>

      <section class="diet__snap">
        <h2>Recent, as of ${snap.snapshotDate || "this snapshot"}</h2>
        <p class="diet__honest">A frozen copy of the Readwise feed. Not scraped paywalls. Titles and authors only.</p>
        <div class="slips">
          <div>
            <h3>Books</h3>
            <ul>
              ${(snap.books || [])
                .map(
                  (b) =>
                    `<li>${b.title}${b.author ? ` <span>${b.author}</span>` : ""}${b.tag ? ` <em>${b.tag}</em>` : ""}</li>`
                )
                .join("")}
            </ul>
          </div>
          <div>
            <h3>Articles</h3>
            <ul>
              ${(snap.articles || [])
                .map(
                  (b) =>
                    `<li>${b.title}${b.author ? ` <span>${b.author}</span>` : ""}</li>`
                )
                .join("")}
            </ul>
          </div>
        </div>
      </section>
    </div>
  `;
}
