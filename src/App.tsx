import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';
import { CardState, GameStage, GameState, GameStep, PlayerState} from './regulates/interfaces'
import { socket } from './communication/connection';
import { RoomPage } from './page/RoomPage';

interface AppState {
  userName: string,
  pageName: string,
  gameState: GameState,
  roomState: any,
}

class App extends React.PureComponent<{},AppState> {

  setPage(val: string) {
    this.setState({pageName: val});
  }
  // Todo: setRoomState
  setRoomState(val: any) {
    this.setState({roomState: val});
  }

  setGameState(val: GameState) {
    this.setState({gameState: val});
  }

  setUserName(val: string) {
    this.setState({userName: val});
  }
  constructor(props: any){
    super(props);
    this.state = {
      pageName: "LoginPage",
      userName: "请登录",
      gameState: {
        playerState: [],
        automatonState: {
          stage: GameStage.PREPARE,
          step: GameStep.GAME_START,
          /* 0: Alice, 1: Bob */
          priority: 0,
          turn: 0,
          round: 0,
        }
      },
      roomState: null,
    };
    this.setPage = this.setPage.bind(this);
    this.setGameState = this.setGameState.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setRoomState = this.setRoomState.bind(this);
  }

  render() {
    // Register listeners on the messages that changes the whole application.
    socket.on("user-login-successful", (args) => {
      this.setUserName(args);
    })
    socket.on("renew-room-state", (args) => {
      this.setRoomState(args);
      this.setPage("RoomPage");
    })
    switch(this.state.pageName){
      case "LoginPage":{
        return (
          <LoginPage
            userName={this.state.userName}></LoginPage>
        );
      }
      case "GamePage":{
        return (
          <GamePage gameState={this.state.gameState}></GamePage>
        );
      }
      case "RoomPage":{
        return (
          <RoomPage></RoomPage>
        );
      }
      default:{
        return <ErrorPage reason={"PageNotFound"}></ErrorPage>;
      }
    }
    
  }
}
export default App;
