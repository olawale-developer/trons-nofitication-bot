const Web3 = require('web3');
const providers = new Web3.providers.WebsocketProvider('wss://withered-quick-borough.bsc.discover.quiknode.pro/aa114e030e44b6d7436743dac3411ce10eb79bf4/');
const TelegramBot = require('node-telegram-bot-api');
const chatId = '1833036677';

const bot = new TelegramBot('6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY', { polling: true });

// create a web3 instance with the provider
const web3 = new Web3(providers);

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
