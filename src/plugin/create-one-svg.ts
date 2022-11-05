import { ICryptoIcon } from "../types";
import FigmaSelectZoomClose from "./select-zoom-close";

const CreateOneSvg = (icon: ICryptoIcon, asComponent: boolean) => {
  const svgNode = figma.createNodeFromSvg(icon.path);
  svgNode.name = icon.name;

  if (asComponent) {
    const svgComponent = figma.createComponent();
    svgComponent.name = icon.name;
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
