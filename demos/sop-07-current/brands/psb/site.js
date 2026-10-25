import { psbBrand } from "./config.js?v=sop-07-stepb";
import { PsbCampusContext, PsbRecognitionPanel } from "./components.js?v=sop-07-stepb";
import { psbHomepage } from "../../data/psb-homepage.js?v=sop-07-closure";

export default {
  brand: psbBrand,
  content: psbHomepage,
  themeUrl: new URL("./theme.css?v=sop-07-stepb", import.meta.url).href,
  components: { PsbCampusContext, PsbRecognitionPanel },
  page: {
    header: { component: "SiteHeader" },
    sections: [
      { component: "Hero", contentKey: "hero" },
      { component: "ProgramSection", contentKey: "programs" },
      { component: "MetricsSection", contentKey: "metrics" },
      { component: "PsbCampusContext", contentKey: "campusContext" },
      { component: "PsbRecognitionPanel", contentKey: "recognition" },
      { component: "NewsSection", contentKey: "news" },
      { component: "AgendaSection", contentKey: "agenda" },
    ],
    footer: { component: "SiteFooter", contentKey: "footer" },
  },
};
