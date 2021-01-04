import styles from "../styles/Button.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";
const Button = (props) => {
  return (
    <>
      {props.showSpinnerProp ? (
        <CircularProgress style={{ ...props.styleSpn, color: "#ff9700" }} />
      ) : (
        <button
          type={props.type}
          className={`btn ${styles.btn_color}`}
          onClick={props.onClick}
          onSubmit={props.onSubmit}
        >
          {props.text}
        </button>
      )}
    </>
  );
};

export default Button;
