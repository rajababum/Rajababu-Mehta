import { Photo, Project } from './types';

export const INITIAL_PHOTOS: Photo[] = [
  {
    id: 'photo-1',
    url: '/input_file_1.png',
    title: 'Natural Workspace Shoot',
    description: 'A sharp, professional portrait showcasing a focused mindset against a rich, sylvan background of native trees.',
    date: 'July 2026',
    category: 'Portrait'
  },
  {
    id: 'photo-2',
    url: '/input_file_0.png',
    title: 'Sylvan Confidence',
    description: 'An elegant outdoor portrait with arms crossed, capturing a down-to-earth and confident demeanor.',
    date: 'July 2026',
    category: 'Portrait'
  },
  {
    id: 'photo-3',
    url: '/input_file_2.png',
    title: 'The Great Rhino Landmark',
    description: 'A memorable visit to the wildlife sanctuary, posing next to the magnificent life-sized rhinoceros monument.',
    date: 'May 2026',
    category: 'Travel'
  },
  {
    id: 'photo-4',
    url: '/input_file_3.png',
    title: 'Arboreal Serenity',
    description: 'Posing naturally by a tall forest tree trunk, emphasizing an appreciation for wilderness and ecology.',
    date: 'June 2026',
    category: 'Nature'
  },
  {
    id: 'photo-5',
    url: '/input_file_4.png',
    title: 'Manhattan Horizon Selfie',
    description: 'A cheerful, bright selfie in a Manhattan graphic tee under a pristine, endless clear blue sky.',
    date: 'April 2026',
    category: 'Portrait'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-1',
    title: 'Premium Developer Hub',
    description: 'This exact state-of-the-art interactive personal website, custom-designed to demonstrate modern UI/UX design paradigms, local state storage, and dynamic client-side uploads.',
    tags: ['React 19', 'Tailwind v4', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/RajababuMehta/portfolio-studio',
    liveUrl: '#',
    category: 'Web Development'
  },
  {
    id: 'project-2',
    title: 'DevGallery Engine',
    description: 'A highly responsive media upload and visualization platform that uses client-side compression and localStorage for persistence.',
    tags: ['React', 'Local Storage', 'Lucide Icons', 'CSS Grid'],
    githubUrl: 'https://github.com/RajababuMehta/devgallery-engine',
    category: 'Web Development'
  },
  {
    id: 'project-3',
    title: 'EcoSync Dashboard',
    description: 'A dashboard concept focused on tracking environmental data and visualizing conservation efforts using custom charts.',
    tags: ['D3.js', 'Recharts', 'Tailwind', 'REST API'],
    githubUrl: 'https://github.com/RajababuMehta/ecosync-dashboard',
    category: 'Design'
  }
];
