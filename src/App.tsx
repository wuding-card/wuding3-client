import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';
import { CardState, GameStage, GameState, GameStep, PlayerState} from './regulates/interfaces'
import { socket } from './communication/connection';

interface AppState {
  userName: string,
  pageName: string,
  gameState: GameState,
}

class App extends React.PureComponent<{},AppState> {

  setPage(val: string) {
    this.setState({pageName: val});
  }
  // Todo: setRoomState
  setRoomState(val: any) {

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
      userName: "未登陆",
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
      }
    };
    this.setPage = this.setPage.bind(this);
    this.setGameState = this.setGameState.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  render() {
    switch(this.state.pageName){
      case "LoginPage":{
        return (
          <LoginPage setUserName={this.setUserName} setPage={this.setPage} setGameState={this.setGameState}></LoginPage>
        );
      }
      case "GamePage":{
        return (
          <GamePage gameState={this.state.gameState}></GamePage>
        );
      }
      default:{
        return <ErrorPage reason={"PageNotFound"}></ErrorPage>;
      }
    }
    
  }
}
export default App;
