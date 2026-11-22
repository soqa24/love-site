export function initBurger() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".mobile-menu");
  if (!burger || !menu) return;

  const toggle = (open) => {
    burger.classList.toggle("burger--open", open);
    menu.classList.toggle("mobile-menu--open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", String(!open));

    document.body.style.overflowY = open ? "hidden" : "";
  };

  burger.addEventListener("click", () => {
    toggle(!menu.classList.contains("mobile-menu--open"));
  });

  const closeBtn = menu.querySelector(".modal--close");
  if (closeBtn) closeBtn.addEventListener("click", () => toggle(false));

  const overlay = menu.querySelector(".modal--overlay");
  if (overlay) overlay.addEventListener("click", () => toggle(false));

  menu.querySelectorAll(".mobile-menu--link").forEach((link) =>
    link.addEventListener("click", () => toggle(false))
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggle(false);
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("mobile-menu--open")) return;
    if (menu.contains(e.target) || burger.contains(e.target)) return;
    toggle(false);
  });
}
