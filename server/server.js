const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { timeLog } = require("console");
const port = 5000;
const app = express();

app.use(cors());

const server = http.createServer(app);
// socketio 생성후 서버 인스턴스 사용
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // join : 채팅 참여 이벤트
  //클라이언트 myInfo에서 roomName 과 유저 네임을 보내줌
  //socket.join(room) roomName에 들어감
  socket.on("join", ({ roomName: room, userName: user }) => {
    socket.join(room);
    io.to(room).emit("onConnect", `${user} 님이 입장했습니다.`);
    // send : 클라이언트가 메시지 보내는 이벤트
    // item: {name: String, msg: String, timeStamp: String}
    // 전송버튼 보낸걸 다시 ChatLog로 보내줌
    socket.on("onSend", (messageItem) => {
      io.to(room).emit("onReceive", messageItem);
    });

    socket.on("disconnect", () => {
      socket.leave(room);
      io.to(room).emit("onDisconnect", `${user} 님이 퇴장하셨습니다.`);
    });
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
