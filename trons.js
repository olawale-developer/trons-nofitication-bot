const TelegramBot = require('node-telegram-bot-api');
const TronWeb = require('tronweb');
const chatId = '1833036677';
const telegramToken = '6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY';
const bot = new TelegramBot(telegramToken, { polling: true });



async function getLatestBlockTransactions() {
    const tronWeb = new TronWeb({
 //  fullHost: 'https://nile.trongrid.io',
  fullHost: 'https://api.trongrid.io',

});
  
    try {
      // Get information about the latest block
      const block = await tronWeb.trx.getCurrentBlock();
      const blockNumber = block.block_header.raw_data.number;
  
      // Get all transactions from the latest block
      const transactions = await tronWeb.trx.getTransactionFromBlock(blockNumber);
  
      // Filter transactions by address to track current transactions inside your wallet
      const myAddress = 'TS4EAsooap42JDnMHYCkuyMCZo3Fw1ngTa';
  
      for (const tx of transactions) {
        const contract = tx.raw_data.contract[0];
        if (contract.type === 'TransferContract') {
            const senderAddress = tronWeb.address.fromHex(contract.parameter.value.owner_address);
            const receiverAddress = tronWeb.address.fromHex(contract.parameter.value.to_address);
             const timestamp = tx.raw_data.timestamp;
        
        // Convert timestamp to Nigeria time (UTC+1)
        const dateSent = new Date(timestamp);
        dateSent.setHours(dateSent.getHours() + 1);
        const nigeriaTime = dateSent.toUTCString();

             const amount = contract.parameter.value.amount / 10 ** 6;
              if (receiverAddress === myAddress) {
            const message = `${amount} TRX token was sent FROM:${senderAddress}  TO:${receiverAddress} AT THIS TIME:${nigeriaTime}`
            bot.sendMessage(chatId, message);
            console.log(message)
          } 
        }
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  


  setInterval(getLatestBlockTransactions, 3000);