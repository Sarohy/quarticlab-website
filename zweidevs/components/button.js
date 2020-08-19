import styles from '../styles/Button.module.css'

const Button = (props) => {
    return(
        <button type={props.type} className={`btn ${styles.btn_color}`}>{props.text}</button>  
    );
}

export default Button;