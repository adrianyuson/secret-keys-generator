import React, { Component } from 'react';
import Table from './components/Table';
import New from './components/New';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      secretKey: ['---', '---', '---', '---'],
      secretKeys: [],
      description: "",
      generatedNewKey: false,
      sortedByName: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.generateNewKey = this.generateNewKey.bind(this);
    this.saveNewKey = this.saveNewKey.bind(this);
    this.refreshKeys = this.refreshKeys.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByExpiry = this.sortByExpiry.bind(this);
  }

  generateNewKey() {
    fetch("http://localhost:8000/create-secret-key")
        .then(res => res.json())
        .then(jsonRes => this.setState({ secretKey: jsonRes }))
        .catch(err => console.log(err));
        this.setState({ generatedNewKey: true });
  }

  saveNewKey() {
    if(this.state.generatedNewKey) {
      fetch("http://localhost:8000/insert-secret-key", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            'name' : this.state.secretKey[0],
            'description' : this.state.description,
            'expiry' : this.state.secretKey[2],
            'secret' : this.state.secretKey[3],
          }
        )
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.setState({ secretKey: ['---', '---', '---', '---'] });
      this.setState({ description: '' });
      this.setState({ generatedNewKey: false });
      this.getAllKeys(); // reload the keys table
    } else {
      window.alert('Please generate a new key first!');
    }
  }

  refreshKeys() {
    fetch("http://127.0.0.1:8000/refresh-secret-keys")
      .then(res => console.log(res))
      .catch(err => console.log(err));
      this.getAllKeys();
  }

  getAllKeys() {
    fetch("http://localhost:8000/get-all-secret-keys")
      .then(res => res.json())
      .then(jsonRes => this.setState({ secretKeys: jsonRes }))
      .catch(err => console.log(err));
  }

  sortByName() {
    let sortedList = this.state.secretKeys;
    sortedList.sort(function(a,b){
      return parseInt(b[1])  - parseInt(a[1]);
    }).reverse();
    this.setState({ secretKeys: sortedList });
  }

  sortByExpiry() {
    let sortedList = this.state.secretKeys;
    sortedList.sort(function(a,b){
      return (b[3]['date'])  - (a[3]['date']);
    }).reverse();
    this.setState({ secretKeys: sortedList });
  }

  componentDidMount() {
    this.getAllKeys();
  }

  handleDescChange(e) {
    this.setState({ description: e.target.value });
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.generateNewKey}>Generate New Key</button>
          {this.state.generatedNewKey && 
            <New secretKey={this.state.secretKey}></New>
          }
          <input
              type="text"
              placeholder="Enter your own description"
              value={this.state.description}
              onChange={this.handleDescChange}
          />
          <button onClick={this.saveNewKey}>Save Key to Database</button>
          <Table secretKeys={this.state.secretKeys}></Table>
          <button onClick={this.refreshKeys}>Refresh Keys</button>
          <button onClick={this.sortByName}>Sort by Name</button>
          <button onClick={this.sortByExpiry}>Sort by Expiry Date</button>
        </header>
      </div>
    );
  }
}

export default App;
