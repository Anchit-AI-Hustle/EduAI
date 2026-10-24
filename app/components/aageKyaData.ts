// Data for the Aage Kya concept prototype. Course, exam and scholarship facts
// are public and linked to official portals; rules change every year, so the
// UI always says "confirm on the official site". Colleges and enquiries are
// fictional demo data. The fake-university list is the UGC page "List of Fake
// Universities" as of February 2026 (32 entries).

export type Stream = "pcm" | "pcb" | "commerce" | "arts";
export type Interest = "tech" | "health" | "teach" | "business" | "govt" | "unsure";
export type Budget = "low" | "mid" | "high";
export type Income = "upto2" | "upto25" | "upto45" | "above45" | "skip";
export type Reach = "district" | "state";

export interface Bi {
  en: string;
  hi: string;
}

export interface Course {
  id: string;
  streams: Stream[];
  interests: Interest[];
  name: Bi;
  what: Bi;
  years: Bi;
  exams: string[];
}

export interface Exam {
  id: string;
  name: Bi;
  by: Bi;
  url: string;
  window: Bi;
  // Status on UP Board result day (late April): can it still be used this year?
  open: boolean;
  thisYear: Bi;
}

export const STREAMS: { id: Stream; label: Bi }[] = [
  { id: "pcm", label: { en: "Science (Maths)", hi: "विज्ञान (गणित)" } },
  { id: "pcb", label: { en: "Science (Biology)", hi: "विज्ञान (जीव विज्ञान)" } },
  { id: "commerce", label: { en: "Commerce", hi: "वाणिज्य" } },
  { id: "arts", label: { en: "Arts (Humanities)", hi: "कला (मानविकी)" } }
];

export const INTERESTS: { id: Interest; label: Bi }[] = [
  { id: "tech", label: { en: "Engineering and technology", hi: "इंजीनियरिंग और तकनीक" } },
  { id: "health", label: { en: "Medicine and health", hi: "चिकित्सा और स्वास्थ्य" } },
  { id: "teach", label: { en: "Teaching", hi: "शिक्षण" } },
  { id: "business", label: { en: "Business and accounts", hi: "व्यापार और लेखा" } },
  { id: "govt", label: { en: "Government jobs and defence", hi: "सरकारी नौकरी और रक्षा सेवा" } },
  { id: "unsure", label: { en: "Not sure yet", hi: "अभी तय नहीं" } }
];

export const BUDGETS: { id: Budget; label: Bi; max: number }[] = [
  { id: "low", label: { en: "Up to ₹25,000 a year", hi: "₹25,000 सालाना तक" }, max: 25000 },
  { id: "mid", label: { en: "₹25,000 to ₹1 lakh a year", hi: "₹25,000 से ₹1 लाख सालाना" }, max: 100000 },
  { id: "high", label: { en: "More than ₹1 lakh a year", hi: "₹1 लाख सालाना से अधिक" }, max: Infinity }
];

export const INCOMES: { id: Income; label: Bi }[] = [
  { id: "upto2", label: { en: "Up to ₹2 lakh", hi: "₹2 लाख तक" } },
  { id: "upto25", label: { en: "₹2 lakh to ₹2.5 lakh", hi: "₹2 लाख से ₹2.5 लाख" } },
  { id: "upto45", label: { en: "₹2.5 lakh to ₹4.5 lakh", hi: "₹2.5 लाख से ₹4.5 लाख" } },
  { id: "above45", label: { en: "More than ₹4.5 lakh", hi: "₹4.5 लाख से अधिक" } },
  { id: "skip", label: { en: "Prefer not to say", hi: "नहीं बताना चाहते" } }
];

export const REACHES: { id: Reach; label: Bi }[] = [
  { id: "district", label: { en: "In my district", hi: "अपने जिले में" } },
  { id: "state", label: { en: "Anywhere in UP", hi: "यूपी में कहीं भी" } }
];

export const DISTRICTS: Bi[] = [
  { en: "Kanpur Nagar", hi: "कानपुर नगर" },
  { en: "Lucknow", hi: "लखनऊ" },
  { en: "Varanasi", hi: "वाराणसी" },
  { en: "Prayagraj", hi: "प्रयागराज" },
  { en: "Agra", hi: "आगरा" },
  { en: "Meerut", hi: "मेरठ" },
  { en: "Bareilly", hi: "बरेली" },
  { en: "Gorakhpur", hi: "गोरखपुर" }
];

const ALL: Stream[] = ["pcm", "pcb", "commerce", "arts"];

export const COURSES: Course[] = [
  {
    id: "btech",
    streams: ["pcm"],
    interests: ["tech"],
    name: { en: "B.Tech / B.E.", hi: "बी.टेक / बी.ई." },
    what: {
      en: "Engineering degree. State seats in UP are filled through counselling based on JEE Main.",
      hi: "इंजीनियरिंग डिग्री। यूपी में राज्य की सीटें JEE Main के आधार पर काउंसलिंग से भरी जाती हैं।"
    },
    years: { en: "4 years", hi: "4 वर्ष" },
    exams: ["jee"]
  },
  {
    id: "bca",
    streams: ["pcm", "commerce"],
    interests: ["tech", "business", "unsure"],
    name: { en: "BCA", hi: "बीसीए" },
    what: {
      en: "Computer applications degree. Leads to software and IT jobs; many colleges admit on Class 12 marks.",
      hi: "कंप्यूटर एप्लीकेशन की डिग्री। सॉफ्टवेयर और आईटी नौकरियों का रास्ता; कई कॉलेज कक्षा 12 के अंकों पर प्रवेश देते हैं।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "bsc_pcm",
    streams: ["pcm"],
    interests: ["tech", "teach", "govt", "unsure"],
    name: { en: "B.Sc. (Maths, Physics, Computer Science)", hi: "बी.एससी. (गणित, भौतिकी, कंप्यूटर विज्ञान)" },
    what: {
      en: "Science degree. Opens teaching, research, data jobs and most government exams.",
      hi: "विज्ञान की डिग्री। शिक्षण, शोध, डेटा से जुड़ी नौकरियों और ज़्यादातर सरकारी परीक्षाओं का रास्ता खोलती है।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "mbbs",
    streams: ["pcb"],
    interests: ["health"],
    name: { en: "MBBS / BDS / BAMS", hi: "एमबीबीएस / बीडीएस / बीएएमएस" },
    what: {
      en: "Medical degrees. Admission everywhere in India is through NEET (UG).",
      hi: "चिकित्सा की डिग्रियाँ। पूरे भारत में प्रवेश NEET (UG) से होता है।"
    },
    years: { en: "5 to 5.5 years", hi: "5 से 5.5 वर्ष" },
    exams: ["neet"]
  },
  {
    id: "bpharm",
    streams: ["pcm", "pcb"],
    interests: ["health"],
    name: { en: "B.Pharm", hi: "बी.फार्मा" },
    what: {
      en: "Pharmacy degree. Leads to hospital, industry and drug-store licences. Check each college's admission notice.",
      hi: "फार्मेसी की डिग्री। अस्पताल, उद्योग और दवा दुकान के लाइसेंस का रास्ता। हर कॉलेज की प्रवेश सूचना ज़रूर देखें।"
    },
    years: { en: "4 years", hi: "4 वर्ष" },
    exams: []
  },
  {
    id: "bsc_bio",
    streams: ["pcb"],
    interests: ["health", "teach", "govt", "unsure"],
    name: { en: "B.Sc. (Biology group)", hi: "बी.एससी. (जीव विज्ञान समूह)" },
    what: {
      en: "Science degree with zoology, botany or chemistry. Leads to labs, teaching and government exams.",
      hi: "प्राणी विज्ञान, वनस्पति विज्ञान या रसायन के साथ विज्ञान की डिग्री। लैब, शिक्षण और सरकारी परीक्षाओं का रास्ता।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "bcom",
    streams: ["commerce", "arts"],
    interests: ["business", "govt", "unsure"],
    name: { en: "B.Com", hi: "बी.कॉम" },
    what: {
      en: "Commerce degree. Leads to accounts, banking, tax and business jobs.",
      hi: "वाणिज्य की डिग्री। लेखा, बैंकिंग, टैक्स और व्यापार की नौकरियों का रास्ता।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "ca",
    streams: ALL,
    interests: ["business"],
    name: { en: "Chartered Accountancy (CA Foundation)", hi: "चार्टर्ड अकाउंटेंसी (CA फाउंडेशन)" },
    what: {
      en: "Professional course run by ICAI. Can be done alongside a B.Com.",
      hi: "ICAI का प्रोफेशनल कोर्स। बी.कॉम के साथ-साथ भी किया जा सकता है।"
    },
    years: { en: "About 4 to 5 years", hi: "लगभग 4 से 5 वर्ष" },
    exams: ["ca"]
  },
  {
    id: "bba",
    streams: ALL,
    interests: ["business", "unsure"],
    name: { en: "BBA", hi: "बीबीए" },
    what: {
      en: "Business management degree. Leads to sales, operations and an MBA later.",
      hi: "व्यापार प्रबंधन की डिग्री। बिक्री, संचालन और आगे एमबीए का रास्ता।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "ba",
    streams: ALL,
    interests: ["govt", "teach", "unsure"],
    name: { en: "B.A.", hi: "बी.ए." },
    what: {
      en: "Arts degree. The most common base for UPSC, state PSC, SSC and teaching exams.",
      hi: "कला की डिग्री। यूपीएससी, राज्य लोक सेवा आयोग, एसएससी और शिक्षक परीक्षाओं का सबसे आम आधार।"
    },
    years: { en: "3 to 4 years", hi: "3 से 4 वर्ष" },
    exams: ["cuet"]
  },
  {
    id: "itep",
    streams: ALL,
    interests: ["teach"],
    name: { en: "Integrated B.A./B.Sc. B.Ed. (ITEP)", hi: "इंटीग्रेटेड बी.ए./बी.एससी. बी.एड. (ITEP)" },
    what: {
      en: "Four-year teacher education degree straight after Class 12.",
      hi: "कक्षा 12 के तुरंत बाद चार वर्ष की शिक्षक शिक्षा डिग्री।"
    },
    years: { en: "4 years", hi: "4 वर्ष" },
    exams: ["ncet"]
  },
  {
    id: "law",
    streams: ALL,
    interests: ["govt", "business"],
    name: { en: "B.A. LL.B. (5-year law)", hi: "बी.ए. एलएल.बी. (5 वर्षीय कानून)" },
    what: {
      en: "Law degree after Class 12. National law universities admit through CLAT; many state colleges admit on their own test or merit.",
      hi: "कक्षा 12 के बाद कानून की डिग्री। राष्ट्रीय विधि विश्वविद्यालय CLAT से प्रवेश देते हैं; कई राज्य कॉलेज अपनी परीक्षा या मेरिट से।"
    },
    years: { en: "5 years", hi: "5 वर्ष" },
    exams: ["clat"]
  },
  {
    id: "nda",
    streams: ALL,
    interests: ["govt"],
    name: { en: "NDA (Army, Navy, Air Force)", hi: "एनडीए (थल सेना, नौसेना, वायु सेना)" },
    what: {
      en: "Officer training after Class 12. The Army wing is open to all streams; Navy and Air Force need Physics, Chemistry and Maths.",
      hi: "कक्षा 12 के बाद अधिकारी प्रशिक्षण। थल सेना सभी संकायों के लिए खुली है; नौसेना और वायु सेना के लिए भौतिकी, रसायन और गणित ज़रूरी हैं।"
    },
    years: { en: "3 years of training", hi: "3 वर्ष का प्रशिक्षण" },
    exams: ["nda"]
  }
];

export const EXAMS: Record<string, Exam> = {
  cuet: {
    id: "cuet",
    name: { en: "CUET (UG)", hi: "CUET (UG)" },
    by: { en: "National Testing Agency", hi: "राष्ट्रीय परीक्षा एजेंसी (NTA)" },
    url: "https://cuet.nta.nic.in/",
    window: { en: "Usually registration in February to March, exam in May to June.", hi: "आमतौर पर पंजीकरण फरवरी से मार्च, परीक्षा मई से जून।" },
    open: false,
    thisYear: {
      en: "If you registered, the exam is still ahead. If not, state universities and many colleges admit on Class 12 merit: apply to them now.",
      hi: "अगर पंजीकरण किया है तो परीक्षा अभी बाकी है। नहीं किया तो राज्य विश्वविद्यालय और कई कॉलेज कक्षा 12 की मेरिट पर प्रवेश देते हैं: अभी वहाँ आवेदन करें।"
    }
  },
  jee: {
    id: "jee",
    name: { en: "JEE Main", hi: "JEE Main" },
    by: { en: "National Testing Agency", hi: "राष्ट्रीय परीक्षा एजेंसी (NTA)" },
    url: "https://jeemain.nta.nic.in/",
    window: { en: "Two sessions, usually January and April.", hi: "दो सत्र, आमतौर पर जनवरी और अप्रैल।" },
    open: false,
    thisYear: {
      en: "Closed for this year. If you have a JEE Main score, watch the UP state counselling (UPTAC) notice; otherwise plan for next January.",
      hi: "इस वर्ष के लिए बंद। JEE Main स्कोर है तो यूपी राज्य काउंसलिंग (UPTAC) की सूचना देखें; नहीं तो अगली जनवरी की तैयारी करें।"
    }
  },
  neet: {
    id: "neet",
    name: { en: "NEET (UG)", hi: "NEET (UG)" },
    by: { en: "National Testing Agency", hi: "राष्ट्रीय परीक्षा एजेंसी (NTA)" },
    url: "https://neet.nta.nic.in/",
    window: { en: "Usually one exam in early May, registration in February to March.", hi: "आमतौर पर मई की शुरुआत में एक परीक्षा, पंजीकरण फरवरी से मार्च।" },
    open: false,
    thisYear: {
      en: "Registration has usually closed by result day. If you registered, the exam is days away; if not, plan for next year.",
      hi: "रिजल्ट के दिन तक पंजीकरण आमतौर पर बंद हो चुका होता है। पंजीकरण किया है तो परीक्षा कुछ ही दिन दूर है; नहीं तो अगले वर्ष की योजना बनाएँ।"
    }
  },
  clat: {
    id: "clat",
    name: { en: "CLAT", hi: "CLAT" },
    by: { en: "Consortium of National Law Universities", hi: "राष्ट्रीय विधि विश्वविद्यालयों का संघ" },
    url: "https://consortiumofnlus.ac.in/",
    window: { en: "Usually held in December for admission the following year.", hi: "आमतौर पर दिसंबर में, अगले वर्ष के प्रवेश के लिए।" },
    open: false,
    thisYear: {
      en: "Closed for this year. State law colleges may still admit on their own test or merit.",
      hi: "इस वर्ष के लिए बंद। राज्य के लॉ कॉलेज अपनी परीक्षा या मेरिट से अभी भी प्रवेश दे सकते हैं।"
    }
  },
  ncet: {
    id: "ncet",
    name: { en: "NCET (for ITEP)", hi: "NCET (ITEP के लिए)" },
    by: { en: "National Testing Agency", hi: "राष्ट्रीय परीक्षा एजेंसी (NTA)" },
    url: "https://nta.ac.in/",
    window: { en: "Dates vary each year: check the NTA notice.", hi: "तिथियाँ हर वर्ष बदलती हैं: NTA की सूचना देखें।" },
    open: false,
    thisYear: {
      en: "Registration has often closed by result day: check the NTA notice today.",
      hi: "रिजल्ट के दिन तक पंजीकरण अक्सर बंद हो चुका होता है: आज ही NTA की सूचना देखें।"
    }
  },
  nda: {
    id: "nda",
    name: { en: "NDA and NA exam", hi: "एनडीए और एनए परीक्षा" },
    by: { en: "UPSC", hi: "संघ लोक सेवा आयोग (UPSC)" },
    url: "https://upsc.gov.in/",
    window: { en: "Twice a year, usually April and September.", hi: "वर्ष में दो बार, आमतौर पर अप्रैल और सितंबर।" },
    open: true,
    thisYear: {
      en: "Still possible: the second exam of the year (NDA II) usually opens for applications in May to June.",
      hi: "अभी संभव: वर्ष की दूसरी परीक्षा (NDA II) के आवेदन आमतौर पर मई से जून में खुलते हैं।"
    }
  },
  ca: {
    id: "ca",
    name: { en: "CA Foundation", hi: "CA फाउंडेशन" },
    by: { en: "ICAI", hi: "भारतीय चार्टर्ड अकाउंटेंट्स संस्थान (ICAI)" },
    url: "https://www.icai.org/",
    window: { en: "Held more than once a year; register with ICAI first.", hi: "वर्ष में एक से अधिक बार; पहले ICAI में पंजीकरण करें।" },
    open: true,
    thisYear: {
      en: "Still possible: register with ICAI now for a later attempt.",
      hi: "अभी संभव: बाद के प्रयास के लिए अभी ICAI में पंजीकरण करें।"
    }
  }
};

export interface Scholarship {
  id: string;
  name: Bi;
  rule: Bi;
  url: string;
  fits: (income: Income, marks: number) => boolean;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "up_postmatric",
    name: { en: "UP post-matric scholarship", hi: "यूपी पोस्ट-मैट्रिक छात्रवृत्ति" },
    rule: {
      en: "For UP residents. Family income below ₹2 lakh a year (General, OBC, minority) or below ₹2.5 lakh (SC, ST).",
      hi: "यूपी के निवासियों के लिए। परिवार की सालाना आय ₹2 लाख से कम (सामान्य, ओबीसी, अल्पसंख्यक) या ₹2.5 लाख से कम (एससी, एसटी)।"
    },
    url: "https://scholarship.up.gov.in/",
    fits: (income) => income === "upto2" || income === "upto25" || income === "skip"
  },
  {
    id: "csss",
    name: {
      en: "Central Sector Scheme of Scholarships (National Scholarship Portal)",
      hi: "केंद्रीय क्षेत्र छात्रवृत्ति योजना (राष्ट्रीय छात्रवृत्ति पोर्टल)"
    },
    rule: {
      en: "For students whose Class 12 marks are above the 80th percentile of their board's pass list in their stream, with family income up to ₹4.5 lakh, in a regular course. Published guides list ₹10,000 to ₹12,000 a year at graduation level, depending on the course.",
      hi: "उन छात्रों के लिए जिनके कक्षा 12 के अंक बोर्ड में अपने संकाय के उत्तीर्ण छात्रों के 80वें पर्सेंटाइल से ऊपर हों, परिवार की आय ₹4.5 लाख तक हो, और कोर्स नियमित हो। प्रकाशित गाइड के अनुसार स्नातक स्तर पर कोर्स के हिसाब से ₹10,000 से ₹12,000 सालाना।"
    },
    url: "https://scholarships.gov.in/",
    // The 80th-percentile cut-off is published per board and stream each year;
    // 75% is a conservative screen so the hint is not shown to clear misses.
    fits: (income, marks) => income !== "above45" && marks >= 75
  }
];

export interface College {
  id: string;
  name: Bi;
  kind: Bi;
  courses: string[];
  fee: number;
  km: number;
  recognition: Bi;
  paying: boolean;
}

// Fictional colleges, the same set placed in whichever district is chosen.
// "paying" marks colleges that pay per enquiry; it never changes the order.
export const DEMO_COLLEGES: College[] = [
  {
    id: "c1",
    name: { en: "Ganga Valley Degree College", hi: "गंगा वैली डिग्री कॉलेज" },
    kind: { en: "Government-aided", hi: "सरकारी सहायता प्राप्त" },
    courses: ["ba", "bcom", "bsc_pcm", "bsc_bio"],
    fee: 9000,
    km: 4,
    recognition: { en: "Affiliated to the state university", hi: "राज्य विश्वविद्यालय से संबद्ध" },
    paying: false
  },
  {
    id: "c2",
    name: { en: "Prerna Institute of Technology", hi: "प्रेरणा इंस्टीट्यूट ऑफ टेक्नोलॉजी" },
    kind: { en: "Private", hi: "निजी" },
    courses: ["btech", "bca", "bba", "bpharm"],
    fee: 92000,
    km: 11,
    recognition: { en: "AICTE approved, affiliated to the state technical university", hi: "AICTE से अनुमोदित, राज्य तकनीकी विश्वविद्यालय से संबद्ध" },
    paying: true
  },
  {
    id: "c3",
    name: { en: "Navjyoti Mahavidyalaya", hi: "नवज्योति महाविद्यालय" },
    kind: { en: "Private", hi: "निजी" },
    courses: ["ba", "bcom", "bba", "bca", "itep"],
    fee: 24000,
    km: 7,
    recognition: { en: "Affiliated to the state university; ITEP recognised by NCTE", hi: "राज्य विश्वविद्यालय से संबद्ध; ITEP को NCTE से मान्यता प्राप्त" },
    paying: true
  },
  {
    id: "c4",
    name: { en: "Abhyudaya Institute of Health Sciences", hi: "अभ्युदय इंस्टीट्यूट ऑफ हेल्थ साइंसेज" },
    kind: { en: "Private", hi: "निजी" },
    courses: ["bpharm", "bsc_bio"],
    fee: 140000,
    km: 18,
    recognition: { en: "Pharmacy Council of India approved", hi: "फार्मेसी काउंसिल ऑफ इंडिया से अनुमोदित" },
    paying: true
  },
  {
    id: "c5",
    name: { en: "Sankalp Law College", hi: "संकल्प लॉ कॉलेज" },
    kind: { en: "Private", hi: "निजी" },
    courses: ["law", "ba", "bba"],
    fee: 55000,
    km: 9,
    recognition: { en: "Bar Council of India approved", hi: "बार काउंसिल ऑफ इंडिया से अनुमोदित" },
    paying: false
  },
  {
    id: "c6",
    name: { en: "Rajkiya Mahavidyalaya (Government College)", hi: "राजकीय महाविद्यालय" },
    kind: { en: "Government", hi: "सरकारी" },
    courses: ["ba", "bsc_pcm", "bsc_bio", "bcom"],
    fee: 4500,
    km: 26,
    recognition: { en: "Affiliated to the state university", hi: "राज्य विश्वविद्यालय से संबद्ध" },
    paying: false
  }
];

// UGC "List of Fake Universities" as of February 2026: all 32 entries.
// Optional Hindi spellings are added for the UP entries.
export const UGC_FAKE: { name: string; place: string; state: string; hi?: string }[] = [
  { name: "Christ New Testament Deemed University", place: "Guntur", state: "Andhra Pradesh" },
  { name: "Bible Open University of India", place: "Visakhapatnam", state: "Andhra Pradesh" },
  { name: "Indian Institute of Alternative Medicine", place: "Itanagar", state: "Arunachal Pradesh" },
  { name: "Mountain Institute of Management and Technology", place: "New Delhi", state: "Delhi" },
  { name: "World Peace of United Nations University", place: "New Delhi", state: "Delhi" },
  { name: "Institute of Management and Engineering", place: "Delhi", state: "Delhi" },
  { name: "National Institute of Management Solution", place: "Delhi", state: "Delhi" },
  { name: "All India Institute of Public and Physical Health Sciences", place: "Delhi", state: "Delhi" },
  { name: "Commercial University", place: "Delhi", state: "Delhi" },
  { name: "United Nations University", place: "Delhi", state: "Delhi" },
  { name: "Vocational University", place: "Delhi", state: "Delhi" },
  { name: "ADR-Centric Juridical University", place: "New Delhi", state: "Delhi" },
  { name: "Indian Institute of Science and Engineering", place: "New Delhi", state: "Delhi" },
  { name: "Viswakarma Open University for Self-Employment", place: "Delhi", state: "Delhi" },
  { name: "Adhyatmik Vishwavidyalaya", place: "Delhi", state: "Delhi" },
  { name: "Magic and Art University", place: "Faridabad", state: "Haryana" },
  { name: "Daksha University", place: "Ranchi", state: "Jharkhand" },
  { name: "Global Human Peace University", place: "Bengaluru", state: "Karnataka" },
  { name: "Sarva Bharatiya Shiksha Peeth", place: "Tumkur", state: "Karnataka" },
  { name: "International Islamic University of Prophetic Medicine", place: "Kozhikode", state: "Kerala" },
  { name: "St. John's University", place: "Kishanattam", state: "Kerala" },
  { name: "Raja Arabic University", place: "Nagpur", state: "Maharashtra" },
  { name: "National Backward Krushi Vidyapeeth", place: "Solapur", state: "Maharashtra" },
  { name: "Usha Latchumanan College of Education", place: "Thirukkanur", state: "Puducherry" },
  { name: "Sree Bodhi Academy of Higher Education", place: "Puducherry", state: "Puducherry" },
  { name: "Rajeev Gandhi Institute of Technology and Management", place: "Bhiwadi", state: "Rajasthan" },
  { name: "Gandhi Hindi Vidyapith", place: "Prayagraj", state: "Uttar Pradesh", hi: "गांधी हिंदी विद्यापीठ" },
  { name: "Netaji Subhash Chandra Bose University (Open University)", place: "Aligarh", state: "Uttar Pradesh", hi: "नेताजी सुभाष चंद्र बोस विश्वविद्यालय" },
  { name: "Bhartiya Shiksha Parishad", place: "Lucknow", state: "Uttar Pradesh", hi: "भारतीय शिक्षा परिषद" },
  { name: "Mahamaya Technical University", place: "Noida", state: "Uttar Pradesh", hi: "महामाया टेक्निकल यूनिवर्सिटी" },
  { name: "Indian Institute of Alternative Medicine", place: "Kolkata", state: "West Bengal" },
  { name: "Institute of Alternative Medicine and Research", place: "Kolkata", state: "West Bengal" }
];

const GENERIC = new Set([
  "university", "universities", "vishwavidyalaya", "college", "institute", "institution", "open", "national", "india", "indian",
  "of", "and", "the", "for", "deemed", "academy", "education", "higher", "technical", "technology", "management", "school",
  "विश्वविद्यालय", "यूनिवर्सिटी", "कॉलेज", "महाविद्यालय", "संस्थान", "भारतीय", "राष्ट्रीय"
]);

export const normaliseName = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, " ")
    .replace(/\bvidyapeeth\b/g, "vidyapith")
    .replace(/\bbharatiya\b/g, "bhartiya")
    .replace(/\s+/g, " ")
    .trim();

const distinctive = (s: string) => normaliseName(s).split(" ").filter((w) => w.length > 1 && !GENERIC.has(w));

// A match needs the whole listed name inside the query, or a query whose
// distinctive words (at least two, ignoring words like "university") all
// appear in one listed name. Typing "university" alone never matches.
export function findFakeUniversity(query: string) {
  const q = normaliseName(query);
  const qWords = distinctive(query);
  if (q.length < 4) return null;
  for (const u of UGC_FAKE) {
    for (const nm of [u.name, u.hi].filter((x): x is string => Boolean(x))) {
      const n = normaliseName(nm);
      if (q.includes(n)) return u;
      const nWords = distinctive(nm);
      if (qWords.length >= 2 && qWords.every((w) => nWords.includes(w))) return u;
    }
  }
  return null;
}

export const SOURCES = {
  upBoard2025: "https://news.careers360.com/up-board-class-12th-result-2025-out-upmsp-edu-in-upresults-nic-in-81-15-percent-qualify-how-to-check-digilocker-scorecard/amp",
  upBoardIans: "https://ianslive.in/up-board-results-declared-9011-pc-pass-in-high-school-8115-pc-in-intermediate--20250425132203",
  upBoardReg: "https://results.amarujala.com/exam-alerts/up-board-exam-2025-27-4-lakh-candidates-registered-for-high-school-26-98-lakh-for-intermediate",
  aishe: "https://news.careers360.com/up-has-highest-number-of-colleges-in-country-followed-maharashtra-karnataka-aishe-report",
  tam2025: "https://www.storyboard18.com/advertising/education-sector-leads-print-advertising-with-17-percent-share-in-jan-sep-2025-tam-85352.htm",
  auno: "https://amarujalaolympiad.com/",
  amc: "https://foundation.amarujala.com/atul-maheshwari-chhatravritti-amc",
  stressFree: "https://www.inma.org/blogs/ideas/post.cfm/amar-ujala-supports-students-beyond-tests-with-stress-free-exam-programme",
  results: "https://results.amarujala.com/",
  ugcFake: "https://www.ugc.gov.in/universitydetails/HEIs_Violating_Regulations?tab=fakeuni",
  collegeDekhoFy25: "https://entrackr.com/fintrackr/collegedekho-posts-rs-151-cr-loss-in-fy25-revenue-remains-flat-11081103",
  collegeDekhoFy24: "https://inc42.com/buzz/collegedekhos-loss-flat-at-inr-129-cr-in-fy24",
  irs2019: "https://www.exchange4media.com/media-print-news/irs-2019-q4-top-publications-retain-lead-positions-104521.html",
  dpdpRules: "https://www.amsshardul.com/wp-content/uploads/2025/11/Regulatory-Alert-Enforcement-of-DPDP-Act-and-Notification-of-DPDP-Rules.pdf",
  dpdpChildren: "https://cyberpeace.org/resources/blogs/prohibition-of-behavioral-tracking-and-targeted-advertising-for-children-under-the-dpdp-act-2023",
  upScholarship: "https://scholarship.up.gov.in/",
  nsp: "https://scholarships.gov.in/"
};
