import React from 'react';
import logo from '../assets/lowlogo.png';
import gameBackground from '../assets/game-background.png';
import './GamePage.css';
import internal from 'stream';
import { countReset } from 'console';



interface Card {
  name: string,
  counter: Record<string,number>,
  tapped: boolean,
  faceup: boolean,
  power?: number,
  defense?: number,
  durablility?: number,
}

const CardExample : Card = {
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

class CardDisplay extends React.Component<Card,{}> {
  render() {
    return (
      <div className=''></div>
    );
  }
}

interface PlayerState {
  health: number,
  mana: number,
  level: number,
}

interface GamePageProps {
  gameState: {
    playerState: PlayerState[],
  };
}

class GamePage extends React.Component<GamePageProps,{}> {
  render() {
    return (
      <div className="game-scene">
        <div className="my-displayer">
          <div className="my-sorcery">
            
          </div>
          <div className="my-info">
            <p>{"命火: " + this.props.gameState.playerState[0].health}</p>
            <p>{"灵力/修为: " + this.props.gameState.playerState[0].mana + "/" + this.props.gameState.playerState[0].level}</p>
          </div>
        </div>
        
      </div>
    );
  }
}

export default GamePage;