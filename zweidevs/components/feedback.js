import styles from '../styles/Feeback.module.css'

const Feeback = (props) => {
    return(
        <div className={styles.feedback_item}>
            <div className={styles.media}>
                <div className={styles.feedback_thumb}>
                    <img 
                        src="https://radiustheme.com/demo/wordpress/themes/digeco/wp-content/uploads/2020/01/testimonial1.png" 
                        className={styles.thumbnail} alt="" />
                </div>
                <div className={styles.media_body}>
                    <h3 className={styles.media_title}>Robert Bruce</h3>
                    <div className={styles.media_designation}>
                        <span>Apps Developer</span>
                    </div>
                </div>
            </div>
            <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more and dumm ametion consectetur elit. Vesti at bulum nec odio aea the of dumm ipsumm ipsum that dolocons rsus mal suada</p>
            <div className={styles.feedback_icon}>
                <img src="/quote.svg" alt="feeback icon" />
            </div>
        </div>
    );
}

export default Feeback;