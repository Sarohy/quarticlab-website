import BlogCard from "@component/Components/CommonComponents/BlogCard";
import SmallButton from "@component/Components/CommonComponents/SmallButton";
import React, { useState } from "react";
import styles from "./blog.module.css";

const Blog = () => {
  const smallButtonsData = ["All", "Marketing", "Technology", "Grow"];
  const [filter, setFilter] = useState("All");
  const blogData = [
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "Technology 1",
      category: "Technology",
    },
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "Technology 2",
      category: "Technology",
    },
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "grow 2",
      category: "Grow",
    },
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "No Grow",
      category: "Grow",
    },
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "tech desc",
      category: "Technology",
    },
    {
      image:
        "https://c0.wallpaperflare.com/preview/738/172/52/man-standing-on-edge-of-cliff.jpg",
      title: "La la la",
      description: "markrting",
      category: "Marketing",
    },
  ];
  return (
    <div className={styles.blogRoot}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.blogArticleHeading}>Latest Article</div>
        <SmallButton
          setFilter={setFilter}
          smallButtonsData={smallButtonsData}
        />
      </div>
      <div className={styles.blogCardContainer}>
        <BlogCard filter={filter} data={blogData} />
      </div>
    </div>
  );
};

export default Blog;
