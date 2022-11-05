import { once, showUI } from "@create-figma-plugin/utilities";
import { CreateSvgFrame, ICryptoIcon } from "./types";

export default function() {
  once<CreateSvgFrame>("CREATE_SVG_FRAME", async function(icon: ICryptoIcon) {
    const svgNode = figma.createNodeFromSvg(icon.path);

    svgNode.name = icon.name;
    figma.currentPage.selection = [svgNode];
    figma.viewport.scrollAndZoomIntoView([svgNode]);
    figma.closePlugin();
  });
  showUI({ height: 600, width: 400 });
}
