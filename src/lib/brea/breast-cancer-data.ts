export const BREAST_CANCER_GLOSSARY = [
  { term: "Ductal carcinoma", definition: "Breast cancer that begins in cells lining a milk duct. It may be in situ or invasive." },
  { term: "Lobular carcinoma", definition: "Breast cancer that begins in the milk-producing lobules. Invasive lobular carcinoma has grown into surrounding breast tissue." },
  { term: "Ductal carcinoma in situ (DCIS)", definition: "Abnormal cells confined inside a milk duct, without invasion into nearby tissue. Often called stage 0 or non-invasive breast disease. Some, but not all, cases can become invasive and need professional assessment and management." },
  { term: "Invasive cancer", definition: "Cancer that has grown beyond the tissue structure where it began into nearby tissue. Invasive does not automatically mean it has spread to distant organs." },
  { term: "Hormone receptor", definition: "A protein in or on a cell that receives a hormone signal. Breast cancer tests commonly look for estrogen and progesterone receptors to help guide treatment." },
  { term: "Estrogen receptor (ER)", definition: "A protein that binds estrogen. Cancer cells with these receptors may use estrogen signals to grow; testing helps guide hormone therapy." },
  { term: "Progesterone receptor (PR)", definition: "A protein that binds progesterone. Testing for this receptor helps describe a breast cancer's biology and guide treatment." },
  { term: "Hormone receptor-positive", definition: "A breast cancer whose cells test positive for estrogen receptors, progesterone receptors or both. Hormone therapy may help treat these cancers." },
  { term: "HER2", definition: "A protein involved in cell growth. Some breast cancers have too much HER2 or extra copies of its gene; tests help identify cancers that may benefit from HER2-directed treatment." },
  { term: "Triple-negative breast cancer", definition: "Breast cancer that tests negative for estrogen receptors, progesterone receptors and HER2 positivity. Treatments are available, but options differ from those for hormone receptor-positive or HER2-positive cancers." },
  { term: "BRCA1", definition: "A gene that helps repair damaged DNA. Certain inherited harmful variants increase breast and some other cancer risks; having a variant does not guarantee cancer." },
  { term: "BRCA2", definition: "A gene that helps repair damaged DNA. Certain inherited harmful variants increase cancer risks in people of different genders; having a variant does not guarantee cancer." },
  { term: "Risk factor", definition: "Something associated with a higher likelihood of a condition. It is not a prediction: people with risk factors may never develop cancer, and people without known risk factors can develop it." },
  { term: "Stage", definition: "The extent of cancer. Breast cancer staging considers size, lymph nodes, distant spread and relevant biological characteristics. Healthcare professionals assess stage." },
  { term: "Grade", definition: "How abnormal cancer cells look under a microscope, giving clues about their likely behaviour. Grade is different from stage." },
  { term: "Pathologist", definition: "A doctor who examines tissue and cells, including biopsy samples, to diagnose disease and describe its characteristics." },
  { term: "Pathology report", definition: "A report describing findings from tissue examination. It may include cancer type, grade, hormone receptors and HER2 results; some tests are reported separately." },
  { term: "Lumpectomy", definition: "Surgery to remove a breast cancer and a margin of nearby tissue while keeping most of the breast. Also called breast-conserving surgery." },
  { term: "Mastectomy", definition: "Surgery to remove a breast. The extent of surgery depends on the clinical situation and is discussed with the healthcare team." },
  { term: "Radiation therapy", definition: "Treatment using carefully directed high-energy radiation to damage cancer cells. Whether it is needed depends on the diagnosis and care plan." },
  { term: "Chemotherapy", definition: "Medicines that destroy or interfere with rapidly dividing cells. They can affect cancer cells and some healthy cells." },
  { term: "Hormone therapy", definition: "Cancer treatment that blocks or reduces hormone effects supporting certain hormone receptor-positive cancers. It is not the same as menopausal hormone replacement therapy." },
  { term: "Targeted therapy", definition: "Medicines directed at particular features of cancer cells, such as HER2. Tests help determine which targeted treatments may be appropriate." },
  { term: "Immunotherapy", definition: "Treatment that helps the immune system respond to cancer. It is used for selected breast cancers and clinical situations, not for everyone." },
] as const;

export const ORIGINS = [
  { id: "ducts", title: "Milk ducts", term: "Ductal carcinoma", text: "Many breast cancers begin in the cells lining the milk ducts. These are called ductal cancers.", detail: "The inset shows lining cells inside a duct, surrounded by a tissue boundary." },
  { id: "lobules", title: "Lobules", term: "Lobular carcinoma", text: "Some breast cancers begin in the milk-producing lobules. These are called lobular cancers.", detail: "The inset shows a milk-producing lobule and the tissue around it." },
] as const;
export type OriginId = (typeof ORIGINS)[number]["id"];
export const SUBTYPES = [
  { id: "hormone", title: "Does the cancer respond to hormones?", label: "Hormone receptors", term: "Hormone receptor-positive", text: "Some breast cancer cells have receptors for estrogen or progesterone. These cancers are called hormone receptor-positive. Hormone therapy may be used to reduce or block the effects of hormones that help certain cancers grow." },
  { id: "her2", title: "What is HER2?", label: "HER2", term: "HER2", text: "HER2 is a protein involved in cell growth. Some breast cancers have unusually high HER2 activity or amounts, which can affect how the cancer behaves. Certain targeted treatments work specifically against HER2-positive cancer." },
  { id: "triple", title: "What does triple-negative mean?", label: "Triple-negative", term: "Triple-negative breast cancer", text: "Triple-negative breast cancer tests negative for estrogen receptors, progesterone receptors and HER2 positivity. Its treatment options differ from those used for some other breast cancer types. Treatments are available, and these cancers do not all behave identically." },
] as const;
export const CARE_STAGES = [
  { title: "Medical Assessment", text: "A healthcare professional may ask about symptoms and medical history, examine the breast or chest area, and decide whether further investigations are needed." },
  { title: "Imaging", text: "Imaging tests such as mammograms, ultrasound or MRI may help healthcare professionals investigate an area of concern. Different tests provide different information." },
  { title: "Biopsy and Results", text: "If an area looks suspicious, a biopsy may be recommended. A sample of tissue is examined by a pathologist to determine whether cancer is present." },
  { title: "Understanding Treatment Options", text: "Breast cancer treatment depends on several factors, including the cancer's type, stage, biological characteristics and the person's circumstances." },
] as const;
export const TREATMENTS = [
  { title: "Surgery", term: "Lumpectomy", text: "Removing cancerous tissue, sometimes while conserving the breast, or removing a breast when appropriate." },
  { title: "Radiation Therapy", term: "Radiation therapy", text: "Using carefully directed high-energy radiation to treat cancer cells." },
  { title: "Chemotherapy", term: "Chemotherapy", text: "Medicines that destroy or interfere with rapidly dividing cells." },
  { title: "Hormone Therapy", term: "Hormone therapy", text: "Treatments that block or reduce hormone effects that support certain hormone receptor-positive cancers." },
  { title: "Targeted Therapy", term: "Targeted therapy", text: "Medicines directed toward particular features of cancer cells." },
  { title: "Immunotherapy", term: "Immunotherapy", text: "Treatments that help the immune system respond to certain cancers and are used in selected situations." },
] as const;
export const QUIZ4 = [
  { question: "Where do many breast cancers begin?", answers: ["In the bones of the chest.", "In the milk ducts or milk-producing lobules.", "In the skin of the hands."], correct: 1, explanation: "Many breast cancers begin in cells lining milk ducts or in the breast's milk-producing lobules." },
  { question: "What procedure can confirm whether suspicious breast tissue contains cancer?", answers: ["A biopsy examined by a pathologist.", "Measuring breast size.", "Checking whether the breast feels warm."], correct: 0, explanation: "A biopsy allows tissue to be examined for cancer cells. Imaging and examination help guide investigation, but tissue examination provides the definitive diagnosis." },
  { question: "Why can breast cancer treatments differ between people?", answers: ["Everyone must receive identical treatment.", "Treatment is chosen based only on someone's age.", "Treatment depends on the cancer's characteristics, extent and individual circumstances."], correct: 2, explanation: "Healthcare teams consider the type of breast cancer, its stage, biomarkers and other clinical factors when planning treatment." },
] as const;
export const BREAST_CANCER_SOURCES = [
  { title: "NCI · What Is Breast Cancer?", url: "https://www.cancer.gov/types/breast/what-is-breast-cancer" },
  { title: "NCI · Breast Cancer Diagnosis", url: "https://www.cancer.gov/types/breast/diagnosis" },
  { title: "NCI · Breast Cancer Stages", url: "https://www.cancer.gov/types/breast/stages" },
  { title: "NCI · Breast Cancer Biomarker Tests", url: "https://www.cancer.gov/types/breast/diagnosis/breast-cancer-biomarker-tests" },
  { title: "NCI · Causes and Risk Factors", url: "https://www.cancer.gov/types/breast/causes-risk-factors" },
  { title: "WHO · Breast Cancer", url: "https://www.who.int/news-room/fact-sheets/detail/breast-cancer" },
] as const;