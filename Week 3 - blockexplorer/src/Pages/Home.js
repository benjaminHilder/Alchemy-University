import "../App.css"
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

//alchemy
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
//alchemy

function substring(text, start, end) {
    if (text === undefined) return
    
    return text.substring(start, end)
}

export const Home = () => {
    const [blockNumber, setBlockNumber] = useState();
    const [block, setBlock] = useState();
    
    //latest blocks
    const [blockHash, setBlockHash] = useState()
    const [miner, setMiner] = useState() //make array of latest
    const [numberOfTransactions, setNumberOfTransactions] = useState(); // make array of latest

    //latest transactions
    const [transactionAddress, setTransactionAddress] = useState()
    const [latestTransaction, setLatestTransaction] = useState()

    const [transactionFrom, setTransactionFrom] = useState()
    const [transactionTo, setTransactionTo] = useState()

    useEffect(async function() {
        if (blockNumber === undefined && await alchemy.core.getBlockNumber() != undefined) {
            
            setBlockNumber(await alchemy.core.getBlockNumber())
            
            await setBlock(await alchemy.core.getBlock(blockNumber))
        }

        if (block != undefined) {
            await setBlockHash(await block.hash)
            await setMiner(await block.miner)
            await setNumberOfTransactions(await block.transactions.length)

            //console.log(block)
            await setTransactionAddress(await block.transactions[0])
            await setLatestTransaction(await alchemy.core.getTransaction(transactionAddress))

        }

        if (latestTransaction != undefined) {
            await setTransactionFrom(await latestTransaction.from)
            await setTransactionTo(await latestTransaction.to)
        }
    }
)

    return (
    <div>
        <div>
            <h1>HOME</h1>
        </div>
        <div className="homeLatestInfo">
            <div className="homeLatestBlocks">
                <h2 className="homeLatestInfoTitle">Latest Blocks</h2>
                
                <div className="homeLatestInfoInner">
                    <h3>{blockNumber}</h3>

                    <div className="homeLatestTransactionsInnerCenter">
                        <div className="homeLatestTransactionsInnerCenterContent">
                        </div>

                        <div className="homeLatestTransactionsInnerCenterContent">
                        </div>
                        
                        <h3>miner {substring(miner, 0, 7)}...</h3>
                        <h3>{numberOfTransactions} txns in ... secs</h3>
                    </div>

                    <button className="homeLatestInfoButtons">More Info</button>
                </div>
            </div>

            <div className="homeLatestTransactions">
                <h2 className="homeLatestInfoTitle">Latest Transactions</h2>

                <div className="homeLatestInfoInner">
   
                    <h3>{substring(transactionAddress, 0, 12)}...</h3>
                    <div className="homeLatestTransactionsInnerCenter">
                        
                            <div className="homeLatestTransactionsInnerCenterContent">
                                <h3>from  </h3>
                                <h3>{substring(transactionFrom, 0, 12)}...</h3>
                            </div>
                            <div className="homeLatestTransactionsInnerCenterContent">
                                <h3>to  </h3>
                                <h3>{substring(transactionTo, 0, 12)}...</h3>
                            </div>

                    </div>
                    

                    <button className="homeLatestInfoButtons">More Info</button>
                </div>

            </div>
        </div>
        

    </div>
    )
}