import React from "react";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";

const Friends = ({ friend }) => {
  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${friend.image}`} alt="" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>
            {friend.name} {friend.surname}
          </h4>

          <div className="msg-time">
            <span>You </span>

            <span></span>
          </div>
        </div>

        {/* {myId === msgInfo?.senderId ? (
          <div className="seen-unseen-icon">
            {msgInfo.status === "seen" ? (
              <img src={`./image/${fndInfo.image}`} alt="" />
            ) : msgInfo.status === "delivared" ? (
              <div className="delivared">
                {" "}
                <FaRegCheckCircle />{" "}
              </div>
            ) : (
              <div className="unseen"> </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
              <div className="seen-icon"> </div>
            ) : (
              ""
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Friends;
