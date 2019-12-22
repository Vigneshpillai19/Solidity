import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    state = {
      manager: '',
      players: [],
      balance: '',
      value: '',
      message: ''
    };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const manager = await lottery.methods.manager().call({ from: accounts[0] });
    const players = await lottery.methods.getPlayers().call({ from: accounts[0] });
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  };

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message:'Waiting to Enter the Lottery.......' });

    await lottery.methods.enter().send({
      from: accounts[0],
      // from: '0x6F1a39054aaff683B0c0e7DD50204F17A52ef21e',
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have Entered the Lottery Successfully!!!!!' });

    const pl = await lottery.methods.getPlayers().call();
    this.setState({ players: pl });

  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking A Winner.....' });

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    this.setState({ message: 'Winner is Picked!!!!' });
  }

  render() {
    console.log(web3.version);
    // console.log(this.state.players);
    console.log(lottery.options.address);
    console.log(web3.eth.getBalance('0x68C0995fBEc2Cb5C6080442C4cB62dc1843aA06c'));
      return (
        <div>
          <h2>
            Lottery Contract
          </h2>
          <p>
            This contract is managed by { this.state.manager }.
            Currently there are { this.state.players.length } members competing for { web3.utils.fromWei(this.state.balance,'ether') } !!!
          </p>
          <hr />
            <form onSubmit={ this.onSubmit } >
              <div>
                <h2> Want to try Luck? </h2>
                <label>Amount of Ether to Enter: </label>
                <input 
                  value = { this.state.value }
                  onChange = { event => this.setState({ value: event.target.value }) }
                />
              </div>
              <button>Enter</button>
            </form>
          <hr />
          <h2>Ready to Pick a Winner?</h2>
          <button onClick={ this.onClick }>Pick a Winner</button>
            <p> { this.state.message } </p>
        </div>
    );
  }
}

export default App;
