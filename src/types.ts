import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateSvgFrame extends EventHandler {
  name: "CREATE_SVG_FRAME";
  handler: (icon: ICryptoIcon) => void;
}

export interface ICryptoIcon {
  symbol: string;
  name: string;
  color: string;
  path: string;
}
