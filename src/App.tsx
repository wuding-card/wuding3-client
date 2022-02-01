import React from 'react';
import './App.css';
import internal from 'stream';
import LoginPage from './page/LoginPage';
import ErrorPage from './page/ErrorPage';
import GamePage from './page/GamePage';


const testGameState = {
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
  ]
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
