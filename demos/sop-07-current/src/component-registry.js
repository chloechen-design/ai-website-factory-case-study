import {
  AgendaSection,
  EditorialCard,
  EventItem,
  FormationSection,
  Hero,
  MetricsSection,
  NewsSection,
  ProgramCard,
  ProjectGallery,
  SiteFooter,
  SiteHeader,
} from "./components.js?v=sop-07-stepb";

/* Adaptateurs communs : les marques choisissent les types, pas des copies de composants. */
export const sharedComponentRegistry = {
  SiteHeader: ({ brand, content }) => SiteHeader({ brand, content }),
  Hero: ({ brand, content }) => Hero({ brand, content }),
  ProgramSection: ({ content }) => FormationSection({ content }),
  FormationSection: ({ content }) => FormationSection({ content }),
  ProgramCard: ({ content }) => ProgramCard({ item: content }),
  EditorialCard: ({ content, slot }) => EditorialCard({ item: content, linkLabel: slot?.linkLabel }),
  EventItem: ({ content }) => EventItem({ item: content }),
  ProjectGallery: ({ content }) => ProjectGallery({ content }),
  MetricsSection: ({ content }) => MetricsSection({ content }),
  NewsSection: ({ content }) => NewsSection({ content }),
  AgendaSection: ({ content }) => AgendaSection({ content }),
  SiteFooter: ({ brand, content }) => SiteFooter({ brand, content }),
};
