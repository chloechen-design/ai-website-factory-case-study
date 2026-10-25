export async function loadProgramItems({ url, fetchImpl = fetch } = {}) {
  if (!url) throw new Error("URL du contenu manquante.");
  const response = await fetchImpl(url);
  if (!response.ok) throw new Error(`Chargement impossible (HTTP ${response.status}).`);

  const payload = await response.json();
  if (payload?.schemaVersion !== 1 || !Array.isArray(payload.items)) {
    throw new Error("Format de contenu invalide : schemaVersion 1 et items[] sont requis.");
  }

  return payload.items.map((record, index) => {
    const required = ["id", "title", "families", "cities", "level"];
    const missing = required.filter((key) => !record?.[key] || (Array.isArray(record[key]) && record[key].length === 0));
    if (missing.length) throw new Error(`Fiche ${index + 1} invalide : champs requis manquants (${missing.join(", ")}).`);

    return {
      title: record.title,
      summary: record.summary || "",
      tone: "paper",
      number: String(index + 1).padStart(2, "0"),
      program: {
        id: record.id,
        type: "program",
        family: record.families.join(" · "),
        href: record.href,
        meta: {
          level: record.level,
          campus: record.cities.join(", "),
          qualification: record.qualification,
          duration: record.duration,
          mode: record.mode,
        },
        attributes: record.admission ? [{ label: "Admissible à", value: record.admission }] : [],
      },
    };
  });
}
