import React from 'react';
import logo from '../assets/lowlogo.png';
import './LoginPage.css';
import internal from 'stream';

/* 主页面对应的 React 控件 */

interface FormState {
  userName: string;
  roomID: string;
}

class BasicInfoForm extends React.Component<{},FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      userName: "佚名",
      roomID: "1024",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: any) {
    const target = event.target;
    const value:string = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    } as any);
  }

  render() {
    return (
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
    );
  }
}

interface LoginPageProps {
  enterGame: (val: string) => void;
}

class LoginPage extends React.Component<LoginPageProps,{}> {

  constructor(props: any) {
    super(props);
    this.enterGameOnClick = this.enterGameOnClick.bind(this);
  }

  enterGameOnClick(){
    this.props.enterGame("GamePage")
  }

  render() {
    return (
      <div className="login-scene">
        <header className="login-header">
          <img src={logo} className="login-logo" alt="logo"></img>
          <BasicInfoForm></BasicInfoForm>
          <div className="login-enter" onClick={this.enterGameOnClick}>进入游戏</div>
        </header>
      </div>
    );
  }
}

export default LoginPage;
