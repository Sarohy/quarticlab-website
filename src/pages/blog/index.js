import SmallButton from "@component/Components/SmallButton";
import React from "react";

const Blog = () => {
  const smallButtonsData = ["All", "Marketing", "Technology", "Grow"];
  return (
    <div>
      <SmallButton smallButtonsData={smallButtonsData} />
      <div>Latest Article</div>
    </div>
  );
};

export default Blog;
