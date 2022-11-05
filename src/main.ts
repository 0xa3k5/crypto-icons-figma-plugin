import { once, showUI } from "@create-figma-plugin/utilities";
import { CreateSvgFrame, ICryptoIcon } from "./types";

export default function() {
  once<CreateSvgFrame>("CREATE_SVG_FRAME", async function(icon: ICryptoIcon) {
    const frame = figma.createNodeFromSvg(icon.path);

    figma.currentPage.selection = [frame];
    figma.viewport.scrollAndZoomIntoView([frame]);
    figma.closePlugin();
  });
  showUI({ height: 240, width: 320 });
}
