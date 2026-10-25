import { penninghenBrand } from "../brands/penninghen/config.js";
import { homepageContent } from "../data/penninghen-homepage.js";
import {
  AgendaSection,
  FormationSection,
  Hero,
  MetricsSection,
  NewsSection,
  ProjectGallery,
  SiteFooter,
  SiteHeader,
} from "./components.js";

const root = document.querySelector("#app");
document.documentElement.dataset.brand = penninghenBrand.id;

root.innerHTML = `
  ${SiteHeader({ brand: penninghenBrand, content: homepageContent })}
  <main id="contenu">
    ${Hero({ brand: penninghenBrand, content: homepageContent.hero })}
    ${FormationSection({ content: homepageContent.formations })}
    ${ProjectGallery({ content: homepageContent.projects })}
    ${MetricsSection({ content: homepageContent.metrics })}
    ${NewsSection({ content: homepageContent.news })}
    ${AgendaSection({ content: homepageContent.agenda })}
  </main>
  ${SiteFooter({ brand: penninghenBrand, content: homepageContent.footer })}
`;

const menuToggle = document.querySelector("[data-menu-toggle]");
const menuLabel = document.querySelector("[data-menu-label]");

function setMenuOpen(open) {
  document.documentElement.dataset.menuOpen = String(open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuLabel.textContent = open ? "Fermer" : "Menu";
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

document.querySelectorAll(".primary-navigation a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});
