import styles from "./loadingSkeleton.module.css";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div className={styles.topProjectsRow}>
      <div>
        <Skeleton height={118} variant="rectangular" width={210} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton height={118} variant="rectangular" width={210} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
      <div>
        <Skeleton height={118} variant="rectangular" width={210} />
        <Skeleton />
        <Skeleton width="60%" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
