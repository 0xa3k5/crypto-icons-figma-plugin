import { once, showUI } from "@create-figma-plugin/utilities";
import { CreateSvgFrame, ICryptoIcon, CreateAll } from "../types";
import CreateAllSvg from "./create-all-svg";
import CreateOneSvg from "./create-one-svg";

export default function() {
  once<CreateSvgFrame>(
    "CREATE_SVG_FRAME",
    (icon: ICryptoIcon, asComponent: boolean) => {
      CreateOneSvg(icon, asComponent);
    }
  );
  once<CreateAll>(
    "CREATE_ALL",
    (icons: ICryptoIcon[], asComponent: boolean) => {
      CreateAllSvg(icons, asComponent);
    }
  );
  showUI({ height: 600, width: 400 });
}
