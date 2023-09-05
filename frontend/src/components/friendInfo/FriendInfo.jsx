import React from "react";
import { FaCaretSquareDown } from "react-icons/fa";

const FriendInfo = ({ currentfriend, activeUser, message }) => {
  console.log("message", message);
  return (
    <div className="friend-info">
      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentfriend.image}`} alt="profile" />
        </div>
        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === currentfriend._id) ? (
          <div className="active-user">Available</div>
        ) : (
          <div className="not-active-user">Not available</div>
        )}

        <div className="name">
          <h4>{currentfriend.name} </h4>
        </div>
      </div>
      <div className="attachments">
        <h3>Attachments </h3>

        {message && message.some((m) => m.message && m.message.image) ? (
          <div className="gallery">
            {message.map(
              (m, index) =>
                m.message.image && (
                  <img key={index} src={`./images/${m.message.image}`} />
                )
            )}
          </div>
        ) : (
          <p>No attachments</p>
        )}
      </div>
    </div>
  );
};

export default FriendInfo;
