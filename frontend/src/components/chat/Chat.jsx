import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaEdit, FaSistrix, FaSignOutAlt } from "react-icons/fa";
import ActiveFriend from "../activeFriend/ActiveFriend";
import Friends from "../friends/Friends";
import RightContainer from "../rightContainer/RightContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriends,
  messageSend,
  getMessage,
  imageMessageSend,
} from "../../store/actions/chatAction";
import { io } from "socket.io-client";

const Chat = () => {
  const scrollRef = useRef();
  const socket = useRef();

  const { friends, message } = useSelector((state) => state.chat);
  const { myInfo } = useSelector((state) => state.auth);

  const [currentfriend, setCurrentFriend] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");

  console.log("activeUser", activeUser);

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });
  }, []);

  useEffect(() => {
    if (socketMessage && currentfriend) {
      if (
        socketMessage.senderId === currentfriend._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  useEffect(() => {
    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUser(filterUser);
    });
  }, []);

  const inputHandle = (e) => {
    setNewMessage(e.target.value);

    // socket.current.emit("typingMessage", {
    //   senderId: myInfo.id,
    //   receiverId: currentfriend._id,
    //   msg: e.target.value,
    // });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // sendingSPlay();
    const data = {
      senderName: myInfo.name,
      senderSurname: myInfo.surname,
      receiverId: currentfriend._id,
      message: newMessage ? newMessage : "🤓",
    };

    // socket.current.emit("typingMessage", {
    //   senderId: myInfo.id,
    //   receiverId: currentfriend._id,
    //   msg: "",
    // });

    socket.current.emit("sendMessage", {
      senderId: myInfo.id,
      senderName: myInfo.name,
      senderSurname: myInfo.surname,
      receiverId: currentfriend._id,
      time: new Date(),
      message: {
        text: newMessage ? newMessage : "🤓",
        image: "",
      },
    });

    dispatch(messageSend(data));
    setNewMessage("");
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  useEffect(() => {
    if (friends && friends.length > 0) setCurrentFriend(friends[0]);
  }, [friends]);

  useEffect(() => {
    dispatch(getMessage(currentfriend._id));
  }, [currentfriend?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const emojiSend = (emu) => {
    setNewMessage(`${newMessage}` + emu);
    // socket.current.emit("typingMessage", {
    //   senderId: myInfo.id,
    //   reseverId: currentfriend._id,
    //   msg: emu,
    // });
  };

  const imageSend = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files.length !== 0) {
      // sendingSPlay();
      const imagename = e.target.files[0].name;
      const newImageName = Date.now() + imagename;

      // socket.current.emit("sendMessage", {
      //   senderId: myInfo.id,
      //   senderName: myInfo.userName,
      //   reseverId: currentfriend._id,
      //   time: new Date(),
      //   message: {
      //     text: "",
      //     image: newImageName,
      //   },
      // });

      const formData = new FormData();

      formData.append("senderName", myInfo.name);
      formData.append("senderSurname", myInfo.surname);
      formData.append("imageName", newImageName);
      formData.append("receiverId", currentfriend._id);
      formData.append("image", e.target.files[0]);
      dispatch(imageMessageSend(formData));
    }
  };

  return (
    <div className="chat">
      <div className="row">
        <div className="col-3">
          <div className="left-side">
            <div className="top">
              <div className="image-name">
                <div className="image">
                  <img src={`./images/${myInfo.image}`} alt="" />
                </div>
                <div className="name">
                  <h3>Hi {myInfo.name} </h3>
                </div>
              </div>

              <div className="icons">
                <div onClick={() => {}} className="icon">
                  <FaEllipsisH />
                </div>
                <div className="icon">
                  <FaEdit />
                </div>

                {/* <div className={hide ? "theme_logout" : "theme_logout show"}>
                  <h3>Dark Mode </h3>
                  <div className="on">
                    <label htmlFor="dark">ON</label>
                    <input
                      // onChange={(e) => dispatch(themeSet(e.target.value))}
                      type="radio"
                      value="dark"
                      name="theme"
                      id="dark"
                    />
                  </div>

                  <div className="of">
                    <label htmlFor="white">OFF</label>
                    <input
                      // onChange={(e) => dispatch(themeSet(e.target.value))}
                      type="radio"
                      value="white"
                      name="theme"
                      id="white"
                    />
                  </div>

                  <div className="logout">
                    <FaSignOutAlt /> Logout
                  </div>
                </div> */}
              </div>
            </div>

            <div className="friend-search">
              <div className="search">
                <button>
                  <FaSistrix />
                </button>
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control"
                />
              </div>
            </div>

            <div className="active-friends">
              {activeUser && activeUser.length > 0
                ? activeUser.map((u) => (
                    <ActiveFriend
                      setCurrentFriend={setCurrentFriend}
                      user={u}
                    />
                  ))
                : ""}
            </div>

            <div className="friends">
              {friends && friends.length > 0
                ? friends.map((fd) => (
                    <div
                      onClick={() => setCurrentFriend(fd)}
                      className={
                        currentfriend._id === fd._id
                          ? " hover-friend active"
                          : "hover-friend"
                      }
                    >
                      <Friends friend={fd} />
                    </div>
                  ))
                : "No friends"}
            </div>
          </div>
        </div>
        {currentfriend ? (
          <RightContainer
            currentfriend={currentfriend}
            inputHandle={inputHandle}
            newMessage={newMessage}
            sendMessage={sendMessage}
            message={message}
            scrollRef={scrollRef}
            emojiSend={emojiSend}
            imageSend={imageSend}
            activeUser={activeUser}
          />
        ) : (
          "Please select your friend"
        )}
      </div>
    </div>
  );
};

export default Chat;
