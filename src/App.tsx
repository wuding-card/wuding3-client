import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';
import { CardState, GameResult, GameStage, GameState, GameStep, PlayerState, RoomState} from './regulates/interfaces'
import { socket } from './communication/connection';
import { RoomPage } from './page/RoomPage';
import { PlayerOperation } from './regulates/signals';
import { GameEndPage } from './page/GameEndPage';

interface AppState {
  userName: string,
  pageName: string,
  gameState: GameState,
  signal: PlayerOperation,
  roomState: RoomState,
  gameResult: GameResult,
}

class App extends React.PureComponent<{},AppState> {

  setPage(val: string) {
    this.setState({pageName: val});
  }
  // Todo: setRoomState
  setRoomState(val: RoomState) {
    this.setState({roomState: val});
  }

  setGameState(val: GameState) {
    this.setState({gameState: val});
  }

  setSignal(val: PlayerOperation) {
    this.setState({signal: val});
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
      signal: PlayerOperation.NONE,
      roomState: {
        roomName: "",
        users: [],
        decks: [],
      },
      gameResult: GameResult.DRAW,
    };
    this.setPage = this.setPage.bind(this);
    this.setGameState = this.setGameState.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.setRoomState = this.setRoomState.bind(this);

    // Register listeners on the messages that changes the whole application.
    
    socket.on("renew-game-state", (args) => {
      this.setGameState(args.state);
      console.log(args);
      if(args.signal === PlayerOperation.NONE) {
        this.setSignal(PlayerOperation.NONE);
        socket.emit("player-signal-ingame", {type: PlayerOperation.NONE, state: null});
      }else{
        this.setSignal(args.signal);
      }
      this.setPage("GamePage");
    });
    socket.on("user-login-successful", (args) => {
      this.setUserName(args);
    });
    socket.on("renew-room-state", (args) => {
      this.setRoomState(args);
      this.setPage("RoomPage");
    });
    socket.on("room-game-end", (args) => {
      this.setPage("GameEndPage");
      this.setState({
        gameResult: args,
      })
    })
    socket.on("leave-room-successful", () => {
      this.setPage("LoginPage");
      this.setRoomState({
        roomName: "",
        users: [],
        decks: [],
      });
    });
  }

  render() {
    
    switch(this.state.pageName){
      case "LoginPage":{
        return (
          <LoginPage
            userName={this.state.userName}></LoginPage>
        );
      }
      case "GamePage":{
        return (
          <GamePage gameState={this.state.gameState} signal={this.state.signal}></GamePage>
        );
      }
      case "RoomPage":{
        console.log("roompage");
        return (
          <RoomPage roomState = {this.state.roomState}></RoomPage>
        );
      }
      case "GameEndPage":{
        return (
          <GameEndPage gameResult = {this.state.gameResult}/>
        );
      }
      default:{
        return <ErrorPage reason={"PageNotFound"}></ErrorPage>;
      }
    }
    
  }
}
export default App;
