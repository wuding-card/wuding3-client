import React from "react";
import { socket } from "../communication/connection";
import { RoomState } from "../regulates/interfaces";
import { Deck } from "../regulates/type";
import { PopupBtn } from "./Composition";
import './RoomPage.css';

interface DeckShowerProps {
  deck: Deck
}

class DeckShower extends React.Component<DeckShowerProps> {
  
  render(): React.ReactNode {
    const getEntryByDeck = (deck: Deck) => deck.cardList.map(item => <div className="deck-entry">{item}</div>);
    return (
      <div className="room-user-deck-box">
        <div className="room-user-deck-title">
          {this.props.deck.name}
        </div>
        <PopupBtn btnComponent={
            <div className="room-user-deck-card"></div>
          } windowComponent={
            getEntryByDeck(this.props.deck)
          }>
        </PopupBtn>
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
    this.swapUserOnClick = this.swapUserOnClick.bind(this);
    this.leaveRoomOnClick = this.leaveRoomOnClick.bind(this);
  }

  startGameOnClick() {
    socket.emit('room-start-game');
  }
  
  swapUserOnClick() {
    socket.emit('swap-room-user');
  }

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
          <DeckShower deck = {roomState.decks[0]}></DeckShower>
          <div className="room-user-box room-user-box-left">
            <div className="room-user-name">{roomState.users[0] != null? roomState.users[0]: "+"}</div>
          </div>
          <div className="room-user-box room-user-box-right">
            <div className="room-user-name">{roomState.users[1] != null? roomState.users[1]: "+"}</div>
          </div>
          <DeckShower deck = {roomState.decks[1]}></DeckShower>
        </div>
        <div className="room-bottom">
          <div className="room-button" onClick = {this.startGameOnClick}>
            进入游戏
          </div>
          <div className="room-button" onClick = {this.swapUserOnClick}>
            交换位置
          </div>
          <div className="room-button" onClick = {this.leaveRoomOnClick}>
            退出房间
          </div>
        </div>
      </div>
    )
  }
}