import React from "react";
import { FaPhoneAlt, FaVideo, FaRocketchat } from "react-icons/fa";
import Message from "../message/Message";
import MessageSend from "../messageSend/MessageSend";
import FriendInfo from "../friendInfo/FriendInfo";

const RightContainer = ({
  currentfriend,
  inputHandle,
  newMessage,
  sendMessage,
  message,
  scrollRef,
  emojiSend,
  imageSend,
  activeUser,
  typingMessage,
}) => {
  return (
    <div className="col-9">
      <div className="right-side">
        <input type="checkbox" id="dot" />
        <div className="row">
          <div className="col-8">
            <div className="message-send-show">
              <div className="header">
                <div className="image-name">
                  <div className="image">
                    <img
                      src={`./images/${currentfriend.image}`}
                      alt="profile"
                    />
                    {activeUser &&
                    activeUser.length > 0 &&
                    activeUser.some((u) => u.userId === currentfriend._id) ? (
                      <div className="active-icon"></div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="name">
                    <h3>
                      {currentfriend.name} {currentfriend.surname}
                    </h3>
                  </div>
                </div>

                <div className="icons">
                  <div className="icon">
                    <FaPhoneAlt />
                  </div>

                  <div className="icon">
                    <FaVideo />
                  </div>

                  <div className="icon">
                    <label htmlFor="dot">
                      <FaRocketchat />
                    </label>
                  </div>
                </div>
              </div>
              <Message
                message={message}
                currentfriend={currentfriend}
                scrollRef={scrollRef}
                typingMessage={typingMessage}
              />
              <MessageSend
                inputHandle={inputHandle}
                newMessage={newMessage}
                sendMessage={sendMessage}
                emojiSend={emojiSend}
                imageSend={imageSend}
              />
            </div>
          </div>

          <div className="col-4">
            <FriendInfo currentfriend={currentfriend} activeUser={activeUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContainer;
