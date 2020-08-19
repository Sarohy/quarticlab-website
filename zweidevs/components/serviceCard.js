import Head from 'next/head';
import styles from '../styles/ServiceCard.module.css'

const ServiceCard = (props) => {
    return(
        <div className={styles.card_items}>
            <div className={styles.card_items_icon}>
                <img src={props.icon} alt="Shout"/>
            </div>
            <div className={styles.card_items_content}>
                <h3>{props.title}</h3>
                <p>Grursus mal suada faci ipsum and our the more at dolarorit ametion consectetur elit bulum odio suada text.</p>
            </div>
        </div>
    );
}

export default ServiceCard;