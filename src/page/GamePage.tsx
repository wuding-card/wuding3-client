import React from 'react';
import logo from '../assets/lowlogo.png';
import gameBackground from '../assets/game-background.png';
import './GamePage.css';
import internal from 'stream';
import { assert, countReset } from 'console';
import { CardState, GameState, PlayerState} from '../regulates/interfaces';
import { numberAbbr, counterTranslate, showSect, showType, showLevel, getDescription } from '../regulates/utils';

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
    const cardState = this.props.cardState;
    let ret = [
      (cardState.power!==undefined?<CardDetailInfo name={"攻击"} value={numberAbbr(cardState.power)}/>:null),
      (cardState.durablility!==undefined?<CardDetailInfo name={"耐久"} value={numberAbbr(cardState.durablility)}/>:null),
      (cardState.defense!==undefined?<CardDetailInfo name={"防御"} value={numberAbbr(cardState.defense)}/>:null),
    ];
    for(const key in cardState.counter) {
      ret.push(<CardDetailInfo name={counterTranslate(key)} value={numberAbbr(cardState.counter[key])}/>);
    }
    if(ret.length > 10) {
      console.log("Error: too much counters.");
    }
    return ret;
  }
  render() {
    const cardState = this.props.cardState;
    // Todo: Replace Type with icon.
    return (
      <div className="card-detail">
        <p className="card-detail-name">{cardState.name}</p>
        {cardState.power!==undefined?<p className="card-detail-power">{"攻击" + numberAbbr(cardState.power)}</p>:null}
        {cardState.durablility!==undefined?<p className="card-detail-durability">{"耐久" + numberAbbr(cardState.durablility)}</p>:null}
        {cardState.defense!==undefined?<p className="card-detail-defense">{"防御" + numberAbbr(cardState.defense)}</p>:null}
        {cardState.castCost!==undefined?<p className="card-detail-cast-cost">{numberAbbr(cardState.castCost)}</p>:null}
        {cardState.maintainCost!==undefined?<p className="card-detail-maintain-cost">{numberAbbr(cardState.maintainCost)}</p>:null}
        <p className="card-detail-sect">{showSect(cardState.sectID)}</p>
        <p className="card-detail-type">{showType(cardState.typeID)}</p>
        <p className="card-detail-level">{showLevel(cardState.level)}</p>
        <p className="card-detail-description">{getDescription(cardState.name)}</p>
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
  lookable: boolean,
}

class CardDisplay extends React.Component<CardDisplayProps,{}> {
  render() {
    const cardState = this.props.cardState;
    let ret = (<div className='error-placeholder'></div>);
    if(cardState.faceup) {
      ret = (
        <div className={'card-ground '+(cardState.tapped?'card-ground-tapped':'')} 
        onMouseEnter={() => {this.props.onHover(cardState);}} onMouseLeave={() => {this.props.onHover(null);}}>
          <p className={'card-ground-name'}>{cardState.name}</p>
          {cardState.power!==undefined?<p className="card-ground-power">{numberAbbr(cardState.power)}</p>:null}
          {cardState.durablility!==undefined?<p className="card-ground-durability">{numberAbbr(cardState.durablility)}</p>:null}
          {cardState.defense!==undefined?<p className="card-ground-defense">{numberAbbr(cardState.defense)}</p>:null}
          {/* Todo: show counters. */}
        </div>
      )
    } else {
      ret = (
        <div className={'card-ground-facedown '+(cardState.tapped?'card-ground-tapped':'')}
          onMouseEnter={this.props.lookable?() => {this.props.onHover(cardState)}:()=>{}} onMouseLeave={this.props.lookable?() => {this.props.onHover(null);}:()=>{}}>
        </div>
      )
    }
    return ret;
  }
}

interface CardHandProps{
  cardState: CardState,
  onHover: (val: CardState | null) => void,
  lookable: boolean,
}

class CardHand extends React.Component<CardHandProps,{}> {
  render() {
    const cardState = this.props.cardState;
    if(this.props.lookable) {
      return (
        <div className={'card-hand'}
        onMouseEnter={() => {this.props.onHover(cardState);}} onMouseLeave={() => {this.props.onHover(null);}}>
          <div className={'card-hand-name'}>
            {cardState.name}
          </div>
        </div>
      );
    }else{
      return (
        <div className={cardState.faceup?'card-hand':'card-hand-facedown'}
        onMouseEnter={cardState.faceup?() => {this.props.onHover(cardState)}:()=>{}} onMouseLeave={cardState.faceup?() => {this.props.onHover(null);}:()=>{}}>
          <div className={'card-hand-name'}>
            {cardState.name}
          </div>
        </div>
      );
    }
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

  groundCardGenerator(arr: CardState[],limit: number,lookable: boolean) {
    console.assert(arr.length <= limit);
    return arr.map(state => <CardDisplay cardState={state} onHover={this.setDetailDisplay} lookable={lookable}/>);
  }

  handCardGenerator(arr: CardState[],inMyHand: boolean) {
    return arr.map(state => <CardHand cardState={state} onHover={this.setDetailDisplay} lookable={inMyHand}/>);
  }

  render() {
    const gameState = this.props.gameState;
    return (
      <div className="game-scene">
        <div className="my-displayer">
          <div className="my-sorcery">
            {this.groundCardGenerator(gameState.myGroundState.sorceryState, 8, true)}
          </div>
          <div className="my-zisurru">
            {this.groundCardGenerator(gameState.myGroundState.zisurruState, 3, true)}
          </div>
          <div className="my-equipment">
            {this.groundCardGenerator(gameState.myGroundState.equipmentState, 3, true)}
          </div>
          <div className="my-library">
            {gameState.myGroundState.libraryState.length}
          </div>
          <div className="my-graveyard">
            {gameState.myGroundState.graveyardState.length}
          </div>
          <div className="my-blackhole">
            {gameState.myGroundState.blackholeState.length}
          </div>
          <div className="my-hand">
            {this.handCardGenerator(gameState.myHandState, true)}
          </div>
          <div className="my-info">
            <p>{"命火: " + gameState.playerState[0].health}</p>
            <p>{"灵力: " + gameState.playerState[0].mana}</p>
            <p>{"修为: " + showLevel(gameState.playerState[0].level)}</p>
          </div>
        </div>
        <div className="rival-displayer">
          <div className="rival-sorcery">
            {this.groundCardGenerator(gameState.myGroundState.sorceryState, 8, false)}
          </div>
          <div className="rival-zisurru">
            {this.groundCardGenerator(gameState.myGroundState.zisurruState, 3, false)}
          </div>
          <div className="rival-equipment">
            {this.groundCardGenerator(gameState.myGroundState.equipmentState, 3, false)}
          </div>
          <div className="rival-library">
            {gameState.myGroundState.libraryState.length}
          </div>
          <div className="rival-graveyard">
            {gameState.myGroundState.graveyardState.length}
          </div>
          <div className="rival-blackhole">
            {gameState.myGroundState.blackholeState.length}
          </div>
          <div className="rival-hand">
            {this.handCardGenerator(gameState.myHandState, true)}
          </div>
          <div className="rival-info">
            <p>{"命火: " + gameState.playerState[0].health}</p>
            <p>{"灵力: " + gameState.playerState[0].mana}</p>
            <p>{"修为: " + showLevel(gameState.playerState[0].level)}</p>
          </div>
        </div>
        {this.state.showingCard!=null?<CardDetail cardState={this.state.showingCard} />:null}
      </div>
    );
  }
}

export default GamePage;