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