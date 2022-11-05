import { h } from "preact";
import { ICryptoIcon } from "../types";
import { StateUpdater } from "preact/hooks";
import styles from "../styles.css";

interface CryptoIconCardProps {
  icon: ICryptoIcon;
  setSelectedIcon: StateUpdater<ICryptoIcon>;
  isSelected: boolean;
}

export default function CryptoIconCard({
  icon,
  setSelectedIcon,
  isSelected,
}: CryptoIconCardProps): JSX.Element {
  return (
    <div
      class={`${styles["icon-card"]} ${isSelected && styles.selected}`}
      onClick={() => setSelectedIcon(icon)}
      tabIndex={0}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(icon.path)}`}
        alt={icon.name}
      />
    </div>
  );
}
