import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';
import { CardState, GameState, PlayerState} from './regulates/Interfaces'

const cardStateExample : CardState = {
  name: "法阵法器法术三合一超级能力丰富俱全名字超长供给测试专属卡",
  counter: {
    "level":2,
  },
  tapped: true,
  faceup: true,
  power: 3,
  defense: 4,
  durablility: 12,
};

const testGameState: GameState = {
  playerState: [
    {
      health: 10,
      mana: 3,
      level: 4,
    },
    {
      health: 9,
      mana: 5,
      level: 6,
    },
  ],
  groundState: {
    sorceryState: [cardStateExample,cardStateExample,cardStateExample],
    equipmentState: [],
    zisurruState: [],
  }
};

interface AppState {
  pageName: string;
}

class App extends React.PureComponent<{},AppState> {

  setPage(val: string) {
    this.setState({pageName: val});
  }

  constructor(props: any){
    super(props);
    this.state = {
      pageName: "LoginPage"
    };
    this.setPage = this.setPage.bind(this);
  }

  render() {
    switch(this.state.pageName){
      case "LoginPage":{
        return (
          <LoginPage enterGame={this.setPage}></LoginPage>
        );
      }
      case "GamePage":{
        return (
          <GamePage gameState={testGameState}></GamePage>
        );
      }
      default:{
        return <ErrorPage reason={"PageNotFound"}></ErrorPage>;
      }
    }
    
  }
}
export default App;
