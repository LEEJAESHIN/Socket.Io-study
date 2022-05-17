import React, { useEffect, useState } from "react";

const ChatLog = ({ socket }) => {
  //socket === currntsocket
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    // messsgeItem : {msg: String, name: String, timeStamp: String}
    //메시지 를 받으면 클라이언트에서는 메시지받은걸 차례차례보여줘야 되기떄문에
    //기존빈상태에 스프레드문법으로 합쳐줌,
    socket.on("onReceive", (messageItem) => {
      setMsgList((msgList) => [...msgList, messageItem]);
      console.log(messageItem);
    });
    socket.on("onConnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    }); //들어온 메시지
    socket.on("onDisconnect", (systemMessage) => {
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    }); //나간 메시지
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      {msgList.map((msg, idx) => (
        <div key={idx}>
          <div>{msg.userName}</div>
          <div>{msg.timeStamp}</div>
          <div>{msg.msg}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
