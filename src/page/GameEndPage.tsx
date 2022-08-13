import React from "react";
import './GameEndPage.css';


import { GameResult } from "../regulates/interfaces";
interface GameEndPageProps{
  gameResult: GameResult,
  backRoom: () => void,
}
export class GameEndPage extends React.Component<GameEndPageProps,{}> {
  render(): React.ReactNode {
    return (
      <div className="game-end-scene">
        <div className="game-result">
          <p>{"游戏结束"}</p>
          <p>
            {this.props.gameResult === GameResult.AWIN? "先手玩家胜利":
              (this.props.gameResult === GameResult.BWIN? "后手玩家胜利": "平局")}
          </p>
        </div>
        <div className="back-room-btn" onClick={this.props.backRoom}>
          返回房间
        </div>
      </div>
    );
  }
}