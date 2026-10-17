export const LESSON_ID = "meet-your-breasts";
export const LESSON2_ID = "breasts-hormones";
export const BADGE_ID = "anatomy-explorer";
export const BADGE2_ID = "hormone-helper";
export const LESSONS = [
  { id: LESSON_ID, title: "Meet Your Breasts" },
  { id: LESSON2_ID, title: "Breasts & Hormones" },
  { id: "what-is-cancer", title: "What Is Cancer?" },
  { id: "understanding-breast-cancer", title: "Understanding Breast Cancer" },
  { id: "screening", title: "Mammograms, Ultrasounds & Screening" },
] as const;
export const LESSON_BADGES: Record<string, string> = { [LESSON_ID]: BADGE_ID, [LESSON2_ID]: BADGE2_ID };
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
export const HORMONES = [
  { id: "estrogen", name: "Estrogen", visual: "stem", role: "Estrogen plays an important role in breast development, particularly during puberty. It helps stimulate the growth of breast ducts and contributes to changes in breast tissue throughout life.", fact: "Estrogen is not a single hormone — it is a family of related hormones made mainly in the ovaries." },
  { id: "progesterone", name: "Progesterone", visual: "bud", role: "Progesterone works alongside estrogen and helps influence the development and activity of glandular breast tissue. Changes in these hormones during the menstrual cycle can contribute to breast fullness or tenderness.", fact: "Progesterone levels rise and fall across the menstrual cycle, which is why some breast sensations come and go." },
  { id: "prolactin", name: "Prolactin", visual: "gland", role: "Prolactin is a hormone that helps the milk-producing glands in the breasts produce milk, especially after childbirth.", fact: "Prolactin is made by the pituitary gland, a small gland at the base of the brain." },
  { id: "oxytocin", name: "Oxytocin", visual: "flow", role: "Oxytocin helps release milk from the breast during breastfeeding. It causes tiny muscle-like cells around milk-producing glands to contract, moving milk toward the nipple. This is called the milk let-down reflex.", fact: "Oxytocin is sometimes called the “bonding hormone” because it also plays a role in emotional connection." },
] as const;
export type HormoneId = (typeof HORMONES)[number]["id"];
export const LIFE_STAGES = [
  { id: "puberty", name: "Puberty", visual: "bud", points: ["Rising sex hormones support breast development.", "Breast buds may develop beneath the nipples.", "Breasts gradually change in size and shape.", "Development varies between individuals."] },
  { id: "cycle", name: "Menstrual Cycle", visual: "cycle", points: ["Estrogen and progesterone levels change throughout the menstrual cycle.", "Some people experience temporary breast fullness, swelling or tenderness.", "These sensations may become more noticeable before a period.", "Not everyone experiences the same changes."] },
  { id: "pregnancy", name: "Pregnancy", visual: "flower", points: ["Hormonal changes prepare breast tissue for possible milk production.", "Breasts may become fuller, tender or more sensitive.", "The nipple and areola may change in appearance.", "Experiences vary."] },
  { id: "lactation", name: "Breastfeeding & Lactation", visual: "milk", points: ["Prolactin supports milk production.", "Oxytocin supports milk release.", "Glandular tissue and ducts work together during lactation."] },
  { id: "menopause", name: "Perimenopause & Menopause", visual: "mature", points: ["Estrogen and progesterone levels change during perimenopause and generally decrease after menopause.", "Glandular tissue may decrease, and the relative balance of fat and glandular tissue can change.", "Breasts may feel or look different.", "Some people experience breast tenderness during hormonal transitions."] },
] as const;
export type LifeStageId = (typeof LIFE_STAGES)[number]["id"];
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
  { term: "Hormone", definition: "A chemical messenger made by glands in the body. Hormones travel through the bloodstream and help different parts of the body communicate and coordinate changes." },
  { term: "Estrogen", definition: "A group of hormones that play an important role in sexual and reproductive development, including the growth of breast ducts during puberty." },
  { term: "Progesterone", definition: "A hormone that works alongside estrogen in the menstrual cycle and pregnancy. It influences glandular breast tissue and can contribute to cyclical breast fullness or tenderness." },
  { term: "Prolactin", definition: "A hormone made by the pituitary gland that helps the milk-producing glands in the breasts make milk, especially after childbirth." },
  { term: "Oxytocin", definition: "A hormone that, among other roles, triggers the milk let-down reflex during breastfeeding, helping milk move toward the nipple." },
  { term: "Mammary gland", definition: "The milk-producing gland of the breast, made up of lobules and the ducts that carry milk toward the nipple." },
  { term: "Lactation", definition: "The production and release of milk from the breasts, usually after childbirth." },
  { term: "Milk let-down reflex", definition: "The reflex, triggered by oxytocin, in which tiny muscle-like cells around the milk-producing glands contract and move milk through the ducts toward the nipple." },
  { term: "Puberty", definition: "The stage of life when the body matures into adulthood. Rising hormone levels during puberty support breast development." },
  { term: "Menstrual cycle", definition: "The roughly monthly cycle of hormonal changes that prepares the body for a possible pregnancy. Hormone changes across the cycle can affect how breasts feel." },
  { term: "Perimenopause", definition: "The transitional time before menopause, when hormone levels begin to change and periods may become irregular." },
  { term: "Menopause", definition: "The point when menstrual periods have stopped for twelve months, marking the end of the reproductive years. Hormone levels generally decrease afterwards." },
  { term: "Breast tenderness", definition: "Discomfort or sensitivity in the breasts. It is often linked to hormonal changes and is common, but new, unusual or persistent changes should be assessed by a healthcare professional." },
] as const;
export function findGlossaryTerm(term: string) {
  return GLOSSARY.find((entry) => entry.term.toLowerCase() === term.trim().toLowerCase());
}
export const QUIZ = [
  { question: "What is the role of lobules in the breast?", answers: ["They produce milk when the body is lactating.", "They are the bones supporting the breast.", "They control the heartbeat."], correct: 0, explanation: "Lobules contain milk-producing glands. They can produce milk during lactation." },
  { question: "What do milk ducts do?", answers: ["They produce hormones.", "They carry milk toward the nipple.", "They control breast temperature."], correct: 1, explanation: "Milk ducts are small tubes carrying milk from the glands toward the nipple." },
  { question: "Where are important groups of lymph nodes located near the breast?", answers: ["In the fingers.", "In the underarm area.", "Inside the nipple."], correct: 1, explanation: "The underarm (axillary) area contains important groups of lymph nodes near the breast." },
] as const;
export const QUIZ2 = [
  { question: "Which hormones play important roles in breast development and changes during the menstrual cycle?", answers: ["Estrogen and progesterone", "Adrenaline and melatonin", "Insulin and glucagon"], correct: 0, explanation: "Estrogen and progesterone help regulate reproductive processes and influence breast tissue development and cyclical changes." },
  { question: "What is one of prolactin’s main roles?", answers: ["Helping the breasts produce milk", "Creating red blood cells", "Controlling eyesight"], correct: 0, explanation: "Prolactin helps the mammary glands produce milk during lactation." },
  { question: "What does oxytocin help do during breastfeeding?", answers: ["Determine breast size", "Trigger milk release from the breast", "Stop all hormone activity"], correct: 1, explanation: "Oxytocin helps move milk through the ducts by triggering the milk let-down reflex." },
] as const;
export type QuizQuestion = { question: string; answers: readonly string[]; correct: number; explanation: string };
export function quizScore(answers: readonly number[], questions: readonly QuizQuestion[] = QUIZ) {
  return questions.reduce((score, question, index) => score + (answers[index] === question.correct ? 1 : 0), 0);
}
export const DISCLAIMER = "Brea provides educational information and does not replace professional medical advice.";
