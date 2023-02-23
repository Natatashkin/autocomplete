import ClientCard from "../ClientCard/ClientCard";
import styles from "./AutocompleteList.module.scss";

const AutocompleteList = ({ list, onSelect }) => {
  return (
    <ul className={styles.list}>
      {list.map(({ id, name, phone }) => {
        return (
          <ClientCard
            key={id}
            name={name}
            phone={phone}
            onClick={(e) => onSelect(e, id)}
          />
        );
      })}
    </ul>
  );
};

export default AutocompleteList;
