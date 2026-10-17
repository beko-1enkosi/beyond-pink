// Source-key dictionaries extend the existing five-language website provider only.
const keys = [
'How Brea Works','BEYONDPINK PRESENTS','A Little Tour of |Brea.|','Get to know your breast health companion, one gentle step at a time.',
'Explore the Journey','Skip Intro','Launch Brea','Back to BeyondPink','A gentle journey in four steps','Brea preview','Screenshot preview',
'STEP 01 · HELLO THERE','Meet Your New |Companion.|',"Begin with a gentle welcome. Tell Brea what you'd like to be called and make the experience your own.",'Hello, you!',
'STEP 02 · YOUR JOURNEY','Start Where You Feel |Ready.|',"Choose what you'd like to explore first, whether that's learning about breast health, understanding changes, finding support or locating care.",'Your journey, your choice.',
'STEP 03 · DISCOVER & GROW','Little Lessons. |Growing Knowledge.|',"Explore interactive breast anatomy, understand important health information, decode medical terms and celebrate what you've learned with beautiful achievement badges.","Look how far you've grown!",'Quizzes are optional. Badges celebrate learning, not health outcomes.',
'STEP 04 · YOU BELONG','|Support| Is Part of the Journey.','Discover compassionate guidance, share encouragement in The Brea Garden and explore healthcare and support services across South Africa.','Every story matters.','Care, closer to you.',
'The Brea Garden is a demonstration with fictional example posts. Your posts, comments and reactions stay in this browser; they are not shared with other visitors.',
'Ready to Begin Your |Journey?|',"There's no perfect place to start. Just a little curiosity and a space to explore.",'Brea is available in English.','Educational information only. Not a substitute for professional medical advice.',
'Brea welcome screen with its botanical logo','Brea onboarding with four single-selection pathways','Brea interactive learning and educational illustrations','The Brea Garden fictional community feed and heart reactions','Find Care South African map with awareness ribbon markers'
];
const zu = [
'Indlela Brea Esebenza Ngayo','BEYONDPINK YETHULA','Uhambo Oluncane Lwe-|Brea.|','Yazi umngane wakho wezempilo yamabele, isinyathelo esisodwa esithambile ngesikhathi.',
'Hlola Uhambo','Yeqa Isingeniso','Vula Brea','Buyela ku-BeyondPink','Uhambo oluthambile ngezinyathelo ezine','Ukubuka kuqala Brea','Ukubuka kuqala isithombe sesikrini',
'ISINYATHELO 01 · SAWUBONA','Hlangana |Nomngane| Wakho Omusha.', 'Qala ngokwamukelwa okufudumele. Tshela Brea ukuthi ungathanda ukubizwa ngokuthini, wenze lokhu kube ngokwakho.','Sawubona, wena!',
'ISINYATHELO 02 · UHAMBO LWAKHO','Qala Lapho Uzizwa |Ukulungele.|','Khetha ofuna ukukuhlola kuqala: ukufunda ngempilo yamabele, ukuqonda izinguquko, ukuthola ukwesekwa noma ukunakekelwa.','Uhambo lwakho, ukukhetha kwakho.',
'ISINYATHELO 03 · THOLA FUTHI UKHULE','Izifundo Ezincane. |Ulwazi Olukhulayo.|','Hlola ukwakheka kwamabele ngokuhlanganyela, uqonde ulwazi lwezempilo olubalulekile, uchaze amagama ezokwelapha futhi ugubhe okufundile ngamabheji amahle.','Bheka ukuthi usukhule kangakanani!','Imibuzo yokuzihlola iyakhethwa. Amabheji agubha ukufunda, hhayi imiphumela yezempilo.',
'ISINYATHELO 04 · UNGENYE YETHU','|Ukwesekwa| Kuyingxenye Yohambo.','Thola isiqondiso esinozwelo, wabelane ngesikhuthazo e-The Brea Garden futhi uhlole izinsizakalo zezempilo nokwesekwa eNingizimu Afrika.','Yonke indaba ibalulekile.','Ukunakekelwa, eduze kwakho.',
'The Brea Garden iyisiboniso esinemibhalo eyisibonelo eqanjiwe. Imibhalo yakho, imibono nokuphendula kuhlala kulesi siphequluli; akuhlanganyelwa nezinye izivakashi.',
'Ulungele Ukuqala |Uhambo| Lwakho?', 'Ayikho indawo ephelele yokuqala. Ilukuluku elincane nje nendawo yokuhlola.','Brea itholakala ngesiNgisi.','Ulwazi lokufundisa kuphela. Aluthathi indawo yeseluleko sezokwelapha sochwepheshe.',
'Isikrini sokwamukela se-Brea esinophawu lwaso lwezitshalo','Ukuqalisa kwe-Brea ngezindlela ezine okukhethwa eyodwa kuzo','Ukufunda okuhlanganyelwe kwe-Brea nemifanekiso yokufundisa','Imibhalo yomphakathi eqanjiwe ye-The Brea Garden nokuphendula ngezinhliziyo','Imephu yaseNingizimu Afrika ye-Find Care enezimpawu zamaribhoni okuqwashisa'
];
const xh = [
'Indlela Brea Esebenza Ngayo','BEYONDPINK INIKEZELA','Ukhenketho Oluncinci Lwe-|Brea.|','Yazi iqabane lakho lempilo yamabele, inyathelo elinye elithambileyo ngexesha.',
'Phonononga Uhambo','Tsiba Intshayelelo','Vula Brea','Buyela ku-BeyondPink','Uhambo oluthambileyo ngamanyathelo amane','Umboniso we-Brea','Umboniso womfanekiso wesikrini',
'INYATHELO 01 · MOLO','Dibana |Neqabane| Lakho Elitsha.','Qala ngokwamkelwa okufudumeleyo. Xelela Brea ukuba ungathanda ukubizwa ngantoni, uze wenze amava abe ngawakho.','Molo, wena!',
'INYATHELO 02 · UHAMBO LWAKHO','Qala Apho Uziva |Ukulungele.|','Khetha ofuna ukukuphonononga kuqala: ukufunda ngempilo yamabele, ukuqonda utshintsho, ukufumana inkxaso okanye ukhathalelo.','Uhambo lwakho, ukhetho lwakho.',
'INYATHELO 03 · FUMANISA UKHULE','Izifundo Ezincinci. |Ulwazi Olukhulayo.|','Phonononga ukwakheka kwamabele ngokusebenzisana, uqonde ulwazi lwezempilo olubalulekileyo, ucacise amagama ezonyango uze ubhiyozele okufundileyo ngeebheji ezintle.','Jonga indlela okhule ngayo!','Imibuzo yokuzivavanya iyakhethwa. Iibheji zibhiyozela ukufunda, hayi iziphumo zempilo.',
'INYATHELO 04 · UYINXALENYE YETHU','|Inkxaso| Yinxalenye Yohambo.','Fumana isikhokelo esinovelwano, wabelane ngenkuthazo kwi-The Brea Garden uze uphonononge iinkonzo zempilo nenkxaso eMzantsi Afrika.','Ibali ngalinye libalulekile.','Ukhathalelo, kufutshane nawe.',
'The Brea Garden ngumboniso onemibhalo eyimizekelo eyintsomi. Imibhalo yakho, izimvo neempendulo zihlala kwesi sikhangeli; azabelwana nezinye iindwendwe.',
'Ukulungele Ukuqala |Uhambo| Lwakho?','Akukho ndawo igqibeleleyo yokuqala. Ngumdla omncinci nje nendawo yokuphonononga.','Brea ifumaneka ngesiNgesi.','Ulwazi lokufundisa kuphela. Aluthathi indawo yengcebiso yezonyango yengcali.',
'Isikrini sokwamkela se-Brea esinophawu lwaso lwezityalo','Ukuqalisa kwe-Brea ngeendlela ezine ekukhethwa enye kuzo','Ukufunda okusebenzisanayo kwe-Brea nemifanekiso yokufundisa','Imibhalo yoluntu eyintsomi ye-The Brea Garden neempendulo zeentliziyo','Imephu yoMzantsi Afrika ye-Find Care eneempawu zeeribhoni zokwazisa'
];
const st = [
'Kamoo Brea e Sebetsang Kateng','BEYONDPINK E HLAHISA','Leeto le Lenyenyane la |Brea.|','Tseba molekane wa hao wa bophelo bo botle ba matswele, mohato o le mong o bonolo ka nako.',
'Hlahloba Leeto','Tlola Selelekela','Bula Brea','Kgutlela ho BeyondPink','Leeto le bonolo ka mehato e mene','Ponelopele ya Brea','Ponelopele ya setshwantsho sa skrine',
'MOHATO 01 · DUMELA','Kopana le |Molekane| wa Hao e Motjha.','Qala ka kamohelo e mofuthu. Bolella Brea hore o rata ho bitswa eng, mme o etse boiphihlelo bona ba hao.','Dumela, wena!',
'MOHATO 02 · LEETO LA HAO','Qala Moo o Ikutlwang o |Itokisitse.|','Kgetha seo o batlang ho se hlahloba pele: ho ithuta ka bophelo bo botle ba matswele, ho utlwisisa diphetoho, ho fumana tshehetso kapa tlhokomelo.','Leeto la hao, kgetho ya hao.',
'MOHATO 03 · FUMANA MME O HOLE','Dithuto tse Nyenyane. |Tsebo e Holang.|','Hlahloba sebopeho sa matswele ka ho nka karolo, utlwisisa lesedi la bohlokwa la bophelo bo botle, hlalosa mantswe a bongaka mme o keteke seo o ithutileng sona ka dibetjhe tse ntle.','Bona kamoo o hodileng kateng!','Dipotso tsa ho itlhahloba ke tsa boikgethelo. Dibetjhe di keteka ho ithuta, eseng diphetho tsa bophelo bo botle.',
'MOHATO 04 · O KAROLO YA RONA','|Tshehetso| ke Karolo ya Leeto.','Fumana tataiso e nang le kutlwelobohloko, arolelana kgothatso ho The Brea Garden mme o hlahlobe ditshebeletso tsa bophelo bo botle le tshehetso Afrika Borwa.','Pale e nngwe le e nngwe e bohlokwa.','Tlhokomelo, haufi le wena.',
'The Brea Garden ke pontsho e nang le dipale tsa mehlala tse iqapetsweng. Dingolwa tsa hao, maikutlo le dikarabo di sala sebatling sena; ha di arolelanwe le baeti ba bang.',
'O Itokiseditse ho Qala |Leeto| la Hao?','Ha ho sebaka se phethahetseng sa ho qala. Ke tjantjello e nyenyane feela le sebaka sa ho hlahloba.','Brea e fumaneha ka Senyesemane.','Lesedi la thuto feela. Ha le nke sebaka sa keletso ya bongaka ya setsebi.',
'Skrine sa kamohelo sa Brea se nang le letshwao la dimela','Ho qala Brea ka ditsela tse nne tseo ho kgethwang e le nngwe','Thuto ya Brea ya ho nka karolo le ditshwantsho tsa thuto','Dipale tsa setjhaba tse iqapetsweng tsa The Brea Garden le dikarabo tsa dipelo','Mmapa wa Afrika Borwa wa Find Care o nang le matshwao a diribone tsa tlhokomediso'
];
const af = [
'Hoe Brea Werk','BEYONDPINK BIED AAN',"’n Klein Toer van |Brea.|",'Leer jou borsgesondheidsmaat ken, een sagte tree op ’n slag.',
'Verken die Reis','Slaan Inleiding Oor','Maak Brea Oop','Terug na BeyondPink','’n Sagte reis in vier stappe','Brea-voorskou','Skermprentvoorskou',
'STAP 01 · HALLO DAAR','Ontmoet Jou Nuwe |Metgesel.|','Begin met ’n hartlike verwelkoming. Vertel Brea wat jy genoem wil word en maak die ervaring jou eie.','Hallo, jy!',
'STAP 02 · JOU REIS','Begin Waar Jy |Gereed| Voel.','Kies wat jy eerste wil verken: leer oor borsgesondheid, verstaan veranderinge, vind ondersteuning of soek sorg.','Jou reis, jou keuse.',
'STAP 03 · ONTDEK EN GROEI','Klein Lesse. |Groeiende Kennis.|','Verken interaktiewe borsanatomie, verstaan belangrike gesondheidsinligting, ontsyfer mediese terme en vier wat jy geleer het met pragtige prestasiekentekens.','Kyk hoe ver jy gegroei het!','Vasvrae is opsioneel. Kentekens vier leer, nie gesondheidsuitkomste nie.',
'STAP 04 · JY HOORT HIER','|Ondersteuning| Is Deel van die Reis.','Ontdek deernisvolle leiding, deel aanmoediging in The Brea Garden en verken gesondheidsorg- en ondersteuningsdienste regoor Suid-Afrika.','Elke storie maak saak.','Sorg, nader aan jou.',
'The Brea Garden is ’n demonstrasie met fiktiewe voorbeeldplasings. Jou plasings, kommentaar en reaksies bly in hierdie blaaier; dit word nie met ander besoekers gedeel nie.',
'Gereed om Jou |Reis| te Begin?','Daar is geen perfekte plek om te begin nie. Net ’n bietjie nuuskierigheid en ’n ruimte om te verken.','Brea is in Engels beskikbaar.','Slegs opvoedkundige inligting. Nie ’n plaasvervanger vir professionele mediese advies nie.',
'Brea se welkomskerm met sy botaniese logo','Brea se aanvangskerm met vier enkelkeuse-roetes','Brea se interaktiewe leer en opvoedkundige illustrasies','The Brea Garden se fiktiewe gemeenskapsplasings en hartreaksies','Find Care se Suid-Afrikaanse kaart met bewusmakingslintmerkers'
];
export const tourDictionaries: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries({ en: keys, zu, xh, st, af }).map(([language, values]) => [language, Object.fromEntries(keys.map((key, i) => [key, values[i] ?? key]))])
);
for (const [language, label] of Object.entries({ en: 'Skip to main content', zu: 'Yeqa uye kokuqukethwe okuyinhloko', xh: 'Tsibela kumxholo ophambili', st: 'Tlola ho ya dikahare tsa sehlooho', af: 'Slaan oor na hoofinhoud' })) {
  const dictionary = tourDictionaries[language];
  if (dictionary) dictionary['Skip to main content'] = label;
}
