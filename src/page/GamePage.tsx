import React from 'react';
import logo from '../assets/lowlogo.png';
import gameBackground from '../assets/game-background.png';
import './GamePage.css';
import internal from 'stream';
import { countReset } from 'console';
import { CardState, GameState, PlayerState} from '../regulates/Interfaces'

interface CardDisplayProps {
  cardState: CardState,
}

class CardDisplay extends React.Component<CardDisplayProps,{}> {
  render() {
    return (
      <div className={'card-ground '+this.props.cardState.tapped?'card-ground-tapped':''}></div>
    );
  }
}

interface GamePageProps {
  gameState: GameState,
}

class GamePage extends React.Component<GamePageProps,{}> {
  render() {
    return (
      <div className="game-scene">
        <div className="my-displayer">
          <div className="my-sorcery">
            <CardDisplay cardState={this.props.gameState.groundState.sorceryState[0]}></CardDisplay>
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