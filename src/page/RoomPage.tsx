import React from "react";
import { socket } from "../communication/connection";
import { RoomState } from "../regulates/interfaces";
import { Deck } from "../regulates/type";
import './RoomPage.css';
interface DeckShowerProps {
  info: {
    name: string,
    deck: Deck,
  }
}

class DeckShower extends React.Component<DeckShowerProps, {}> {
  
  render(): React.ReactNode {
    return (
      <div className="room-user-deck-box">
        <div className="room-user-deck-title">
          {this.props.info.name}
        </div>
        <div className="room-user-deck-card">

        </div>
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
          <div className="room-button" onClick = {this.leaveRoomOnClick}>
            退出房间
          </div>
        </div>
      </div>
    )
  }
}