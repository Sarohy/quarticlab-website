import PageBanner from "@component/Components/CommonComponents/PageBanner";
import Image from "next/image";
import React from "react";

const Id = (props) => {
  const { data } = props;
  return (
    <div>
      {" "}
      <PageBanner />
      <Image src={{}} height={"auto"} width={"100%"} />
    </div>
  );
};

export default Id;
