/* ======== GameInfo ======== */

export interface PlayerState {
  health: number,
  mana: number,
  level: number,
}

export interface CardState {
  name: string,
  counter: Record<string,number>,
  tapped: boolean,
  faceup: boolean,
  power?: number,
  defense?: number,
  durablility?: number,
}

export interface GameState {
  playerState: PlayerState[],
  myGroundState: {
    sorceryState: CardState[],
    equipmentState: CardState[],
    zisurruState: CardState[],
  }
}