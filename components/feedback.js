import styles from '../styles/Feeback.module.css'

const Feeback = (props) => {
    return(
        <div className={styles.feedback_item}>
            <div className={styles.media}>
                {/* <div className={styles.feedback_thumb}>
                    <img 
                        src="https://radiustheme.com/demo/wordpress/themes/digeco/wp-content/uploads/2020/01/testimonial1.png" 
                        className={styles.thumbnail} alt="" />
                </div> */}
                <div className={styles.media_body}>
                    <h3 className={styles.media_title}>{props.name}</h3>
                    <div className={styles.media_designation}>
                        <span>{props.designation}</span>
                    </div>
                </div>
            </div>
            <p className={styles.feedback_desc}>{props.feedback}</p>
            <div className={styles.feedback_icon}>
                <img src="/quote.svg" alt="feeback icon" />
            </div>
        </div>
    );
}

export default Feeback;