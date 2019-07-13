const CHANGE_SECTION = 'CHANGE_SECTION';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';
const UPDATE_CURR_TOOL_ID = 'UPDATE_CURR_TOOL_ID';

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
