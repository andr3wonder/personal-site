import { worlds } from "./content.js";

export function worldNav(current, extraClass = "") {
  const items = [
    { id: "foyer", href: "/", label: "Foyer" },
    ...worlds.map((w) => ({ id: w.id, href: w.href, label: w.label })),
    { id: "diet", href: "/diet", label: "Diet" },
  ];

  return `<nav class="wnav ${extraClass}" aria-label="Other tellings">
    ${items
      .map(
        (item) =>
          `<a href="${item.href}" data-nav${item.id === current ? ' aria-current="page"' : ""}>${item.label}</a>`
      )
      .join("")}
  </nav>`;
}

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
