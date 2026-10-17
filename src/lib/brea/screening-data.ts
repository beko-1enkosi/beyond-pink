export const SCREENING_GLOSSARY = [
  { term: "Mammography", definition: "The process of taking X-ray images of the breast. It is used both for screening and for investigating breast changes." },
  { term: "Screening mammogram", definition: "A mammogram performed to look for signs of cancer in someone who does not have symptoms." },
  { term: "Diagnostic mammogram", definition: "A mammogram used to investigate a particular symptom, examination finding or an abnormality seen on an earlier image. It may involve additional views." },
  { term: "Low-dose X-ray", definition: "An X-ray using a small, carefully controlled amount of radiation. Mammograms use low-dose X-rays to image breast tissue." },
  { term: "Compression", definition: "During a mammogram, the breast is briefly pressed between two plates to spread the tissue and help produce a clear image." },
  { term: "Radiographer", definition: "A healthcare professional trained to perform imaging examinations, such as mammograms, and to position patients correctly." },
  { term: "Mammography technologist", definition: "A radiographer who specialises in performing mammograms and helping position the breast for imaging." },
  { term: "Radiologist", definition: "A doctor who specialises in interpreting medical images, such as mammograms and ultrasounds, and reporting the findings." },
  { term: "Calcifications", definition: "Tiny calcium deposits within breast tissue that can appear on a mammogram. Many are harmless, but certain patterns may prompt further investigation." },
  { term: "Microcalcifications", definition: "Very small calcium deposits seen on a mammogram. Their pattern and appearance help radiologists decide whether further assessment is needed." },
  { term: "Breast density", definition: "The relative amounts of glandular and connective tissue compared with fatty tissue in the breast, as seen on a mammogram. It cannot be reliably judged by touch or appearance." },
  { term: "Dense breast tissue", definition: "Breast tissue with relatively more glandular and connective tissue than fat. Dense tissue can make some abnormalities harder to see on a mammogram." },
  { term: "Breast ultrasound", definition: "An imaging test that uses sound waves, rather than X-rays, to create pictures of tissues inside the breast." },
  { term: "Transducer", definition: "The small handheld probe used during an ultrasound. It sends sound waves into the body and receives the returning echoes." },
  { term: "Sonography", definition: "Another name for ultrasound imaging — creating pictures of the inside of the body using sound waves." },
  { term: "Cyst", definition: "A fluid-filled sac. Breast cysts are common and often benign, but a healthcare professional assesses any new lump." },
  { term: "Solid mass", definition: "An area of tissue that is solid rather than fluid-filled. Imaging appearance alone may not establish whether a solid mass is benign or cancerous." },
  { term: "Breast MRI", definition: "Magnetic resonance imaging of the breast. It uses magnets and radio waves, not X-rays, and is used in selected clinical situations." },
  { term: "BI-RADS", definition: "The Breast Imaging-Reporting and Data System — a standardised system radiologists use to describe breast imaging findings and recommend appropriate follow-up." },
  { term: "Additional imaging", definition: "Further imaging tests, such as extra mammogram views or an ultrasound, requested to look more closely at an area." },
  { term: "Image-guided biopsy", definition: "A biopsy in which imaging, such as ultrasound or mammography, helps the healthcare professional guide the needle to the area being sampled." },
] as const;

export const MAMMOGRAM_STEPS = [
  { id: "ready", title: "Getting Ready", text: "A radiographer or mammography technologist explains the procedure and helps position you correctly. You'll normally need to uncover the breast being examined.", tip: "Follow your facility's preparation instructions. Many facilities recommend avoiding deodorant, powder or lotions around the breast and underarm area on the day of the test because they can affect the images." },
  { id: "position", title: "Positioning the Breast", text: "The breast is carefully positioned between two plates so the equipment can capture useful images." },
  { id: "compression", title: "Gentle Compression", text: "The plates compress the breast briefly to spread the tissue and help produce a clear X-ray image.", note: "Some people experience pressure or discomfort, and it can be painful for others. Tell the technologist if you are struggling with the compression." },
  { id: "capture", title: "Capturing Images", text: "Several images may be taken, with the breast repositioned between views. A radiologist later reviews the images for findings that may need further assessment.", done: "That's the basic mammogram process." },
] as const;

export const MAMMOGRAM_FINDINGS = [
  { id: "mass", title: "Masses", text: "A mammogram may show a mass or an area that looks different from surrounding breast tissue. Its shape, edges and other features help the radiologist decide whether further investigation is needed." },
  { id: "calcifications", title: "Calcifications", text: "Calcifications are tiny calcium deposits within breast tissue. Many are harmless, but certain patterns of very small calcifications can prompt further investigation." },
  { id: "density", title: "Breast Density", text: "Breast density refers to the relative amounts of glandular and connective tissue compared with fatty tissue. Dense breast tissue can make some abnormalities harder to see on a mammogram." },
] as const;
export type MammogramFindingId = (typeof MAMMOGRAM_FINDINGS)[number]["id"];

export const ULTRASOUND_STEPS = [
  { id: "gel", title: "Gel", text: "A healthcare professional applies gel to the skin to help transmit sound waves." },
  { id: "scanning", title: "Scanning", text: "A small handheld probe is moved over the area being examined. It sends sound waves into the tissue and receives returning echoes." },
  { id: "viewing", title: "Viewing the Image", text: "A computer uses the returning echoes to produce pictures of the breast tissue." },
] as const;

export const ULTRASOUND_FINDINGS = [
  { id: "cyst", title: "Fluid-Filled Cyst", text: "Ultrasound can help identify whether an area contains fluid, such as a cyst." },
  { id: "solid", title: "Solid Mass", text: "Ultrasound can also help identify a solid mass. However, imaging appearance alone may not always establish whether a solid mass is benign or cancerous." },
] as const;

export const ULTRASOUND_REASONS = [
  { title: "Investigating a specific area", text: "Ultrasound can help healthcare professionals look more closely at a breast lump or a specific area of concern." },
  { title: "Assessing earlier findings", text: "It can help assess findings seen on another imaging test, such as a mammogram." },
  { title: "Selected circumstances", text: "It may assist evaluation in some situations, including certain cases involving younger patients, pregnancy or dense breasts." },
] as const;

export const IMAGING_COMPARISON = {
  mammogram: { label: "Uses X-rays", description: "Creates detailed X-ray images of breast tissue.", uses: ["Routine screening in appropriate populations.", "Investigating certain breast changes.", "Identifying masses, calcifications and changes in tissue structure."] },
  ultrasound: { label: "Uses Sound Waves", description: "Creates images using returning sound-wave echoes.", uses: ["Investigating specific breast findings.", "Helping distinguish fluid-filled from solid areas.", "Complementing other imaging tests in selected situations."] },
} as const;

export const RESULT_STEPS = [
  { title: "Images Are Reviewed", text: "A radiologist reviews the images and looks for findings that may need attention." },
  { title: "A Report Is Prepared", text: "The radiologist communicates the findings to the healthcare professional responsible for your care." },
  { title: "Next Steps Are Explained", text: "Depending on the findings, you may be advised to return for routine screening, have additional imaging, attend follow-up appointments or undergo a biopsy." },
] as const;

export const APPOINTMENT_QUESTIONS = [
  "What is the purpose of this imaging test?",
  "When and how will I receive my results?",
  "Will I need any follow-up tests?",
  "Who should I contact if I notice a new breast change?",
  "What does my imaging report mean?",
] as const;

export const QUIZ5 = [
  { question: "What technology does a mammogram use?", answers: ["Low-dose X-rays", "Sound waves", "Magnetic waves only"], correct: 0, explanation: "A mammogram uses low-dose X-rays to create images of breast tissue." },
  { question: "What can breast ultrasound help healthcare professionals determine?", answers: ["A person's exact future risk of developing cancer.", "Whether an area looks fluid-filled or solid.", "Whether someone needs every cancer treatment."], correct: 1, explanation: "Ultrasound helps evaluate breast structures and can provide information about fluid-filled cysts and solid masses." },
  { question: "What is the difference between screening and diagnostic imaging?", answers: ["Screening looks for possible cancer in people without symptoms, while diagnostic imaging investigates a particular concern.", "Screening always confirms cancer.", "Diagnostic imaging is only used after surgery."], correct: 0, explanation: "Screening checks for possible disease before symptoms appear. Diagnostic imaging investigates findings or symptoms that need further assessment." },
] as const;

export const SCREENING_SOURCES = [
  { title: "NCI · Mammograms", url: "https://www.cancer.gov/types/breast/screening/mammograms" },
  { title: "NCI · Breast Cancer Screening", url: "https://www.cancer.gov/types/breast/screening" },
  { title: "RadiologyInfo · Breast Ultrasound", url: "https://www.radiologyinfo.org/en/info/breastus" },
  { title: "RadiologyInfo · Understanding Mammography Reports", url: "https://www.radiologyinfo.org/en/info/how-to-read-your-mammo-report" },
  { title: "CANSA · Cancer Risk Reduction & Screening", url: "https://cansa.org.za/cansas-care-support/cancer-risk-reduction-screening/" },
] as const;
