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
  frames: {
    framesShortcuts: JSON.parse(sessionStorage.getItem('framesShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).frames,
  },
  layers: {
    layersShortcuts:
      JSON.parse(sessionStorage.getItem('layersShortcuts'))
      || JSON.parse(JSON.stringify(appDataJSON)).layers,
  },
  components: {
    navBar: {
      modalActive: false,
      activeTool: 'pen',
      activeBlock: 'tools',
      activeFrameShortcut: 'duplicate',
      activeLayerShortcut: 'add',
      modalWindow: {
        toolsShortcutsRefs: [],
        framesShortcutsRefs: [],
        layersShortcutsRefs: [],
        activeToolIndex: 0,
        activeFrameShortcutIndex: 0,
        activeLayerShortcutIndex: 0,
      },
    },
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_SECTION':
      return { ...state, section: action.section };
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
    case 'UPDATE_FRAMES_SHORTCUTS':
      return {
        ...state,
        frames: {
          ...state.frames,
          framesShortcuts: action.data,
        },
      };
    case 'UPDATE_LAYERS_SHORTCUTS':
      return {
        ...state,
        layers: {
          ...state.layers,
          layersShortcuts: action.data,
        },
      };
    case 'UPDATE_SHORTCUTS_MODAL_STATE':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            modalActive: !state.components.navBar.modalActive,
          },
        },
      };
    case 'UPDATE_ACTIVE_BLOCK':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            activeBlock: action.block,
          },
        },
      };
    case 'UPDATE_ACTIVE_TOOL':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            activeTool: action.id,
          },
        },
      };
    case 'UPDATE_ACTIVE_TOOL_INDEX':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            modalWindow: {
              ...state.components.navBar.modalWindow,
              activeToolIndex: action.index,
            },
          },
        },
      };
    case 'UPDATE_ACTIVE_FRAME_SHORTCUT':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            activeFrameShortcut: action.id,
          },
        },
      };
    case 'UPDATE_ACTIVE_FRAME_SHORTCUT_INDEX':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            modalWindow: {
              ...state.components.navBar.modalWindow,
              activeFrameShortcutIndex: action.index,
            },
          },
        },
      };
    case 'UPDATE_ACTIVE_LAYER_SHORTCUT':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            activeLayerShortcut: action.id,
          },
        },
      };
    case 'UPDATE_ACTIVE_LAYER_SHORTCUT_INDEX':
      return {
        ...state,
        components: {
          ...state.components,
          navBar: {
            ...state.components.navBar,
            modalWindow: {
              ...state.components.navBar.modalWindow,
              activeLayerShortcutIndex: action.index,
            },
          },
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
