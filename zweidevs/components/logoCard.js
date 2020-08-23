
import styles from '../styles/LogoCard.module.css'

const LogoCard = (props) => {
    return(
        <div className={styles.card_item}>
            <figure> 
                <img src={props.logo} class={styles.item_attachment} alt="" />
            </figure>
        </div>
    );
}

export default LogoCard;