import { h } from "preact";
import { ICryptoIcon } from "../types";

interface CryptoIconProps {
  icon: ICryptoIcon;
}

export default function CryptoIcon({ icon }: CryptoIconProps): JSX.Element {
  return (
    <div className="">
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(icon.path)}`} />
    </div>
  );
}
