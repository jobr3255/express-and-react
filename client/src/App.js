import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = {
    passwords: [],
    something: null,
    response: null }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(passwords => this.setState({ passwords }));
  }

  getSomething = () => {
    // Get the passwords and store them in state
    fetch('/api/something')
      .then(res => res.json())
      .then(something => this.setState({ something: something.data }));
  }

  getUsers = () => {
    // Get the passwords and store them in state
    fetch('/api/users')
      .then(res => res.json())
      .then(res => this.setState({ response: res }) )
      .catch(err => console.log(err));
  }

  render() {
    const { passwords, something, response } = this.state;
    let content = <div>No users</div>;;
    if(response != null){
      content = (
        <div className="App-intro">
          {response.map(
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
        <div>
          {something}
          <br/>
          <button
            className="more"
            onClick={this.getSomething}>
            Get Something
          </button>
        </div>
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No Passwords</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
        <div>
          <div>
            {content}
          </div>
          <button
            className="more"
            onClick={this.getUsers}>
            Get Users
          </button>
        </div>
      </div>
    );
  }
}

export default App;
