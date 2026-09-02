const prints = document.querySelectorAll("[data-print]");

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );
  prints.forEach((el) => io.observe(el));
} else {
  prints.forEach((el) => el.classList.add("is-in"));
}

const still = document.querySelector(".still__img");
if (still && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  still.style.animation = "none";
}
