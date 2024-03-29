import React from "react";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const myId = props.myId;
  const { activeUser } = props;

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${fndInfo.image}`} alt="user" />
          {activeUser &&
          activeUser.length > 0 &&
          activeUser.some((u) => u.userId === fndInfo._id) ? (
            <div className="active_icon"></div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4
            className={
              msgInfo?.senderId !== myId &&
              msgInfo?.status !== undefined &&
              msgInfo.status !== "seen"
                ? "unseen_message Fd_name "
                : "Fd_name"
            }
          >
            {fndInfo.name} {fndInfo.surname}
          </h4>

          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <span>You: </span>
            ) : (
              <span
                className={
                  msgInfo?.senderId !== myId &&
                  msgInfo?.status !== undefined &&
                  msgInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                <span>{msgInfo && fndInfo.name + " "}</span>
              </span>
            )}

            {msgInfo && msgInfo.message.text ? (
              <span
                className={
                  msgInfo?.senderId !== myId &&
                  msgInfo?.status !== undefined &&
                  msgInfo.status !== "seen"
                    ? "unseen_message "
                    : ""
                }
              >
                {msgInfo.message.text}
              </span>
            ) : msgInfo && msgInfo.message.image ? (
              <span>Send image </span>
            ) : (
              <span>
                {"Linked to you " +
                  moment(fndInfo.createdAt).startOf("mini").fromNow()}
              </span>
            )}
            <div className="time">
              {msgInfo
                ? moment(msgInfo.createdAt).startOf("mini").fromNow()
                : ""}
            </div>
          </div>
        </div>

        {console.log("msgInfo outsite", msgInfo)}
        {console.log("myId outsite", myId)}
        {msgInfo && myId && myId === msgInfo.senderId ? (
          <div className="seen-unseen-icon">
            {console.log("msgInfo inside", msgInfo)}
            {msgInfo.status === "seen" ? (
              <img src={`./images/${fndInfo.image}`} alt="user" />
            ) : msgInfo.status === "delivared" ? (
              <div className="delivared">
                <FaRegCheckCircle />
              </div>
            ) : (
              <div className="unseen"> </div>
            )}
          </div>
        ) : (
          <div className="seen-unseen-icon">
            {msgInfo?.status !== undefined && msgInfo?.status !== "seen" ? (
              <div className="seen-icon"></div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
