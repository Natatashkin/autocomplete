import IconButton from "../IconButton/IconButton";
import Close from "../../images/icons/Close";
import styles from "./Tag.module.scss";

const Tag = ({ item, onClick }) => {
  return (
    <span className={styles.tag}>
      {item.name}
      <IconButton onClick={() => onClick(item)}>
        <Close />
      </IconButton>
    </span>
  );
};

export default Tag;
