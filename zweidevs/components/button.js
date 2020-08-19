import styles from '../styles/Button.module.css'

const Button = (props) => {
    return(
        <button type="submit" className={`btn ${styles.btn_color}`}>Submit Now</button>  
    );
}

export default Button;