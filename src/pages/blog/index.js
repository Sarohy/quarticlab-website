import LoadMoreBtnSvg from "@component/assets/blogIcons";
import BlogCard from "@component/Components/CommonComponents/BlogCard";
import PageBanner from "@component/Components/CommonComponents/PageBanner";
import SmallButton from "@component/Components/CommonComponents/SmallButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.css";
import { getApiWithoutAuth } from "../api/api";
import { InstantBookingButton, Zbutton } from "@component/Components/CommonComponents";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { CircularProgress } from "@mui/material";
import BottomBorderButton from "@component/Components/CommonComponents/BottomBorderButton";

const Blog = () => {
  const smallButtonsData = ["All", "Marketing", "Technology", "Grow"];
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const animatedHeadingRef = React.useRef(null);
  const animatedButtonRef = React.useRef(null);

  const fetch_data = async () => {
    setIsLoading(true);
    const resp = await getApiWithoutAuth("blogs/");
    if (resp.data.success) {
      let responseData = resp.data.data;
      let dataArray = [];
      if (responseData?.count > 0) {
        responseData?.results.map((item) => {
          dataArray.push({
            image: item.thumbnail,
            title: item.title,
            description: item.content,
            category: item?.tags[0]?.name,
            id: item.pk
          });
        });
        if (dataArray.length > 0) setBlogData(dataArray);
      }
    }
    setIsLoading(false);
  };

  const loadMoreHandler = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };
  const bannerData = {
    title: "Top Articles",
    heading: "Everything Your Business Needs Under One Roof",
    description:
      "We’ve worked across multiple verticals and a range of services to create engaging and innovative digital experiences"
  };

  useEffect(() => {
    fetch_data();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate_delay-5s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__bounceIn",
            "animate_delay-5s"
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
    <div style={{ marginTop: "15vh" }}>
      <PageBanner {...bannerData} />
      <div className={styles.blogRoot}>
        <div className={styles.blogMain}>
          <h2 className={styles.blogArticleHeading}>Latest Article</h2>
          <SmallButton
            setFilter={setFilter}
            smallButtonsData={smallButtonsData}
          />
        </div>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div className={styles.blogCardContainer}>
            <BlogCard filter={filter} data={blogData} />
          </div>
        )}

        <div className={styles.blogDflex}>
          {/* <Zbutton
            onClick={loadMoreHandler}
            text="Load More"
            color="white"
            hoverColor="#ff9700"
            width="150px"
            showIcon={false}
            icon={
              <ArrowCircleRightOutlinedIcon
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              />
            }
          /> */}
          <BottomBorderButton
          onClick={loadMoreHandler}
          text="Load More"
          />
        </div>
      </div>

      <div className={styles.blogBanner}>
        <h2 className={styles.blogBannerHeading} ref={animatedHeadingRef}>
          Not Finding The Right Fit? Stay Connected
        </h2>
        <div className={styles.blogButton} ref={animatedButtonRef}>
          {/* <Zbutton
            onClick={""}
            customClass={styles.btnThreeCustomColor}
            text="Instant Booking"
            color="#ff9700"
            hoverColor="white"
            width="200px"
            showIcon={false}
            icon={
              <ArrowCircleRightOutlinedIcon
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              />
            }
          /> */}
          <InstantBookingButton
          customStyle={styles.bookinBtnStyle}
          customOne={styles.one}
          customTwo={styles.two}
          customThree={styles.three}
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
      data: [{ image: "jdfksjfsk" }]
    }
  };
}
