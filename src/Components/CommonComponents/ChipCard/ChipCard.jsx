import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styles from "./chipCard.module.css";

export default function ClickableChips({ chipData }) {
  return (
    <Stack direction="row" spacing={1}>
      {chipData.map((label, key) => (
        <Chip
          className={`${styles.chip}`}
          label={label}
          key={key}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}
