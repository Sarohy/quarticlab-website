import { Inter } from "next/font/google";
import {
  HomeSection1,
  HomeSection2,
  HomeSection3,
  HomeSection4,
  HomeSection5,
  HomeSection6,
  HomeSection7,
  HomeSection8,
} from "@component/Components/MainComponents/HomeSectionsFinal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const section2 = () => document.getElementById("homeSection2");
  const section3 = () => document.getElementById("homeSection3");

  const handleButtonClickSection1 = () => {
    section2().scrollIntoView({ behavior: "smooth" });
  };

  const handleButtonClickSection2 = () => {
    section3().scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div style={{marginTop:"15vh"}}> 
      <HomeSection1 handleButtonClick={handleButtonClickSection1} />
      <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <HomeSection5 />
      <HomeSection6 />
      <HomeSection7 />
      <HomeSection8 />
    </div>
  );
}
