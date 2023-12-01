import styles from "./techStack.module.css";
const TechStack = () => {
  return (
    <div>
      <section
        class={`${styles.section} ${styles.techStack}`}
        id="block_a4dffee99c4d25752415b51e9a72edfe"
      >
        <div class={`${styles.wrapper} ${styles.techStack__wrapper}`}>
          <h2
            class={`${styles.heading} ${styles.heading2} ${styles.techStack__heading}`}
          >
            Mobile application development tech stack
          </h2>
          <p class={`${styles.caption}`}>
            We individually choose programming languages, frameworks, and tools
            for each project. You get a mobile application that uses the best
            technologies combination to support performance and energy
            efficiency.{" "}
          </p>
          <ul class={`${styles.techStack__list}`}>
            <li class={`${styles.techStack__item}`}>
              <h3
                class={`${styles.heading} ${styles.heading3} ${styles.techStack__title}`}
              >
                iOS
              </h3>
              <ul class={`${styles.tags}`}>
                <li class="tag tag--white">Swift</li>
                <li class="tag tag--white">Objective-C</li>
              </ul>
            </li>
            <li class="tech-stack__item">
              <h3 class="heading heading--3 tech-stack__title">Android</h3>
              <ul class="tags">
                <li class="tag tag--white">Java</li>
                <li class="tag tag--white">Kotlin</li>
              </ul>
            </li>
            <li class="tech-stack__item">
              <h3 class="heading heading--3 tech-stack__title">
                Cross-platform
              </h3>
              <ul class="tags">
                <li class="tag tag--white">Flutter</li>
                <li class="tag tag--white">C++</li>
                <li class="tag tag--white">Unity 3D</li>
                <li class="tag tag--white">React Native</li>
              </ul>
            </li>
            <li class="tech-stack__item">
              <h3 class="heading heading--3 tech-stack__title">Backend</h3>
              <ul class="tags">
                <li class="tag tag--white">AWS</li>
                <li class="tag tag--white">Heroku</li>
                <li class="tag tag--white">Firebase</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default TechStack;
