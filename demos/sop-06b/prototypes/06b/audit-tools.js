/* Outils de diagnostic réservés aux routes prototypes/audit ; aucun composant public du DS. */
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[character]));

export function auditMarker(kind, label) {
  const state = escapeHTML(kind);
  return `<p class="audit-component-note"><span class="audit-state audit-state--${state}">${state.toUpperCase()} — ${escapeHTML(label)}</span></p>`;
}

export function diagnosticGap({ id, need, limit, extension }) {
  const safeId = escapeHTML(id);
  return `<aside class="audit-gap" data-gap-id="${safeId}" aria-labelledby="${safeId}-title">
    <p class="audit-gap__state">C — Extension nécessaire</p>
    <h3 id="${safeId}-title">${escapeHTML(need)}</h3>
    <dl>
      <div><dt>Limite du composant actuel</dt><dd>${escapeHTML(limit)}</dd></div>
      <div><dt>Extension envisagée · non développée</dt><dd>${escapeHTML(extension)}</dd></div>
    </dl>
    <p class="audit-gap__footnote">Diagnostic statique · aucune interaction ni fonctionnalité C n’est simulée.</p>
  </aside>`;
}

export function auditBanner({ name, counterpart, counterpartHref, observationNote }) {
  return `<aside class="audit-mode-banner" aria-label="Mode prototype et audit">
    <div><p class="audit-mode-banner__label">Mode prototype / audit · non destiné au public</p>
      <p>${escapeHTML(name)} · ${escapeHTML(observationNote)}</p></div>
    <a href="${escapeHTML(counterpartHref)}">Comparer avec ${escapeHTML(counterpart)}</a>
  </aside>`;
}

export function auditAssemblyGap() {
  return diagnosticGap({
    id: "gap-assembly",
    need: "Assembler l’ordre et la présence des sections depuis la configuration de marque",
    limit: "src/main.js conserve une séquence fixe Penninghen. Ces deux aperçus utilisent des points d’entrée d’audit séparés pour ne pas modifier l’assembleur ni les composants communs.",
    extension: "Composition déclarative de sections (ordre, variantes et options), indépendante des marques — reportée à l’étape 06C.",
  });
}
