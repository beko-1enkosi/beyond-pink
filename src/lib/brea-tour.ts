import welcomeShot from '@/assets/brea-welcome.png.asset.json';
import pathwaysShot from '@/assets/brea-pathways.png.asset.json';
import learningShot from '@/assets/brea-learning.png.asset.json';
import communityShot from '@/assets/brea-community.png.asset.json';
import findCareShot from '@/assets/brea-find-care.png.asset.json';

/** Replace a slot's image/alt here with an approved screenshot asset import. */
export const BREA_TOUR_DESTINATION = '/how-brea-works' as const;
export const BREA_LAUNCH_DESTINATION = '/brea' as const;
export const BREA_SCREENSHOTS: Record<string, { image?: string; alt: string }> = {
  'brea-welcome': { image: welcomeShot.url, alt: 'Brea welcome screen greeting the visitor by name: "Nice to meet you, Thobeka!"' },
  'brea-pathways': { image: pathwaysShot.url, alt: 'Brea onboarding asking "Where would you like to start?" with four selectable pathways' },
  'brea-learning': { image: learningShot.url, alt: 'Brea Learning Garden dashboard with learning progress, an earned badge, an illustrated breast anatomy lesson and the MedDecode button' },
  'brea-community': { image: communityShot.url, alt: 'The Brea Garden fictional community feed with an Anonymous Willow post, colourful heart reactions and comments' },
  'brea-find-care': { image: findCareShot.url, alt: 'Find Care page with the heading "Explore Care Across South Africa", an interactive map with awareness ribbon markers and facility listings' },
};
export const TOUR_STEPS = [
  { id: '01', label: 'STEP 01 · HELLO THERE', title: 'Meet Your New |Companion.|', text: "Begin with a gentle welcome. Tell Brea what you'd like to be called and make the experience your own.", slots: ['brea-welcome'], notes: ['Hello, you!'] },
  { id: '02', label: 'STEP 02 · YOUR JOURNEY', title: 'Start Where You Feel |Ready.|', text: "Choose what you'd like to explore first, whether that's learning about breast health, understanding changes, finding support or locating care.", slots: ['brea-pathways'], notes: ['Your journey, your choice.'] },
  { id: '03', label: 'STEP 03 · DISCOVER & GROW', title: 'Little Lessons. |Growing Knowledge.|', text: "Explore interactive breast anatomy, understand important health information, decode medical terms and celebrate what you've learned with beautiful achievement badges.", slots: ['brea-learning'], notes: ["Look how far you've grown!"], safety: 'Quizzes are optional. Badges celebrate learning, not health outcomes.' },
  { id: '04', label: 'STEP 04 · YOU BELONG', title: '|Support| Is Part of the Journey.', text: 'Discover compassionate guidance, share encouragement in The Brea Garden and explore healthcare and support services across South Africa.', slots: ['brea-community', 'brea-find-care'], notes: ['Every story matters.', 'Care, closer to you.'], safety: 'The Brea Garden is a demonstration with fictional example posts. Your posts, comments and reactions stay in this browser; they are not shared with other visitors.' },
] as const;
