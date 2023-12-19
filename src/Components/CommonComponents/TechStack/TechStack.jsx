import styles from "./techStack.module.css";
const TechStack = () => {
  return (
    <div>
      <section
        className={`${styles.section} ${styles.techStack}`}
        id="block_a4dffee99c4d25752415b51e9a72edfe"
      >
        <div className={`${styles.wrapper} ${styles.techStack__wrapper}`}>
          <h2
            className={`${styles.heading} ${styles.heading2} ${styles.techStack__heading}`}
          >
            Mobile application development tech stack
          </h2>
          <p className={`${styles.caption}`}>
            We individually choose programming languages, frameworks, and tools
            for each project. You get a mobile application that uses the best
            technologies combination to support performance and energy
            efficiency.{" "}
          </p>
          <ul className={`${styles.techStack__list}`}>
            <li className={`${styles.techStack__item}`}>
              <h3
                className={`${styles.heading} ${styles.heading3} ${styles.techStack__title}`}
              >
                iOS
              </h3>
              <ul className={`${styles.tags}`}>
                <li className="tag tag--white">Swift</li>
                <li className="tag tag--white">Objective-C</li>
              </ul>
            </li>
            <li className="tech-stack__item">
              <h3 className="heading heading--3 tech-stack__title">Android</h3>
              <ul className="tags">
                <li className="tag tag--white">Java</li>
                <li className="tag tag--white">Kotlin</li>
              </ul>
            </li>
            <li className="tech-stack__item">
              <h3 className="heading heading--3 tech-stack__title">
                Cross-platform
              </h3>
              <ul className="tags">
                <li className="tag tag--white">Flutter</li>
                <li className="tag tag--white">C++</li>
                <li className="tag tag--white">Unity 3D</li>
                <li className="tag tag--white">React Native</li>
              </ul>
            </li>
            <li className="tech-stack__item">
              <h3 className="heading heading--3 tech-stack__title">Backend</h3>
              <ul className="tags">
                <li className="tag tag--white">AWS</li>
                <li className="tag tag--white">Heroku</li>
                <li className="tag tag--white">Firebase</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
