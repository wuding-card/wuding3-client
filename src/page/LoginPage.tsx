import React from 'react';
import logo from '../assets/logos/lowlogo.png';
import './LoginPage.css';
import internal from 'stream';
import { Message, socket } from '../communication/connection';
import { GameState } from '../regulates/interfaces';
import { getUUID } from '../regulates/utils';

/* 主页面对应的 React 控件 */

interface FormState {
  value: Record<string,string>;
}

interface FormProps {
  formName: string,
  buttonName: string,
  formVariables: Record<string,string>
  formClassName: string,
  formButtonOnClick: (info: Record<string,string>) => void
}

class BasicInfoForm extends React.Component<FormProps,FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.formVariables,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this)
  }

  handleInputChange(event: any) {
    const target = event.target;

    const value:string = target.value;
    const name = target.name;

    const nowValue = this.state.value;
    nowValue[name] = value;
    this.setState({
      value: nowValue
    } as any);
  }

  buttonClick() {
    this.props.formButtonOnClick(this.state.value);
  }

  inputGenerator(val: Record<string,string>) {
    const inputs = [];
    for(const i in val) {
      inputs.push(<input
        className= 'basic-info-input'
        name = {i}
        type = "text"
        value = {val[i]}
        onChange={this.handleInputChange}/>);
    }
    return inputs;
  }

  render() {
    return (
      <div>
        <form className="basic-info-form">
          <label>
            {this.props.formName}
            {this.inputGenerator(this.props.formVariables)}
          </label>
        </form>
        <div className="basic-info-button" onClick={this.buttonClick}>{this.props.buttonName}</div>
      </div>
    );
  }
}

interface LoginPageProps {
  setPage: (val: string) => void,
  setGameState: (gameState: GameState) => void,
  setUserName: (val: string) => void,
}

class LoginPage extends React.Component<LoginPageProps,{}> {
  constructor(props: any) {
    super(props);
    this.enterGameOnClick = this.enterGameOnClick.bind(this);
    this.userLoginOnClick = this.userLoginOnClick.bind(this);
  }

  enterGameOnClick(info: Record<string, string>){
    socket.emit("enter-game",info);
    socket.on("renew-game-state", (args) => {
      console.log(args);
      this.props.setGameState(args.state);
      this.props.setPage("GamePage");
    });
  }

  userLoginOnClick(info: Record<string, string>) {
    socket.emit("user-login", info["userName"]);
    socket.on("user-login-successful", (args) => {
      this.props.setUserName(args);
    })
  }

  enterRoomOnClick(info: Record<string, string>) {

  }

  render() {
    return (
      <div className="login-scene">
        <header className="login-header">
          <img src={logo} className="login-logo" alt="logo"></img>
          <BasicInfoForm
            formName='用户登陆'
            buttonName='登陆'
            formVariables={{
              userName: "匿名",
            }}
            formClassName='basic-info-form'
            formButtonOnClick={this.userLoginOnClick}/>
          <BasicInfoForm
            formName='房间号'
            buttonName='创建/进入'
            formVariables={{
              roomName: "Room-" + getUUID(),
            }}
            formClassName='basic-info-form'
            formButtonOnClick={this.enterGameOnClick}/>
        </header>
      </div>
    );
  }
}

export default LoginPage;
