import dynamic from "next/dynamic";
const HomeSection8 = dynamic(() =>
  import("@component/Components/MainComponents/HomeSectionsFinal/HomeSection8"),
);

import Head from "next/head";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <HomeSection8 />
    </>
  );
}
