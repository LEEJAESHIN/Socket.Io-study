import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatLog from "../../components/ChatLog/ChatLog";
import Loading from "./Loading";

//const socket = socketIOClient("localhost:5000");

const Chat = ({ roomName, userName }) => {
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };
  //roomName ? true : false 이렇게만 넣음되지않나 했는데 : 없다고 에러뜸
  const [currentSocket, setCurrentSocket] = useState();
  console.log(currentSocket, "나는 소켓이야");
  useEffect(() => {
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []); //소켓연결

  if (currentSocket) {
    currentSocket.on("connect", () => {
      currentSocket.emit("join", myInfo);
    });
  } //연결이되면? .on(이벤트를 받는다 , 콜백함수 실행)
  //.emit(이벤트를 쏜다, 내정보)

  return (
    <div>
      {currentSocket ? (
        <>
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};
//연결이 되있어야지만 ChatLog,ChatInput UI가 보임 ,
//연결을 하면서 틈이있으면 로딩컴포넌트 보여주기
export default Chat;

/* 정리 
->Chat에선 유저네임과 룸네임을 프롭스로 받음
->연결상태를 상태로 지정
->리액트 훅을 이용해 소켓서버에 연결
->연결이 되면 서버에 정보를 보냄
->연결이 되면 ChatLog 와 ChatInput을 보여줌
 */
