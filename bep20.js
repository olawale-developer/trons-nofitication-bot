const Web3 = require('web3');
const providers = new Web3.providers.WebsocketProvider('wss://withered-quick-borough.bsc.discover.quiknode.pro/aa114e030e44b6d7436743dac3411ce10eb79bf4/');
const TelegramBot = require('node-telegram-bot-api');
const chatId = '1833036677';
const dotenv = require('dotenv');
const twilio = require('twilio');
dotenv.config();

const bot = new TelegramBot('6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY', { polling: true });

// create a web3 instance with the provider
const web3 = new Web3(providers);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

const walletAddress = '0x7776960519BdF57AD6DEAf46a7851c57a7aB5b91';


web3.eth.subscribe('pendingTransactions', (error, txHash) => {
    if (error) {
    console.error(error);
  }
  console.log(txHash)
  
  web3.eth.getTransaction(txHash, (error, tx) => { 
    if (error) {
      console.error(error);
    }

    if (tx && tx.to === walletAddress) {
      console.log(`New transaction detected: ${tx.hash}`);

      // Replace with your message text
      const message = `A new transaction has been made to your wallet: ${tx.hash}`;

      twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+2347035194443"
      })
      
      .catch(error => console.error(error));

      bot.sendMessage(chatId, message);
    }
  });
});
