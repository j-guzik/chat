import React from "react";
import {
  FaPlusCircle,
  FaFileImage,
  FaGift,
  FaPaperPlane,
  FaPaperclip,
} from "react-icons/fa";

const MessageSend = ({
  inputHandle,
  newMessage,
  sendMessage,
  emojiSend,
  imageSend,
}) => {
  const emojis = [
    "😀",
    "😄",
    "😁",
    "😆",
    "😂",
    "🤣",
    "😊",
    "🙂",
    "🙃",
    "😉",
    "😍",
    "😝",
    "😜",
    "🧐",
    "🤓",
    "😎",
    "😕",
    "🤑",
    "🥴",
    "😱",
    "❤️",
  ];

  return (
    <div className="message-send-section">
      <input type="checkbox" id="emoji" />

      <div className="message-type">
        <div className="file hover-image attachment">
          <input
            type="file"
            id="pic"
            className="form-control"
            onChange={imageSend}
          />
          <label htmlFor="pic">
            <FaPaperclip />
          </label>
        </div>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Type a message here..."
          className="form-control"
          value={newMessage}
          onChange={inputHandle}
        />

        <div className="file hover-gift">
          <label htmlFor="emoji"> 🤓 </label>
        </div>
      </div>

      <div onClick={sendMessage} className="file">
        <FaPaperPlane />
      </div>

      <div className="emoji-section">
        <div className="emoji">
          {emojis.map((e) => (
            <span onClick={() => emojiSend(e)}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageSend;
