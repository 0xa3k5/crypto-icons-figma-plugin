import { ICryptoIcon } from "../types";
import FigmaSelectZoomClose from "./select-zoom-close";

const CreateOneSvg = (
  icon: ICryptoIcon,
  asComponent: boolean,
  variant: "black" | "icon" | "white" | "color"
) => {
  const svgNode = figma.createNodeFromSvg(icon.path[`${variant}`]);
  svgNode.name = `${icon.name}/${variant}`;

  if (asComponent) {
    const svgComponent = figma.createComponent();
    svgComponent.name = `${icon.name}/${variant}`;
    svgComponent.layoutMode = "HORIZONTAL";
    svgComponent.primaryAxisSizingMode = "AUTO";
    svgComponent.counterAxisSizingMode = "AUTO";
    svgComponent.appendChild(svgNode);
    FigmaSelectZoomClose(svgComponent, `${icon.name} is created`);
  } else {
    FigmaSelectZoomClose(svgNode, `${icon.name} is created`);
  }
};

export default CreateOneSvg;
