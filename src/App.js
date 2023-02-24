import { useDebouncedCallback } from "use-debounce";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import Button from "./components/Button/Button";
import styles from "./App.module.scss";
import { useMemo, useState } from "react";

// https://6267012078638336421a5fe0.mockapi.io/:endpoint

export default function App() {
  const [filteredClients, setFilteredClients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClients = async (value) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `https://6267012078638336421a5fe0.mockapi.io/contacts?filter=${value}`
      );
      const data = await response.json();
      if (!data.length) {
        throw new Error("No such client");
      }
      setFilteredClients(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const debounsedQuery = useDebouncedCallback(fetchClients, 350);

  const handleFilterChange = async (_, value) => {
    if (value?.length >= 3) {
      await debounsedQuery(value);
      return;
    }

    setFilteredClients([]);
  };

  const handleSelect = (selectedItem) => {
    console.log("selected", selectedItem);
    if (Array.isArray(selectedItem)) {
      setSelected((prev) => {
        if (!prev) {
          return selectedItem;
        }

        const [item] = selectedItem;
        const isItemExist = prev.find(({ id }) => id === item.id);
        if (isItemExist) {
          return prev.filter(({ id }) => id !== item.id);
        }

        return [...prev, ...selectedItem];
      });
      return;
    }

    setSelected(selectedItem);
    setFilteredClients([]);
  };

  const clients = useMemo(() => {
    if (selected && Array.isArray(selected)) {
      return filteredClients.filter(
        (item) => !selected.find(({ id }) => id === item.id)
      );
    }
  }, [selected, filteredClients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selected);
  };

  return (
    <div className={styles.app}>
      <div className={styles.box}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <Autocomplete
              list={clients ? clients : filteredClients}
              name="clients"
              label="Clients"
              onChange={handleFilterChange}
              error={error}
              isLoading={isLoading}
              onSelected={handleSelect}
              selected={selected}
              multiple
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button title="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
