import AutocompleteList from "../AutocompleteList/AutocompleteList";
import IconButton from "../IconButton/IconButton";
import Tag from "../Tag/Tag";
import Close from "../../images/icons/Close";
import styles from "./Autocomplete.module.scss";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";

const Autocomplete = ({
  label,
  list,
  listname,
  name,
  value,
  onChange,
  onSelected,
  error,
  isLoading,
  multiple,
}) => {
  const [tagList, setTagList] = useState([]);
  const inputRef = useRef(null);
  const showList = useMemo(
    () => Boolean(list.length) && !isLoading,
    [list, isLoading]
  );

  const handleReset = (e) => {
    e.target = inputRef.current;
    e.target.value = "";
    onChange(e);
  };

  const handleSelect = (event, selectedId) => {
    const data = list.find(({ id }) => id === selectedId);
    if (multiple) {
      setTagList((prevList) => [...prevList, data]);
      // onSelected((prevList) => [...prevList, data]);
      handleReset(event);
      inputRef.current.focus();
      return;
    }
    onSelected(data);
  };

  const handleDeleteTag = (itemToDelete) => {
    setTagList((prev) => prev.filter(({ id }) => id !== itemToDelete.id));
  };

  return (
    <div className={styles.autocomplete}>
      {label && <label htmlFor="autocomplete">{label}</label>}
      <div className={styles.textfieldContainer}>
        {Boolean(tagList.length) && (
          <>
            {tagList.map((item) => {
              return <Tag item={item} onClick={handleDeleteTag} />;
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
            list={listname}
            value={value}
            onChange={onChange}
            autoComplete="off"
            autoFocus
            multiple
          />

          {value.length > 2 && (
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
