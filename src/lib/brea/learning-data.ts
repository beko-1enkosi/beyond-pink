export const LESSON_ID = "meet-your-breasts";
export const BADGE_ID = "anatomy-explorer";
export const LESSONS = [
  { id: LESSON_ID, title: "Meet Your Breasts" },
  { id: "breasts-hormones", title: "Breasts & Hormones" },
  { id: "what-is-cancer", title: "What Is Cancer?" },
  { id: "understanding-breast-cancer", title: "Understanding Breast Cancer" },
  { id: "screening", title: "Mammograms, Ultrasounds & Screening" },
] as const;
export const ANATOMY = [
  { id: "nipple", name: "Nipple", text: "The nipple is where milk can leave the breast through small openings connected to milk ducts.", x: 344, y: 245 },
  { id: "areola", name: "Areola", text: "The areola is the darker or more pigmented area of skin surrounding the nipple.", x: 314, y: 268 },
  { id: "ducts", name: "Milk ducts", text: "Milk ducts are small tubes that carry milk from milk-producing glands toward the nipple.", x: 268, y: 231 },
  { id: "lobules", name: "Lobules", text: "Lobules contain glands that can produce milk during breastfeeding.", x: 196, y: 175 },
  { id: "fat", name: "Fatty tissue", text: "Fatty tissue contributes to breast size, shape and softness.", x: 254, y: 142 },
  { id: "connective", name: "Connective tissue", text: "Connective tissue helps support the breast and hold its structures together.", x: 178, y: 312 },
  { id: "tissue", name: "Breast tissue", text: "Breasts contain a combination of glandular tissue, fatty tissue, connective tissue, blood vessels and nerves.", x: 236, y: 288 },
  { id: "nodes", name: "Nearby lymph nodes", text: "Lymph nodes are part of the immune system. Groups of lymph nodes near the breast, especially in the underarm, are important when healthcare professionals assess certain breast conditions.", x: 138, y: 79 },
] as const;
export type AnatomyId = (typeof ANATOMY)[number]["id"];
export const GLOSSARY = [
  { term: "Lobule", definition: "A small group of glands in the breast that can make milk during lactation (breastfeeding)." },
  { term: "Milk duct", definition: "A small tube that carries milk from the breast’s milk-producing glands toward the nipple." },
  { term: "Areola", definition: "The more pigmented area of skin around the nipple. Its colour and size vary naturally." },
  { term: "Glandular tissue", definition: "Tissue containing glands. In the breast, this includes the lobules that can produce milk." },
  { term: "Lymph node", definition: "A small, bean-shaped part of the immune system that filters lymph fluid and contains cells that help fight infection. Many are found in the underarm." },
  { term: "Connective tissue", definition: "Tissue that supports and connects other tissues and structures. In the breast, it helps hold the structures in place." },
  { term: "Benign", definition: "Not cancerous. A benign growth does not invade nearby tissue or spread to other parts of the body, though it may still need professional assessment or care." },
  { term: "Malignant", definition: "Cancerous. Malignant cells can grow into nearby tissue and may spread to other parts of the body." },
  { term: "Biopsy", definition: "A procedure in which a small sample of cells or tissue is removed and examined, often under a microscope, to help understand a change or condition." },
  { term: "Mammogram", definition: "An X-ray image of the breast. Mammograms are used for screening and to help healthcare professionals assess breast changes." },
] as const;
export function findGlossaryTerm(term: string) {
  return GLOSSARY.find((entry) => entry.term.toLowerCase() === term.trim().toLowerCase());
}
export const QUIZ = [
  { question: "What is the role of lobules in the breast?", answers: ["They produce milk when the body is lactating.", "They are the bones supporting the breast.", "They control the heartbeat."], correct: 0, explanation: "Lobules contain milk-producing glands. They can produce milk during lactation." },
  { question: "What do milk ducts do?", answers: ["They produce hormones.", "They carry milk toward the nipple.", "They control breast temperature."], correct: 1, explanation: "Milk ducts are small tubes carrying milk from the glands toward the nipple." },
  { question: "Where are important groups of lymph nodes located near the breast?", answers: ["In the fingers.", "In the underarm area.", "Inside the nipple."], correct: 1, explanation: "The underarm (axillary) area contains important groups of lymph nodes near the breast." },
] as const;
export function quizScore(answers: readonly number[]) {
  return QUIZ.reduce((score, question, index) => score + (answers[index] === question.correct ? 1 : 0), 0);
}
export const DISCLAIMER = "Brea provides educational information and does not replace professional medical advice.";
