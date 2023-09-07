import React, { useEffect } from "react";
import Image from "next/image";
import { CD2Img1 } from "@component/assets/AboutUs";
import styles from "./AboutUs2.module.css";

const AboutUsCard2 = () => {
  const animatedTextRef = Array.from({ length: 5 }, () => React.useRef(null));
  const animatedLeftDivRef = Array.from({ length: 2 }, () =>
    React.useRef(null)
  );
  const animatedRightDivRef = Array.from({ length: 3 }, () =>
    React.useRef(null)
  );
  const animatedHeadingDivRef = Array.from({ length: 4 }, () =>
    React.useRef(null)
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__bounceIn");
        }
      });
    }, options);

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__backInUp");
        }
      });
    }, options);

    const observer3 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInRight",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    animatedRightDivRef.forEach((ref) => {
      observer.observe(ref.current);
    });

    animatedHeadingDivRef.forEach((ref) => {
      observer1.observe(ref.current);
    });

    animatedTextRef.forEach((ref) => {
      observer2.observe(ref.current);
    });

    animatedLeftDivRef.forEach((ref) => {
      observer3.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      observer1.disconnect();
      observer2.disconnect();
      observer3.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.AUCard2MainContain}>
        <div className={styles.AUCard2ImgContent}>
          <div ref={animatedRightDivRef[0]}>
            <Image
              className={styles.AUCard2Img}
              src={CD2Img1}
              alt="card 2 about us"
            />
          </div>
          <div className={styles.AUCard2ImgDetail}>
            <p
              className={styles.AUCard2ImgDHeading}
              ref={animatedHeadingDivRef[0]}
            >
              Who We Are
            </p>
            <h2
              className={styles.AUCard2ImgDSubHeading}
              ref={animatedTextRef[0]}
            >
              Our Mission
            </h2>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[1]}>
              Zweidevs stands as the preeminent digital agency in the realm of
              business solutions. Our commitment to excellence and a
              service-oriented approach defines our very essence. We specialize
              in providing dynamic and groundbreaking solutions meticulously
              crafted to suit your unique business domain.
            </p>
            <p className={styles.AUCard2ImgDText} ref={animatedTextRef[2]}>
              At Zweidevs, we not only meet but exceed your expectations, driven
              by a passion for delivering thoughtfully innovated, eye-catching
              products that leave a lasting impression. Our dedicated team of
              professionals takes immense pride in their ability to engineer
              your requirements into robust software solutions, harnessing the
              full potential of cutting-edge technologies spanning mobile, web,
              cloud, and e-commerce. We go beyond mere solutions; we are your
              strategic partner, committed to propelling your business forward
              in the digital landscape.
            </p>
          </div>
        </div>

        <div>
          <div className={styles.AUCardHeading} ref={animatedTextRef[3]}>
            <p>Zweidevs</p> <hr className={styles.AUCardHeadingLine1} />
            <hr className={styles.AUCardHeadingLine2} />
          </div>

          <div className={styles.AUCardDataContainer}>
            <h2 className={styles.AUCardDataHeading} ref={animatedTextRef[4]}>
              Team With Strong Interpersonal Skills
            </h2>
            <p ref={animatedLeftDivRef[0]}>
              We have managed to build a team of developers with exceptional
              interpersonal skills. Here are some qualities of our mobile app
              developers that you would love to learn about:
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[1]}
            >
              Dedication & Focus
            </h3>
            <p ref={animatedRightDivRef[1]}>
              At Zweidevs, we have curated a team of mobile app developers who
              consistently deliver their best work. They invest their time and
              effort into your project to meet your specific needs. By hiring
              professional app developers with practical knowledge, you gain an
              advantage over your competitors, enabling you to grow and reach
              potential customers in more innovative ways.
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[2]}
            >
              Budget Friendly
            </h3>
            <p ref={animatedLeftDivRef[1]}>
              Our services are designed to be cost-effective without
              compromising on quality. We understand the importance of budget
              constraints, and our team works diligently to provide solutions
              that align with your financial resources. We strive to deliver
              excellent value for your investment, ensuring that you receive
              high-quality mobile app development services within your budget.
            </p>
            <h3
              className={styles.AUCardDataSubHeading}
              ref={animatedHeadingDivRef[3]}
            >
              24/7 Support Team
            </h3>
            <p ref={animatedRightDivRef[2]}>
              We have a dedicated support team available round-the-clock to
              address any concerns or queries you may have. Whether it's
              technical assistance or general inquiries, our support team is
              committed to providing prompt and reliable assistance. We
              understand the importance of uninterrupted support, and our team
              is always ready to assist you, ensuring a smooth and hassle-free
              experience throughout your mobile app development journey.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsCard2;
