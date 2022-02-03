import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';
import { CardState, GameState, PlayerState} from './regulates/interfaces'

const cardStateExampleTapped : CardState = {
  name: "法阵法器法术三合一超级能力丰富俱全名字超长供给测试专属卡",
  counter: {
    "level":2,
  },
  tapped: true,
  faceup: true,
  power: 3,
  durablility: 5,
  defense: 4,
};

const cardStateExampleUntapped : CardState = {
  name: "法阵法器法术三合一超级能力丰富俱全名字超长供给测试专属卡",
  counter: {
    "level":2,
  },
  tapped: false,
  faceup: true,
  power: 3023000000,
  durablility: 1200000000000,
  defense: 400000000,
};

const cardStateExampleFacedownTapped : CardState = {
  name: "法阵法器法术三合一超级能力丰富俱全名字超长供给测试专属卡",
  counter: {
    "level":2,
  },
  tapped: false,
  faceup: false,
  power: 3023000000,
  durablility: 1200000000000,
  defense: 400000000,
};

const cardStateExampleFacedownUntapped : CardState = {
  name: "法阵法器法术三合一超级能力丰富俱全名字超长供给测试专属卡",
  counter: {
    "level":2,
    "addon_power":231388
  },
  tapped: true,
  faceup: false,
  power: 3023000000,
  durablility: 1200000000000,
  defense: 400000000,
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
  myGroundState: {
    sorceryState: [cardStateExampleTapped,cardStateExampleUntapped,cardStateExampleUntapped,cardStateExampleFacedownTapped,cardStateExampleFacedownUntapped,cardStateExampleTapped,cardStateExampleUntapped,cardStateExampleTapped],
    zisurruState: [cardStateExampleTapped,cardStateExampleTapped,cardStateExampleUntapped],
    equipmentState: [cardStateExampleTapped,cardStateExampleUntapped,cardStateExampleTapped],
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
