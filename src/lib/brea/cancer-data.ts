export const CELL_PARTS = [
  { id: "membrane", name: "Cell membrane", text: "The outer boundary that helps control what enters and leaves a cell.", x: 83, y: 160 },
  { id: "cytoplasm", name: "Cytoplasm", text: "The material inside the cell where many important activities take place.", x: 157, y: 208 },
  { id: "nucleus", name: "Nucleus", text: "The structure that contains most of the cell’s DNA.", x: 285, y: 164 },
  { id: "dna", name: "DNA", text: "The molecule that carries genetic instructions.", x: 235, y: 136 },
] as const;
export type CellPartId = (typeof CELL_PARTS)[number]["id"];
export const DIVISION_STEPS = [
  "A cell receives signals to grow or divide when needed.",
  "Its DNA is copied, and the cell divides into new cells.",
  "Normal control systems help regulate further division and deal with damaged cells.",
] as const;
export const GROWTH_STEPS = {
  normal: ["Cells respond to growth signals.", "New cells form when needed.", "Division slows or stops appropriately."],
  cancer: ["Several relevant cellular changes over time can disrupt growth controls.", "Cells may divide despite normal stopping signals.", "Additional cells can accumulate into a growing cluster."],
} as const;
export const CANCER_GLOSSARY = [
  { term: "Cell", definition: "The basic building block of living things. Different cells carry out different tasks that help the body grow, repair and function." },
  { term: "Cell membrane", definition: "The outer boundary of a cell. It helps control which substances enter and leave the cell." },
  { term: "Cytoplasm", definition: "The material inside a cell, outside its nucleus, where many important cellular activities take place." },
  { term: "Nucleus", definition: "A structure within most human cells that contains most of the cell’s DNA." },
  { term: "DNA", definition: "Deoxyribonucleic acid: the molecule that carries genetic instructions used by cells to develop and function." },
  { term: "Gene", definition: "A section of DNA carrying instructions for a functional product, such as a protein. Some genes help regulate cell growth, repair and survival." },
  { term: "Mutation", definition: "A change in DNA. Many mutations are harmless, and cells can repair many kinds of DNA damage. Certain combinations of changes can contribute to cancer." },
  { term: "Cell division", definition: "The process by which a cell produces new cells. In ordinary body-cell division, DNA is copied before the cell divides." },
  { term: "Tumor", definition: "An abnormal mass of tissue. A tumor can be benign (not cancer) or malignant (cancer). Not every cancer forms a solid tumor." },
  { term: "Cancer cell", definition: "A cell with changes that disrupt normal growth and survival controls. Cancer cells can invade nearby tissue and, in some cases, spread elsewhere." },
  { term: "Apoptosis", definition: "Programmed cell death: a regulated process that helps the body remove unneeded or damaged cells. Cancer cells may avoid this process." },
  { term: "Metastasis", definition: "The spread of cancer cells from where a cancer began to another part of the body, where they may form new growths. This does not happen with every cancer." },
  { term: "Lymphatic system", definition: "A network of vessels, lymph nodes and other tissues that returns fluid to the bloodstream and supports immune defence. Some cancer cells can travel through its vessels." },
] as const;
export const QUIZ3 = [
  { question: "What helps control when normal cells grow and divide?", answers: ["Genetic instructions and cellular signals.", "The color of the cell.", "The person’s height."], correct: 0, explanation: "Genes and cellular signals help regulate when cells grow, divide or stop." },
  { question: "Does every DNA mutation lead to cancer?", answers: ["Yes, every mutation causes cancer.", "No, many mutations are harmless or repaired.", "All mutations prevent cell division."], correct: 1, explanation: "Most DNA changes do not cause cancer. Certain combinations of changes can interfere with important growth-control systems." },
  { question: "What is the main difference between benign and malignant tumors?", answers: ["Benign tumors always disappear on their own.", "Benign tumors are always painful.", "Malignant tumors are cancerous and can invade nearby tissues or spread."], correct: 2, explanation: "Benign tumors do not invade or spread to distant tissues, while malignant tumors have the potential to do so." },
] as const;