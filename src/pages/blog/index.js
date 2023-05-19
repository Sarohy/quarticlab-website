import LoadMoreBtnSvg from "@component/assets/blogIcons";
import { InstantBookingBanner } from "@component/Components/CommonComponents";
import BlogCard from "@component/Components/CommonComponents/BlogCard";
import PageBanner from "@component/Components/CommonComponents/PageBanner";
import SmallButton from "@component/Components/CommonComponents/SmallButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./blog.module.css";
import { getApiWithoutAuth } from "../api/api";

const Blog = () => {
  const smallButtonsData = ["All", "Marketing", "Technology", "Grow"];
  const [filter, setFilter] = useState("All");
  // const blogDataAPI = [
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "Digital Marketing Strategy in 2023",
  //     description:
  //       "Technology 1 when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  //     category: "Technology",
  //   },
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "Best platform for business and productivity",
  //     description:
  //       "Technology 2 when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  //     category: "Technology",
  //   },
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "Social media can growth your business traffic",
  //     description:
  //       "grow 2 when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  //     category: "Grow",
  //   },
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "React New Build is Out",
  //     description:
  //       "No Grow An unknown printer took a galley of type and scrambled it. An unknown printer took a galley of type.",
  //     category: "Grow",
  //   },
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "La la la",
  //     description:
  //       "tech desc when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  //     category: "Technology",
  //   },
  //   {
  //     image:
  //       "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
  //     title: "La la la",
  //     description:
  //       "markrting when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
  //     category: "Marketing",
  //   },
  // ];
  const [blogData, setBlogData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  const fetch_data = async () => {
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
          });
        });
        if (dataArray.length > 0) setBlogData(dataArray);
      }
    }
  };
  useEffect(() => {
    fetch_data();
  }, []);

  const loadMoreHandler = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };
  const bannerData = {
    title: "All Posts",
    heading: "Everything your business needs under one roof",
    description: `We’ve worked across multiple verticals and a range of services to create engaging and innovative digital experiences`,
  };

  return (
    <div>
      <PageBanner {...bannerData} />
      <div className={styles.blogRoot}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.blogArticleHeading}>Latest Article</div>
          <SmallButton
            setFilter={setFilter}
            smallButtonsData={smallButtonsData}
          />
        </div>
        <div className={styles.blogCardContainer}>
          <BlogCard filter={filter} data={blogData} />
        </div>
        <div className={styles.blogDflex}>
          <Image
            onClick={loadMoreHandler}
            className={styles.blogLoadMoreBtn}
            src={LoadMoreBtnSvg}
            alt="load-more-button"
          />
        </div>
      </div>

      <InstantBookingBanner
        label={"Not FInding the RIght Fit? Stay Connected"}
      />
    </div>
  );
};

export default Blog;

export async function getStaticProps() {
  //const { events_categories } = await import('/data/data.json');
  return {
    props: {
      data: [{ image: "jdfksjfsk" }],
    },
  };
}
