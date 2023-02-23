import styles from "./IconButton.module.scss";

const IconButton = ({ color, onClick, children }) => {
  return (
    <button
      className={styles.iconButton}
      style={{ color: color }}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
