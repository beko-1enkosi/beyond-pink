// Curated, browser-safe educational content for Brea's "I'm Supporting Someone" pathway.
export const SITUATIONS = [
  { id: "diagnosis", title: "Someone shares a diagnosis", say: "Thank you for telling me. I care about you, and I’m here if you’d like to talk.", why: "Acknowledge what they’ve shared without making assumptions about how they feel." },
  { id: "waiting", title: "Someone is waiting for results", say: "Would you like company while you wait, or would you prefer some space?", why: "Offer a choice rather than assuming what the person needs." },
  { id: "hard-day", title: "Someone is having a difficult day", say: "That sounds really hard. Would you like me to listen, help with something, or just sit with you?", why: "Sometimes support means allowing someone to express difficult feelings." },
  { id: "no-talk", title: "Someone doesn’t want to talk", say: "That’s okay. We don’t have to talk about it. I’m happy to spend time together.", why: "Respecting boundaries and ordinary companionship can be meaningful forms of support." },
] as const;

export const SWAPS = [
  { instead: "Just stay positive!", tryThis: "It’s okay to have difficult days. I’m here for you.", why: "Pressure to stay positive can make people feel they must hide how they really feel." },
  { instead: "I know exactly how you feel.", tryThis: "I can’t fully know what you’re experiencing, but I’d like to understand.", why: "Every experience is personal. Curiosity leaves room for their own story." },
  { instead: "Everything will definitely be fine.", tryThis: "I care about you, and you don’t have to go through this without support.", why: "Nobody can promise outcomes. Steady presence is something you can genuinely offer." },
] as const;

export const ACTS = [
  { id: "transport", title: "Appointments & Transport", summary: "Offer a lift, accompany someone if invited, or help organise travel.", examples: ["Driving to and from appointments", "Keeping someone company in the waiting room, if invited", "Helping plan parking or public transport"], offer: "I’m free on Thursday morning. Would a lift to your appointment be helpful?" },
  { id: "meals", title: "Meals & Groceries", summary: "Ask whether preparing food, shopping or arranging groceries would be useful.", examples: ["Picking up groceries", "Dropping off a meal they enjoy", "Asking about food preferences first"], offer: "I’m going to the shops tomorrow. Would it help if I picked up a few things for you?" },
  { id: "home", title: "Home & Daily Tasks", summary: "Offer help with cleaning, laundry, errands or household responsibilities.", examples: ["A load of laundry", "Watering plants or walking a pet", "Running a specific errand"], offer: "I could pop round on Saturday to help with laundry or tidying — would that be welcome?" },
  { id: "family", title: "Family & Childcare", summary: "If appropriate, offer assistance with school runs, childcare or family routines.", examples: ["A school run on a set day", "An afternoon with the children", "Help with family routines"], offer: "I’m already doing the school run on Wednesdays. Would it help if I took your kids too?" },
  { id: "company", title: "Companionship", summary: "Offer a conversation, a short visit or a shared activity without making illness the only topic.", examples: ["A short walk or a cup of tea", "Watching a favourite show together", "Talking about everyday things"], offer: "Would you like to watch a film together this weekend? No need to talk about anything heavy." },
  { id: "checking", title: "Checking In", summary: "Send a thoughtful message or ask when and how the person prefers to be contacted.", examples: ["A short message with no pressure to reply", "Asking whether calls or texts feel easier", "Remembering important days"], offer: "Thinking of you today. No need to reply — I just wanted you to know." },
] as const;

export const SELF_CARE = [
  { id: "feelings", title: "Make Room for Your Feelings", body: "Caregivers can feel sadness, uncertainty, exhaustion or frustration — sometimes all in one day. These feelings are understandable. Talking with trusted people or qualified support professionals can help when things feel heavy." },
  { id: "rest", title: "Rest Is Part of Caring", body: "Accepting help, taking breaks and keeping routines that feel manageable can make caring more sustainable. What works is different for everyone — there is no single right routine." },
  { id: "share", title: "You Don’t Have to Do Everything", body: "Sharing appropriate responsibilities with other trusted people can lighten the load. You can also ask the healthcare team about social-work or caregiver-support services that may be available." },
] as const;
