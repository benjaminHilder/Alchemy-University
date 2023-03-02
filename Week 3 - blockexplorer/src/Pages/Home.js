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
    const [blockNumbers, setBlockNumbers] = useState([]);
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const blockNumber = await alchemy.core.getBlockNumber();

            for (let i = 0; i < maxEntries; i++) {
                const newBlockNumber = blockNumber - i;
                setBlockNumbers(prevBlockNumbers => [...prevBlockNumbers, newBlockNumber]);
    
                const block = await alchemy.core.getBlock(newBlockNumber);
                setBlocks(prevBlocks => [...prevBlocks, block]);
    
                const transaction = await alchemy.core.getTransaction(
                    block.transactions[i]
                );

                setTransactions(prevTransactions => [...prevTransactions, transaction]);
            }
        }

        fetchData();
    }, []);

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