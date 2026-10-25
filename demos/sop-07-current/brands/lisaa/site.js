import { lisaaBrand } from "./config.js?v=sop-07-stepb";
import { bindLisaaProgramFinder, LisaaCampusOverview, LisaaProgramFinder, LisaaStudyAreaIndex } from "./components.js?v=sop-07-stepb";
import { lisaaHomepage } from "../../data/lisaa-homepage.js?v=sop-07-stepb";

export default {
  brand: lisaaBrand,
  content: lisaaHomepage,
  themeUrl: new URL("./theme.css?v=sop-07-stepb", import.meta.url).href,
  components: { LisaaCampusOverview, LisaaProgramFinder, LisaaStudyAreaIndex },
  page: {
    header: { component: "SiteHeader" },
    sections: [
      { component: "Hero", contentKey: "hero" },
      { component: "LisaaStudyAreaIndex", contentKey: "studyAreaIndex" },
      { component: "LisaaProgramFinder", contentKey: "programFinder" },
      { component: "ProgramSection", contentKey: "programs" },
      { component: "LisaaCampusOverview", contentKey: "campusOverview" },
      { component: "NewsSection", contentKey: "news" },
      { component: "AgendaSection", contentKey: "agenda" },
    ],
    footer: { component: "SiteFooter", contentKey: "footer" },
  },
  initialize: ({ root }) => bindLisaaProgramFinder(root),
};
