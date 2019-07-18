import initialState from './initialState';

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
    case 'UPDATE_CANVAS_SIZE':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          width: action.size,
          height: action.size,
        },
      };
    case 'UPDATE_PIXELS_PER_CANVAS':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          pixelsPerCanvas: action.pixels,
        },
      };
    case 'UPDATE_COLOR':
      if (action.isPrimary) {
        return {
          ...state,
          colors: {
            ...state.color,
            primaryColor: action.color,
          },
        };
      }
      return {
        ...state,
        colors: {
          ...state.color,
          secondaryColor: action.color,
        },
      };
    case 'UPDATE_LAYER_KEYS':
      return {
        ...state,
        layers: {
          ...state.layers,
          layerKeys: action.keys,
        },
      };
    case 'UPDATE_ACTIVE_LAYER':
      return {
        ...state,
        layers: {
          ...state.layers,
          activeLayer: action.index,
        },
      };
    case 'SET_CANVAS_REFS':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          canvasRef: action.canvas,
          overlayRef: action.overlay,
        },
      };
    case 'UPDATE_ACTIVE_FRAME_INDEX':
      return {
        ...state,
        frames: {
          ...state.frames,
          activeFrame: action.index,
        },
      };
    case 'UPDATE_DUPLICATE_FRAME_INDEX':
      return {
        ...state,
        frames: {
          ...state.frames,
          duplicateIndex: action.index,
        },
      };
    case 'UPDATE_FRAME_KEYS':
      return {
        ...state,
        frames: {
          ...state.frames,
          frameKeys: action.keys,
        },
      };
    case 'UPDATE_CURSOR_STATE':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          cursorActive: action.state,
        },
      };
    case 'UPDATE_CANVAS_INIT_COORDS':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          initX: action.x,
          initY: action.y,
        },
      };
    case 'UPDATE_CANVAS_CURR_COORDS':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          currX: action.x,
          currY: action.y,
        },
      };
    case 'UPDATE_MOUSE_BUTTON_CODE':
      return {
        ...state,
        canvas: {
          ...state.canvas,
          mouseButton: action.button,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
