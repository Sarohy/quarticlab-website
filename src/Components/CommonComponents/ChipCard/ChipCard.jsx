import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import styles from "./chipCard.module.css";

export default function ClickableChips({ chipData }) {
  return (
    <Stack
      className={styles.root}
      direction="row"
      flexWrap="wrap"
      rowGap={1}
      spacing={1}
    >
      {chipData.map((label, key) => (
        <Chip
          className={`${styles.chip}`}
          key={key}
          label={label}
          variant="outlined"
        />
      ))}
    </Stack>
  );
}
