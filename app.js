const Web3 = require('web3');
const TelegramBot = require('node-telegram-bot-api');

// const provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/af7468d0f18b4e4e922976ab88098c80');

const providers = new Web3.providers.WebsocketProvider('wss://withered-quick-borough.bsc.discover.quiknode.pro/aa114e030e44b6d7436743dac3411ce10eb79bf4/');

const web3 = new Web3(providers);

const bot = new TelegramBot('6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY', { polling: true });
const chatId = '1833036677';


// Replace with your Infura project ID


// Replace with the wallet address you want to monitor
// const walletAddress = '0x1234567890';

// web3.eth.subscribe('pendingTransactions', (error, txHash) => {
//   if (error) {
//     console.error(error);
//   }
//    if (txHash){
//     console.log(txHash)
//    }

//   web3.eth.getTransaction(txHash, (error, tx) => {
//     if (error) {
//       console.error(error);
//     }

//     if (tx && tx.to === walletAddress) {
//       console.log(`New transaction detected: ${tx.hash}`);

//       // Replace with your message text
//       const message = `A new transaction has been made to your wallet: ${tx.hash}`;
//       bot.sendMessage(chatId, message);
//     }
//   });
// });

web3.eth.subscribe('pendingTransactions')
.on('data', async transaction => {
  console.log(`Transaction: ${transaction}`)
})
.on('error', error => {
    console.log(error)
})
web3.eth.getTransaction("0xa48f92cdf58628a0dbbdb8ba4caf00f4ddfae75a9a3b5c96a3cca5ae99020271", (error, tx) => {
  if (error) {
    console.error(error);
  }

  // if (tx && tx.to === walletAddress) {
  //   console.log(`New transaction detected: ${tx.hash}`);

  //   // Replace with your message text
   const message = `A new transaction has been made to your wallet: ${tx.to}`;
  // }
  bot.sendMessage(chatId, message);
});

