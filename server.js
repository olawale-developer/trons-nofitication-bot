const Web3 = require('web3') 
const provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/af7468d0f18b4e4e922976ab88098c80');
const TelegramBot = require('node-telegram-bot-api');
const chatId = '1833036677';

const bot = new TelegramBot('6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY', { polling: true });

// create a web3 instance with the provider
const web3 = new Web3(provider);

web3.eth.subscribe('pendingTransactions', (error, txHash) => {
    if (error) {
    console.error(error);
  }
  
  web3.eth.getTransaction(txHash, (error, tx) => { 
    if (error) {
      console.error(error);
    }

    if (tx && tx.to === walletAddress) {
      console.log(`New transaction detected: ${tx.hash}`);

      // Replace with your message text
      const message = `A new transaction has been made to your wallet: ${tx.hash}`;
      bot.sendMessage(chatId, message);
    }
  });
});











// web3.eth.subscribe('pendingTransactions')
// .on('data', async transaction => {
//   console.log(`Transaction: ${transaction}`)
// })
// .on('error', error => {
//     console.log(error)
// })