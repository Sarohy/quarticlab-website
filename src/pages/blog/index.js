import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getApiWithoutAuth } from "../api/api";
const CircularProgress = dynamic(() =>
  import("@mui/material/CircularProgress"),
);
const BlogCard = dynamic(() =>
  import("@component/Components/CommonComponents/BlogCard"),
);
const PageBanner = dynamic(() =>
  import("@component/Components/CommonComponents/PageBanner"),
);
const SmallButton = dynamic(() =>
  import("@component/Components/CommonComponents/SmallButton"),
);
const InstantBookingButton = dynamic(() =>
  import("@component/Components/CommonComponents/InstantBookingButton"),
);
const BottomBorderButton = dynamic(() =>
  import("@component/Components/CommonComponents/BottomBorderButton"),
);
import styles from "./blog.module.css";
import Head from "next/head";

const Blog = () => {
  const smallButtonsData = ["All", "Marketing", "Technology", "Grow"];
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [, setStartIndex] = useState(0);
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

  const fetch_data = async () => {
    setIsLoading(true);
    const resp = await getApiWithoutAuth("blogs/");
    if (resp?.data?.success) {
      const responseData = resp.data.data;
      const dataArray = [];
      if (responseData?.count > 0) {
        responseData?.results.map(item => {
          dataArray.push({
            image: item.thumbnail,
            title: item.title,
            description: item.content,
            category: item?.tags[0]?.name,
            id: item.pk,
          });
        });
        if (dataArray.length > 0) {
          setBlogData(dataArray);
        }
      }
    }
    setIsLoading(false);
  };

  const loadMoreHandler = () => {
    setStartIndex(prevIndex => prevIndex + 10);
  };
  const bannerData = {
    title: "Top Articles",
    heading: "Everything Your Business Needs Under One Roof",
    description:
      "We’ve worked across multiple verticals and a range of services to create engaging and innovative digital experiences.",
  };

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate_delay-5s",
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__bounceIn",
            "animate_delay-5s",
          );
        }
      });
    }, options);

    if (animatedButtonRef.current) {
      observer1.observe(animatedButtonRef.current);
    }

    if (animatedHeadingRef.current) {
      observer.observe(animatedHeadingRef.current);
    }

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);

  return (
    <div className={styles.BMTop}>
      <Head>
        <title>Blogs</title>
      </Head>
      <PageBanner {...bannerData} />
      <div className={styles.blogRoot}>
        <div className={styles.blogMain}>
          <h2 className={styles.blogArticleHeading}>Latest Articles</h2>
          <SmallButton
            setFilter={setFilter}
            smallButtonsData={smallButtonsData}
          />
        </div>

        {isLoading ? (
          <div className={styles.LoadingStyle}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.blogCardContainer}>
            <BlogCard data={blogData} filter={filter} />
          </div>
        )}

        <div className={styles.blogDflex}>
          <BottomBorderButton
            onClick={loadMoreHandler}
            text={blogData.length > 0 ? "Load More" : "No blog available"}
          />
        </div>
      </div>

      <div className={styles.blogBanner}>
        <h2 className={styles.blogBannerHeading} ref={animatedHeadingRef}>
          Not Finding The Right Fit? Stay Connected
        </h2>
        <div className={styles.blogButton} ref={animatedButtonRef}>
          <InstantBookingButton
            customOne={styles.one}
            customStyle={styles.bookinBtnStyle}
            customThree={styles.three}
            customTwo={styles.two}
            svgFill="#ff9700"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;

export async function getStaticProps() {
  return {
    props: {
      data: [{ image: "jdfksjfsk" }],
    },
  };
}
