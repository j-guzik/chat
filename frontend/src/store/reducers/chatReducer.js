import {
  FRIEND_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  SOCKET_MESSAGE,
  UPDATE_FRIEND_MESSAGE,
  MESSAGE_SEND_SUCCESS_CLEAR,
  SEEN_MESSAGE,
  DELIVARED_MESSAGE,
  UPDATE,
  MESSAGE_GET_SUCCESS_CLEAR,
  SEEN_ALL,
} from "../types/chatType";

const chatState = {
  friends: [],
  message: [],
  // mesageSendSuccess: false,
  // message_get_success: false,
  // themeMood: "",
  // new_user_add: "",
};

export const chatReducer = (state = chatState, action) => {
  const { type, payload } = action;
  if (type === FRIEND_GET_SUCCESS) {
    return {
      ...state,
      friends: payload.friends,
    };
  }
  if (type === MESSAGE_GET_SUCCESS) {
    return {
      ...state,
      // message_get_success: true,
      message: payload.message,
    };
  }

  if (type === MESSAGE_SEND_SUCCESS) {
    return {
      ...state,
      // mesageSendSuccess: true,
      message: [...state.message, payload.message],
    };
  }

  if (type === SOCKET_MESSAGE) {
    return {
      ...state,
      message: [...state.message, payload.message],
    };
  }

  return state;
};
