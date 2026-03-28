/**
 * Seed script — populates the `service_details` Firestore collection
 * with all service detail-page content.
 *
 * Usage:
 *   node scripts/seedServiceDetails.js
 *
 * Each document stores the full content for one service detail page.
 * The `slug` field is used to query the correct document at render time.
 *
 * You can re-run this script safely — it will ADD new docs each time,
 * so clear the collection first if you want a clean reset.
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyDH9Uq_J3JB76kVcUSS0B4U0n5BJVxJUIo",
  authDomain: "zweidevs-c4c1e.firebaseapp.com",
  projectId: "zweidevs-c4c1e",
  storageBucket: "zweidevs-c4c1e.firebasestorage.app",
  messagingSenderId: "311584074742",
  appId: "1:311584074742:web:e6c0403c87610f5be3f5d7",
  measurementId: "G-CPL1X00ZR0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ──────────────────────────────────────────
   SERVICE DATA — one object per service
   ────────────────────────────────────────── */

const services = [
  /* ── 1. Web Development ────────────────── */
  {
    slug: "web-development",
    category: "Web Development",
    heroTitle: "Elevate Your Online Presence",
    heroSub:
      "Transform your ideas into reality with our exceptional web app development services. Our seasoned team crafts tailored solutions that seamlessly blend innovation and functionality.",
    heading: "Custom Web Applications and Dedicated Support for Your Success!",
    description:
      "Our mission is to empower your business with the latest technologies and the best user experience. We create custom web applications that digitize your internal processes and ensure seamless operations. With free maintenance, support services, and automated deployments, we are committed to helping you achieve your goals.\n\nAt Zweidevs, your success is our mission. We're not just developers; we're your partners in the digital realm.",
    // heroImage is resolved client-side from a local map
    heroImageKey: "web-development",
    offerings: [
      {
        iconKey: "designIcon",
        title: "Experience Design",
        desc: "Zweidevs' careful attention to experience design will improve user interactions. We map user journeys delicately, making sure every touchpoint is enjoyable in addition to being practical.",
      },
      {
        iconKey: "frontendIcon",
        title: "Frontend Development",
        desc: "Zweidevs' full-stack front-end expertise can help you discover innovation. Our developers combine creativity and technological proficiency to create user-friendly interfaces and responsive solutions.",
      },
      {
        iconKey: "backendIcon",
        title: "Backend Development",
        desc: "Our back-end solutions can help you build a strong digital foundation. Our development team creates adaptable and scalable structures, maximizing performance and guaranteeing a smooth front-end integration.",
      },
      {
        iconKey: "fullstackIcon",
        title: "Full Stack Development",
        desc: "Take advantage of Zweidevs' full-stack development services for end-to-end excellence. Our team links front-end and back-end technologies smoothly, from conception to deployment.",
      },
      {
        iconKey: "ecommerceIcon",
        title: "Maintenance and Update",
        desc: "Beyond bug patches, our maintenance and update services include exciting new features and performance improvements. With our continued assistance, you can keep your app at the forefront of innovation.",
      },
    ],
    projects: [
      {
        imageKey: "Web1",
        title: "Cyber Legends",
        desc: "Ed-Tech and Gaming platform offering online cyber security learning services.",
      },
      {
        imageKey: "Web2",
        title: "Edcite",
        desc: "Revolutionizing K-12 education with an intuitive platform for interactive lessons.",
      },
      {
        imageKey: "Web3",
        title: "Officer Survey",
        desc: "Fostering safer societies through a technology-driven community forum.",
      },
      {
        imageKey: "Web4",
        title: "Blockcircle",
        desc: "Competitive data and dynamic investing analytics for the cryptocurrency market.",
      },
      {
        imageKey: "Web5",
        title: "Avail Medical",
        desc: "Accessible website for traditional and marijuana-based prescriptions in Canada.",
      },
      {
        imageKey: "Web6",
        title: "Isynced",
        desc: "The market's most affordable copy trading solution, optimizing earnings.",
      },
      {
        imageKey: "Web7",
        title: "Public Trust",
        desc: "Full-service real estate, handling residential and commercial transactions nationwide.",
      },
      {
        imageKey: "Web8",
        title: "Fresh Track",
        desc: "Personalized travel itineraries showcasing Canada's breathtaking scenery.",
      },
      {
        imageKey: "Web9",
        title: "Humanava",
        desc: "Personal development courses embracing leadership, diversity, and mindfulness.",
      },
      {
        imageKey: "Web10",
        title: "LinkTree",
        desc: "Consolidate all aspects of your online presence into a conversion-focused page.",
      },
      {
        imageKey: "Web11",
        title: "Venue Genie",
        desc: "Event booking with over 360 locations, catering, and DJ packages.",
      },
    ],
    process: {
      title: "How We Develop Web Applications",
      desc: "Zweidevs manages every stage of the project lifecycle while providing full services for developing web applications.",
      steps: [
        {
          title: "Discovery",
          desc: "We explore the project's concept and define core requirements through in-depth discussions about intended functionality.",
        },
        {
          title: "Design",
          desc: "Our design team creates interactive prototypes and wireframes, prioritizing elegant and sophisticated web design.",
        },
        {
          title: "Development",
          desc: "We adopt Agile methodology, breaking development into manageable sprints — plan, develop, test, document, and release.",
        },
        {
          title: "Release",
          desc: "Quality assurance engineers thoroughly test every feature both manually and automatically before deploying to production.",
        },
        {
          title: "Support",
          desc: "We build software solutions that continuously deliver expected results with post-launch maintenance and support.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Web Applications For",
      desc: "At Zweidevs, we specialize in creating custom online apps carefully designed to match the distinct requirements of companies of all sizes.",
      cards: [
        {
          title: "Startups",
          desc: "Cost-effective, scalable solutions that enable startups to build a strong online presence.",
        },
        {
          title: "Medium Businesses",
          desc: "Solutions that work in unison with mid-sized businesses' complex issues and expansion goals.",
        },
        {
          title: "Large Businesses",
          desc: "Custom web apps that smoothly interface with the complex operations of large companies.",
        },
      ],
    },
    techStack: [
      { group: "Front-end", chips: ["Javascript", "React", "Angular", "Vue"] },
      {
        group: "Back-end",
        chips: [
          "Ruby on Rails",
          "Node.js",
          "Python",
          "PHP",
          "Next JS",
          "Nest JS",
        ],
      },
    ],
    faq: [
      {
        q: "How much does web app development cost?",
        a: "The cost is influenced by complexity, features, technology stack, team experience, and other factors. Connect with our web developers for an exact estimate.",
      },
      {
        q: "What is web app development, and how can it benefit my business?",
        a: "Developing software applications that run on web browsers, offering adaptable and affordable options with cross-platform compatibility.",
      },
      {
        q: "How long does it take to develop a web application?",
        a: "A simple web app might take a few weeks to a couple of months, while more complex applications could take several months or even a year.",
      },
      {
        q: "Why choose Zweidevs for web application development?",
        a: "We craft reliable, approachable solutions that add value and demonstrate our commitment to quality and client happiness.",
      },
      {
        q: "How do you ensure the security of web applications?",
        a: "Through frequent audits, comprehensive code reviews, encryption, least privilege principle, and strong authentication.",
      },
      {
        q: "Do you provide ongoing maintenance after launch?",
        a: "Yes, we provide thorough maintenance services including bug repairs, updates, and optimizations.",
      },
    ],
    order: 1,
  },

  /* ── 2. Blockchain Development ─────────── */
  {
    slug: "blockchain-development",
    category: "Blockchain Development",
    heroTitle: "Revolutionize Your Future with Blockchain",
    heroSub:
      "With a focus on innovative uses, we use blockchain technology to reshape markets and establish new benchmarks for openness and trust.",
    heading:
      "Transparent and Decentralized Solutions with Blockchain Development",
    description:
      "Our blockchain application development team specializes in developing unique solutions that smoothly incorporate blockchain technology into your company while maintaining efficiency, security, and transparency.\n\nWhether you're managing the intricacies of healthcare, banking, logistics, or other fields, our blockchain knowledge gives your company the edge it needs to succeed.",
    heroImageKey: "blockchain-development",
    offerings: [
      {
        iconKey: "bc1Icon",
        title: "Enhanced Security",
        desc: "Our experience will strengthen your operations, guaranteeing data integrity and resistance to changing threats.",
      },
      {
        iconKey: "bc2Icon",
        title: "Greater Transparency",
        desc: "Our blockchain solutions guarantee confidence and accountability in every transaction by offering a decentralized, secure ledger.",
      },
      {
        iconKey: "bc3Icon",
        title: "Automation",
        desc: "Experience workflows that are more efficient because our solutions optimize and automate tasks, requiring less manual intervention.",
      },
      {
        iconKey: "bc4Icon",
        title: "Instant Traceability",
        desc: "Real-time traceability enabling you to monitor each stage of your workflow with an unchangeable record.",
      },
      {
        iconKey: "bc5Icon",
        title: "Increased Efficiency",
        desc: "Gain more productivity as blockchain technology automates tedious chores and streamlines procedures.",
      },
    ],
    projects: [
      {
        imageKey: "bc1Proj",
        title: "FinancePro",
        desc: "Blockchain applications for cryptocurrency finance simplifying financial transactions.",
      },
      {
        imageKey: "bc2Proj",
        title: "MimoBlock",
        desc: "Decentralized exchange platform doing away with middlemen for peer-to-peer transactions.",
      },
      {
        imageKey: "Web4",
        title: "Blockcircle",
        desc: "Competitive data, proprietary tools, and dynamic investing analytics for crypto markets.",
      },
    ],
    process: {
      title: "Blockchain Solutions Lifecycle",
      desc: "",
      steps: [
        {
          title: "Experience and Design",
          desc: "We create cutting-edge blockchain solutions specific to your requirements with our wealth of experience.",
        },
        {
          title: "Enterprise Blockchain",
          desc: "We streamline your business processes with enterprise blockchain solutions that improve security and transparency.",
        },
        {
          title: "Blockchain Deployment",
          desc: "Effective deployment of blockchain solutions customized to your specific needs, prioritizing security and scalability.",
        },
        {
          title: "Blockchain Maintenance",
          desc: "Ongoing maintenance including frequent upgrades, security improvements, and bug fixes.",
        },
        {
          title: "Migration and Upgrades",
          desc: "Seamless migrations guaranteeing data integrity and zero interruptions when upgrading systems.",
        },
        {
          title: "Custom Blockchain Development",
          desc: "Custom blockchain app development matched to your business needs exactly.",
        },
      ],
    },
    audience: {
      title: "We Develop Blockchains For",
      desc: "Professional development services for businesses of all sizes to harness the power of blockchain technology.",
      cards: [
        {
          title: "Startups",
          desc: "Custom blockchain solutions that empower your startup's growth with security and effectiveness.",
        },
        {
          title: "Medium Businesses",
          desc: "Blockchain solutions customized for your mid-size business, whether in manufacturing, healthcare, or finance.",
        },
        {
          title: "Large Businesses",
          desc: "Scalable, secure, and innovative blockchain apps essential to the growth of large companies.",
        },
      ],
    },
    techStack: [
      {
        group: "Blockchain",
        chips: ["Solana", "Ethereum", "Cardano", "Avalanche"],
      },
    ],
    faq: [
      {
        q: "How much does Blockchain development cost?",
        a: "The cost varies by several thousand dollars among various industries, influenced by complexity and pricing methods.",
      },
      {
        q: "What is Blockchain development?",
        a: "Technology using a network of computers to create a distributed, decentralized ledger to record transactional data transparently and securely.",
      },
      {
        q: "How long does it take to develop a Solana Blockchain application?",
        a: "Simple applications may take a few weeks, while complex projects with smart contracts may take many months.",
      },
      {
        q: "Why choose Zweidevs for Blockchain development?",
        a: "We specialize in tailored blockchain solutions with a wealth of experience and a track record of successful projects.",
      },
    ],
    order: 2,
  },

  /* ── 3. Mobile App Development ─────────── */
  {
    slug: "mobile-development",
    category: "Mobile App Development",
    heroTitle: "Crafted for Excellence",
    heroSub:
      "Zweidevs is your go-to mobile app developer agency, providing tailored mobile app development services to precisely match your company's needs.",
    heading: "Experience The Best Intuitive UI and Responsive Design",
    description:
      "Enter a world of first-rate digital experiences by visiting our Mobile App Development Hub.\n\nDiscover the best user-friendly interface and responsive design, meticulously crafted for seamless interaction. We guarantee not just cost-effective solutions but a commitment to quality that reflects in every pixel.",
    heroImageKey: "mobile-development",
    offerings: [
      {
        iconKey: "hybirdMoboIcon",
        title: "Hybrid Mobile App Development",
        desc: "Zweidevs excels in hybrid app development, ensuring a seamless user experience across diverse devices.",
      },
      {
        iconKey: "mobo2Icon",
        title: "Native Mobile App Development",
        desc: "Optimal performance tailored for both iOS and Android platforms, ensuring a superior user interface.",
      },
      {
        iconKey: "mobo3Icon",
        title: "Wearables and Embedded Software",
        desc: "Cutting-edge software for smartwatches, fitness trackers, and other wearable devices.",
      },
    ],
    projects: [
      {
        imageKey: "Mobo1",
        title: "Neverleft",
        desc: "Efficient venue operations management with data analytics and digital cloakroom ticketing.",
      },
      {
        imageKey: "Mobo2",
        title: "You Salon",
        desc: "Online salon booking with ratings, popularity data, and track record history.",
      },
      {
        imageKey: "Mobo3",
        title: "Hooked Health",
        desc: "Fitness and mindset training created just for women to achieve metabolic advantage.",
      },
      {
        imageKey: "Mobo4",
        title: "AudioCardio",
        desc: "Evidence-based mobile app providing inaudible sound therapy for hearing improvement.",
      },
    ],
    process: {
      title: "How We Develop Mobile Applications",
      desc: "Zweidevs takes you through every step of your mobile app development journey with a full suite of custom-tailored services.",
      steps: [
        {
          title: "Discovery",
          desc: "We explore your app's concept, define core requirements, and evaluate the viability of your investment.",
        },
        {
          title: "Design",
          desc: "Interactive prototypes, Figma designs and wireframes prioritizing user flow and visual appeal.",
        },
        {
          title: "Development",
          desc: "Agile methodology with iterative sprints — plan, develop, test, and document with user-friendliness as main focus.",
        },
        {
          title: "Release",
          desc: "Thorough manual and automated testing to guarantee flawless operation before deployment.",
        },
        {
          title: "Support & Maintenance",
          desc: "3 months free post-launch maintenance designed to keep your app performing at its best.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Mobile Applications For",
      desc: "Custom mobile applications suited to the distinct requirements of companies of all sizes.",
      cards: [
        {
          title: "Startups",
          desc: "Scalable, cost-effective mobile solutions enabling startups to thrive in the digital environment.",
        },
        {
          title: "Medium Businesses",
          desc: "Solutions addressing complex difficulties and expansion goals of medium-sized companies.",
        },
        {
          title: "Large Businesses",
          desc: "Custom mobile apps working in unison with complex processes of big businesses.",
        },
      ],
    },
    techStack: [
      {
        group: "Mobile",
        chips: ["iOS", "Kotlin", "Dart", "React Native", "Ionic"],
      },
    ],
    faq: [
      {
        q: "How much does mobile app development cost?",
        a: "Influenced by complexity, features, technology stack, and team experience. Connect with our developers for exact estimation.",
      },
      {
        q: "How long does it take to develop a mobile application?",
        a: "A simple app takes weeks to months; complex enterprise-level applications could take several months or a year.",
      },
      {
        q: "What are the differences between native and hybrid development?",
        a: "Native provides high performance with platform-specific features; hybrid uses a single codebase for multiple platforms with faster development.",
      },
      {
        q: "Do you provide maintenance after launch?",
        a: "Yes, we offer 3 months of free maintenance services including bug repairs, updates, and optimizations.",
      },
    ],
    order: 3,
  },

  /* ── 4. UI/UX Design ───────────────────── */
  {
    slug: "ui-ux-design",
    category: "UI/UX Design",
    heroTitle: "Top UI/UX Design Services",
    heroSub:
      "Transform your brand's impact with our UI/UX development services, creating the ultimate interface experience for your customers.",
    heading: "Elevate Your Digital Journey with Zweidevs UI/UX Design",
    description:
      "Start your digital adventure hand-in-hand with Zweidevs, the leading UI/UX Design and Development Services agency.\n\nWe're dedicated to crafting experiences that resonate with you. At Zweidevs, your satisfaction isn't just a checkbox; it's the heartbeat of our design philosophy.",
    heroImageKey: "ui-ux-design",
    offerings: [
      {
        iconKey: "uiux1Icon",
        title: "Complimentary UI/UX for Websites",
        desc: "Free UI/UX design services including Figma, wireframes, and userflows for website development projects.",
      },
      {
        iconKey: "uiux2Icon",
        title: "Personalized Design Solutions",
        desc: "Aesthetic designs tailored to your unique brand identity and goals.",
      },
      {
        iconKey: "uiux3Icon",
        title: "Comprehensive Userflows",
        desc: "Meticulously crafted userflows ensuring an intuitive and engaging user experience.",
      },
      {
        iconKey: "uiux4Icon",
        title: "Dynamic Figma Designs",
        desc: "Visually stunning Figma designs that bring your ideas to life.",
      },
      {
        iconKey: "uiux5Icon",
        title: "Expert Consulting",
        desc: "UX/UI expertise for insightful consulting, guiding strategic decisions to optimize user experiences.",
      },
    ],
    projects: [
      {
        imageKey: "UiUX1",
        title: "Paket Taxi",
        desc: "Distribution and transportation services for various products, from restaurant orders to e-commerce deliveries.",
      },
      {
        imageKey: "UiUX2",
        title: "Seatedapp",
        desc: "Revolutionizes dining out, offering users a fulfilling experience with points across diverse restaurants.",
      },
      {
        imageKey: "Web9",
        title: "Humanava",
        desc: "Personal development courses embracing leadership, diversity, and mindfulness.",
      },
      {
        imageKey: "UiUX4",
        title: "CryptoLinx",
        desc: "Simplifies cryptocurrency marketing by integrating announcements into a URL for streamlined communication.",
      },
    ],
    process: {
      title: "How We Craft Memorable UI/UX Designs",
      desc: "Embark on a personalized UI/UX journey with Zweidevs, where every step is tailored to your vision.",
      steps: [
        {
          title: "Discovery",
          desc: "Collaborative conversation understanding your goals and gathering insights.",
        },
        {
          title: "Data-Driven Insights",
          desc: "Leveraging data-driven design thinking to align with your audience's expectations.",
        },
        {
          title: "User-Centric Mapping",
          desc: "Charting the course for intuitive user journeys, mapping entry points, steps, and interactions.",
        },
        {
          title: "Wireframing Magic",
          desc: "Figma wireframes ensuring clarity and simplicity, guiding users effortlessly through each screen.",
        },
        {
          title: "Unified Design System",
          desc: "Meticulous design system of colors, patterns, and fonts maintaining consistency and scalability.",
        },
        {
          title: "UI Testing",
          desc: "Rigorous testing of visual and structural aspects using manual and automated tests for a flawless UI.",
        },
      ],
    },
    audience: {
      title: "UI/UX Design Services For Every Business",
      desc: "",
      cards: [
        {
          title: "Small Business Solutions",
          desc: "Agile, cost-effective, and growth-oriented UI/UX design services for small businesses.",
        },
        {
          title: "Medium-Sized Excellence",
          desc: "Tailored solutions striking the balance between scalability and efficiency.",
        },
        {
          title: "Enterprise-Grade Innovation",
          desc: "Solutions engineered to align seamlessly with the complex needs of large businesses.",
        },
      ],
    },
    techStack: [
      {
        group: "UI/UX Design",
        chips: ["Figma", "Canva", "Adobe XD", "InVision"],
      },
    ],
    faq: [
      {
        q: "What if I skip the UI/UX designing step?",
        a: "You risk creating a product that may not resonate with your target audience, resulting in lower user satisfaction and increased bounce rates.",
      },
      {
        q: "Does a UI/UX designer cost a lot?",
        a: "For website projects, we provide complimentary UI/UX design services including Figma, wireframes, and user flows.",
      },
      {
        q: "How do UI/UX design services help businesses?",
        a: "They enhance user satisfaction, engagement, and overall business success by optimizing user experiences.",
      },
      {
        q: "How to choose the right UX/UI design company?",
        a: "Look for relevant experience, check client reviews, explore case studies, and assess their approach to delivering user experience design.",
      },
    ],
    order: 4,
  },

  /* ── 5. Game Development ───────────────── */
  {
    slug: "game-development",
    category: "Game Development",
    heroTitle: "Level Up with Expert Game Development",
    heroSub:
      "Dive into captivating gaming experiences with Zweidevs. We ensure your game not only competes but excels in the dynamic gaming landscape.",
    heading: "Shaping the Gaming Realm",
    description:
      "Zweidevs breathes vitality into your gaming vision through a meticulous game development process. This journey seamlessly integrates creativity with innovation, transforming your ideas into a vibrant reality.",
    heroImageKey: "game-development",
    offerings: [
      {
        iconKey: "gd1Icon",
        title: "Mobile Games Applications",
        desc: "Captivating mobile gaming experiences with seamless functionality and intuitive user interface.",
      },
      {
        iconKey: "gd2Icon",
        title: "Web Game Applications",
        desc: "Online gaming presence with web applications that exceed industry standards.",
      },
      {
        iconKey: "gd3Icon",
        title: "Blockchain-Based Games",
        desc: "Explore the future of gaming with our expertise in blockchain technology.",
      },
      {
        iconKey: "gd4Icon",
        title: "Game Designing Services",
        desc: "Comprehensive game designing services shaping compelling storylines, characters, and gameplay elements.",
      },
    ],
    projects: [
      {
        imageKey: "GameDev1",
        title: "Spin Up",
        desc: "Dynamic word game combining fun and learning for an engaging experience.",
      },
      {
        imageKey: "GameDev2",
        title: "Word Lane",
        desc: "Engaging word game crafted to enrich vocabulary and keep your brain active.",
      },
      {
        imageKey: "Web1",
        title: "Cyber Legends",
        desc: "Ed-Tech and Gaming platform offering online education services.",
      },
    ],
    process: {
      title: "How We Develop Game Applications",
      desc: "A dynamic, collaborative journey where your vision is at the center.",
      steps: [
        {
          title: "Requirements Gathering",
          desc: "Extensive consultations to understand gaming aspirations with a user-centric approach.",
        },
        {
          title: "Detailed R&D",
          desc: "Market analysis, player persona development, and competitive landscape research.",
        },
        {
          title: "Innovative Development",
          desc: "Iterative prototyping with collaborative design and constant feedback loops.",
        },
        {
          title: "Quality Assurance",
          desc: "Comprehensive testing from unit to user experience testing with post-launch support.",
        },
      ],
    },
    audience: {
      title: "We Build Custom Games For",
      desc: "Creating immersive and tailored game experiences that captivate audiences across various scales.",
      cards: [
        {
          title: "Startups",
          desc: "Tailored solutions that realize your vision, from pixel-perfect graphics to captivating gameplay mechanics.",
        },
        {
          title: "Medium Businesses",
          desc: "Custom-made solutions combining innovation and technology for your growing player population.",
        },
        {
          title: "Large Businesses",
          desc: "Large-scale game worlds with performance optimization and integration of state-of-the-art technologies.",
        },
      ],
    },
    techStack: [
      {
        group: "Mobile & Desktop",
        chips: ["Unity", "Blender", "GameBench", "Houdini"],
      },
    ],
    faq: [
      {
        q: "How much would game development cost?",
        a: "The cost varies based on unique requirements. We provide transparent pricing with flexible packages.",
      },
      {
        q: "Should I go for a mobile game, web app, or website for games?",
        a: "Our experts provide strategic guidance based on your target audience and goals.",
      },
      {
        q: "How much time would game development take?",
        a: "From weeks for simple games to several months for intricate ones with advanced graphics.",
      },
      {
        q: "What if I have a minor idea for a game?",
        a: "Your idea, no matter how minor, holds potential. We specialize in nurturing concepts into world-class games.",
      },
    ],
    order: 5,
  },

  /* ── 6. IoT Development ────────────────── */
  {
    slug: "iot-development",
    category: "IoT Development",
    heroTitle: "Your Gateway to IoT Innovation",
    heroSub:
      "Discover intelligent solutions that transform everyday spaces into smart, responsive environments across various domains.",
    heading: "Empowering Tomorrow's Connectivity with IoT Services",
    description:
      "Our IoT services go above and beyond, providing cutting-edge solutions that transform how you interact with and manage your environment.\n\nZweidevs offers a portal to a connected world, making sure your interactions are simple, clear, and customized to your tastes.",
    heroImageKey: "iot-development",
    offerings: [
      {
        iconKey: "iot1Icon",
        title: "Device Connectivity",
        desc: "Setting up and maintaining connectivity for IoT devices with smooth communication between devices and central systems.",
      },
      {
        iconKey: "iot2Icon",
        title: "Data Management & Analytics",
        desc: "Gathering, handling, and evaluating data from IoT devices to derive significant insights.",
      },
      {
        iconKey: "iot3Icon",
        title: "Security Solutions",
        desc: "Robust security measures to safeguard devices and data with authentication and encryption.",
      },
      {
        iconKey: "iot4Icon",
        title: "IoT Platform Development",
        desc: "Platforms enabling effective management, monitoring, and control of linked devices.",
      },
      {
        iconKey: "iot5Icon",
        title: "Edge Computing",
        desc: "Allocating processing power in closer proximity to the data source to lower latency.",
      },
      {
        iconKey: "iot6Icon",
        title: "Device Management",
        desc: "Comprehensive device management services allowing remote monitoring, management, and updates.",
      },
      {
        iconKey: "iot7Icon",
        title: "Asset Tracking",
        desc: "Real-time asset tracking with customized IoT solutions for vehicles, equipment, and inventory.",
      },
      {
        iconKey: "iot8Icon",
        title: "Environmental Monitoring",
        desc: "Monitoring climate, water quality, and air quality for public health and environmental conservation.",
      },
    ],
    projects: [
      {
        imageKey: "iotP1",
        title: "Oven Homes",
        desc: "Control your home's temperature and electronics via smartphone with analytics dashboard.",
      },
      {
        imageKey: "iotP2",
        title: "Domotics",
        desc: "Seamless control over appliances such as lighting and thermostats for intelligent living.",
      },
      {
        imageKey: "iotP3",
        title: "Zarget Lights",
        desc: "IoT-based application offering intelligent administration of lighting systems.",
      },
    ],
    process: {
      title: "How We Develop IoT Applications",
      desc: "A holistic approach to IoT device development and implementation for optimal results.",
      steps: [
        {
          title: "Consultation & Analysis",
          desc: "We comprehend your unique requirements, company goals, and operational difficulties.",
        },
        {
          title: "Development & Prototyping",
          desc: "Unique IoT devices that meet your needs with working prototypes following industry standards.",
        },
        {
          title: "Integration & Testing",
          desc: "Seamless integration with existing systems and rigorous testing and quality assurance.",
        },
        {
          title: "Deployment & Maintenance",
          desc: "Deployment across your infrastructure with regular maintenance, remote monitoring, and timely updates.",
        },
      ],
    },
    audience: {
      title: "We Build Custom IoT Applications For",
      desc: "",
      cards: [
        {
          title: "Small Businesses",
          desc: "Reasonably priced IoT solutions that easily fit into operations, streamlining procedures and customer interaction.",
        },
        {
          title: "Medium-Sized Businesses",
          desc: "IoT services that cater to broader operations and scale with your company.",
        },
        {
          title: "Large Businesses",
          desc: "Sophisticated IoT solutions that scale seamlessly with expansive operations.",
        },
      ],
    },
    techStack: [
      { group: "IoT Devices", chips: ["Raspberry Pi", "Arduino"] },
    ],
    faq: [
      {
        q: "What are IoT devices?",
        a: "Physical objects embedded with connectivity features, software, and sensors that exchange data over the internet.",
      },
      {
        q: "How can small businesses benefit from IoT?",
        a: "IoT enhances inventory management, enables remote monitoring, and provides data analytics for informed decision-making.",
      },
      {
        q: "What are some IoT devices?",
        a: "Smart home devices, wearables, industrial sensors, healthcare devices, and smart city solutions.",
      },
      {
        q: "Why choose Zweidevs for IoT?",
        a: "Expertise in embedded systems, security, reliability, thorough testing, and cost-effective solutions.",
      },
    ],
    order: 6,
  },

  /* ── 7. AI/ML Development ──────────────── */
  {
    slug: "ai-ml-development",
    category: "AI/ML Development",
    heroTitle: "Elevate Innovation with AI & ML",
    heroSub:
      "Set out on a revolutionary journey where AI and ML are tailored to your company's unique requirements, automating complex tasks and driving data-driven decisions.",
    heading: "Cutting-Edge AI and ML Services",
    description:
      "Welcome to Zweidevs, where our artificial intelligence-driven solutions redefine the boundaries of corporate intelligence and creativity.\n\nOur AI and ML solutions are carefully developed to satisfy the particular requirements of your sector, whether you aim to automate operations or extract valuable insights from your data.",
    heroImageKey: "ai-ml-development",
    offerings: [
      {
        iconKey: "ai1Icon",
        title: "Custom AI and ML Solutions",
        desc: "Specially designed intelligent applications that guarantee a personalized strategy with finely adjusted algorithms.",
      },
      {
        iconKey: "ai2Icon",
        title: "Data Discovery & Augmentation",
        desc: "Predictive analytics and third-party data to gain extensive customer insights.",
      },
      {
        iconKey: "ai3Icon",
        title: "Data Science and Analytics",
        desc: "Convert unprocessed data into useful business knowledge using advanced statistical models.",
      },
      {
        iconKey: "ai4Icon",
        title: "AI-powered Chatbots",
        desc: "Sophisticated chatbots that revolutionize consumer relationships with smooth, customized interactions.",
      },
      {
        iconKey: "ai5Icon",
        title: "AI Integration",
        desc: "Seamlessly integrating AI with your current systems to create an intelligent infrastructure.",
      },
      {
        iconKey: "ai6Icon",
        title: "Data Democratization",
        desc: "Democratize access to insights and cultivate a data-driven culture across your company.",
      },
    ],
    projects: [
      {
        imageKey: "ai1",
        title: "AI VST",
        desc: "High-end DAW plugins converting user audio into professional artist-grade sound.",
      },
      {
        imageKey: "ai2",
        title: "Twinciti",
        desc: "Robust infrastructure integrating 3D graphics and machine learning for future applications.",
      },
      {
        imageKey: "ai3",
        title: "RoboBee Bot",
        desc: "AI conversation partner that communicates via text, graphics, examples, and more.",
      },
    ],
    process: {
      title: "How We Utilize AI in Your Project",
      desc: "Unlock the power of AI and ML with cutting-edge solutions transforming data into insights.",
      steps: [
        {
          title: "Analysis",
          desc: "Reviewing project goals, requirements, evaluating feasibility and extent of AI integration.",
        },
        {
          title: "Data Discovery",
          desc: "Systematically locating and investigating suitable datasets for a strong AI foundation.",
        },
        {
          title: "Modeling",
          desc: "Building powerful AI models using complex algorithms and statistical methodologies.",
        },
        {
          title: "Evaluation & Insights",
          desc: "Evaluating AI models' performance and deriving useful insights for strategic decision-making.",
        },
        {
          title: "AI Solutions",
          desc: "Implementing customized AI systems leveraging cutting-edge models, algorithms, and technology.",
        },
      ],
    },
    audience: {
      title: "We Build Custom AI Applications For",
      desc: "",
      cards: [
        {
          title: "Startups",
          desc: "Unique AI solutions addressing specific growth goals with affordable, practical solutions.",
        },
        {
          title: "Medium Businesses",
          desc: "Customized technology increasing productivity and automating procedures for medium-sized companies.",
        },
        {
          title: "Large Businesses",
          desc: "Solutions guaranteeing efficiency, strategic insights, and competitive edge for large organizations.",
        },
      ],
    },
    techStack: [
      { group: "AI & ML", chips: ["OpenAI", "PyTorch", "Keras", "openNN"] },
    ],
    faq: [
      {
        q: "What is AI and how can it benefit my business?",
        a: "AI simulates human intelligence in machines — automating repetitive tasks, providing data-driven insights, and improving client relations.",
      },
      {
        q: "How is ML different from AI?",
        a: "ML focuses on machines learning from data without explicit programming, while AI is a broader term for human-like intelligence in machines.",
      },
      {
        q: "How can businesses implement AI and ML?",
        a: "Establish precise goals, obtain high-quality data, choose suitable algorithms, and work with specialists or AI/ML platforms.",
      },
      {
        q: "What are some real-world AI/ML applications?",
        a: "Healthcare diagnostics, fraud detection, client segmentation, autonomous vehicles, and more across many industries.",
      },
    ],
    order: 7,
  },

  /* ── 8. DevOps & Cloud ─────────────────── */
  {
    slug: "devops",
    category: "DevOps",
    heroTitle: "Effortless Success with DevOps",
    heroSub:
      "Putting DevOps concepts into practice results in more frequent deployments, quicker development cycles, and better software overall.",
    heading: "Automating and Accelerating Your Software Delivery Pipeline",
    description:
      "Software development with our advanced DevOps services makes teamwork easier, automating tasks and delivering software faster than ever.\n\nAt Zweidevs, we're your progress partners. With our smooth and assured DevOps solutions, you can power your success journey and guarantee quality and efficiency at every turn.",
    heroImageKey: "devops",
    offerings: [
      {
        iconKey: "dev1Icon",
        title: "DevOps as a Service",
        desc: "Our qualified technical staff manages your software development and deployment processes in the cloud.",
      },
      {
        iconKey: "dev2Icon",
        title: "Infrastructure Transformation",
        desc: "Increased scalability, improved operational efficiency, and unmatched agility in your IT environment.",
      },
      {
        iconKey: "dev3Icon",
        title: "CI/CD Pipelines",
        desc: "Smooth CI/CD pipelines so that your applications can release faster and with greater reliability.",
      },
      {
        iconKey: "dev4Icon",
        title: "Monitoring and Logging",
        desc: "Watchful monitoring and logging solutions giving you knowledge to anticipate and resolve problems proactively.",
      },
      {
        iconKey: "dev5Icon",
        title: "Cloud Infrastructure Management",
        desc: "Scalable cloud infrastructure management utilizing resources and agility of cloud platforms.",
      },
      {
        iconKey: "dev6Icon",
        title: "Security and Compliance",
        desc: "Industry-standard security techniques with state-of-the-art measures for your digital landscape.",
      },
    ],
    projects: [
      {
        imageKey: "ai1",
        title: "AI VST",
        desc: "High-end DAW plugins and Visual Studio technology tools for professional-grade sound.",
      },
      {
        imageKey: "ai2",
        title: "Twinciti",
        desc: "Robust infrastructure integrating 3D graphics and machine learning.",
      },
      {
        imageKey: "DevOps1",
        title: "Gnizzel",
        desc: "Streamlined dental clinic appointments with seamless patient connections.",
      },
    ],
    process: {
      title: "How We Provide DevOps Services",
      desc: "We excel in DevOps, streamlining software delivery with automated pipelines and agile collaboration.",
      steps: [
        {
          title: "Planning",
          desc: "Careful planning in close collaboration with your team, combining objectives with a tailored DevOps roadmap.",
        },
        {
          title: "Continuous Development",
          desc: "Applications constantly evolving, quickly adjusting to new needs and technological developments.",
        },
        {
          title: "Continuous Integration",
          desc: "Strong CI pipelines facilitating seamless code integration and cooperative workflow.",
        },
        {
          title: "Continuous Testing",
          desc: "Quality assurance integrated into every phase with automated testing procedures.",
        },
        {
          title: "Continuous Monitoring",
          desc: "Watchful monitoring technologies to quickly identify and fix problems, preserving peak performance.",
        },
        {
          title: "Continuous Feedback",
          desc: "Transparent communication and frequent feedback loops ensuring flexible development processes.",
        },
      ],
    },
    audience: {
      title: "We Provide DevOps Services For",
      desc: "Adopting state-of-the-art DevOps techniques to shorten project timelines and improve coordination.",
      cards: [
        {
          title: "Startups",
          desc: "CI/CD techniques for quick time-to-market, resource optimization, and lower operating expenses.",
        },
        {
          title: "Medium Businesses",
          desc: "Optimized processes for development, testing, and deployment increasing productivity.",
        },
        {
          title: "Large Businesses",
          desc: "Enterprise-level scalability with automated testing and compliance-aligned governance.",
        },
      ],
    },
    techStack: [
      {
        group: "Infrastructure",
        chips: ["AWS", "Google Cloud Platform", "Heroku", "Docker"],
      },
    ],
    faq: [
      {
        q: "What is DevOps and how can it benefit my business?",
        a: "A collaborative methodology integrating software development and IT operations, optimizing workflows and boosting productivity.",
      },
      {
        q: "How does DevOps consulting improve development lifecycle?",
        a: "By automating procedures, improving communication, and applying CI/CD techniques with DevSecOps for security.",
      },
      {
        q: "Why choose Zweidevs for DevOps?",
        a: "We create cooperative partnerships, promoting open communication, shared accountability, and enthusiasm for your DevOps goals.",
      },
    ],
    order: 8,
  },

  /* ── 9. GenAI & Automation ─────────────── */
  {
    slug: "genai-automation",
    category: "GenAI & Automation",
    heroTitle: "Build AI That Actually Works in Production",
    heroSub:
      "We build production-grade Generative AI apps, autonomous agents, and automation pipelines — not demos.",
    heading:
      "Generative AI, AI Agents, and Automation Built for Your Business",
    description:
      "The future belongs to businesses that deploy AI intelligently. Zweidevs builds production-ready Generative AI solutions, multi-agent systems, and automation pipelines that eliminate bottlenecks and unlock new revenue streams.\n\nFrom fine-tuning LLMs on your proprietary data to deploying autonomous AI agents that plan and execute complex tasks — we deliver outcomes, not prototypes.",
    heroImageKey: "genai-automation",
    offerings: [
      {
        iconKey: "ai1Icon",
        title: "Generative AI Applications",
        desc: "Custom chatbots, content tools, and intelligent search powered by the latest LLMs — built for your domain and deployed at scale.",
      },
      {
        iconKey: "ai2Icon",
        title: "Multi-Agent AI Systems",
        desc: "Autonomous agents that plan, reason, and execute complex multi-step tasks without human intervention.",
      },
      {
        iconKey: "ai3Icon",
        title: "AI Audit & Transformation",
        desc: "We audit your existing workflows, identify automation opportunities, and build a roadmap to AI-driven operations.",
      },
      {
        iconKey: "ai4Icon",
        title: "MLOps & Model Deployment",
        desc: "End-to-end ML pipelines, model versioning, monitoring, and CI/CD for AI systems — so your models stay fresh in production.",
      },
      {
        iconKey: "ai5Icon",
        title: "LLM Fine-tuning on Custom Data",
        desc: "Fine-tune foundation models on your proprietary datasets to create domain-expert AI that outperforms off-the-shelf solutions.",
      },
      {
        iconKey: "ai6Icon",
        title: "Robotic Process Automation (RPA)",
        desc: "Eliminate repetitive manual tasks with intelligent RPA bots that integrate with your existing tools and workflows.",
      },
    ],
    projects: [
      {
        imageKey: "ai1",
        title: "AI VST",
        desc: "High-end DAW plugins powered by AI for professional-grade sound generation and mixing.",
      },
      {
        imageKey: "ai2",
        title: "Twinciti",
        desc: "Robust infrastructure integrating 3D graphics, machine learning, and AI-driven automation.",
      },
      {
        imageKey: "ai3",
        title: "AI Research Platform",
        desc: "LLM-powered research assistant enabling semantic search and automated report generation.",
      },
    ],
    process: {
      title: "How We Build GenAI Solutions",
      desc: "From discovery to deployment, we follow a proven process to deliver production-ready AI systems.",
      steps: [
        {
          title: "Discovery & Scoping",
          desc: "We map your business processes, identify high-impact automation opportunities, and define success metrics.",
        },
        {
          title: "Model Selection & Design",
          desc: "We evaluate foundation models, RAG architectures, and agent frameworks to select the best fit for your use case.",
        },
        {
          title: "Prototype & Validate",
          desc: "Rapid prototyping with real data to validate accuracy, latency, and cost before full build-out.",
        },
        {
          title: "Build & Integrate",
          desc: "Production-grade development with full integration into your existing systems, APIs, and data pipelines.",
        },
        {
          title: "Deploy & Monitor",
          desc: "MLOps-driven deployment with real-time monitoring, drift detection, and continuous improvement loops.",
        },
      ],
    },
    audience: {
      title: "We Build GenAI Solutions For",
      desc: "Whether you're exploring AI for the first time or scaling existing models, we meet you where you are.",
      cards: [
        {
          title: "Startups",
          desc: "Ship AI-native products fast. We help startups integrate LLMs and automation into their core product from day one.",
        },
        {
          title: "Scale-ups",
          desc: "Automate repetitive operations, unlock data insights, and build AI features that create competitive moats.",
        },
        {
          title: "Enterprises",
          desc: "Large-scale AI transformation: fine-tuned models, multi-agent systems, and enterprise-grade MLOps infrastructure.",
        },
      ],
    },
    techStack: [
      {
        group: "AI & LLMs",
        chips: ["OpenAI", "LangChain", "LlamaIndex", "Hugging Face"],
      },
      {
        group: "Backend & Infra",
        chips: ["Python", "FastAPI", "TensorFlow", "PyTorch"],
      },
      {
        group: "Cloud & MLOps",
        chips: ["AWS", "GCP", "Docker", "Kubernetes"],
      },
    ],
    faq: [
      {
        q: "What's the difference between GenAI and traditional AI/ML?",
        a: "Traditional ML models predict or classify. Generative AI creates — text, code, images, decisions. GenAI apps use LLMs to understand context and generate intelligent responses.",
      },
      {
        q: "How long does it take to build a production GenAI solution?",
        a: "A focused MVP typically takes 4-8 weeks. Complex multi-agent systems or fine-tuned models run 3-6 months depending on data availability and scope.",
      },
      {
        q: "Can you fine-tune AI models on our proprietary data?",
        a: "Yes. We handle data preparation, model selection, fine-tuning, evaluation, and deployment — with full ownership of the trained model passing to you.",
      },
      {
        q: "How do you ensure the AI outputs are accurate and safe?",
        a: "We implement evaluation frameworks, guardrails, human-in-the-loop checkpoints, and ongoing monitoring to keep your AI aligned with business expectations.",
      },
    ],
    order: 9,
  },
];

/* ── seed logic ──────────────────────────── */
async function seed() {
  const colRef = collection(db, "service_details");
  for (const svc of services) {
    const docRef = await addDoc(colRef, svc);
    console.log(`✅  ${svc.slug} → ${docRef.id}`);
  }
  console.log("\n🎉  All service details seeded successfully!");
}

seed().catch(err => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
