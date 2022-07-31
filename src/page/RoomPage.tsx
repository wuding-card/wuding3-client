import { timeStamp } from "console";
import React from "react";
import { socket } from "../communication/connection";
import { RoomState } from "../regulates/interfaces";
import { Deck } from "../regulates/type";
import './RoomPage.css';

interface DeckDetailProps {
  deck: Deck,
  closeBtnOnClick: () => void,
}

class DeckDetail extends React.Component<DeckDetailProps, {}> {
  deckEntryGenerator(deck: Deck) {
    return deck.map(item => <div className="deck-entry">{item}</div>);
  }
  render(): React.ReactNode {
    return (
      <div className="deck-detail-filter">
        <div className="deck-detail-box">
          {this.deckEntryGenerator(this.props.deck)}
          <div className="close-deck-detail-box" onClick={this.props.closeBtnOnClick}>✖</div>
        </div>
      </div>
    );
  }
}

interface DeckShowerProps {
  info: {
    name: string,
    deck: Deck,
  }
}

interface DeckShowerState {
  showDetail: boolean,
}

class DeckShower extends React.Component<DeckShowerProps, DeckShowerState> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      showDetail: false
    }
    this.detailVisualitySetter = this.detailVisualitySetter.bind(this);
  }

  detailVisualitySetter(val: boolean) {
    this.setState({
      showDetail: val,
    });
  }

  render(): React.ReactNode {
    return (
      <div className="room-user-deck-box">
        <div className="room-user-deck-title">
          {this.props.info.name}
        </div>
        <div className="room-user-deck-card" onClick = {() => this.detailVisualitySetter(true)}>
        </div>
        {this.state.showDetail? <DeckDetail
          deck={this.props.info.deck}
          closeBtnOnClick = {() => this.detailVisualitySetter(false)}/>: <div></div>}
      </div>
    );
  }
}

interface RoomPageProps {
  roomState: RoomState,
}

export class RoomPage extends React.Component<RoomPageProps,{}> {
  constructor(props: any) {
    super(props);
    this.startGameOnClick = this.startGameOnClick.bind(this);
    this.leaveRoomOnClick = this.leaveRoomOnClick.bind(this);
  }

  startGameOnClick() {
    socket.emit('room-start-game');
  }
  
  // swapUserOnClick() {
  //   socket.emit('swap-room-user')
  // }

  leaveRoomOnClick() {
    socket.emit('leave-room');
  }

  render() {
    const roomState = this.props.roomState;
    return (
      <div className="room-scene">
        <div className="room-title">
          {roomState.roomName}
        </div>
        <div className="room-body">
          <DeckShower info = {roomState.decks[0]}></DeckShower>
          <div className="room-user-box room-user-box-left">
            <div className="room-user-name">{roomState.users[0] != null? roomState.users[0]: "+"}</div>
          </div>
          <div className="room-user-box room-user-box-right">
            <div className="room-user-name">{roomState.users[1] != null? roomState.users[1]: "+"}</div>
          </div>
          <DeckShower info = {roomState.decks[1]}></DeckShower>
        </div>
        <div className="room-bottom">
          <div className="room-button" onClick = {this.startGameOnClick}>
            进入游戏
          </div>
          {/* <div className="room-button" onClick = {this.swapUserOnClick}>
            交换位置
          </div> */}
          <div className="room-button" onClick = {this.leaveRoomOnClick}>
            退出房间
          </div>
        </div>
      </div>
    )
  }
}