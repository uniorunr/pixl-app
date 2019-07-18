import appDataJSON from './appData.json';

const getWindowSize = () => {
  const windowWidth = ((window.innerWidth / 128) * 0.5).toFixed(0) * 128;
  const windowHeight = ((window.innerHeight / 128) * 0.8).toFixed(0) * 128;
  return windowWidth < windowHeight ? windowWidth : windowHeight;
};

const initialState = {
  section: sessionStorage.getItem('section') || 'landing',
  firebase: {
    userData: null,
    signInState: null,
  },
  tools: {
    currToolId: 'pen',
    toolsData: JSON.parse(sessionStorage.getItem('toolsData'))
      || JSON.parse(JSON.stringify(appDataJSON)).tools,
  },
  frames: {
    framesShortcuts: JSON.parse(sessionStorage.getItem('framesShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).frames,
    framesArray: [],
    framesData: JSON.parse(sessionStorage.getItem('framesData')) || {},
    frameKeys: JSON.parse(sessionStorage.getItem('frameKeys')) || [0],
    activeFrame: +sessionStorage.getItem('activeFrame') || 0,
    duplicateIndex: null,
  },
  layers: {
    layersShortcuts:
      JSON.parse(sessionStorage.getItem('layersShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).layers,
    layerKeys: [],
    activeLayer: +sessionStorage.getItem('activeLayer') || 0,
  },
  canvas: {
    width: getWindowSize(),
    height: getWindowSize(),
    pixelsPerCanvas: 64,
    canvasRef: null,
    overlayRef: null,
    cursorActive: null,
    currX: 0,
    currY: 0,
    initX: null,
    initY: null,
    mouseButton: null,
  },
  colors: {
    primaryColor: sessionStorage.getItem('primaryColor') || '#000000',
    secondaryColor: sessionStorage.getItem('secondaryColor') || '#ffffff',
  },
  shortcuts: {
    modalActive: false,
    activeTool: 'pen',
    activeBlock: 'tools',
    activeFrameShortcut: 'duplicate',
    activeLayerShortcut: 'add',
    toolsShortcutsRefs: [],
    framesShortcutsRefs: [],
    layersShortcutsRefs: [],
    activeToolIndex: 0,
    activeFrameShortcutIndex: 0,
    activeLayerShortcutIndex: 0,
  },
};

export default initialState;
