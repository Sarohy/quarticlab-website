import {
  AboutUsCard1,
  AboutUsCard2,
  AboutUsCard,
  AboutUsCard4,
  AboutUsCard5,
} from '@component/Components/MainComponents/Aboutus';
import styles from '../styles/About.module.css';

export default function AboutUs() {
  return (
    <>
      <div className={styles.APStyle}>
        <AboutUsCard1 />
        <AboutUsCard2 />
        <AboutUsCard />
        <AboutUsCard4 />
        <AboutUsCard5 />
      </div>
    </>
  );
}
