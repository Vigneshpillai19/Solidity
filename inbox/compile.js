const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');
const source = fs.readFileSync(inboxPath,'utf8');

// Inbox Contract is compiled using solc compiler and bytecode,ABI is exported
// Colon specifies exporting only Inbox Contract
module.exports = solc.compile(source,1).contracts[':Inbox'];