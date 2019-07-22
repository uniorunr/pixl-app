const updateShortcut = (shortcutObj, code, key, updateFunc, name) => {
  const currShortcutsObj = { ...shortcutObj };
  const shortcuts = Object.keys(currShortcutsObj).map(
    id => currShortcutsObj[id].shortcut,
  );
  if (
    !shortcuts.includes(code)
    && !code.toLowerCase().includes('shift')
    && !code.toLowerCase().includes('alt')
  ) {
    currShortcutsObj[key].shortcut = code;
    updateFunc(currShortcutsObj);
    sessionStorage.setItem(name, JSON.stringify(currShortcutsObj));
  }
};

const keyboardListener = (code, shiftKey, altKey, props) => {
  const {
    modalActive,
    activeTool,
    activeFrameShortcut,
    activeLayerShortcut,
    activeBlock,
    toolsData,
    framesShortcuts,
    layersShortcuts,
    updateCurrToolId,
    updateToolsData,
    updateFramesShortcuts,
    updateLayersShortcuts,
  } = props;
  if (!modalActive && !shiftKey && !altKey) {
    const toolKeys = Object.keys(toolsData);
    const targetTool = toolKeys.find(id => toolsData[id].shortcut === code);
    if (targetTool && !shiftKey && !altKey) {
      updateCurrToolId(targetTool);
    }
  } else if (activeBlock === 'tools' && !shiftKey && !altKey) {
    updateShortcut(
      toolsData,
      code,
      activeTool,
      updateToolsData,
      'toolsData',
    );
  } else if (activeBlock === 'frames' && !altKey && !shiftKey) {
    updateShortcut(
      framesShortcuts,
      code,
      activeFrameShortcut,
      updateFramesShortcuts,
      'framesShortcuts',
    );
  } else if (activeBlock === 'layers' && !altKey && !shiftKey) {
    updateShortcut(
      layersShortcuts,
      code,
      activeLayerShortcut,
      updateLayersShortcuts,
      'layersShortcuts',
    );
  }
};

export default keyboardListener;
