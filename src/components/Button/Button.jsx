import styles from "./Button.module.scss";

const Button = ({ type = "button", title, children, onClick = () => {} }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {children}
      {title}
    </button>
  );
};

export default Button;
