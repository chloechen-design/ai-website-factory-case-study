import { ProgramCard, SectionHeading } from "../../src/components.js?v=sop-07-stepb";

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export function LisaaStudyAreaIndex({ content }) {
  const items = content.items.map((item) => `<li><a href="#program-${escapeHTML(item.id)}"><span>${escapeHTML(item.label)}</span><span aria-hidden="true">↘</span></a></li>`).join("");
  return `<section class="section lisaa-area-index" id="domaines" aria-labelledby="lisaa-area-title"><div class="lisaa-area-index__inner">${SectionHeading({ title: content.title, intro: content.intro, id: "lisaa-area-title" })}<nav aria-label="Accès direct aux domaines de formation"><ol>${items}</ol></nav></div></section>`;
}

export function LisaaCampusOverview({ content }) {
  return `<section class="section lisaa-campus-overview" id="campus" aria-labelledby="lisaa-campus-title"><div class="lisaa-campus-overview__inner"><div><p class="lisaa-campus-overview__label">Réseau de campus</p><h2 id="lisaa-campus-title">${escapeHTML(content.title)}</h2><p>${escapeHTML(content.description)}</p><a href="${escapeHTML(content.sourceUrl)}" target="_blank" rel="noreferrer">${escapeHTML(content.linkLabel)}</a></div><div class="lisaa-campus-overview__count"><strong>${escapeHTML(content.value)}</strong><span>${escapeHTML(content.unit)}</span></div></div><p class="source-note">${escapeHTML(content.note)}</p></section>`;
}

function uniqueValues(programs, key) {
  const values = programs.flatMap((program) => Array.isArray(program[key]) ? program[key] : [program[key]]);
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "fr"));
}

function selectOptions(id, label, emptyLabel, values) {
  return `<div class="lisaa-finder-field"><label for="${id}">${escapeHTML(label)}</label><select id="${id}" name="${id}" data-filter="${id}"><option value="">${escapeHTML(emptyLabel)}</option>${values.map((value) => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join("")}</select></div>`;
}

function finderProgramCard(program, index) {
  const item = {
    title: program.title,
    number: String(index + 1).padStart(2, "0"),
    summary: program.summary,
    caption: `Fiche LISAA consultée le ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(`${program.sourceCheckedAt}T12:00:00`))}.`,
    program: {
      id: program.id,
      type: "program",
      family: program.families.join(" · "),
      href: program.href,
      meta: {
        level: program.level,
        campus: program.cities.join(", "),
        qualification: program.qualification,
        duration: program.duration,
        mode: program.mode,
      },
      attributes: program.admission ? [{ label: "Admissible à", value: program.admission }] : [],
    },
  };
  return `<div class="lisaa-finder-result" data-catalog-program data-families="${escapeHTML(program.families.join("|"))}" data-cities="${escapeHTML(program.cities.join("|"))}" data-level="${escapeHTML(program.level)}">${ProgramCard({ item })}</div>`;
}

export function LisaaProgramFinder({ content }) {
  const programs = content.programs || [];
  const options = {
    families: uniqueValues(programs, "families"),
    cities: uniqueValues(programs, "cities"),
    levels: uniqueValues(programs, "level"),
  };
  const results = programs.map(finderProgramCard).join("");
  return `<section class="section lisaa-program-finder" id="catalogue-lisaa" aria-labelledby="lisaa-finder-title">
    <div class="lisaa-program-finder__intro">${SectionHeading({ title: content.title, intro: content.intro, id: "lisaa-finder-title" })}<p>${escapeHTML(content.scopeNote)}</p></div>
    <form class="lisaa-program-finder__filters" data-lisaa-program-finder>
      ${selectOptions("lisaa-filter-family", "Filière", "Toutes les filières", options.families)}
      ${selectOptions("lisaa-filter-city", "Ville", "Toutes les villes", options.cities)}
      ${selectOptions("lisaa-filter-level", "Niveau de sortie", "Tous les niveaux", options.levels)}
      <button class="button button--secondary" type="reset">Réinitialiser les filtres</button>
      <p class="lisaa-finder-status" data-result-count role="status" aria-live="polite">${programs.length} fiches exploratoires disponibles.</p>
    </form>
    <div class="lisaa-program-finder__results" data-lisaa-results>${results}</div>
    <p class="lisaa-finder-empty" data-empty-state hidden>Aucun résultat pour cette combinaison. Modifiez ou réinitialisez les filtres.</p>
    <p class="source-note">${escapeHTML(content.disclaimer)} <a href="${escapeHTML(content.catalogUrl)}" target="_blank" rel="noopener noreferrer">${escapeHTML(content.catalogLinkLabel)}</a></p>
  </section>`;
}

export function bindLisaaProgramFinder(root) {
  root.querySelectorAll("[data-lisaa-program-finder]").forEach((form) => {
    const section = form.closest(".lisaa-program-finder");
    const cards = [...(section?.querySelectorAll("[data-catalog-program]") || [])];
    const status = section?.querySelector("[data-result-count]");
    const emptyState = section?.querySelector("[data-empty-state]");
    if (!section || !status || !emptyState) return;

    const updateResults = () => {
      const family = form.elements.namedItem("lisaa-filter-family")?.value || "";
      const city = form.elements.namedItem("lisaa-filter-city")?.value || "";
      const level = form.elements.namedItem("lisaa-filter-level")?.value || "";
      let visibleCount = 0;
      cards.forEach((card) => {
        const families = card.dataset.families.split("|");
        const cities = card.dataset.cities.split("|");
        const matches = (!family || families.includes(family)) && (!city || cities.includes(city)) && (!level || card.dataset.level === level);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });
      status.textContent = `${visibleCount} résultat${visibleCount === 1 ? "" : "s"} sur ${cards.length} fiches exploratoires.`;
      emptyState.hidden = visibleCount > 0;
    };

    form.addEventListener("change", updateResults);
    form.addEventListener("reset", () => requestAnimationFrame(updateResults));
  });
}
