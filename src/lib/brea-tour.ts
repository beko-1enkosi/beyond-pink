/** Replace a slot's image/alt here with an approved screenshot asset import. */
export const BREA_TOUR_DESTINATION = '/how-brea-works' as const;
export const BREA_LAUNCH_DESTINATION = '/brea' as const;
export const BREA_SCREENSHOTS: Record<string, { image?: string; alt: string }> = {
  'brea-welcome': { alt: 'Brea welcome screen with its botanical logo' },
  'brea-pathways': { alt: 'Brea onboarding with four single-selection pathways' },
  'brea-learning': { alt: 'Brea interactive learning and educational illustrations' },
  'brea-community': { alt: 'The Brea Garden fictional community feed and heart reactions' },
  'brea-find-care': { alt: 'Find Care South African map with awareness ribbon markers' },
};
export const TOUR_STEPS = [
  { id: '01', label: 'STEP 01 · HELLO THERE', title: 'Meet Your New |Companion.|', text: "Begin with a gentle welcome. Tell Brea what you'd like to be called and make the experience your own.", slots: ['brea-welcome'], notes: ['Hello, you!'] },
  { id: '02', label: 'STEP 02 · YOUR JOURNEY', title: 'Start Where You Feel |Ready.|', text: "Choose what you'd like to explore first, whether that's learning about breast health, understanding changes, finding support or locating care.", slots: ['brea-pathways'], notes: ['Your journey, your choice.'] },
  { id: '03', label: 'STEP 03 · DISCOVER & GROW', title: 'Little Lessons. |Growing Knowledge.|', text: "Explore interactive breast anatomy, understand important health information, decode medical terms and celebrate what you've learned with beautiful achievement badges.", slots: ['brea-learning'], notes: ["Look how far you've grown!"], safety: 'Quizzes are optional. Badges celebrate learning, not health outcomes.' },
  { id: '04', label: 'STEP 04 · YOU BELONG', title: '|Support| Is Part of the Journey.', text: 'Discover compassionate guidance, share encouragement in The Brea Garden and explore healthcare and support services across South Africa.', slots: ['brea-community', 'brea-find-care'], notes: ['Every story matters.', 'Care, closer to you.'], safety: 'The Brea Garden is a demonstration with fictional example posts. Your posts, comments and reactions stay in this browser; they are not shared with other visitors.' },
] as const;
