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
    const [blockNumbers, setBlockNumbers] = useState();
    const [blocks, setBlocks] = useState();

    const [transactions, setTransactions] = useState()

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
    })

    return (
    <div class="main">
        <div className="homeLatestInfoAll">
            
            <div className="homeLatestArea">
                <h2 className="homeLatestInfoTitle">Latest Blocks</h2>
            
                <div className="homeLatestInfo"> {/*styling*/} 
                {/*if blocks is true loop of the blocks array and apply latestEntries function to the blocks array and then display */}
                {blocks && blocks.map((block, index) => (latestEntries(blockNumbers[index], block.miner, block.transactions.length)))}
                </div>
            </div>

            <div className="homeLatestArea">
                
                <h2 className="homeLatestInfoTitle">Latest Transactions</h2>

                <div className="homeLatestInfo"> {/*styling*/} 

                {transactions && transactions.map(transaction => latestEntries(transaction.hash, transaction.from, transaction.to))}
                </div>
            </div>
        </div>
    </div>
    )
}