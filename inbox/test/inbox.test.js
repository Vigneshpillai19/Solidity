const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {interface,bytecode} = require('../compile');

// class Car{
//     park() {
//         return 'Stopped';
//     }

//     drive(){
//         return 'Started';
//     }
// }

// let car = new Car();
// // beforeEach(() => {
// //     car = new Car();
// // });

// describe('Car Details', ()=> {
//     it('can park', ()=> {
//         assert.equal(car.park(),'Stopped');
//     });
//     it('can drive', ()=> {
//         assert.equal(car.drive(),'Started');
//     });
// });

let accounts;
let inbox;

beforeEach(async () => {
    // Get List of all Accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the accounts to deploy the contracts
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['Hii there!']}).send({from:accounts[0],gas:'1000000'});
});

describe('Inbox',()=>{
    it('Contract has deployed',()=>{
        assert.ok(inbox.options.address);
    });
    it('Get a contract message',async () => {
        const message = await inbox.methods.message().call();
        assert.equal('Hii there!',message);
    });
    it('Altering Contract message',async () => {
        await inbox.methods.setMessage('Bye There!').send({from :accounts[0],gas:'1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message,'Bye There!');
    })
});