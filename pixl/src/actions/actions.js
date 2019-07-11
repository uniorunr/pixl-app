const CHANGE_SECTION = 'CHANGE_SECTION';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const UPDATE_LOGIN_STATUS = 'UPDATE_LOGIN_STATUS';

const changeSection = section => ({
  type: CHANGE_SECTION,
  section,
});

const updateUserData = data => ({
  type: UPDATE_USER_DATA,
  data,
});

const updateLoginStatus = status => ({
  type: UPDATE_LOGIN_STATUS,
  status,
});

export { changeSection, updateUserData, updateLoginStatus };
