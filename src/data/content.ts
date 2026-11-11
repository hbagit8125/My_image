// Single source of truth for everything shown on the site.
// Edit this file to update text; no component changes needed.

export const profile = {
  name: "Hashir Bin Anwer",
  shortName: "Hashir",
  initials: "HB",
  role: "Machine Learning Engineer",
  company: "Tigmaminds",
  location: "Trivandrum, Kerala, India",
  // Shown one at a time by the typing effect in the hero
  roles: [
    "Machine Learning Engineer",
    "LLM Fine-tuner",
    "Frontend Developer",
    "Data Science Student",
  ],
  tagline:
    "Engineer at the intersection of machine learning and modern web development.",
  email: "hashirpanwer@gmail.com",
  phone: "+91 92077 81402",
  phoneHref: "tel:+919207781402",
  linkedin: "https://www.linkedin.com/in/hashir-anwer",
  github: "https://github.com/hbagit8125",
  resume: "/Hashir_Bin_Anwer_Resume.pdf",
  about: [
    "I'm a Machine Learning Engineer based in Trivandrum who likes working on both sides of an AI product: the models, and the interfaces people use to reach them.",
    "I enjoy taking an idea from a notebook to something real people use. That means training and fine-tuning models, wrapping them in fast APIs, and building clean, responsive front ends around them. I care about work that holds up in production, not just in a demo.",
    "I'm also a student for life. Alongside my job I'm pursuing a BSc in Data Science and Applications at IIT Madras, and I like passing on what I learn, whether through mentoring, organising events or writing.",
  ],
};

export type SkillGroup = { title: string; blurb: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Generative AI and LLMs",
    blurb: "Adapting language models to a domain and serving them.",
    items: [
      "Fine-tuning (LLaMA 3.1, Mistral, BERT variants)",
      "Prompt engineering",
      "RAG",
      "Vector databases (Milvus)",
      "NLP and Transformers",
      "NER",
      "Text classification",
    ],
  },
  {
    title: "Machine learning and data science",
    blurb: "Training, evaluating and comparing models.",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face Transformers",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
    ],
  },
  {
    title: "Web development",
    blurb: "Interfaces and APIs around the models.",
    items: ["React", "TypeScript", "JavaScript", "FastAPI", "Flask"],
  },
  {
    title: "Languages",
    blurb: "What I write day to day.",
    items: ["Python", "JavaScript", "SQL"],
  },
  {
    title: "Databases",
    blurb: "Document, relational and vector stores.",
    items: ["MongoDB", "MySQL", "Milvus"],
  },
  {
    title: "Cloud and tooling",
    blurb: "Shipping and collaborating.",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Azure DevOps",
      "Microsoft Azure",
      "Google Colab",
    ],
  },
];

export const softSkills = [
  "Teamwork",
  "Leadership",
  "Mentoring",
  "Cross-functional collaboration",
  "Adaptability",
  "Presentation",
  "Continuous learning",
];

export type WorkStream = {
  id: string;
  name: string;
  summary: string;
  stack: string[];
  points: string[];
};

export type Job = {
  role: string;
  company: string;
  location: string;
  period: string;
  intro: string;
  streams: WorkStream[];
  closing?: string[];
};

export const experience: Job[] = [
  {
    role: "Machine Learning Engineer",
    company: "Tigmaminds Pvt. Ltd.",
    location: "Kazhakuttam, Trivandrum",
    period: "July 2024 – Present",
    intro:
      "Contributed to three major projects: Physician Co-pilot, Billing Codes Generation, and XORAI, an AI-native integration and orchestration platform. Worked closely with medical coders and ML developers to build production-ready, scalable healthcare ML solutions.",
    streams: [
      {
        id: "xorai",
        name: "XORAI",
        summary:
          "React and TypeScript frontend of an AI-native integration and orchestration platform.",
        stack: ["React", "TypeScript", "OAuth", "JWT", "HMAC"],
        points: [
          "Built and maintained the React/TypeScript frontend across features, UI enhancements and bug fixes.",
          "Built reusable component libraries (JSON Editor/Viewer, authentication forms, Smart Input Tag, Expand Editor) that improved UI consistency and reduced code duplication across the platform.",
          "Integrated 9+ datasources (Snowflake, Salesforce, AWS S3, SFTP, MySQL, Oracle, MSSQL, MongoDB, PostgreSQL) and authentication flows (OAuth, JWT, HMAC, Basic) with backend APIs, including vault-based credential handling and field-level validation.",
          "Owned the frontend of the Promotions feature for moving pipelines between environments end to end: review, flow and dependency diff, bulk promotions, external environment handling and role-based access.",
          "Led refactoring of connection and authentication forms and migrated key APIs (Execution Summary, Cache) to a new service, improving scalability and performance.",
          "Resolved UI and functional issues through close collaboration with QA, and continue to work on platform enhancements and new features.",
        ],
      },
      {
        id: "copilot",
        name: "Physician Co-pilot",
        summary: "An assistant for physicians, backed by fine-tuned LLMs.",
        stack: ["React", "LLM APIs", "Docker"],
        points: [
          "Designed and developed the complete frontend module using React.",
          "Wrapped fine-tuned LLMs into lightweight APIs and integrated them with the React frontend for smooth, scalable performance.",
          "Gained hands-on experience in API optimization, Docker-based LLM deployment, database management and server-side performance tuning.",
        ],
      },
      {
        id: "billing",
        name: "Billing Codes Generation",
        summary:
          "Turning medical charts into billing codes with vision and language models.",
        stack: ["Mistral V2", "YOLO11", "Fine-tuning", "Docker"],
        points: [
          "Chart processing: fine-tuned the Mistral V2 model for billing code generation, releasing two improved versions with better accuracy and stability.",
          "Chart segregation: worked on API wrapping, optimization and server deployment for large models like YOLO11.",
          "Collaborated closely with medical coders to validate outputs and shape production-ready behaviour.",
        ],
      },
    ],
  },
  {
    role: "Artificial Intelligence Intern",
    company: "Corizo EdTech",
    location: "Bangalore (online)",
    period: "Sep 2021 – Nov 2021",
    intro:
      "A three-month online internship in Artificial Intelligence covering machine learning and deep learning, with a minor and a major project.",
    streams: [
      {
        id: "spotify",
        name: "Minor project",
        summary: "Spotify genre segmentation",
        stack: ["K-Means", "Python", "Visualization"],
        points: [
          "Built a Spotify genre segmentation system using the K-Means clustering algorithm on Spotify data.",
          "Performed detailed analysis using a range of visualization techniques.",
        ],
      },
      {
        id: "cardio",
        name: "Major project",
        summary: "Cardiovascular disease prediction",
        stack: ["Logistic Regression", "SVM", "Random Forest"],
        points: [
          "Implemented a cardiovascular disease prediction system using patient clinical data.",
          "Conducted exploratory data analysis and trained multiple models, including Logistic Regression, SVM and Random Forest, then compared performance across metrics.",
        ],
      },
    ],
  },
];

export const education = [
  {
    degree: "BSc in Data Science and Applications",
    school: "Indian Institute of Technology Madras",
    period: "May 2021 – Present",
    note: "Foundation Level completed in May 2023. Currently pursuing the Diploma in Data Science and the Diploma in Programming.",
  },
  {
    degree: "B.Tech in Artificial Intelligence and Machine Learning",
    school: "Sree Chitra Thirunal College of Engineering, Trivandrum",
    period: "Nov 2020 – 2024",
    note: "Execom Head of the AIML Students Association and GPod Manager at GDSC SCTCE.",
  },
];

export type ProjectCategory = "Deep learning" | "Machine learning" | "Web" | "Mobile";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  categories: ProjectCategory[];
  context: string;
  summary: string;
  points: string[];
  stack: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    slug: "fake-logo-detection",
    title: "Fake Logo Detection",
    subtitle: "Reverse image search for logo authenticity",
    categories: ["Deep learning", "Web"],
    context: "B.Tech project",
    summary:
      "A web application that checks whether a logo is original by searching for visually similar logos.",
    points: [
      "Developed a reverse image search web application for detecting plagiarized logos, so designers and influencers can verify the authenticity and uniqueness of a logo.",
      "Implemented a VGG16 image similarity model to compare uploaded logos against a dataset and show the top matches with similarity scores.",
      "Trained on more than 1 lakh logos from the Large Logo Dataset (LLD), returning the top 5 similar logos for each query.",
      "Built the web application with Flask and React.",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "Keras",
      "VGG16",
      "Scikit-learn",
      "PIL",
      "Pandas",
      "NumPy",
      "Flask",
      "React",
    ],
  },
  {
    slug: "intrusion-detection-system",
    title: "Intrusion Detection System",
    subtitle: "Classifying network attacks from traffic data",
    categories: ["Machine learning"],
    context: "B.Tech project",
    summary:
      "A system that detects and classifies intrusions in a network from captured traffic.",
    points: [
      "Developed an intrusion detection system using machine learning to identify and classify emerging network attacks and threats.",
      "Built a network environment in Kali Linux and simulated different attacks using Metasploit, collecting live traffic with and without attacks using Wireshark.",
      "Pre-processed, extracted features from and labelled the data, then trained Random Forest, Gradient Boosting and SVM models.",
      "Wrapped the best model in a Flask and Tkinter module that takes a network traffic CSV file and predicts the type of attack.",
    ],
    stack: [
      "Python",
      "TensorFlow",
      "Keras",
      "Pandas",
      "NumPy",
      "VirtualBox",
      "Metasploit",
      "Wireshark",
      "Tkinter",
      "Flask",
    ],
  },
  {
    slug: "peerpack",
    title: "PeerPack",
    subtitle: "Travelers as courier partners",
    categories: ["Mobile"],
    context: "Hackout 2023, IIT Madras",
    summary:
      "A Flutter mobile app that connects travelers as courier partners for faster, cheaper deliveries.",
    points: [
      "Presented PeerPack at Hackout 2023 at IIT Madras.",
      "Developed the overall frontend flow in Flutter.",
      "Showcased a functional prototype during the hackathon.",
    ],
    stack: ["Flutter", "Dart"],
  },
  {
    slug: "trekking-management-v2",
    title: "Trekking Management Application V2",
    subtitle: "Modern Application Development 2",
    categories: ["Web"],
    context: "IIT Madras course project",
    summary:
      "The second version of the trekking management application, built for the Modern Application Development 2 course.",
    points: [
      "Built as the course project for Modern Application Development 2 in the IIT Madras BSc programme.",
      "Extends the first version of the application.",
    ],
    stack: ["Python", "Flask", "JavaScript"],
  },
  {
    slug: "trekking-management",
    title: "Trekking Management Application",
    subtitle: "Modern Application Development 1",
    categories: ["Web"],
    context: "IIT Madras course project",
    summary:
      "A web application for managing treks, built for the Modern Application Development 1 course.",
    points: [
      "Built as the course project for Modern Application Development 1 in the IIT Madras BSc programme.",
      "Developed with Flask.",
    ],
    stack: ["Python", "Flask"],
  },
  {
    slug: "cardiovascular-disease-prediction",
    title: "Cardiovascular Disease Prediction",
    subtitle: "Comparing classifiers on clinical data",
    categories: ["Machine learning"],
    context: "Corizo internship, major project",
    summary:
      "A prediction system for cardiovascular disease trained on patient clinical data.",
    points: [
      "Conducted exploratory data analysis on patient clinical data.",
      "Trained Logistic Regression, SVM and Random Forest models.",
      "Compared model performance across metrics.",
    ],
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
  },
  {
    slug: "spotify-genre-segmentation",
    title: "Spotify Genre Segmentation",
    subtitle: "Clustering tracks with K-Means",
    categories: ["Machine learning"],
    context: "Corizo internship, minor project",
    summary:
      "A genre segmentation system that clusters Spotify tracks using K-Means.",
    points: [
      "Applied the K-Means clustering algorithm to Spotify data.",
      "Analysed the results using a range of visualization techniques.",
    ],
    stack: ["Python", "K-Means", "Pandas", "Matplotlib"],
  },
];

export const certifications = [
  {
    title: "Foundation Level Certificate in Programming and Data Science",
    issuer: "IIT Madras",
    date: "May 2023",
    detail:
      "Completed the Foundation Level of the BSc in Data Science and Applications. Currently pursuing the Diploma in Data Science and the Diploma in Programming.",
  },
  {
    title: "Artificial Intelligence Internship",
    issuer: "Corizo EdTech",
    date: "Nov 2021",
    detail:
      "Three-month programme in machine learning and deep learning with a minor and a major project.",
  },
];

export const leadership = [
  {
    title: "Execom Head",
    org: "AIML Students Association, SCTCE",
    period: "May 2021 – May 2023",
    detail:
      "Led the program coordination team and organized workshops, seminars and technical events.",
  },
  {
    title: "GPod Manager",
    org: "Google Developer Students Club (GDSC SCTCE)",
    period: "May 2021 – May 2022",
    detail:
      "Launched and managed a podcast under GDSC SCTCE, overseeing both content creation and team management.",
  },
];

export const hackathons = [
  {
    title: "Hackout 2023",
    org: "IIT Madras",
    period: "2023",
    detail:
      "Presented PeerPack, a Flutter-based mobile application that connects travelers as courier partners to enable faster and cost-effective deliveries. Developed the overall frontend flow and showcased the functional prototype.",
  },
];

export const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];
