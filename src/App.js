import { useDebouncedCallback } from "use-debounce";
import Autocomplete from "./components/Autocomplete/Autocomplete";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";

// https://6267012078638336421a5fe0.mockapi.io/:endpoint

export default function App() {
  const [filteredClients, setFilteredClients] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = ({ target: { value } }) => {
    setFilterValue(value);
    if (!value) {
      setSelected(null);
    }
  };

  const handleSelect = (data) => {
    setSelected(data);
    setFilterValue(data.name);
    setFilteredClients([]);
  };

  const fetchClients = async (value) => {
    if (selected) {
      return;
    }
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(
        `https://6267012078638336421a5fe0.mockapi.io/contacts?filter=${value.trim()}`
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
  useEffect(() => {
    if (filterValue.length < 3) {
      setFilteredClients([]);
      setError(null);
      return;
    }
    debounsedQuery(filterValue);
  }, [filterValue, debounsedQuery]);

  return (
    <div className={styles.app}>
      <div className={styles.box}>
        <Autocomplete
          list={filteredClients}
          name="clients"
          label="Clients"
          value={filterValue}
          onChange={handleFilterChange}
          error={error}
          isLoading={isLoading}
          onSelected={handleSelect}
          multiple
        />
      </div>
    </div>
  );
}
