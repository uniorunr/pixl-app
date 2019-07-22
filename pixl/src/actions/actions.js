const CHANGE_SECTION = 'CHANGE_SECTION';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
const UPDATE_CURR_TOOL_ID = 'UPDATE_CURR_TOOL_ID';
const UPDATE_TOOLS_DATA = 'UPDATE_TOOLS_DATA';
const UPDATE_FRAMES_SHORTCUTS = 'UPDATE_FRAMES_SHORTCUTS';
const UPDATE_LAYERS_SHORTCUTS = 'UPDATE_LAYERS_SHORTCUTS';
const UPDATE_SHORTCUTS_MODAL_STATE = 'UPDATE_SHORTCUTS_MODAL_STATE';
const UPDATE_ACTIVE_BLOCK = 'UPDATE_ACTIVE_BLOCK';
const UPDATE_ACTIVE_TOOL = 'UPDATE_ACTIVE_TOOL';
const UPDATE_ACTIVE_TOOL_INDEX = 'UPDATE_ACTIVE_TOOL_INDEX';
const UPDATE_ACTIVE_FRAME_SHORTCUT = 'UPDATE_ACTIVE_FRAME_SHORTCUT';
const UPDATE_ACTIVE_FRAME_SHORTCUT_INDEX = 'UPDATE_ACTIVE_FRAME_SHORTCUT_INDEX';
const UPDATE_ACTIVE_LAYER_SHORTCUT = 'UPDATE_ACTIVE_LAYER_SHORTCUT';
const UPDATE_ACTIVE_LAYER_SHORTCUT_INDEX = 'UPDATE_ACTIVE_LAYER_SHORTCUT_INDEX';
const UPDATE_CANVAS_SIZE = 'UPDATE_CANVAS_SIZE';
const UPDATE_PIXELS_PER_CANVAS = 'UPDATE_PIXELS_PER_CANVAS';
const UPDATE_COLOR = 'UPDATE_COLOR';
const UPDATE_LAYER_KEYS = 'UPDATE_LAYER_KEYS';
const UPDATE_ACTIVE_LAYER = 'UPDATE_ACTIVE_LAYER';
const SET_CANVAS_REFS = 'SET_CANVAS_REFS';
const UPDATE_ACTIVE_FRAME_INDEX = 'UPDATE_ACTIVE_FRAME_INDEX';
const UPDATE_DUPLICATE_FRAME_INDEX = 'UPDATE_DUPLICATE_FRAME_INDEX';
const UPDATE_FRAME_KEYS = 'UPDATE_FRAME_KEYS';
const UPDATE_CURSOR_STATE = 'UPDATE_CURSOR_STATE';
const UPDATE_CANVAS_INIT_COORDS = 'UPDATE_CANVAS_INIT_COORDS';
const UPDATE_CANVAS_CURR_COORDS = 'UPDATE_CANVAS_CURR_COORDS';
const UPDATE_MOUSE_BUTTON_CODE = 'UPDATE_MOUSE_BUTTON_CODE';
const UPDATE_FRAMES_ARRAY = 'UPDATE_FRAMES_ARRAY';
const UPDATE_CURR_PREVIEW_FRAME = 'UPDATE_CURR_PREVIEW_FRAME';
const UPDATE_RECORDING_STATE = 'UPDATE_RECORDING_STATE';
const UPDATE_FPS = 'UPDATE_FPS';
const SET_GIF_INSTANCE = 'SET_GIF_INSTANCE';
const SET_DOWNLOAD_MODAL_STATE = 'SET_DOWNLOAD_MODAL_STATE';
const SET_DOWNLOAD_NAME = 'SET_DOWNLOAD_NAME';
const SET_DOWNLOAD_SIZE = 'SET_DOWNLOAD_SIZE';

export const changeSection = section => ({ type: CHANGE_SECTION, section });

export const updateUserData = data => ({ type: UPDATE_USER_DATA, data });

export const updateLoginStatus = status => ({ type: UPDATE_LOGIN_STATUS, status });

export const updateCurrToolId = id => ({ type: UPDATE_CURR_TOOL_ID, id });

export const updateToolsData = data => ({ type: UPDATE_TOOLS_DATA, data });

export const updateFramesShortcuts = data => ({ type: UPDATE_FRAMES_SHORTCUTS, data });

export const updateLayersShortcuts = data => ({ type: UPDATE_LAYERS_SHORTCUTS, data });

export const updateShortcutsModalState = () => ({ type: UPDATE_SHORTCUTS_MODAL_STATE });

export const updateActiveBlock = block => ({ type: UPDATE_ACTIVE_BLOCK, block });

export const updateActiveTool = id => ({ type: UPDATE_ACTIVE_TOOL, id });

export const updateActiveToolIndex = index => ({ type: UPDATE_ACTIVE_TOOL_INDEX, index });

export const updateActiveFrameShortcut = id => ({ type: UPDATE_ACTIVE_FRAME_SHORTCUT, id });

export const updateActiveFrameShortcutIndex = index => ({
  type: UPDATE_ACTIVE_FRAME_SHORTCUT_INDEX,
  index,
});

export const updateActiveLayerShortcut = id => ({ type: UPDATE_ACTIVE_LAYER_SHORTCUT, id });

export const updateActiveLayerShortcutIndex = index => ({
  type: UPDATE_ACTIVE_LAYER_SHORTCUT_INDEX,
  index,
});

export const updateCanvasSize = size => ({ type: UPDATE_CANVAS_SIZE, size });

export const updatePixelsPerCanvas = event => ({
  type: UPDATE_PIXELS_PER_CANVAS,
  pixels: +event.currentTarget.value,
});

export const updateColor = (color, isPrimary) => ({ type: UPDATE_COLOR, color, isPrimary });

export const updateLayerKeys = keys => ({ type: UPDATE_LAYER_KEYS, keys });

export const updateActiveLayer = index => ({ type: UPDATE_ACTIVE_LAYER, index });

export const setCanvasRefs = (canvas, overlay) => ({ type: SET_CANVAS_REFS, canvas, overlay });

export const updateActiveFrameIndex = index => ({ type: UPDATE_ACTIVE_FRAME_INDEX, index });

export const updateDuplicateFrameIndex = index => ({ type: UPDATE_DUPLICATE_FRAME_INDEX, index });

export const updateFrameKeys = keys => ({ type: UPDATE_FRAME_KEYS, keys });

export const toggleCursorState = state => ({ type: UPDATE_CURSOR_STATE, state });

export const updateCanvasInitCoords = (x, y) => ({ type: UPDATE_CANVAS_INIT_COORDS, x, y });

export const updateCanvasCurrCoords = (x, y) => ({ type: UPDATE_CANVAS_CURR_COORDS, x, y });

export const updateMouseButtonCode = button => ({ type: UPDATE_MOUSE_BUTTON_CODE, button });

export const updateFramesArray = array => ({ type: UPDATE_FRAMES_ARRAY, array });

export const updateCurrPreviewFrame = index => ({ type: UPDATE_CURR_PREVIEW_FRAME, index });

export const updateRecordingState = state => ({ type: UPDATE_RECORDING_STATE, state });

export const updateFps = fps => ({ type: UPDATE_FPS, fps });

export const setGifInstance = gif => ({ type: SET_GIF_INSTANCE, gif });

export const setDownloadModalState = state => ({ type: SET_DOWNLOAD_MODAL_STATE, state });

export const setDownloadName = name => ({ type: SET_DOWNLOAD_NAME, name });

export const setDownloadSize = size => ({ type: SET_DOWNLOAD_SIZE, size });
