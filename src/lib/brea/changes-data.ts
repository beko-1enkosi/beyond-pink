// Curated, browser-safe educational content for the Understand Breast Changes pathway.
// Sources: NCI breast cancer symptoms, NHS how to check your breasts or chest, WHO breast cancer fact sheet.
export const CHANGES_LESSON1_ID = "recognise-changes";
export const CHANGES_LESSON2_ID = "know-your-quadrants";
export const AWARENESS_BADGE_ID = "awareness-explorer";
export const CHANGES_LESSONS = [
  { id: CHANGES_LESSON1_ID, title: "Recognise the Changes", available: true },
  { id: CHANGES_LESSON2_ID, title: "Know Your Breast Quadrants", available: false },
] as const;
export const CHANGES_BADGES: Record<string, string> = { [CHANGES_LESSON1_ID]: AWARENESS_BADGE_ID };

export const NORMAL_CARDS = [
  { id: "shape", title: "Shape & Size", summary: "Breasts and chest tissue naturally differ in size and shape. Slight asymmetry is common.", detail: "It is very common for one breast to be a little larger, higher or differently shaped than the other. Chest tissue also looks different from person to person, including in men and in trans and non-binary people. What matters most is noticing what is new for you." },
  { id: "feel", title: "How They Feel", summary: "Breast tissue may feel soft, firm, textured or uneven.", detail: "Many people have breast tissue that feels lumpy or uneven all over, and that can be their normal. Being familiar with your usual appearance and feel helps you notice when something is different." },
  { id: "time", title: "Changes Over Time", summary: "Hormones, age and other factors can influence how breast tissue looks and feels.", detail: "Breasts can change during puberty, across the menstrual cycle, in pregnancy and breastfeeding, and with ageing and menopause. Not everyone experiences all of these stages, and experiences differ." },
] as const;
export type NormalCardId = (typeof NORMAL_CARDS)[number]["id"];

export const CHANGES = [
  { id: "lump", letter: "A", name: "A new lump or thickened area", x: 200, y: 165, text: "A new lump, swelling or unusually firm area in the breast, chest or underarm should be assessed by a healthcare professional.", more: "Lumps can have many causes other than cancer, such as cysts or benign growths. Cancerous lumps are not always painful, so a painless lump still deserves to be checked.", terms: ["Breast lump", "Breast thickening"] },
  { id: "skin", letter: "B", name: "Skin dimpling or texture changes", x: 148, y: 232, text: "New dimpling, puckering, skin thickening or an orange-peel-like texture may need medical attention.", more: "Skin changes can look different on different skin tones. Redness may appear as purple, darker brown or simply a change in colour on darker skin, and may be less easy to see.", terms: ["Skin dimpling", "Puckering", "Peau d'orange"] },
  { id: "nipple", letter: "C", name: "Nipple changes", x: 246, y: 188, text: "New nipple inversion, changes in nipple appearance, scaling, crusting or an unusual persistent rash should be checked.", more: "Nipples that have naturally pointed inward for a long time are different from a nipple that has recently started to turn inward. A new change is what matters.", terms: ["Nipple inversion", "Areola"] },
  { id: "discharge", letter: "D", name: "Unusual nipple discharge", x: 288, y: 248, text: "Unexpected nipple discharge, especially spontaneous discharge that is bloody or occurs from one breast, should be assessed.", more: "Nipple discharge can have several causes, including hormones, medicines and benign conditions. It does not automatically mean cancer.", terms: ["Nipple discharge"] },
  { id: "shape", letter: "E", name: "Changes in size or shape", x: 320, y: 170, text: "A new or unexplained change in breast size, shape, swelling or appearance should be assessed.", more: "Natural asymmetry you have always had is usually your normal. A change that is new or unexplained is worth discussing with a healthcare professional.", terms: ["Breast asymmetry"] },
  { id: "underarm", letter: "F", name: "Changes around the underarm", x: 108, y: 92, text: "New swelling or lumps under the arm or near the collarbone may need medical evaluation.", more: "The underarm contains lymph nodes, which can swell for many reasons, such as infections. New or lasting swelling should be checked.", terms: ["Axillary lymph nodes"] },
  { id: "pain", letter: "G", name: "Persistent unusual pain or discomfort", x: 200, y: 272, text: "Breast pain is common and often has causes unrelated to cancer. However, persistent, localised or unexplained pain should be discussed with a healthcare professional.", more: "Pain that comes and goes with the menstrual cycle is common. Pain that stays in one area or does not settle is worth talking about.", terms: ["Breast tenderness"] },
] as const;
export type ChangeId = (typeof CHANGES)[number]["id"];

export const CHANGES_GLOSSARY = [
  { term: "Breast lump", definition: "A distinct area that feels different from the surrounding breast or chest tissue. Most breast lumps are not cancer, but a new lump should be checked by a healthcare professional." },
  { term: "Breast thickening", definition: "An area of breast or chest tissue that feels firmer or thicker than the tissue around it or than it usually feels." },
  { term: "Breast asymmetry", definition: "A difference in size or shape between the two breasts. Slight asymmetry is very common; a new change in asymmetry is worth checking." },
  { term: "Skin dimpling", definition: "A small dent or pulling-in of the breast skin, sometimes noticed when raising the arms. New dimpling should be assessed." },
  { term: "Puckering", definition: "Skin that looks gathered, pinched or drawn in, a little like fabric pulled together." },
  { term: "Peau d'orange", definition: "French for “orange peel”. Skin that looks thickened with enlarged pores, like the surface of an orange. It should be assessed promptly." },
  { term: "Nipple inversion", definition: "A nipple that points or pulls inward. Some people’s nipples have always been inverted; a newly inverted nipple should be checked." },
  { term: "Nipple discharge", definition: "Fluid that comes from the nipple. It has many possible causes; spontaneous, bloody or one-sided discharge should be assessed." },
  { term: "Axillary lymph nodes", definition: "Lymph nodes in the underarm (axilla). They are part of the immune system and can swell for many reasons, including infections." },
  { term: "Breast awareness", definition: "Being familiar with how your breasts or chest usually look and feel, so you can notice new or unusual changes. It is not a diagnosis and does not replace screening." },
] as const;

export const CHANGES_QUIZ = [
  { question: "Which change should be checked by a healthcare professional?", answers: ["A new, unexplained breast lump.", "Having naturally different-sized breasts since puberty.", "Having a nipple appearance that has always been normal for you."], correct: 0, explanation: "A new breast lump or unfamiliar change should be professionally assessed, even when it is not painful." },
  { question: "Does every breast lump mean cancer?", answers: ["Yes, every lump is cancer.", "No, many breast lumps are caused by non-cancerous conditions.", "Only painful lumps can be serious."], correct: 1, explanation: "Many breast lumps are benign, but a healthcare professional should evaluate new or unusual findings." },
  { question: "Can breast cancer sometimes develop without noticeable symptoms?", answers: ["Yes.", "No, there is always pain.", "No, there is always a visible lump."], correct: 0, explanation: "Some breast cancers cause no noticeable early symptoms, which is one reason screening and professional assessment are important." },
] as const;
