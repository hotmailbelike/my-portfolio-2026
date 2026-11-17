export interface Role {
  start: string;
  end: string;
  title: string;
  company: string;
  companyUrl: string;
  summary: string;
  tags: string[];
}

export interface Publication {
  year: string;
  title: string;
  venue: string;
  url: string;
}

/** Newest first. Dates and duties follow the résumé on FlowCV. */
export const ROLES: Role[] = [
  {
    start: 'Jan 2025',
    end: 'Present',
    title: 'Software Engineer',
    company: 'FacetFlow',
    companyUrl: 'https://facetflow.io/',
    summary:
      'Building FacetFlow AI with the founders: AI-assisted jewelry design, pricing and technical-drawing workflows, end to end across the web app and its agent backend.',
    tags: ['TypeScript', 'Next.js', 'Nest.js', 'LangGraph', 'PostgreSQL'],
  },
  {
    start: 'Mar 2023',
    end: 'Dec 2024',
    title: 'Software Engineer',
    company: 'Trades.org',
    companyUrl: 'https://www.trades.org/en',
    summary:
      'Played a key role in designing and building the applicant tracking system, built key CRM features, and contributed to a team and client communications app launched on Google Play and the App Store.',
    tags: ['Next.js', 'Nest.js', 'GraphQL', 'Prisma', 'React Native'],
  },
  {
    start: 'Dec 2022',
    end: 'Mar 2023',
    title: 'Software Engineer',
    company: 'Nordstone',
    companyUrl: 'https://nordstone.co.uk/',
    summary:
      'Built web, mobile and server-side products for client brands, including content dashboards and apps shipped to both app stores.',
    tags: ['React', 'React Native', 'Node.js', 'MongoDB'],
  },
  {
    start: 'Apr 2021',
    end: 'Dec 2022',
    title: 'Software Engineer',
    company: 'Techdojo',
    companyUrl: 'http://tech-dojo.org/',
    summary:
      'Led web and mobile builds for clients: gathered requirements, split the work across the team, took on the hardest problems, and presented features to the managing director.',
    tags: ['React', 'React Native', 'Next.js', 'Node.js'],
  },
  {
    start: 'Oct 2020',
    end: 'Apr 2021',
    title: 'Software Engineer',
    company: 'Bevy Commerce',
    companyUrl: 'https://bevycommerce.com/',
    summary: 'Built Shopify apps used by tens of thousands of users, from first concept to deployment.',
    tags: ['React', 'Next.js', 'Koa.js', 'MongoDB'],
  },
  {
    start: 'Dec 2019',
    end: 'Oct 2020',
    title: 'Junior Software Engineer',
    company: 'Techdojo',
    companyUrl: 'http://tech-dojo.org/',
    summary: 'Built React and React Native apps and the Node.js services behind them, from concept to deployment.',
    tags: ['React', 'React Native', 'Express.js'],
  },
];

export const PUBLICATION: Publication = {
  year: '2020',
  title: 'A Comparative Study on Disaster Detection from Social Media Images Using Deep Learning',
  venue: 'Springer, Advances in Intelligent Systems and Computing',
  url: 'https://link.springer.com/chapter/10.1007/978-981-15-2188-1_38',
};
