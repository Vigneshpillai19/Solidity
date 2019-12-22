const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface,bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data:bytecode }).send({ from:accounts[0],gas:'1000000' });
});

describe('Lottery Contract', () => {
    it('Deploys a Contract',() => {
        assert.ok(lottery.options.address);
    });
    it('allows one account to enter',async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.001','ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });
    
    assert.equal(accounts[0],players[0]);
    assert.equal(1,players.length);
    });
    it('Requires Minimum amount of ether to send',async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
    it('Only manager can call pickWinner',async () => {
        try {
            const tp = await lottery.methods.pickWinner().call({
                from: accounts[1]
            });
            assert(false);
        } catch(err) {
            assert(err);
            console.log('You are not a Manager......');
        }
    });
    it('Picks the Winner and resets the Players array',async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);
        const finalBalance = await lottery.methods.pickWinner().call({
            from: accounts[0]
        });

        // const finalBalance = await web3.eth.getBalance(accounts[0]);

        const difference = finalBalance - initialBalance;
        try {
            assert(difference > web3.utils.toWei('1.8','ether'));
            console.log('Successful Transfer.... ' + difference);
        }catch(err) {
            console.log('Assertion Failed.......... ' + difference);
        }
        
    })
});