import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateSvgFrame extends EventHandler {
  name: "CREATE_SVG_FRAME";
  handler: (icon: ICryptoIcon, asComponent: boolean) => void;
}
export interface CreateAll extends EventHandler {
  name: "CREATE_ALL";
  handler: (icons: ICryptoIcon[], asComponent: boolean) => void;
}

export interface ICryptoIcon {
  symbol: string;
  name: string;
  color: string;
  path: string;
}
