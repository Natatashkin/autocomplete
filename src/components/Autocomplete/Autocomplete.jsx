import AutocompleteList from "../AutocompleteList/AutocompleteList";
import IconButton from "../IconButton/IconButton";
import Tag from "../Tag/Tag";
import Close from "../../images/icons/Close";
import styles from "./Autocomplete.module.scss";
import { useRef, useState, useMemo } from "react";

const Autocomplete = ({
  label,
  list,
  name,
  onChange,
  onSelected,
  selected,
  error,
  isLoading,
  multiple = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const showList = useMemo(
    () => Boolean(list?.length) && !isLoading,
    [list, isLoading]
  );

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(e, value);
    setInputValue(value);
  };

  const handleReset = (e) => {
    onChange({ target: { value: "" } });
    setInputValue("");
    onSelected(null);
  };

  const handleSelect = (selectedItem) => {
    if (multiple) {
      onSelected([selectedItem]);
      inputRef.current.focus();
      return;
    }
    setInputValue("");
    onSelected(selectedItem);
  };

  const isArrayValue = Array.isArray(selected);
  const currentValue = !isArrayValue && selected ? selected.name : inputValue;

  return (
    <div className={styles.autocomplete}>
      {label && <label htmlFor="autocomplete">{label}</label>}
      <div className={styles.textfieldContainer}>
        {isArrayValue && Boolean(selected.length) && (
          <>
            {selected.map((item) => {
              return <Tag key={item.id} item={item} onClick={handleSelect} />;
            })}
          </>
        )}
        <div className={styles.input}>
          <input
            ref={inputRef}
            className={styles.textfield}
            type="text"
            id="autocomplete"
            name={name}
            value={currentValue}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
          />

          {(!!inputValue.length || selected) && (
            <IconButton onClick={handleReset}>
              <Close />
            </IconButton>
          )}
        </div>
      </div>

      <div className={styles.dropdown}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {showList && <AutocompleteList list={list} onSelect={handleSelect} />}
      </div>
    </div>
  );
};

export default Autocomplete;
