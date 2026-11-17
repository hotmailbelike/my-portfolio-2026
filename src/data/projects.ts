import type { ImageMetadata } from 'astro';

import alloyImage from '../assets/projects/alloy.webp';
import bevyShareCartImage from '../assets/projects/bevy-share-cart.png';
import facetflowAssetLibraryImage from '../assets/projects/facetflow-asset-library.jpg';
import facetflowHomeImage from '../assets/projects/facetflow-home.jpg';
import facetflowRenderOnBodyImage from '../assets/projects/facetflow-render-on-body.jpg';
import facetflowStudioImage from '../assets/projects/facetflow-studio.jpg';
import tradesOrgImage from '../assets/projects/trades-org.png';

export interface Screenshot {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export interface FeaturedProject {
  slug: string;
  name: string;
  years: string;
  summary: string;
  /** Two-line version of the summary for the home page card. */
  teaser: string;
  role: string;
  tags: string[];
  url: string;
  hero: Screenshot;
  screens: Screenshot[];
}

export interface SelectedProject {
  name: string;
  summary: string;
  role: string;
  /** A shipped fact or a number. Every card needs one. */
  outcome: string;
  tags: string[];
  url: string;
  image: ImageMetadata;
  imageAlt: string;
  /** CSS object-position for the 16:10 crop, so the useful part of the shot stays in frame. */
  imagePosition: string;
}

export interface ArchivedProject {
  year: string;
  name: string;
  builtWith: string;
  /** Left out when the app is no longer live; the row then reads "Retired". */
  url?: string;
}

export const FACETFLOW: FeaturedProject = {
  slug: 'facetflow',
  name: 'FacetFlow',
  years: '2025–now',
  summary:
    'An AI design and pricing platform for jewelers. One chat plans each request and hands it to specialist agents, turning a sketch or photo into photoreal renders, 3D models, on-body previews and tier-by-tier prices.',
  teaser:
    'An AI design and pricing platform for jewelers. One chat plans each request and hands it to specialist agents for renders, 3D models and prices.',
  role: 'Software engineer working with the founders, across the web app and the agent backend.',
  tags: ['TypeScript', 'Next.js', 'Nest.js', 'LangGraph', 'PostgreSQL', 'Gemini'],
  url: 'https://facetflow.io/',
  hero: {
    image: facetflowHomeImage,
    alt: "FacetFlow home: a grid of a studio's jewelry designs with the chat box below",
    caption: 'Home. Every design the studio has made, one chat box away from the next one.',
  },
  screens: [
    {
      image: facetflowStudioImage,
      alt: 'FacetFlow Design Studio: a ring design with its version history and a price estimate panel',
      caption: 'Design Studio. Each prompt makes a new version, and any version can be priced in place.',
    },
    {
      image: facetflowRenderOnBodyImage,
      alt: 'FacetFlow Render on Body: placing a ring on a hand silhouette before rendering',
      caption: 'Render on Body. Place a ring on a hand, then render it being worn.',
    },
    {
      image: facetflowAssetLibraryImage,
      alt: 'FacetFlow Asset Library: a generated 3D ring model with GLB, 3DM, STL and USDZ downloads',
      caption: 'Asset Library. Generated 3D models, ready to download for CAD or AR.',
    },
  ],
};

export const SELECTED_PROJECTS: SelectedProject[] = [
  {
    name: 'Trades.org CRM & ATS',
    summary:
      'A CRM and applicant tracking system for trade businesses: contacts and companies on one side, job posts and applicant pipelines on the other.',
    role: 'Played a key role in designing and implementing the ATS, and built key CRM features.',
    outcome: 'Live as the hiring product at jobs.trades.org.',
    tags: ['Next.js', 'Nest.js', 'GraphQL', 'Prisma', 'MongoDB'],
    url: 'https://jobs.trades.org/en',
    image: tradesOrgImage,
    imageAlt: 'Trades.org ATS landing page: "Enhance your hiring potential with our advanced ATS solutions"',
    imagePosition: 'center top',
  },
  {
    name: 'Alloy',
    summary:
      'A mobile app for selling unused gold, silver, platinum and palladium jewelry for cash, with upfront estimates, live support and a no-questions-asked return policy.',
    role: 'Built features across the React Native app and its Node.js back end.',
    outcome: 'Shipped to the App Store and Google Play.',
    tags: ['React Native', 'Firebase', 'Express.js', 'MongoDB'],
    url: 'https://nordstone.co.uk/trading-platform',
    image: alloyImage,
    imageAlt: 'Three phones showing the Alloy app: home, splash screen, and a gold ring payout estimate',
    imagePosition: 'center',
  },
  {
    name: 'Bevy Shopify apps',
    summary:
      'Sales Rules let store owners stack discount rules (since retired); Share Cart lets shoppers share a cart that a friend can rebuild and buy in one click.',
    role: 'Built both apps from first concept to deployment.',
    outcome: 'Used by tens of thousands of users.',
    tags: ['React', 'Next.js', 'Koa.js', 'MongoDB'],
    url: 'https://bevycommerce.com/share-cart/',
    image: bevyShareCartImage,
    imageAlt: 'Bevy Share Cart features: a share-cart button, a customization panel and a sharing dashboard',
    imagePosition: 'left top',
  },
];

/** Years come from each project's repository or store history. */
export const ARCHIVED_PROJECTS: ArchivedProject[] = [
  { year: '2021', name: 'Alphy', builtWith: 'React Native, Firebase, Detox' },
  { year: '2021', name: 'Pace Up!', builtWith: 'React Native, Node.js, MongoDB' },
  { year: '2020', name: 'Med Tracker', builtWith: 'React Native, Node.js, MongoDB' },
  {
    year: '2019',
    name: 'Rate my Professor',
    builtWith: 'jQuery, Express.js, MongoDB',
    url: 'https://github.com/hotmailbelike/rate-my-professor',
  },
];
