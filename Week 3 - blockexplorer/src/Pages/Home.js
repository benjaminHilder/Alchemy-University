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
    if (text == "undefined" ||text == undefined) return
    
    return text.substring(start, end)
}

function latestEntries (leftData, centerTopData, centerBottomData) {
    //easier to read
    leftData = String(leftData);
    centerTopData = String(centerTopData);
    centerBottomData = String(centerBottomData)

    return (
        <div className="homeLatestInfoTemplate">
            <h3 style={{width: "30%"}}>{substring(leftData, 0, 12)}...</h3>

            <div className="homeLatestInfoCenter" style={{width: "30%"}}>

                <div className="homeLatestInfoCenterRow">
                    <h3>from  </h3>
                    <h3>{substring(centerTopData, 0, 12)}...</h3>
                </div>

                <div className="homeLatestInfoCenterRow">
                    <h3>to  </h3>
                    <h3>{substring(centerBottomData, 0, 12)}...</h3>
                </div>
            </div>

            <div style={{width: "30%"}}>{/*styling*/}
                <button className="homeLatestInfoButtons">More Info</button> 
            </div>  
        </div>)
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
    })

    return (
    <div class="main">
        <div className="homeLatestInfoAll">
            
            <div className="homeLatestArea">
                <h2 className="homeLatestInfoTitle">Latest Blocks</h2>
            
                <div className="homeLatestInfo"> {/*styling*/} 
                    
                    {latestEntries(blockNumber, miner, numberOfTransactions)}

                </div>
            </div>

            <div className="homeLatestArea">
                
                <h2 className="homeLatestInfoTitle">Latest Transactions</h2>

                <div className="homeLatestInfo"> {/*styling*/} 

                    {latestEntries(transactionAddress, transactionFrom, transactionTo)}

                </div>
            </div>
        </div>
    </div>
    )
}