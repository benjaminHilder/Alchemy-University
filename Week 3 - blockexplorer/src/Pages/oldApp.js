import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [previousBlockNumber, setPreviousBlockNumber] = useState();

  const [block, setBlock] = useState();
  const [timestamp, setTimestamp] = useState()
  const [transactions, setTransactions] = useState()
  const [transactionsCount, setTransactionsCount] = useState()
  const [miner, setMiner] = useState()
  const [hash, setHash] = useState()
  const [parentHash, setParentHash] = useState()
  const [gasLimit, setGasLimit] = useState()
  const [gasUsed, setGasUsed] = useState()
  const [baseFeePerGas, setBaseFeePerGas] = useState()

  const [firstRun, setFirstRun] = useState(true)

  
  useEffect(async function() {

    async function runGetFunctions() {
      await setBlockNumber(await alchemy.core.getBlockNumber());

      if (firstRun == true) {
        await setPreviousBlockNumber(blockNumber);
        let block = await alchemy.core.getBlock(blockNumber)
        await setBlock(block)
        await updateInfo();
        await setFirstRun(false)
      } else {
        if (previousBlockNumber != blockNumber) {
          let block = await alchemy.core.getBlock(blockNumber)
          await setBlock(block)
          await updateInfo();
        }
      }
    }

    async function updateInfo() {
      await setTimestamp(block.timestamp)

      await setTransactions(block.transactions)
      await setTransactionsCount(transactions.length)

      await setMiner(block.miner)
      await setHash(block.hash)
      await setParentHash(block.parentHash)
      
      await setGasLimit(block.gasLimit.toString())
      await setGasUsed(block.gasUsed.toString())  
      await setBaseFeePerGas(block.baseFeePerGas.toString())
    }

    await runGetFunctions()
  });

  return <div className="App">Block Number: {blockNumber} <br /> <br />

                              Time Stamp: {timestamp} <br /><br />

                              Transactions: {transactionsCount} <br />
                              <button>view all transactions</button><br /><br />

                              Miner: {miner} <br /><br />
                              
                              Hash: {hash} <br /><br />

                              Parent Hash: {parentHash} <br /><br />

                              Gas Limit: {gasLimit} <br /><br />

                              Gas Used: {gasUsed} <br /><br />

                              baseFeePerGas {baseFeePerGas}<br /><br />
                              
          </div>;
          
}

export default App;
