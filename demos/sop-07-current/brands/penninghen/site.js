import { penninghenBrand } from "./config.js?v=sop-07-stepb";
import { homepageContent } from "../../data/penninghen-homepage.js?v=sop-07-stepb";

export default {
  brand: penninghenBrand,
  content: homepageContent,
  themeUrl: new URL("./theme.css?v=sop-07-stepb", import.meta.url).href,
  page: {
    header: { component: "SiteHeader" },
    sections: [
      { component: "Hero", contentKey: "hero" },
      { component: "ProgramSection", contentKey: "formations" },
      { component: "ProjectGallery", contentKey: "projects" },
      { component: "MetricsSection", contentKey: "metrics" },
      { component: "NewsSection", contentKey: "news" },
      { component: "AgendaSection", contentKey: "agenda" },
    ],
    footer: { component: "SiteFooter", contentKey: "footer" },
  },
};
