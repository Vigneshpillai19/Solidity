const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('Web3');
const { interface,bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'parent vessel once increase share mixture nasty spoon autumn story fog before',
    'https://rinkeby.infura.io/v3/775d88cc749a4ef1bff9cada81a065d3',
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Attempting to deploy from accounts : ' + accounts[0]);

        const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data:bytecode }).send({ from:accounts[0], gas:'3000000' });

        console.log(interface);

        console.log('Contract deployed to ',result.options.address);

    }catch {
        console.log('Error in deploying the contract.....');
    }
}
deploy();

// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
// const { interface, bytecode } = require('./compile.js');

// const deploy = async () => {
//     try{
//         const accounts = await new web3.eth.getAccounts();
//         console.log('Attempting to deploy from contract ', accounts[0]);
//         const result = await new web3.eth.Contract(JSON.parse(interface)).deloy({ data: bytecode }).send({ from: accounts[0], gas:'3000000'});
//         console.log('Contract deployed to ', result.options.address);
//     } catch(error){
//         console.log('Failed to deploy Contract...');
//     }
// };
// deploy();