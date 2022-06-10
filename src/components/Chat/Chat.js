import React, { useState } from "react";
import { useDataLayerValue } from "../../DataLayer";
import "./style.css";

function Chat(props) {
  const [chatText, setChatText] = useState("");
  const [{ userID, isHost, userDetail }, dispatch] = useDataLayerValue();

  const handleChatText = (event) => {
    const { value } = event.target;
    setChatText(value);
  };

  const handleSendText = (event) => {
    console.log(userDetail);
    if (!(chatText.length > 0)) return;
    if (event.type === "keyup" && event.key !== "Enter") {
      return;
    }
    const messageDetails = {
      message: {
        message: chatText,
        timestamp: new Date(),
      },

      userData: { name: userDetail },
    };
    console.log(messageDetails);
    props.socketInstance.boradcastMessage(messageDetails);
    setChatText("");
  };

  return (
    <div className="chat__container">
      <div className="chat__area">
        {props.messages.map((chatDetails, index) => {
          const { userData, message } = chatDetails;
          return (
            <div className="messages" key={index}>
              {" "}
              <span> {userData.name} </span> {message.message}
            </div>
          );
        })}
      </div>
      <div className="chat__input">
        <input
          type="text"
          value={chatText}
          placeholder="Type Message"
          onChange={handleChatText}
        />
        <div onClick={handleSendText}> send </div>
      </div>
    </div>
  );
}

export default Chat;
