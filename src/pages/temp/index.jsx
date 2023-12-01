import ProductDevSection from "@component/Components/CommonComponents/ProductDevSection/ProductDevSection";
// import TechStack from "@component/Components/CommonComponents/TechStack/TechStack";
import TargetAudience from "@component/Components/CommonComponents/TargetAudienceSection/TargetAudience";
import Faq from "@component/Components/CommonComponents/FAQ/Faq";

const faqData = [
  {
    title: "How much does web app development cost?",
    desc: `The cost of developing a web app is influenced by its complexity, required features, technology stack, team experience, and other factors like design, testing, and maintenance. Working with web development experts or agencies is crucial if you want a clear knowledge of your vision for the web application and a more precise estimate based on your unique requirements.Connect with our web developers to know the exact cost estimation. `,
  },
  {
    title: "What is web app development, and how can it benefit my business?",
    desc: `Developing software applications that run on web browsers is known as web app development, and it offers firms adaptable and affordable options. Their cross-platform compatibility guarantees a uniform user experience on various devices and browsers. Essentially, web app development gives companies the ability to create effective, easily accessible, and scalable solutions that they can use to keep up with changing technology and market demands.`,
  },
  {
    title: "How long does it take to develop a web application?",
    desc: `A simple web app with basic features might take a few weeks to a couple of months to develop, while more complex or enterprise-level applications could take several months or even a year. Rapid development frameworks and agile development methodologies can expedite the process, but it's essential to balance speed with thorough testing and quality assurance.`,
  },
  {
    title: "Why choose Zweidevs for web application development?",
    desc: `We at Zweidevs don't just develop web apps—we craft reliable, approachable solutions that add value to your company and demonstrate our constant commitment to quality and client happiness. Having completed numerous projects successfully and leaving our clients happy, we place a high value on open communication and teamwork during the whole development process. connect with our experts right away.`,
  },
  {
    title:
      "How do you ensure the security of the web applications you develop?",
    desc: `An emphasis on web application security can be done through frequent audits, thorough code reviews, and encryption. We adhere to the least privilege principle and use strong authentication. The result is secure online apps that successfully reduce cybersecurity risks and prioritize data protection.`,
  },
  {
    title:
      "Do you provide ongoing maintenance and support after the web app is launched?",
    desc: `Yes, we at Zweidevs recognize the value of continuous upkeep and assistance. We provide thorough maintenance services, which include bug repairs, updates, and optimizations, to guarantee your application keeps running smoothly. As your company grows, our support staff is here to help with any necessary improvements or modifications and to quickly resolve any issues that may arise.`,
  },
];

const targetAudienceCardData = [
  {
    cardTitle: "Startups",
    cardDesc: `Recognizing the distinct obstacles and goals of smaller businesses, we provide them with cost-effective, scalable solutions that enable them to build a strong online presence. Whether you're starting a new business or want to improve your existing digital skills, our commitment is to offer creative, superior, and reasonably priced online solutions that help small businesses succeed in the digital world.`,
  },
  {
    cardTitle: "Medium Businesses",
    cardDesc: `Our dedicated team is aware of the complex issues and expansion goals that mid-sized businesses face, and we use this knowledge to provide solutions that work in unison with their goals. Whether your goal is to increase consumer engagement, streamline internal operations, or broaden your digital presence, our all-encompassing approach guarantees that the web apps we develop are precisely tailored to meet the unique requirements of medium-sized enterprises.`,
  },
  {
    cardTitle: "Large Business",
    cardDesc: `Zweidevs is dedicated to developing custom web apps that smoothly interface with the complex operations of large companies, whether you want to boost digital interactions at scale, build reliable enterprise solutions, or streamline complex business processes. Our emphasis on performance, security, and innovation guarantees that the solutions we provide enable big businesses to prosper in the ever-changing digital environment, promoting effectiveness, expansion, and long-term success.`,
  },
];

const productionDevSectionCardData = [
  {
    cardTitle: "Discovery",
    cardDesc: `Every new project at Zweidevs begins with a dedicated discovery phase, a strategy that we believe is critical to exploring the project's concept and defining its core requirements. Our clients can evaluate the viability of their investment and validate their business ideas at this first phase, which is a great opportunity. In the discovery phase, we discuss the intended functionality and look closely at the problems the customer wants the software product to solve. For our team, obtaining a wealth of project data is essential since it helps us determine the project's complexity and provide the customer with correct time and cost estimates.`,
  },
  {
    cardTitle: "Design",
    cardDesc:
      "Our design team creates the foundation for the best web designs through the careful development of interactive prototypes and wireframes. We carefully design the user flow for future applications so that clients can see an appealing preview of their product. This flow is put through a rigorous testing process with actual users to make sure that it is easy to navigate. We prioritize creating a captivating first impression for online businesses, recognizing its critical value, and emphasize visual appeal in user interface design. We help companies build long-lasting relationships with their clients by emphasizing elegant and sophisticated web design.",
  },
  {
    cardTitle: "Development",
    cardDesc: `We've adopted Agile as our primary project management approach because we think it helps us maintain the high caliber of the products we provide, reduce risks, and give our clients more control over their projects. We break down our development process into manageable sprints that follow a specific pattern. We start with careful planning and move right into the development stage. After that, we thoroughly test the implemented functionality, document our findings, and release it once we've ensured no bugs are left. Our development team moves smoothly into the next phase at the end of each sprint, guaranteeing steady and organized progress.`,
  },
  {
    cardTitle: "Release",
    cardDesc: `The software development process ends with the release phase. After our quality assurance engineers thoroughly test every feature both manually and automatically to guarantee flawless operation, all parts, data, and completed code are deployed to production. Our bespoke web application development team carefully gathers release notes throughout this critical phase. They work as technical documentation that provides crucial details about the product, including information on features that have been added and bugs that have been fixed. Release notes are intended for internal and external product users, and they offer in-depth information on the most recent advancements.`,
  },
  {
    cardTitle: "Support",
    cardDesc: `At Zweidevs, we build software solutions that, long after the initial product launch, continuously provide their owners with the expected results. We are able to maintain this success over time because of our dedication to providing excellent post-launch maintenance and support. We offer two ways for our customers to keep their products maintained for their convenience. In the first, customers pay a set monthly amount to receive a predetermined number of hours, similar to a subscription model. As an alternative, companies can gather jobs into a backlog and assign our team to handle them. Before giving them to our staff, clients usually accumulate jobs until they have at least eighty working hours. Clients generally agree this is the most economical way to sustain their software product.`,
  },
];
const temp = () => {
  return (
    <div style={{ marginTop: 120, color: "black" }}>
      <ProductDevSection cardData={productionDevSectionCardData} />
      {/* <TechStack /> */}
      <div style={{ paddingBottom: 20, backgroundColor: "#F4F5F6" }}>
        <TargetAudience cardData={targetAudienceCardData} />
      </div>
      <Faq faqData={faqData} />
    </div>
  );
};

export default temp;
