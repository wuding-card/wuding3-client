import counterDictionary from "../assets/text/counter.json";
import cardDescription from "../assets/text/cardDescription.json";

export const CounterDictionary: Record<string,string> = counterDictionary;

export const AttributeList: Record<string,string> = {
  "power": "攻击",
  "defense": "防御",
  "durability": "耐久",
}

export function attributeTranslate(val: string): string {
  return val in AttributeList? AttributeList[val]: "";
}

export function counterTranslate(val: string): string {
  return val in CounterDictionary? CounterDictionary[val]: val;
}

export const CardDescription: Record<string,string> = cardDescription;

export function getDescription(val: string): string {
  return val in CardDescription?CardDescription[val]:"卡牌无描述";
}

export const SectList: string[] = ["通用","奔雷","焚金","焚天","光华","飘渺","天灵","万法","元力"];
export const TypeList: string[] = ["万物","即时","触发","持续","法阵","攻击","防御","法器"];
export const LevelList: string[] = ["凡人","炼气","筑基","金丹","元神","炼虚","涅槃","逍遥"];

export function showSect(val: number): string {
  return SectList[val];
}

export function showType(val: number): string {
  return TypeList[val];
}

export function showLevel(val: number): string {
  return val<=7?LevelList[val]:LevelList[7];
}


export function numberAbbr(val: number): string {
  let ret = "Number Abbr Failed";
  if(val<1000){
    return val.toString();
  }else if(val<10000){
    return (Math.floor(val/1000)).toString() + "k";
  }else if(val<10000000){
    return (Math.floor(val/10000)).toString() + "w";
  }else if(val<1e10){
    return val.toPrecision(1);
  }else{
    return "很大";
  }
  return ret;
}
