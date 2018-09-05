import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: null
  };

  componentDidMount() {
    //this.setState({ response: res.data })
    this.callApi()
      .then(res => this.setState({ response: res }) )
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    //console.log(body);
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    let content;
    if(this.state.response != null){
      content = (
        <div className="App-intro">
          {this.state.response.map(
                (user) =>
              <div key={user.id}>
                {user.id} {user.name}
              </div>
            )}
        </div>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {content}
      </div>
    );
  }
}

export default App;
