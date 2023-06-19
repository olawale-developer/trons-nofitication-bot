// const TronWeb = require('tronweb');

// const tronWeb = new TronWeb({
//   fullHost: 'https://api.trongrid.io',
// });

// const txHash = '1802a916fac36283b8997743716111a84da8097912a7891359a348a97891ab2e'; // Replace with the transaction hash you want to track

// tronWeb.trx.getTransaction(txHash)
//   .then((transaction) => {
//     const senderHexAddress = transaction.raw_data.contract[0].parameter.value.to_address;
//     const senderAddress = tronWeb.address.fromHex(senderHexAddress);
//     console.log(senderAddress);
//   })
//   .catch((error) => {
//     console.error(error);
//   });





// async function checkPendingTransactions(address) {
  //   const pendingTransactions = await tronWeb.trx.getPendingTransactions();
  //   console.log('My pending transactions:', pendingTransactions);
  // }
  
  // checkPendingTransactions('YOUR_TRON_ADDRESS_HERE');
  
  
  // const transactionId = '1802a916fac36283b8997743716111a84da8097912a7891359a348a97891ab2e'; // Replace with the transaction hash you want to retrieve
  
  // tronWeb.trx.getConfirmedTransaction(transactionId)
  //   .then((transaction) => {
    //     console.log('Transaction:', transaction);
    //   })
    //   .catch((error) => {
      //     console.error('Error:', error);
      //   });
      
      
      
      const TronWeb = require('tronweb')
      const tronWeb = new TronWeb({
              fullHost: 'https://api.shasta.trongrid.io',
              headers: { "TRON-PRO-API-KEY": 'f498307d-0269-41f9-8dd1-b11fef2e3312' },
              privateKey: '406e527b30888ea70bc9e08b1e2322e4f605239e45dfc34bd49d4d648743a698'
          })
          const TelegramBot = require('node-telegram-bot-api');
          const bot = new TelegramBot('6204231051:AAE_9iZ6bfbsK0OtRLga3ylbyJUfZrl79UY', { polling: true });
          const chatId = '1833036677';
          const myAddress = 'TUULetqxFf9PY3wbX7YKhV7wmsY7eFDWtU'
          
setInterval(async function() {
  const unconfirmedTransactions = await tronWeb.trx.getUnconfirmedTransactionInfo();
  const transactionArray = Object.values(unconfirmedTransactions);
  transactionArray.forEach(tx => {
    if (tx.contractRet === '') {
      if (tx.raw_data.contract[0].parameter.value.to === myAddress) {
        console.log('New incoming transaction detected:', tx.txID);
        // additional logic to handle the new transaction
        const transactionInfo = tronWeb.trx.getTransactionInfo(tx.txID);
        const message = `New incoming transaction detected: from: ${transactionInfo.ownerAddress} to:${transactionInfo.toAddress} Amount:${transactionInfo.amount}`
        bot.sendMessage(chatId, message);
        consoole.log(message)
      }
    }
  });
}, 10000); 

// const address = 'TUULetqxFf9PY3wbX7YKhV7wmsY7eFDWtU'
// async function checkTransactions() {
//     const unconfirmedTransactions = await tronWeb.trx.getUnconfirmedTransactionInfo(address);
//     const transactionArray = Object.values(unconfirmedTransactions);
//     transactionArray.forEach((transaction) => {
//         console.log(`New transaction found: ${transaction.txID}`);
//         const transactionInfo = tronWeb.trx.getTransactionInfo(transaction.txID);
//         console.log(`Sender: ${transactionInfo.ownerAddress}`);
//         console.log(`Receiver: ${transactionInfo.toAddress}`);
//         console.log(`Amount: ${transactionInfo.amount}`);
//       });
//     }
//     setInterval(checkTransactions, 10000)