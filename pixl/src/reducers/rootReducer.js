import appDataJSON from './appData.json';

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
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SECTION':
      return { section: action.section };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        firebase: {
          ...state.firebase,
          userData: action.data,
        },
      };
    case 'UPDATE_LOGIN_STATUS':
      return {
        ...state,
        firebase: {
          ...state.firebase,
          signInState: action.status,
        },
      };
    case 'UPDATE_CURR_TOOL_ID':
      return {
        ...state,
        tools: {
          ...state.tools,
          currToolId: action.id,
        },
      };
    case 'UPDATE_TOOLS_DATA':
      return {
        ...state,
        tools: {
          ...state.tools,
          toolsData: action.data,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;