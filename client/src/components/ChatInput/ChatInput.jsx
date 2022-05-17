import React, { useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import "./ChatInput.css";

const ChatInput = ({ userName, socket }) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("onSend", {
      userName: userName ? userName : localStorage.getItem("userName"),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
  };

  const onChatMessageChange = (e) => {
    setChatMessage(e.target.value);
  };

  return (
    <div className="ChatInput-container">
      <form className="ChatInput-form" onSubmit={handleSubmit}>
        <input
          placeholder="메시지를 입력하세요."
          value={chatMessage}
          onChange={onChatMessageChange}
        ></input>
        <button>전송</button>
      </form>
    </div>
  );
};

export default ChatInput;

/* 전송함수 버튼을 누르면
인풋안에 있던 내용을 서버에 onSend ,(messageItem) 보내줌
서버는 다시이걸 룸에다 뿌려줌 */
