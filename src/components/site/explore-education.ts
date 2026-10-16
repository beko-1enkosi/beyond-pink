export const ANATOMY_TERMS = [
  { title: "Lymph nodes", text: "Small glands that help your immune system filter lymph fluid. Some are in the armpit and near the breast." },
  { title: "Fatty tissue", text: "Fat surrounds the glands and ducts and contributes to the breast’s shape and size. The amount varies from person to person." },
  { title: "Lobules", text: "Small groups of glands that can make milk during breastfeeding." },
  { title: "Milk ducts", text: "Small tubes that carry milk from the lobules towards the nipple." },
  { title: "Areola", text: "The area of darker skin around the nipple. Small glands here help keep the skin protected." },
  { title: "Nipple", text: "The area at the centre of the areola where milk can leave through small openings. Nipples naturally vary in appearance." },
] as const;

export const CHANGE_TOPICS = [
  { title: "New lumps or thickening", text: "A new lump or an area that feels thicker than usual can have different causes. Have a new or unusual change checked, even if it does not hurt." },
  { title: "Skin changes or dimpling", text: "Notice new puckering, dimpling, redness or changes in skin texture. These can have different causes and should be discussed with a healthcare professional." },
  { title: "Nipple changes or unusual discharge", text: "A nipple that newly turns inward, a persistent rash, or unexpected discharge deserves assessment. Discharge that happens without squeezing, especially if bloody, should be checked." },
  { title: "Changes in breast shape or size", text: "Breasts can change with hormones, age and other factors. A new or unusual change in shape or size, especially on one side, should be assessed." },
] as const;

export const JOURNEY_STEPS = [
  { title: "Screening", subtitle: "Understanding routine breast screening.", text: "Screening looks for signs of breast cancer before symptoms appear, often using a mammogram (an X-ray of the breast). When and how often screening is offered depends on local guidance, age and individual circumstances. Ask a healthcare professional what is appropriate for you. A new breast change needs assessment rather than waiting for routine screening." },
  { title: "Clinical Assessment", subtitle: "Seeking advice about a breast change.", text: "A healthcare professional may ask about the change and your health history, then examine your breasts and nearby areas. They should explain what they are doing, and you can ask questions. They may suggest further tests or a referral to understand the change." },
  { title: "Next Steps", subtitle: "Tests, results and follow-up discussions.", text: "Depending on the assessment, next steps may include an ultrasound, a mammogram or a biopsy (a small tissue sample). Not everyone needs every test. Results help guide a discussion about what, if any, further care is needed. Ask how and when you will receive results, and what follow-up is recommended." },
] as const;

export type ExplorePreviewKind = "anatomy" | "changes" | "journey";
export function moveJourneyStep(current: number, direction: "next" | "back") {
  return Math.max(0, Math.min(JOURNEY_STEPS.length - 1, current + (direction === "next" ? 1 : -1)));
}