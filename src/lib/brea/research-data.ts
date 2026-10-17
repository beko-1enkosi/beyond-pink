// The Science Behind Awareness — curated, verified research collection for the
// Understand Breast Changes pathway. Only real published studies; never invent
// citations, statistics or outcomes. Future studies extend RESEARCH_STUDIES.

export const RESEARCH_CATEGORIES = [
  "All Research",
  "South African Research",
  "Understanding Symptoms",
  "Imaging & Screening",
  "Landmark Studies",
] as const;
export type ResearchCategory = (typeof RESEARCH_CATEGORIES)[number];

export type ResearchStudy = {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  category: Exclude<ResearchCategory, "All Research">;
  publicationType: string;
  link: string;
  summary: string;
  investigated: { simple: string; detailed: string };
  findings: readonly string[];
  whyItMatters: string;
  limitations: string;
};

export const RESEARCH_STUDIES: readonly ResearchStudy[] = [
  {
    id: "sa-diagnostic-delays-2026",
    title: "Where do delays occur? A systematic review of the barriers to early breast cancer diagnosis across South Africa's health system",
    authors: "Reissis Y, Miller B, Friebel R, Hargest R",
    year: 2026,
    journal: "BMJ Open",
    category: "South African Research",
    publicationType: "Systematic Review",
    link: "https://doi.org/10.1136/bmjopen-2026-122056",
    summary: "This review brought together findings from 22 studies to understand why people in South Africa may experience delays in breast cancer diagnosis.",
    investigated: {
      simple: "Why do some people in South Africa wait a long time between noticing a breast change and getting a diagnosis? The researchers gathered existing studies to map where the delays happen.",
      detailed: "The researchers systematically collected and assessed 22 existing studies about breast cancer diagnosis in South Africa. They looked for the barriers people face at each step of the healthcare journey — from first noticing a symptom, to reaching a clinic, to being assessed, to starting treatment.",
    },
    findings: [
      "Barriers occurred across multiple parts of the healthcare journey, not just one step.",
      "Limited awareness, difficulties accessing healthcare, delays in diagnostic assessment and challenges accessing treatment all played a role.",
      "Delays were shaped by both personal circumstances and health-system factors.",
    ],
    whyItMatters: "Learning about breast changes is important, but timely diagnosis also depends on accessible healthcare services and effective referrals.",
    limitations: "This is a review of existing studies, not a clinical trial proving that one specific intervention solves diagnostic delays.",
  },
  {
    id: "kzn-self-exam-model-2025",
    title: "A model for promoting breast self-examination among rural South African women in KwaZulu-Natal",
    authors: "Sarmah N, Sibiya MN, Khoza TE",
    year: 2025,
    journal: "Health SA Gesondheid",
    category: "South African Research",
    publicationType: "Qualitative Research and Model Development",
    link: "https://doi.org/10.4102/hsag.v30i0.2777",
    summary: "Researchers developed an educational model aimed at improving breast self-examination awareness among women in rural KwaZulu-Natal.",
    investigated: {
      simple: "How can breast-health education be made more useful for women in rural KwaZulu-Natal? The researchers listened to communities and designed an educational model around their needs.",
      detailed: "Using qualitative research methods, the researchers explored the experiences and needs of women in rural KwaZulu-Natal around breast self-examination. From these insights, they developed a proposed educational model for promoting breast self-examination awareness in that setting.",
    },
    findings: [
      "Breast-health education works best when it reflects the realities, languages and resources of the community it serves.",
      "The researchers developed a proposed model for promoting breast self-examination awareness in rural settings.",
    ],
    whyItMatters: "Breast-health information needs to be accessible and relevant to the people and communities it serves.",
    limitations: "The study develops a proposed model. It does not establish that self-examination reduces deaths from breast cancer or replaces professional screening.",
  },
  {
    id: "sa-symptom-appraisal-2020",
    title: "Women's appraisal, interpretation and help-seeking for possible symptoms of breast and cervical cancer in South Africa: a qualitative study",
    authors: "Harries J, Scott SE, Walter FM, Mwaka AD, Moodley J",
    year: 2020,
    journal: "BMC Women's Health",
    category: "Understanding Symptoms",
    publicationType: "Qualitative Interview Study",
    link: "https://doi.org/10.1186/s12905-020-01120-4",
    summary: "Researchers interviewed women in urban and rural South Africa to understand how they interpreted possible cancer symptoms and decided when to seek medical help.",
    investigated: {
      simple: "When women notice a possible cancer symptom, what goes through their minds, and what shapes their decision to seek help? Researchers interviewed women in urban and rural South Africa to find out.",
      detailed: "In this qualitative study, researchers conducted in-depth interviews with 18 women in urban and rural South Africa. They explored how the women appraised and interpreted possible symptoms of breast and cervical cancer, and what influenced their decisions about seeking medical help.",
    },
    findings: [
      "How women interpreted a symptom shaped whether and when they sought help.",
      "Personal experiences, available information and healthcare access all influenced what happened after a symptom was noticed.",
      "Recognising a change is only one part of the journey to care.",
    ],
    whyItMatters: "Recognising a change is only one part of seeking care. People's experiences, available information and healthcare access can influence what happens next.",
    limitations: "This was a small qualitative study involving 18 participants and both breast and cervical symptoms. Its findings should not be presented as statistically representative of all South African women.",
  },
  {
    id: "screening-by-density-2024",
    title: "Breast Cancer Screening Using Mammography, Digital Breast Tomosynthesis, and Magnetic Resonance Imaging by Breast Density",
    authors: "Stout NK, Miglioretti DL, Su Y-R, et al.",
    year: 2024,
    journal: "JAMA Internal Medicine",
    category: "Imaging & Screening",
    publicationType: "Model-Based Comparative Effectiveness Analysis",
    link: "https://doi.org/10.1001/jamainternmed.2024.4224",
    summary: "Researchers used simulation models to compare the potential benefits and harms of different breast cancer screening approaches based on breast density.",
    investigated: {
      simple: "Does the best screening approach differ depending on how dense someone's breasts are? Researchers used computer models to compare mammography, tomosynthesis (3D mammography) and MRI.",
      detailed: "This was a model-based comparative effectiveness analysis. Instead of following real patients, the researchers used established simulation models and data to estimate the benefits and harms of different screening strategies — mammography, digital breast tomosynthesis and magnetic resonance imaging (MRI) — for people with different levels of breast density in a United States population.",
    },
    findings: [
      "Different imaging technologies have different strengths and trade-offs.",
      "The balance of benefits and harms varied with breast density and screening strategy.",
      "More advanced imaging is not automatically the best choice for everyone.",
    ],
    whyItMatters: "Different imaging technologies have different strengths and trade-offs. Screening decisions involve more than choosing the most advanced machine.",
    limitations: "The study models screening strategies for a United States population. It does not directly establish the best screening schedule for South African users or provide personalized medical advice.",
  },
  {
    id: "shanghai-bse-trial-2002",
    title: "Randomized trial of breast self-examination in Shanghai: final results",
    authors: "Thomas DB, et al.",
    year: 2002,
    journal: "Journal of the National Cancer Institute",
    category: "Landmark Studies",
    publicationType: "Randomized Controlled Trial",
    link: "https://pubmed.ncbi.nlm.nih.gov/12359854/",
    summary: "This landmark trial investigated whether teaching regular formal breast self-examination reduced breast cancer deaths.",
    investigated: {
      simple: "Does teaching women a formal, regular breast self-examination routine reduce deaths from breast cancer? A large trial in Shanghai followed women for years to find out.",
      detailed: "In this large randomized controlled trial in Shanghai, China, women were randomly assigned to receive intensive instruction in formal breast self-examination or not. Researchers followed the groups for years and compared breast cancer deaths between them.",
    },
    findings: [
      "The study found no reduction in breast cancer mortality from intensive self-examination instruction.",
      "Formal self-examination programmes led to more biopsies for findings that turned out not to be cancer.",
    ],
    whyItMatters: "Being familiar with your body can help you notice changes, but formal self-examination has not been shown to replace recommended screening or professional evaluation.",
    limitations: "This study examined a particular formal self-examination training intervention and should not be interpreted as discouraging people from seeking care when they notice symptoms.",
  },
] as const;

export const RESEARCH_LITERACY = [
  { term: "Qualitative study", definition: "Researchers explore people's experiences, perspectives or behaviours in depth, often through interviews." },
  { term: "Systematic review", definition: "Researchers gather and assess findings from multiple existing studies using a defined method." },
  { term: "Randomized controlled trial", definition: "Researchers randomly assign participants to different interventions or comparison groups to investigate their effects." },
  { term: "Modeling study", definition: "Researchers use data and assumptions to estimate outcomes under different scenarios." },
] as const;

export const BSE_CLARIFICATION = {
  heading: "Breast Awareness and Screening Are Not the Same Thing.",
  body: "Learning what is usual for your breast or chest area may help you notice new changes. However, research has not shown that formal routine breast self-examination reduces breast cancer deaths. Breast awareness does not replace recommended screening, professional assessment or diagnostic testing.",
} as const;

export const RESEARCH_GLOSSARY = [
  { term: "Peer-reviewed research", definition: "Research that has been evaluated by other independent experts in the same field before being published in a journal. Peer review helps check quality, but it does not guarantee a study is perfect." },
  { term: "Qualitative study", definition: "A study that explores people's experiences, perspectives or behaviours in depth, often through interviews, rather than measuring things in numbers." },
  { term: "Systematic review", definition: "A study that gathers and assesses the findings of many existing studies on a question, using a clear, defined method to reduce bias." },
  { term: "Randomized controlled trial", definition: "A study where participants are randomly assigned to different interventions or comparison groups, so researchers can investigate the effects of an intervention more fairly." },
  { term: "Clinical evidence", definition: "Information gathered through careful research about health and healthcare. Evidence ranges from small exploratory studies to large trials, and stronger conclusions usually need several kinds of evidence together." },
  { term: "Study population", definition: "The group of people (or data) a study looked at. Findings are most relevant to people similar to that group, which is why researchers describe who took part." },
  { term: "Research findings", definition: "What a study observed or measured. Findings describe what happened in that study — they are not automatic proof of what will happen for every individual." },
  { term: "Study limitations", definition: "The things a study cannot tell us — for example because of its size, design or the group studied. Honest research always describes its limitations." },
  { term: "Breast density", definition: "A description of how much glandular and connective tissue the breast contains compared with fatty tissue. Dense breasts can make mammograms harder to read and are one factor in screening decisions." },
  { term: "Tomosynthesis", definition: "Also called 3D mammography. An imaging technique that takes X-ray pictures of the breast from several angles to create layered images." },
  { term: "Screening", definition: "Tests or examinations used to look for signs of a condition in people who do not have symptoms, so that possible problems can be found earlier." },
  { term: "Diagnostic delay", definition: "A longer-than-ideal time between first noticing a symptom or seeking care and receiving a diagnosis. Delays can have many causes, both personal and within health systems." },
  { term: "Health literacy", definition: "How easily a person can find, understand and use health information to make decisions. Clear, accessible information supports better health literacy." },
] as const;
