const initialState = {
  section: sessionStorage.getItem('section') || 'landing',
  firebase: {
    userData: null,
    signInState: null,
  },
  currToolId: 'pen',
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
        currToolId: action.id,
      };
    default:
      return state;
  }
};

export default rootReducer;
