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
        shortcuts: {
          ...state.shortcuts,
          modalActive: !state.shortcuts.modalActive,
        },
      };
    case 'UPDATE_ACTIVE_BLOCK':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeBlock: action.block,
        },
      };
    case 'UPDATE_ACTIVE_TOOL':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeTool: action.id,
        },
      };
    case 'UPDATE_ACTIVE_TOOL_INDEX':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeToolIndex: action.index,
        },
      };
    case 'UPDATE_ACTIVE_FRAME_SHORTCUT':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeFrameShortcut: action.id,
        },
      };
    case 'UPDATE_ACTIVE_FRAME_SHORTCUT_INDEX':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeFrameShortcutIndex: action.index,
        },
      };
    case 'UPDATE_ACTIVE_LAYER_SHORTCUT':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeLayerShortcut: action.id,
        },
      };
    case 'UPDATE_ACTIVE_LAYER_SHORTCUT_INDEX':
      return {
        ...state,
        shortcuts: {
          ...state.shortcuts,
          activeLayerShortcutIndex: action.index,
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
            ...state.colors,
            primaryColor: action.color,
          },
        };
      }
      return {
        ...state,
        colors: {
          ...state.colors,
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
    case 'UPDATE_FRAMES_ARRAY':
      return {
        ...state,
        frames: {
          ...state.frames,
          framesArray: action.array,
        },
      };
    case 'UPDATE_CURR_PREVIEW_FRAME':
      return {
        ...state,
        preview: {
          ...state.preview,
          currFrame: action.index,
        },
      };
    case 'UPDATE_RECORDING_STATE':
      return {
        ...state,
        preview: {
          ...state.preview,
          recording: action.state,
        },
      };
    case 'UPDATE_FPS':
      return {
        ...state,
        preview: {
          ...state.preview,
          fps: action.fps,
        },
      };
    case 'SET_GIF_INSTANCE':
      return {
        ...state,
        preview: {
          ...state.preview,
          gif: action.gif,
        },
      };
    case 'SET_DOWNLOAD_MODAL_STATE':
      return {
        ...state,
        preview: {
          ...state.preview,
          downloadModal: action.state,
        },
      };
    case 'SET_DOWNLOAD_NAME':
      return {
        ...state,
        preview: {
          ...state.preview,
          name: action.name,
        },
      };
    case 'SET_DOWNLOAD_SIZE':
      return {
        ...state,
        preview: {
          ...state.preview,
          size: action.size,
        },
      };
    case 'UPDATE_FRAMES_DATA':
      return {
        ...state,
        frames: {
          ...state.frames,
          framesData: action.data,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
