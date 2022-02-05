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
  durability?: number,
  maintainCost?: number,
  castCost?: number,
  sectID: number,
  level: number,
  typeID: number,
}

export interface GameState {
  playerState: PlayerState[],
  myGroundState: {
    sorceryState: CardState[],
    equipmentState: CardState[],
    zisurruState: CardState[],
    libraryState: CardState[],
    graveyardState: CardState[],
    blackholeState: CardState[],
  }
  myHandState: CardState[],
  rivalGroundState: {
    sorceryState: CardState[],
    equipmentState: CardState[],
    zisurruState: CardState[],
    libraryState: CardState[],
    graveyardState: CardState[],
    blackholeState: CardState[],
  }
  rivalHandState: CardState[],
}