import React from "react";

const ActiveFriend = ({ user, setCurrentFriend }) => {
  return (
    <div
      onClick={() =>
        setCurrentFriend({
          _id: user.userInfo.id,
          name: user.userInfo.name,
          surname: user.userInfo.surname,
          email: user.userInfo.email,
          image: user.userInfo.image,
        })
      }
      className="active-friend"
    >
      <div className="image-active-icon">
        <div className="image">
          <img src={`./images/${user.userInfo.image}`} alt="profile" />
          <div className="active-icon"></div>
        </div>
      </div>
    </div>
  );
};

export default ActiveFriend;
