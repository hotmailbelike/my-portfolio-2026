export interface Profile {
  name: string;
  fullName: string;
  role: string;
  /** The one sentence at the top of the home page. Keep it to two lines on a laptop. */
  positioning: string;
  summary: string;
  now: string;
  about: string[];
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}

export interface Fact {
  label: string;
  value: string;
}

export const PROFILE: Profile = {
  name: 'Abdullah Omar',
  fullName: 'Mohammad Abdullah Omar',
  role: 'Software Engineer',
  positioning: 'Full-stack engineer building AI products, from web and mobile to the agents behind them.',
  summary:
    'Software engineer at FacetFlow. Since 2019 I have shipped web, mobile and Shopify apps for teams in the US, UK and Canada.',
  now: 'Building AI design and pricing tools for jewelers at FacetFlow.',
  about: [
    'I like turning messy, real-world requirements into software people use every day: hiring tools for trade businesses, an app for selling precious metals, Shopify apps for online stores, and now AI that helps jewelers design and price their work.',
    'Most of my work sits where product and engineering meet. I work directly with founders and clients, shape the requirements with them, and then build the whole path, from the interface to the services and data behind it.',
    'Outside of work I am usually learning something new, which lately means reading about how to make AI systems reliable enough for real businesses.',
  ],
  email: 'mdabdullahomar97@gmail.com',
  githubUrl: 'https://github.com/hotmailbelike',
  linkedinUrl: 'https://www.linkedin.com/in/abdullah-omar-6a69a1188/',
  resumeUrl: 'https://flowcv.com/resume/u5wfsi29gw',
};

export const FACTS: Fact[] = [
  { label: 'Role', value: 'Software Engineer, FacetFlow' },
  { label: 'Shipping since', value: '2019' },
  { label: 'Platforms', value: 'Web · iOS · Android · Shopify' },
  { label: 'Works', value: 'Remote, from Bangladesh' },
];
