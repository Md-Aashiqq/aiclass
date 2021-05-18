import React, { useState } from "react";
import "./style.css";

function Chat(props) {
  const [chatText, setChatText] = useState("");

  const handleChatText = (event) => {
    const { value } = event.target;
    setChatText(value);
  };

  const handleSendText = (event) => {
    if (!(chatText.length > 0)) return;
    if (event.type === "keyup" && event.key !== "Enter") {
      return;
    }
    const messageDetails = {
      message: {
        message: chatText,
        timestamp: new Date(),
      },
      userData: { ...props.myDetails },
    };
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
        <div onClick={handleSendText}> "S" </div>
      </div>
    </div>
  );
}

export default Chat;
