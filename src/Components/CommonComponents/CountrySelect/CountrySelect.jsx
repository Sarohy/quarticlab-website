import { useEffect, useRef, useState } from "react";
import COUNTRIES from "@component/utils/countries";
import styles from "./countrySelect.module.css";

export default function CountrySelect({ id, name, onChange, value }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const filtered = query
    ? COUNTRIES.filter(c =>
        c.toLowerCase().startsWith(query.toLowerCase()),
      ).concat(
        COUNTRIES.filter(
          c =>
            !c.toLowerCase().startsWith(query.toLowerCase()) &&
            c.toLowerCase().includes(query.toLowerCase()),
        ),
      )
    : COUNTRIES;

  /* close on outside click */
  useEffect(() => {
    const handler = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* scroll highlighted item into view */
  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    const item = listRef.current.children[highlighted];
    if (item) {
      item.scrollIntoView({ block: "nearest" });
    }
  }, [highlighted]);

  const selectCountry = country => {
    onChange({ target: { name, value: country } });
    setQuery("");
    setOpen(false);
  };

  const handleKeyDown = e => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlighted(h => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (filtered[highlighted]) {
        selectCountry(filtered[highlighted]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  /* closed → show selected value; open → show typed query */
  const displayValue = open ? query : value || "";

  return (
    <div className={styles.wrap} ref={containerRef}>
      <input
        aria-autocomplete="list"
        aria-controls={`${id}-list`}
        aria-expanded={open}
        autoComplete="off"
        className={styles.input}
        id={id}
        onChange={e => {
          setQuery(e.target.value);
          setHighlighted(0);
        }}
        onFocus={() => {
          setQuery("");
          setOpen(true);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Country"
        role="combobox"
        type="text"
        value={displayValue}
      />
      <span className={styles.caret}>{open ? "▲" : "▼"}</span>
      {open && (
        <ul
          className={styles.dropdown}
          id={`${id}-list`}
          ref={listRef}
          role="listbox"
        >
          {filtered.length === 0 && (
            <li className={styles.noResult}>No countries found</li>
          )}
          {filtered.map((c, i) => (
            <li
              aria-selected={c === value}
              className={`${styles.option} ${
                i === highlighted ? styles.optionActive : ""
              } ${c === value ? styles.optionSelected : ""}`}
              key={c}
              onMouseDown={() => selectCountry(c)}
              onMouseEnter={() => setHighlighted(i)}
              role="option"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
