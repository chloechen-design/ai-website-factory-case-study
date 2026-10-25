import { ProgramCard } from "../sop-07-current/src/components.js";
import { loadProgramItems } from "./cms-adapter.js";

const status = document.querySelector("#status");
const result = document.querySelector("#result");
const params = new URLSearchParams(location.search);
const sourceUrl = new URL(params.get("source") === "missing" ? "./data/missing.json" : "./data/lisaa-programs.json", import.meta.url);

try {
  const items = await loadProgramItems({ url: sourceUrl.href });
  result.innerHTML = items.map((item) => ProgramCard({ item })).join("");
  status.textContent = `${items.length} fiche(s) rendue(s) depuis le JSON local. Le composant partagé n’a pas été modifié.`;
} catch (error) {
  result.replaceChildren();
  status.setAttribute("role", "alert");
  status.textContent = `Données indisponibles : ${error.message} Le contenu précédent du site n’est pas touché.`;
}
