import React from 'react';
import logo from '../assets/lowlogo.png';
import gameBackground from '../assets/game-background.png';
import './GamePage.css';
import internal from 'stream';
import { assert, countReset } from 'console';
import { CardState, GameState, PlayerState} from '../regulates/interfaces';
import { numberAbbr } from '../regulates/utils';

interface CardDetailInfoProps {
  name: string,
  value: string,
}

class CardDetailInfo extends React.Component<CardDetailInfoProps,{}> {
  render() {
    return (
      <div className="card-detail-info">
        <p className="card-detail-info-name">{this.props.name}</p>
        <p className="card-detail-info-value">{this.props.value}</p>
      </div>
    );
  }
}

interface CardDetailProps {
  cardState: CardState
}

class CardDetail extends React.Component<CardDetailProps,{}> {
  detailInfoGenerator() {
    let ret = [
      (this.props.cardState.power!==undefined?<CardDetailInfo name={"攻击"} value={numberAbbr(this.props.cardState.power)}/>:null),
      (this.props.cardState.durablility!==undefined?<CardDetailInfo name={"耐久"} value={numberAbbr(this.props.cardState.durablility)}/>:null),
      (this.props.cardState.defense!==undefined?<CardDetailInfo name={"防御"} value={numberAbbr(this.props.cardState.defense)}/>:null),
    ];
    for(const key in this.props.cardState.counter) {
      ret.push(<CardDetailInfo name={key} value={numberAbbr(this.props.cardState.counter[key])}/>);
    }
    return ret;
  }
  render() {
    return (
      <div className="card-detail">
        <p className="card-detail-name">{this.props.cardState.name}</p>
        {this.props.cardState.power!==undefined?<p className="card-detail-power">{"攻击" + numberAbbr(this.props.cardState.power)}</p>:null}
        {this.props.cardState.durablility!==undefined?<p className="card-detail-durability">{"耐久" + numberAbbr(this.props.cardState.durablility)}</p>:null}
        {this.props.cardState.defense!==undefined?<p className="card-detail-defense">{"防御" + numberAbbr(this.props.cardState.defense)}</p>:null}
        <div className="card-detail-info-frame">
          {this.detailInfoGenerator()}
        </div>
      </div>
    );
  }
}

interface CardDisplayProps {
  cardState: CardState,
  onHover: (val: CardState | null) => void,
}

class CardDisplay extends React.Component<CardDisplayProps,{}> {
  render() {
    let ret = (<div className='error-placeholder'></div>);
    if(this.props.cardState.faceup) {
      ret = (
        <div className={'card-ground '+(this.props.cardState.tapped?'card-ground-tapped':'')} 
        onMouseEnter={() => {this.props.onHover(this.props.cardState);}} onMouseLeave={() => {this.props.onHover(null);}}>
          <p className={'card-ground-name'}>{this.props.cardState.name}</p>
          {this.props.cardState.power!==undefined?<p className="card-ground-power">{numberAbbr(this.props.cardState.power)}</p>:null}
          {this.props.cardState.durablility!==undefined?<p className="card-ground-durability">{numberAbbr(this.props.cardState.durablility)}</p>:null}
          {this.props.cardState.defense!==undefined?<p className="card-ground-defense">{numberAbbr(this.props.cardState.defense)}</p>:null}
        </div>
      )
    } else {
      ret = (
        <div className={'card-ground '+(this.props.cardState.tapped?'card-ground-tapped':'')}>
          背面暂时长这个样，这种事情也是没办法的嘛...
        </div>
      )
    }
    return ret;
  }
}

interface GamePageProps {
  gameState: GameState,
}

interface GamePageState {
  showingCard: CardState | null,
}

class GamePage extends React.Component<GamePageProps,GamePageState> {

  constructor(props: any) {
    super(props);
    this.state = {
      showingCard: null,
    };
    this.setDetailDisplay = this.setDetailDisplay.bind(this);
  }

  setDetailDisplay(val: CardState | null) {
    this.setState({showingCard: val});
  }

  cardListGenerator(arr: CardState[],limit: number) {
    console.assert(arr.length <= limit);
    return arr.map(state => <CardDisplay cardState={state} onHover={this.setDetailDisplay} />);
  }

  render() {
    return (
      <div className="game-scene">
        <div className="my-displayer">
          <div className="my-sorcery">
            {this.cardListGenerator(this.props.gameState.myGroundState.sorceryState, 8)}
          </div>
          <div className="my-zisurru">
            {this.cardListGenerator(this.props.gameState.myGroundState.zisurruState, 3)}
          </div>
          <div className="my-equipment">
            {this.cardListGenerator(this.props.gameState.myGroundState.equipmentState, 3)}
          </div>
          <div className="my-info">
            <p>{"命火: " + this.props.gameState.playerState[0].health}</p>
            <p>{"灵力/修为: " + this.props.gameState.playerState[0].mana + "/" + this.props.gameState.playerState[0].level}</p>
          </div>
        </div>
        {this.state.showingCard!=null?<CardDetail cardState={this.state.showingCard} />:null}
      </div>
    );
  }
}

export default GamePage;