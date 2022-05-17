import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  const [userName, setUserName] = useState();
  const [roomName, setRoomName] = useState();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home
              userName={userName}
              roomName={roomName}
              setUserName={setUserName}
              setRoomName={setRoomName}
            />
          </Route>
          <Route
            path="/Chat"
            exact
            render={() => <Chat userName={userName} roomName={roomName} />}
          ></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
/* App에서는 유저네임과 룸네임 을 상태로 두고 내려주기만함
페이지 분리 만 해줌 */
