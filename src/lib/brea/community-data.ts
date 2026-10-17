// Curated, browser-safe demo content for the Brea Garden community preview.
// All seeded posts and comments are fictional examples — never real testimonials.
import gardenFlowers from "@/assets/brea-garden-flowers.jpg";

export const GARDEN_IMAGE = gardenFlowers;

/** Botanical pseudonyms used for every community participant, including the visitor. */
export const BOTANICAL_NAMES = ["Anonymous Bloom", "Anonymous Willow", "Anonymous Petal", "Anonymous Sage", "Anonymous Daisy", "Anonymous Fern", "Anonymous Protea"] as const;

export type SeedComment = { id: string; name: string; text: string; when: string };
export type SeedPost = {
  id: string;
  name: string;
  avatar: number; // index into avatar palette
  when: string; // fictional demo date label
  text: string;
  image?: string;
  imageAlt?: string;
  support: number;
  comments: readonly SeedComment[];
};

export const SEED_POSTS: readonly SeedPost[] = [
  {
    id: "seed-hope",
    name: "Anonymous Willow",
    avatar: 1,
    when: "Demo · 2 days ago",
    text: "Today I reminded myself that worry is not a diagnosis. I booked the appointment I had been putting off, and I feel lighter already. One small step at a time.",
    support: 18,
    comments: [
      { id: "seed-hope-c1", name: "Anonymous Petal", text: "Proud of you for booking. That first step is often the hardest.", when: "Demo" },
      { id: "seed-hope-c2", name: "Anonymous Sage", text: "One small step at a time — I needed to read this today.", when: "Demo" },
      { id: "seed-hope-c3", name: "Anonymous Daisy", text: "Wishing you a kind appointment day.", when: "Demo" },
    ],
  },
  {
    id: "seed-flowers",
    name: "Anonymous Bloom",
    avatar: 0,
    when: "Demo · 4 days ago",
    text: "A friend brought me these after a difficult week. I keep looking at them and remembering that gentle things keep growing, even in hard seasons. Sharing a little softness with the Garden today.",
    image: gardenFlowers,
    imageAlt: "Soft pink and white wildflowers glowing in warm evening light",
    support: 26,
    comments: [
      { id: "seed-flowers-c1", name: "Anonymous Fern", text: "These are beautiful. Thank you for the softness.", when: "Demo" },
      { id: "seed-flowers-c2", name: "Anonymous Willow", text: "Gentle things keep growing — holding onto that.", when: "Demo" },
    ],
  },
  {
    id: "seed-caregiver",
    name: "Anonymous Sage",
    avatar: 3,
    when: "Demo · 1 week ago",
    text: "A thank-you to the person who drove me to every appointment and never once made it feel like a burden. If you are supporting someone right now: the quiet things you do matter more than you know.",
    support: 34,
    comments: [
      { id: "seed-caregiver-c1", name: "Anonymous Daisy", text: "Reading this as a caregiver made me tear up. Thank you.", when: "Demo" },
      { id: "seed-caregiver-c2", name: "Anonymous Bloom", text: "The quiet things really do matter.", when: "Demo" },
    ],
  },
  {
    id: "seed-learning",
    name: "Anonymous Protea",
    avatar: 6,
    when: "Demo · 1 week ago",
    text: "As a man, I never thought breast health had anything to do with me. I have started learning the basics — for myself and for the people I love. It feels good to be less in the dark.",
    support: 22,
    comments: [
      { id: "seed-learning-c1", name: "Anonymous Sage", text: "Welcome. Learning is for everyone, and it matters that you're here.", when: "Demo" },
      { id: "seed-learning-c2", name: "Anonymous Petal", text: "Less in the dark — what a good feeling to share.", when: "Demo" },
    ],
  },
  {
    id: "seed-ask",
    name: "Anonymous Daisy",
    avatar: 4,
    when: "Demo · 2 weeks ago",
    text: "For a long time I thought asking for support meant I was failing at coping. It doesn't. Whether it's a friend, a family member, a support group or a counsellor — you are allowed to reach out. You don't have to carry everything alone.",
    support: 41,
    comments: [
      { id: "seed-ask-c1", name: "Anonymous Willow", text: "You are allowed to reach out. Saving that sentence.", when: "Demo" },
      { id: "seed-ask-c2", name: "Anonymous Fern", text: "Thank you for saying this so plainly.", when: "Demo" },
      { id: "seed-ask-c3", name: "Anonymous Bloom", text: "Asking for help is a kind of strength.", when: "Demo" },
    ],
  },
];

export const COMMUNITY_GUIDELINES: readonly { title: string; body: string }[] = [
  { title: "Be kind and respectful", body: "Everyone here is carrying something. Offer encouragement, not judgement." },
  { title: "Protect privacy — yours and others'", body: "Share only what you are comfortable with, and never share someone else's medical information or story without their permission." },
  { title: "Avoid identifying details in photos", body: "Photos can reveal faces, documents, locations or medical information. Only share images you have permission to use." },
  { title: "No harassment or discrimination", body: "Unkind, discriminatory or targeted language has no place in the Garden." },
  { title: "No medical advice", body: "Please don't recommend treatments or make claims about cures. For medical concerns, speak with a qualified healthcare professional." },
];

export const REPORT_REASONS = [
  { id: "unkind", label: "Unkind or disrespectful" },
  { id: "privacy", label: "Shares private or identifying information" },
  { id: "medical", label: "Medical advice or misinformation" },
  { id: "other", label: "Something else" },
] as const;
export type ReportReasonId = (typeof REPORT_REASONS)[number]["id"];

export const POST_LIMIT = 280;
export const COMMENT_LIMIT = 200;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
