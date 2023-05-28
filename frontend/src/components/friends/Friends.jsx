import React from "react";
import { useEffect } from "react";
import moment from "moment";
import { FaRegCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { seenMessage } from "../../store/actions/chatAction";

const Friends = (props) => {
  const { fndInfo, msgInfo } = props.friend;
  const myId = props.myId;
  {
    console.log("myId props", myId);
  }
  const { activeUser } = props;

  // const dispatch = useDispatch();
  // const seenMessages = useSelector((state) => state.chat.seenMessages);

  // useEffect(() => {
  //   if (seenMessages?.includes(msgInfo._id)) {
  //     // Wiadomość została odczytana, możesz zaktualizować jej status
  //     // W tym przypadku status wiadomości zostanie zmieniony na "seen"
  //     dispatch(seenMessage({ messageId: msgInfo._id }));
  //   }
  // }, [seenMessages, msgInfo, dispatch]);

  return (
    <div className="friend">
      <div className="friend-image">
        <div className="image">
          <img src={`./images/${fndInfo.image}`} alt="user" />
        </div>
      </div>

      <div className="friend-name-seen">
        <div className="friend-name">
          <h4>
            {fndInfo.name} {fndInfo.surname}
          </h4>

          <div className="msg-time">
            {msgInfo && msgInfo.senderId === myId ? (
              <span>You </span>
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
                {fndInfo.name + " "}
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
                {msgInfo.message.text.slice(0, 10)}
              </span>
            ) : msgInfo && msgInfo.message.image ? (
              <span>Send image </span>
            ) : (
              <span>Linked to you </span>
            )}
            <span>
              {msgInfo
                ? moment(msgInfo.createdAt).startOf("mini").fromNow()
                : moment(fndInfo.createdAt).startOf("mini").fromNow()}
            </span>
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
