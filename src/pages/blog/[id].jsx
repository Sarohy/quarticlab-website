import React, { useEffect } from "react";
import { useRouter } from "next/router";
import PageBanner from "@component/Components/CommonComponents/PageBanner";
import styles from "./blog.module.css";

const Id = () => {
  const router = useRouter();
  const { data } = router.query;

  const parsedData = data ? JSON.parse(data) : null;

  const bannerData = {
    title: parsedData?.title,
    heading: parsedData?.category,
  };
  const animatedDivRefs = React.useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.BlogIdMTop}>
      <PageBanner {...bannerData} />
      <div className={styles.BlogIdPadding}>
        <div
          className={styles.blogDetails}
          dangerouslySetInnerHTML={{ __html: parsedData?.description }}
          ref={animatedDivRefs}
        />
      </div>
    </div>
  );
};

export default Id;
