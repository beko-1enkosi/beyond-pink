// Curated, browser-safe educational support content for Brea's Find Support pathway.
export type GuideId = "before" | "during" | "after";
export const GUIDE_IDS: readonly GuideId[] = ["before", "during", "after"];
export const SUPPORT_BADGE = "Support Pathfinder";
export type CaringId = "words" | "acts" | "self";
export const CARING_IDS: readonly CaringId[] = ["words", "acts", "self"];
export const COMPANION_BADGE = "Compassionate Companion";

export type SupportCard = { title: string; body: string; points?: readonly string[]; pointsLabel?: string };
export type SupportGuide = { id: GuideId; label: string; tagline: string; intro: string; cards: readonly SupportCard[]; note: string; closing?: string };

export const SUPPORT_GUIDES: readonly SupportGuide[] = [
  {
    id: "before",
    label: "Before",
    tagline: "When answers feel uncertain",
    intro: "For anyone who has noticed a change, is preparing for an appointment, or is waiting for test results.",
    cards: [
      { title: "It’s Okay to Have Questions", body: "Not knowing can feel heavy. Worry, restlessness or wanting to avoid the subject are all common reactions. You don’t need to have the right feelings or the right words — your questions are valid, and a healthcare professional is the right person to help answer them." },
      {
        title: "Preparing for an Appointment",
        body: "A little preparation can make an appointment feel more manageable. You might write your questions down beforehand, follow any preparation instructions you are given, and consider asking a trusted person to come with you.",
        pointsLabel: "Questions you might ask",
        points: ["What could explain this change?", "What tests might be needed?", "When and how will I receive results?", "Who should I contact if the change worsens?"],
      },
      { title: "While You’re Waiting", body: "Waiting can be one of the hardest parts. Some people find it helps to take breaks from searching online, talk with someone they trust, keep to small everyday routines and make space for rest. Choose whatever feels right for you — there is no correct way to wait." },
    ],
    note: "New or concerning physical changes deserve professional assessment. If a change worsens before your appointment, contact your clinic or healthcare provider.",
  },
  {
    id: "during",
    label: "During",
    tagline: "One day at a time",
    intro: "You don’t have to have everything figured out today.",
    cards: [
      { title: "Understanding Your Care", body: "Your care team is there to explain your care in a way that makes sense to you. It’s okay to ask more than once.", pointsLabel: "Things you might ask your care team about", points: ["The goals of your treatment", "Possible side effects and what to watch for", "Your appointment schedule", "Who to contact between visits"] },
      { title: "Asking for Practical Help", body: "Accepting help is not a weakness. People who care about you often want a clear way to help.", pointsLabel: "Help you might ask for", points: ["Transport to and from appointments", "Help with meals or shopping", "Childcare or family responsibilities", "Someone to sit with you during appointments"] },
      { title: "Making Room for Your Feelings", body: "Feelings can change from day to day, and all of them are allowed. Counsellors, hospital social workers, peer support groups and trusted people may help you carry what you’re feeling. Your emotions do not decide your medical outcome — you don’t have to stay positive all the time." },
    ],
    note: "If you are having treatment, report any new or worsening symptoms to your healthcare team.",
  },
  {
    id: "after",
    label: "After",
    tagline: "Finding your new rhythm",
    intro: "For anyone adjusting after treatment, attending follow-up appointments, continuing ongoing treatment or navigating life afterwards.",
    cards: [
      { title: "Life May Feel Different", body: "Emotional and physical adjustments look different for everyone. Some days may feel familiar and others may not. There is no fixed timeline for how you should feel." },
      { title: "Follow-Up & Ongoing Care", body: "Keep to the appointments your healthcare team recommends, and let them know about new or persistent concerns. Some people continue treatment for a long time — ongoing care is part of many journeys." },
      { title: "Finding Connection Again", body: "Reconnecting can happen gently and in your own way: time with family and friends, a support group, meaningful activities or simple everyday routines. Small steps count." },
    ],
    note: "Contact your healthcare team about any new, persistent or worrying symptoms, even between scheduled visits.",
    closing: "Your journey doesn’t have to look like anyone else’s.",
  },
];

export const SUPPORT_PATHWAYS = [
  { id: "looking", title: "I’m Looking for Support", description: "Find gentle guidance for wherever you are in your journey.", available: true },
  { id: "supporting", title: "I’m Supporting Someone", description: "Discover ways to listen, care and show up for someone.", available: true },
  { id: "connect", title: "I Want to Connect", description: "Find connection through shared experiences and supportive community.", available: true },
] as const;
