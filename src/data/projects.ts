import type { ImageMetadata } from 'astro';

import alloyImage from '../assets/projects/alloy.webp';
import bevyPriceRulesImage from '../assets/projects/bevy-price-rules.webp';
import bevyShareCartImage from '../assets/projects/bevy-share-cart.webp';
import facetflowAssetLibraryImage from '../assets/projects/facetflow-asset-library.jpg';
import facetflowHomeImage from '../assets/projects/facetflow-home.jpg';
import facetflowRenderOnBodyImage from '../assets/projects/facetflow-render-on-body.jpg';
import facetflowStudioImage from '../assets/projects/facetflow-studio.jpg';
import facetflowGeneratedViewImage from '../assets/projects/facetflow-site/generated-view.webp';
import facetflowOnBodyImage from '../assets/projects/facetflow-site/on-body.webp';
import facetflowRingRenderImage from '../assets/projects/facetflow-site/ring-render.webp';
import facetflowTechnicalDrawingImage from '../assets/projects/facetflow-site/technical-drawing.webp';
import harmcheckImage from '../assets/projects/harmcheck-opengraph.jpg';
import medTrackerImage from '../assets/projects/med-tracker.webp';
import paceUpImage from '../assets/projects/pace-up.webp';
import beforeYouSendImage from '../assets/projects/side/before-you-send.jpg';
import proflensImage from '../assets/projects/side/proflens.jpg';
import pulseImage from '../assets/projects/side/pulse.jpg';
import ringStudioImage from '../assets/projects/side/ring-studio.jpg';
import tradesOrgImage from '../assets/projects/trades-org.png';

export interface Screenshot {
  image: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ContributionArea {
  title: string;
  items: string[];
}

export interface WorkingPrinciple {
  title: string;
  text: string;
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
  /** The product's own public tour of everything it does. */
  workflowsUrl: string;
  hero: Screenshot;
  /** Screens from inside the app. */
  screens: Screenshot[];
  /** Work the product makes, from the company's public site. */
  outputs: Screenshot[];
  /** Product areas not pictured, named on the "and much more" tile. */
  otherWorkflows: string[];
  contributionAreas: ContributionArea[];
  workingPrinciples: WorkingPrinciple[];
}

export const PROJECT_CARD_SIZE = {
  standard: 'standard',
  /** Takes a whole row on wider screens, with its image beside the text. */
  wide: 'wide',
} as const;

export type ProjectCardSize = (typeof PROJECT_CARD_SIZE)[keyof typeof PROJECT_CARD_SIZE];

export const PROJECT_KIND = {
  professional: 'professional',
  personal: 'personal',
} as const;

export type ProjectKind = (typeof PROJECT_KIND)[keyof typeof PROJECT_KIND];

export interface Project {
  name: string;
  kind: ProjectKind;
  summary: string;
  role: string;
  /** A shipped fact or a number. Every card needs one. */
  outcome: string;
  tags: string[];
  /** Live site or store page. Left out for apps that are no longer live. */
  url?: string;
  /** Public source code, for personal projects. */
  codeUrl?: string;
  image: ImageMetadata;
  imageAlt: string;
  /** CSS object-position for the 16:10 crop, so the useful part of the shot stays in frame. */
  imagePosition: string;
  /** Tall phone screenshots are shown whole ('contain') instead of cropped to 16:10. */
  imageFit?: 'cover' | 'contain';
  size: ProjectCardSize;
}


export const FACETFLOW: FeaturedProject = {
  slug: 'facetflow',
  name: 'Facet Flow',
  years: '2025–Present',
  summary:
    'A professional jewelry development suite. AI takes a piece from its first sketch to photoreal renders, generated views, technical drawings, CAD and tier-by-tier prices, in one workspace for every team.',
  teaser:
    'Jewelry design software that takes a piece from first sketch to renders, technical drawings, 3D models and prices, in one AI workspace.',
  role: 'Software Engineer on a small team working closely with the founders.',
  tags: ['TypeScript', 'Next.js', 'Nest.js', 'LangGraph', 'PostgreSQL', 'Gemini'],
  url: 'https://facetflow.io/',
  workflowsUrl: 'https://facetflow.io/workflows',
  hero: {
    image: facetflowHomeImage,
    alt: "Facet Flow home: a grid of a studio's jewelry designs with the chat box below",
    caption: 'Home. Every design the studio has made, one chat box away from the next one.',
  },
  screens: [
    {
      image: facetflowStudioImage,
      alt: 'Facet Flow Design Studio: a ring design with its version history and a price estimate panel',
      caption: 'Design Studio. Each prompt makes a new version, and any version can be priced in place.',
    },
    {
      image: facetflowRenderOnBodyImage,
      alt: 'Facet Flow Render on Body: placing a ring on a hand silhouette before rendering',
      caption: 'Render on Body. Place a ring on a hand, then render it being worn.',
    },
    {
      image: facetflowAssetLibraryImage,
      alt: 'Facet Flow Asset Library: a generated 3D ring model with GLB, 3DM, STL and USDZ downloads',
      caption: 'Asset Library. Generated 3D models, ready to download for CAD or AR.',
    },
  ],
  outputs: [
    {
      image: facetflowRingRenderImage,
      alt: 'A photoreal render of a yellow gold ring set with four blue topaz stones',
      caption: 'A photoreal render, refined prompt by prompt in the Design Studio.',
    },
    {
      image: facetflowOnBodyImage,
      alt: 'A model wearing a blue topaz station necklace and a matching cocktail ring',
      caption: 'Render on Body: the same designs, seen being worn.',
    },
    {
      image: facetflowTechnicalDrawingImage,
      alt: 'A technical drawing of a rose gold and aquamarine clip earring with dimensions and callouts',
      caption: 'A technical drawing with dimensions and callouts, ready for the bench.',
    },
    {
      image: facetflowGeneratedViewImage,
      alt: 'An isometric view of a gold bamboo ring with two pear-cut diamonds',
      caption: 'Generated views: top, side and isometric angles from one design.',
    },
  ],
  otherWorkflows: [
    'Generate CAD',
    'CAD to images',
    'Jewelry builder',
    'Style transfer',
    'Upscale to 4K',
    'Jewelry costing',
    'Stone sourcing',
    'Technical reports',
  ],
  contributionAreas: [
    {
      title: 'Design & editing',
      items: [
        'Design generation from prompts, sketches and reference images.',
        'The Design Studio: versions, annotation and guided refinement.',
        'Flows: guided, step-by-step workflows for common jobs.',
        'Style transfer, generated views and upscaling to 4K.',
      ],
    },
    {
      title: 'AI assistants',
      items: [
        'Autopilot, the chat that ties the whole product together.',
        'Pricing Assistant: tier-by-tier prices from a design.',
        'Stone Finder and Jewelry Concierge for sourcing and questions.',
      ],
    },
    {
      title: 'Engineering & manufacturing',
      items: [
        'Technical drawings and technical reports.',
        'Generated 3D models and CAD, with GLB, STL and USDZ downloads.',
        'Render on Body and the jewelry builder.',
      ],
    },
    {
      title: 'Platform',
      items: [
        'The Asset Library and projects that keep every piece organized.',
        'Teams, roles and usage-based billing.',
        'Live progress and dependable retries for long AI generations.',
      ],
    },
  ],
  workingPrinciples: [
    {
      title: 'Close to the founders and the craft',
      text: 'I turn jewelry-specific requirements, like stones, metals, labor and margins, into features jewelers can use without training.',
    },
    {
      title: 'End to end',
      text: 'I take features from the first interface sketch through the services and data behind them, and stay with them after launch.',
    },
    {
      title: 'Small, tested steps',
      text: 'Each change ships in small slices, tested by hand in the real app on desktop and phone before it reaches customers.',
    },
  ],
};

/** In grid order: professional work first (the wide Alphy card takes the first row), then personal projects. */
export const PROJECTS: Project[] = [
  {
    name: 'Alphy → HarmCheck',
    kind: PROJECT_KIND.professional,
    summary:
      'Alphy, a Silicon Valley startup, first built a community app for advancing women in their careers (talks, learning tracks, jobs, groups), then pivoted to HarmCheck: AI that flags harmful or non-compliant messages before they are sent, delivered as a browser extension, an Outlook add-in and integrations for other email services.',
    role: "Built Alphy's React Native app, then worked on HarmCheck's browser extension, Outlook add-in and email integrations as the company pivoted.",
    outcome: 'Alphy is now HarmCheck, used by enterprise compliance teams.',
    tags: ['React Native', 'Firebase', 'Cosmic', 'Detox'],
    url: 'https://www.harmcheck.com/',
    image: harmcheckImage,
    imageAlt: 'HarmCheck home page: "Know Risk. Know Reward." beside a person working on a laptop',
    imagePosition: 'left center',
    size: PROJECT_CARD_SIZE.wide,
  },
  {
    name: 'Trades.org CRM & ATS',
    kind: PROJECT_KIND.professional,
    summary:
      'A CRM and applicant tracking system for trade businesses: contacts and companies on one side, job posts and applicant pipelines on the other.',
    role: 'Played a key role in designing and implementing the ATS, and built key CRM features.',
    outcome: 'Live as the hiring product at jobs.trades.org.',
    tags: ['Next.js', 'Nest.js', 'GraphQL', 'Prisma', 'MongoDB'],
    url: 'https://jobs.trades.org/en',
    image: tradesOrgImage,
    imageAlt: 'Trades.org ATS landing page: "Enhance your hiring potential with our advanced ATS solutions"',
    imagePosition: 'center top',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Alloy',
    kind: PROJECT_KIND.professional,
    summary:
      'A mobile app for selling unused gold, silver, platinum and palladium jewelry for cash, with upfront estimates, live support and a no-questions-asked return policy.',
    role: 'Built features across the React Native app and its Node.js back end.',
    outcome: 'Shipped to the App Store and Google Play.',
    tags: ['React Native', 'Firebase', 'Express.js', 'MongoDB'],
    url: 'https://nordstone.co.uk/trading-platform',
    image: alloyImage,
    imageAlt: 'Three phones showing the Alloy app: home, splash screen, and a gold ring payout estimate',
    imagePosition: 'center',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Bevy Price Rules',
    kind: PROJECT_KIND.professional,
    summary:
      'A Shopify app for rule-based pricing: store owners bulk-edit prices and schedule sales by title, tag, collection, price and more, with discounts that stack.',
    role: 'Built the app from first concept to deployment.',
    outcome: "Part of Bevy's app suite, used by tens of thousands of users.",
    tags: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    url: 'https://www.bevycommerce.com/price-rules/',
    image: bevyPriceRulesImage,
    imageAlt: 'Bevy Price Rules dashboard: a list of scheduled sales with their rules, status and variant counts',
    imagePosition: 'center',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Bevy Share Cart',
    kind: PROJECT_KIND.professional,
    summary:
      'A Shopify app that adds a share button to the cart, so shoppers can send their cart to a friend who rebuilds it and buys in one click.',
    role: 'Built the app from first concept to deployment.',
    outcome: "Part of Bevy's app suite, used by tens of thousands of users.",
    tags: ['React', 'Node.js', 'Koa.js', 'MongoDB'],
    url: 'https://www.bevycommerce.com/share-cart/',
    image: bevyShareCartImage,
    imageAlt: 'Bevy Share Cart settings: share counts, link clicks and revenue above color and button design controls',
    imagePosition: 'center top',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Pace Up!',
    kind: PROJECT_KIND.professional,
    summary:
      'A competitive fitness game: challenge friends to rounds of timed races, where everyone runs with their phone to cover as much distance as possible.',
    role: 'Built the React Native app and its Node.js back end at Techdojo.',
    outcome: 'Shipped to Google Play.',
    tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
    image: paceUpImage,
    imageAlt: "Pace Up! round results comparing two players' steps, distance and average speed",
    imagePosition: 'center',
    imageFit: 'contain',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Med Tracker',
    kind: PROJECT_KIND.professional,
    summary: 'Schedule medications, get reminders and track intake across multiple prescriptions.',
    role: 'Built the React Native app and its Node.js back end at Techdojo.',
    outcome: 'Shipped to Google Play.',
    tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB'],
    image: medTrackerImage,
    imageAlt: 'Med Tracker medication schedule showing previous and upcoming doses',
    imagePosition: 'center',
    imageFit: 'contain',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Ring Studio',
    kind: PROJECT_KIND.personal,
    summary:
      'Design a ring in 3D: metal, stone shape, carat, setting and size, with a live price estimate and shareable designs.',
    role: 'Designed and built it solo.',
    outcome: 'Faceted gems and bands generated in code, with physically based materials and no downloaded 3D assets.',
    tags: ['React', 'three.js', 'React Three Fiber', 'Firestore'],
    url: 'https://ring-studio-aomar.web.app',
    codeUrl: 'https://github.com/hotmailbelike/ring-studio',
    image: ringStudioImage,
    imageAlt: 'Ring Studio showing a sapphire ring in 3D next to the design controls',
    imagePosition: 'left top',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Before You Send',
    kind: PROJECT_KIND.personal,
    summary: 'Flags harmful or toxic wording in a message before it is sent, with scores and calm rewrite tips.',
    role: 'Designed and built it solo.',
    outcome: 'A transformer model runs fully in the browser via WebGPU or WebAssembly; nothing leaves the device.',
    tags: ['React', 'Transformers.js', 'ONNX', 'Web Workers'],
    url: 'https://before-you-send-aomar.web.app',
    codeUrl: 'https://github.com/hotmailbelike/before-you-send',
    image: beforeYouSendImage,
    imageAlt: 'Before You Send highlighting two harmful sentences with toxicity scores',
    imagePosition: 'left top',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'Pulse',
    kind: PROJECT_KIND.personal,
    summary: 'Real-time audience polls for talks and classes: share a QR code and watch results animate as votes arrive.',
    role: 'Designed and built it solo.',
    outcome: 'Live updates through Firestore listeners, with one vote per device enforced by security rules.',
    tags: ['React', 'TypeScript', 'Firestore'],
    url: 'https://pulse-aomar.web.app',
    codeUrl: 'https://github.com/hotmailbelike/pulse-live-polls',
    image: pulseImage,
    imageAlt: 'Pulse presenter view with live result bars and a QR code to join',
    imagePosition: 'left top',
    size: PROJECT_CARD_SIZE.standard,
  },
  {
    name: 'ProfLens',
    kind: PROJECT_KIND.personal,
    summary:
      'Student reviews of university professors: search by name, department or university, see rating summaries, and post a detailed review.',
    role: 'Designed and built it solo, rebuilding my 2019 Express and MongoDB student project.',
    outcome: 'A static React app on Firestore, where security rules validate every review field instead of a server.',
    tags: ['React', 'TypeScript', 'Firestore'],
    url: 'https://proflens-aomar.web.app',
    codeUrl: 'https://github.com/hotmailbelike/proflens',
    image: proflensImage,
    imageAlt: 'ProfLens home: search, university filters and a list of professors with average ratings',
    imagePosition: 'left top',
    size: PROJECT_CARD_SIZE.standard,
  },
];
