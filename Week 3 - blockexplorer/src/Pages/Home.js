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

const maxEntries = 10;

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
    //const [blockNumber, setBlockNumber] = useState();
    const [blockNumbers, setBlockNumbers] = useState();
    const [blocks, setBlocks] = useState();

    const [transactions, setTransactions] = useState()
    
    //latest blocks
    //const [blockHash, setBlockHash] = useState()
    //const [miner, setMiner] = useState() //make array of latest
    //const [numberOfTransactions, setNumberOfTransactions] = useState(); // make array of latest
//
    ////latest transactions
    //const [transactionAddress, setTransactionAddress] = useState()
    //const [latestTransaction, setLatestTransaction] = useState()
//
    //const [transactionFrom, setTransactionFrom] = useState()
    //const [transactionTo, setTransactionTo] = useState()

    useEffect(async function() {
    
        if (blockNumbers === undefined) {
            const blockNumber = await alchemy.core.getBlockNumber()

            const newBlockNumbers = []
            const newBlocks = []
     
            for (let i = 0; i < maxEntries; i++) {
                newBlockNumbers.push(blockNumber - i);
                newBlocks.push(await alchemy.core.getBlock(blockNumber - i))
            }
            
            await setBlockNumbers(newBlockNumbers)
            await setBlocks(newBlocks)
        }

        if (transactions === undefined) {
            const newTransactions = []

            for (let i = 0; i < maxEntries; i++) {
                newTransactions.push(await alchemy.core.getTransaction(blocks[0].transactions[i]))
            }

            setTransactions(newTransactions)

        }

        //if (blockNumbers != undefined) {
        //    
        //    let newBlockNumbers = await []
        //    for (let i = 0; i < maxEntries; i++) {
        //        await newBlockNumbers.push(
        //    }
//
        //    await setBlockNumbers(newBlockNumbers)
        //}
//
//if (block != undefined) {
//    await setBlockHash(await block.hash)
//    await setMiner(await block.miner)
//    await setNumberOfTransactions(await block.transactions.length)
//
//    //console.log(block)
//    await setTransactionAddress(await block.transactions[0])
//    await setLatestTransaction(await alchemy.core.getTransaction(transactionAddress))
//
//}
//
//if (latestTransaction != undefined) {
//    await setTransactionFrom(await latestTransaction.from)
//    await setTransactionTo(await latestTransaction.to)
//}
    })

    return (
    <div class="main">
        <div className="homeLatestInfoAll">
            
            <div className="homeLatestArea">
                <h2 className="homeLatestInfoTitle">Latest Blocks</h2>
            
                <div className="homeLatestInfo"> {/*styling*/} 
                    {blocks && latestEntries(blockNumbers[0], blocks[0].miner, blocks[0].transactions.length)}
                    {blocks && latestEntries(blockNumbers[1], blocks[1].miner, blocks[1].transactions.length)}
                    {blocks && latestEntries(blockNumbers[2], blocks[2].miner, blocks[2].transactions.length)}
                    {blocks && latestEntries(blockNumbers[3], blocks[3].miner, blocks[3].transactions.length)}
                    {blocks && latestEntries(blockNumbers[4], blocks[4].miner, blocks[4].transactions.length)}
                    {blocks && latestEntries(blockNumbers[5], blocks[5].miner, blocks[5].transactions.length)}
                    {blocks && latestEntries(blockNumbers[6], blocks[6].miner, blocks[6].transactions.length)}
                    {blocks && latestEntries(blockNumbers[7], blocks[7].miner, blocks[7].transactions.length)}
                    {blocks && latestEntries(blockNumbers[8], blocks[8].miner, blocks[8].transactions.length)}
                    {blocks && latestEntries(blockNumbers[9], blocks[9].miner, blocks[9].transactions.length)}
                </div>
            </div>

            <div className="homeLatestArea">
                
                <h2 className="homeLatestInfoTitle">Latest Transactions</h2>

                <div className="homeLatestInfo"> {/*styling*/} 

                    {transactions && latestEntries(transactions[0].hash, transactions[0].from, transactions[0].to)}
                    {transactions && latestEntries(transactions[1].hash, transactions[1].from, transactions[1].to)}
                    {transactions && latestEntries(transactions[2].hash, transactions[2].from, transactions[2].to)}
                    {transactions && latestEntries(transactions[3].hash, transactions[3].from, transactions[3].to)}
                    {transactions && latestEntries(transactions[4].hash, transactions[4].from, transactions[4].to)}
                    {transactions && latestEntries(transactions[5].hash, transactions[5].from, transactions[5].to)}
                    {transactions && latestEntries(transactions[6].hash, transactions[6].from, transactions[6].to)}
                    {transactions && latestEntries(transactions[7].hash, transactions[7].from, transactions[7].to)}
                    {transactions && latestEntries(transactions[8].hash, transactions[8].from, transactions[8].to)}
                    {transactions && latestEntries(transactions[9].hash, transactions[9].from, transactions[9].to)}
                </div>
            </div>
        </div>
    </div>
    )
}