import { once, showUI } from "@create-figma-plugin/utilities";
import { CreateSvgFrame, ICryptoIcon, CreateAll } from "./types";

export default function() {
  once<CreateSvgFrame>("CREATE_SVG_FRAME", (icon: ICryptoIcon) => {
    const svgNode = figma.createNodeFromSvg(icon.path);

    svgNode.name = icon.name;
    figma.currentPage.selection = [svgNode];
    figma.viewport.scrollAndZoomIntoView([svgNode]);
    figma.closePlugin();
  });
  once<CreateAll>("CREATE_ALL", (icons: ICryptoIcon[]) => {
    const parentFrame = figma.createFrame();
    parentFrame.name = "Crypto Currency Icons";
    parentFrame.layoutMode = "VERTICAL";
    parentFrame.itemSpacing = 16;
    parentFrame.verticalPadding = 16;
    parentFrame.horizontalPadding = 16;
    parentFrame.primaryAxisSizingMode = "AUTO";
    parentFrame.counterAxisSizingMode = "AUTO";
    parentFrame.fills = [
      { type: "SOLID", color: { r: 0, g: 0, b: 0 }, visible: false },
    ];

    const numPerRow = 20;

    for (let i = 0; i < icons.length; i += numPerRow) {
      const row = icons.slice(i, i + numPerRow);
      const rowFrame = figma.createFrame();
      rowFrame.layoutMode = "HORIZONTAL";
      rowFrame.itemSpacing = 16;
      rowFrame.primaryAxisSizingMode = "AUTO";
      rowFrame.counterAxisSizingMode = "AUTO";
      rowFrame.fills = [
        { type: "SOLID", color: { r: 0, g: 0, b: 0 }, visible: false },
      ];

      row.forEach((icon) => {
        const svgFrame = figma.createNodeFromSvg(icon.path);
        svgFrame.name = icon.name;

        rowFrame.appendChild(svgFrame);
      });

      parentFrame.appendChild(rowFrame);
    }

    figma.currentPage.selection = [parentFrame];
    figma.viewport.scrollAndZoomIntoView([parentFrame]);
    figma.closePlugin();
  });
  showUI({ height: 600, width: 400 });
}
