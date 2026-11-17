export interface SkillGroup {
  label: string;
  skills: string[];
}

/** From the résumé's skills section, grouped for scanning. */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'Frontend & mobile',
    skills: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'shadcn/ui', 'Zustand'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Nest.js', 'Express', 'GraphQL', 'Prisma', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ'],
  },
  {
    label: 'AI',
    skills: [
      'LangGraph',
      'LLM integrations',
      'Multimodal workflows',
      'OpenAI',
      'Anthropic Claude',
      'Google Gemini',
      'FAL',
      'Meshy',
    ],
  },
  {
    label: 'Cloud & integrations',
    skills: ['AWS', 'GCP', 'Firebase', 'Supabase', 'Docker', 'Stripe', 'Auth0', 'Clerk'],
  },
];
