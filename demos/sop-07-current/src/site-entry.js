import { assemblePage } from "./page-assembler.js?v=sop-07-stepb";

const root = document.querySelector("#app");
const brandId = document.documentElement.dataset.brand;
if (!root) throw new Error("Conteneur de page introuvable.");
if (!/^[a-z0-9-]+$/i.test(brandId || "")) {
  throw new Error("Identifiant de marque manquant ou invalide.");
}
const { default: site } = await import(`../brands/${brandId}/site.js?v=sop-07-closure`);
await assemblePage({ root, site });
