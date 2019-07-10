const initialState = {
  section: sessionStorage.getItem('section') || 'landing',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SECTION':
      return { section: action.section };
    default:
      return state;
  }
};

export default rootReducer;
