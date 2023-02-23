import styles from "./IconButton.module.scss";

const IconButton = ({ onClick, children }) => {
  return (
    <button className={styles.iconButton} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default IconButton;
