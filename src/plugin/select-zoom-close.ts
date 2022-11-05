const FigmaSelectZoomClose = (frame: SceneNode, notification?: string) => {
  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);
  notification && figma.notify(`🎉 ${notification.toLowerCase()}`);
  figma.closePlugin();
};

export default FigmaSelectZoomClose;
