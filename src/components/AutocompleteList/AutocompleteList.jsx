import ClientCard from "../ClientCard/ClientCard";
import styles from "./AutocompleteList.module.scss";

const AutocompleteList = ({ list, onSelect }) => {
  return (
    <ul className={styles.list}>
      {list.map((item) => {
        const { id, name, phone } = item;
        return (
          <ClientCard
            key={id}
            name={name}
            phone={phone}
            onClick={() => onSelect(item)}
          />
        );
      })}
    </ul>
  );
};

export default AutocompleteList;
