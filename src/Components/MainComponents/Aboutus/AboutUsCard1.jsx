import dynamic from "next/dynamic";
const PageBanner = dynamic(() =>
  import("@component/Components/CommonComponents/PageBanner"),
);

const AboutUsCard1 = () => {
  const bannerData = {
    title: "About Zweidevs",
    heading: "Our Vision",
    description:
      "With a focus on creative ideas, innovation, and determination, Zweidevs strives to facilitate your marketing journey. We utilize advanced technology and robust business strategies that your company requires in this digital age. As a professional marketing agency, we are dedicated to bringing the future into the present.",
  };
  return (
    <>
      <PageBanner {...bannerData} />
    </>
  );
};

export default AboutUsCard1;
