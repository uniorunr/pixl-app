const CHANGE_SECTION = 'CHANGE_SECTION';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
const UPDATE_CURR_TOOL_ID = 'UPDATE_CURR_TOOL_ID';
const UPDATE_TOOLS_DATA = 'UPDATE_TOOLS_DATA';
const UPDATE_FRAMES_SHORTCUTS = 'UPDATE_FRAMES_SHORTCUTS';
const UPDATE_LAYERS_SHORTCUTS = 'UPDATE_LAYERS_SHORTCUTS';

export const changeSection = section => ({
  type: CHANGE_SECTION,
  section,
});

export const updateUserData = data => ({
  type: UPDATE_USER_DATA,
  data,
});

export const updateLoginStatus = status => ({
  type: UPDATE_LOGIN_STATUS,
  status,
});

export const updateCurrToolId = id => ({
  type: UPDATE_CURR_TOOL_ID,
  id,
});

export const updateToolsData = data => ({
  type: UPDATE_TOOLS_DATA,
  data,
});

export const updateFramesShortcuts = data => ({
  type: UPDATE_FRAMES_SHORTCUTS,
  data,
});

export const updateLayersShortcuts = data => ({
  type: UPDATE_LAYERS_SHORTCUTS,
  data,
});
