import React from "react";
import { FaCaretSquareDown, FaEdit, FaSistrix } from "react-icons/fa";

const FriendInfo = ({ currentfriend, activeUser, message }) => {
  return (
    <div className="friend-info">
      <input type="checkbox" id="gallery" />
      <div className="image-name">
        <div className="image">
          <img src={`./images/${currentfriend.image}`} alt="profile" />
        </div>
        {activeUser &&
        activeUser.length > 0 &&
        activeUser.some((u) => u.userId === currentfriend._id) ? (
          <div className="active-user">Active</div>
        ) : (
          ""
        )}

        <div className="name">
          <h4>{currentfriend.name} </h4>
        </div>
      </div>

      <div className="others">
        <div className="custom-chat">
          <h3>Coustomise Chat </h3>
          <FaCaretSquareDown />
        </div>

        <div className="privacy">
          <h3>Privacy and Support </h3>
          <FaCaretSquareDown />
        </div>

        <div className="media">
          <h3>Shared Media </h3>
          <label htmlFor="gallery">
            <FaCaretSquareDown />
          </label>
        </div>
      </div>

      <div className="gallery">
        <img src={"./images/1441Tech_Leaders-160.jpg"} />
        <img src={"./images/1441Tech_Leaders-160.jpg"} />
        <img src={"./images/1441Tech_Leaders-160.jpg"} />
      </div>
    </div>
  );
};

export default FriendInfo;