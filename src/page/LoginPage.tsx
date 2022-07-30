import React from 'react';
import logo from '../assets/logos/lowlogo.png';
import './LoginPage.css';
import internal from 'stream';
import { Message, socket } from '../communication/connection';
import { GameState } from '../regulates/interfaces';

/* 主页面对应的 React 控件 */

interface FormState {
  userName: string;
  roomID: string;
}

interface FormProps {
  enterGameOnClick: (info: FormState) => void
}

class BasicInfoForm extends React.Component<FormProps,FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: "佚名",
      roomID: "1024",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loginClick = this.loginClick.bind(this)
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value:string = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    } as any);
  }

  loginClick() {
    this.props.enterGameOnClick(this.state);
  }

  render() {
    return (
      <div>
        <form className="basic-info-form">
          <label>
            用户名
            <input
              name="userName"
              type="text"
              value={this.state.userName}
              onChange={this.handleInputChange} />
          </label>
          <br></br>
          <label>
            房间号
            <input
              name="roomID"
              type="text"
              value={this.state.roomID}
              onChange={this.handleInputChange} />
          </label>
        </form>
        <div className="login-enter" onClick={this.loginClick}>进入游戏</div>
      </div>
    );
  }
}

interface LoginPageProps {
  setPage: (val: string) => void,
  setGameState: (gameState: GameState) => void,
}

class LoginPage extends React.Component<LoginPageProps,{}> {
  constructor(props: any) {
    super(props);
    this.enterGameOnClick = this.enterGameOnClick.bind(this);
  }

  enterGameOnClick(info: FormState){
    socket.emit("enter-game",info);
    socket.on("renew-game-state", (args) => {
      console.log(args);
      this.props.setGameState(args.state);
      this.props.setPage("GamePage");
    });
  }

  render() {
    return (
      <div className="login-scene">
        <header className="login-header">
          <img src={logo} className="login-logo" alt="logo"></img>
          <BasicInfoForm enterGameOnClick={this.enterGameOnClick}></BasicInfoForm>
        </header>
      </div>
    );
  }
}

export default LoginPage;
