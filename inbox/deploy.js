const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface,bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'parent vessel once increase share mixture nasty spoon autumn story fog before',
    'https://rinkeby.infura.io/v3/775d88cc749a4ef1bff9cada81a065d3',
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account ',accounts[0]);

        const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({ data:bytecode, arguments:['Hii There!']}).send({ from: accounts[0], gas:'3000000' });

        console.log('Contract deployed to ',result.options.address);    
    } catch (error) {
        console.log('Failed to Deploy....',error);
    }
    
};
deploy();