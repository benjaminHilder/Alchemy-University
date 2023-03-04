import "../css/searchInfo.css"
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

//alchemy
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
//alchemy

const PageType = {
    Transaction: 0,
    Block: 1,
    Account: 2,
    Error : 3
}

function displayTransaction(hash, status, block, timestamp, from, to, value, fee, gasPrice, gasLimit, gasUsageByTxn, burntFees, txnSavingFees) {
    return (
        <div className="transaction">
            <div className="titles">
                <h3>Transaction Hash:</h3>
                <h3>Status:</h3>
                <h3>Block:</h3>
                <h3>Timestamp:</h3>

                <h3>From:</h3>
                <h3>To:</h3>

                <h3>Value:</h3>
                <h3>Transaction Fee:</h3>
                <h3>Gas Price:</h3>

                <h3>Transaction Gas Limit:</h3>
                <h3>Transaction Gas Usage By Txn:</h3>
                <h3>Transaction Burnt Fees:</h3>
                <h3>Transaction Txn Saving Fees:</h3>
            </div>

            <div className="data">
                <h3>{hash}</h3>
                <h3>{status}</h3>
                <h3>{block}</h3>
                <h3>{timestamp}</h3>
        
                <h3>{from}</h3>
                <h3>{to}</h3>
        
                <h3>{value}</h3>
                <h3>{fee}</h3>
                <h3>{gasPrice}</h3>

                <h3>{gasLimit}</h3>
                <h3>{gasUsageByTxn}</h3>
                <h3>{burntFees}</h3>
                <h3>{txnSavingFees}</h3>
            </div>
        </div>
    )
}

function displayBlock(blockHeight, status, timestamp, proposedOn, transactions, feeRecipient, blockReward, totalDifficulty, size, gasUsed, gasLimit, baseFeePerGas, burntFees, extraData) {
    return (
        <div className="block">
            <div className="titles">
                <h3>Block Height:</h3>
                <h3>Status:</h3>
                <h3>Proposed On:</h3>
                <h3>Transactions:</h3>

                <h3>Fee Recipient:</h3>
                <h3>Block Reward:</h3>
                <h3>Total Difficulty:</h3>
                <h3>Size:</h3>

                <h3>Gas Used:</h3>
                <h3>Gas Limit:</h3>
                <h3>Base Fee Per Gas:</h3>
                <h3>Burnt Fees:</h3>
                <h3>Extra Data:</h3>
            </div>

            <div className="data">
                <h3>{blockHeight}</h3>
                <h3>{status}</h3>
                <h3>{timestamp}</h3>
                <h3>{proposedOn}</h3>
                <h3>{transactions}</h3>
    
                <h3>{feeRecipient}</h3>
                <h3>{blockReward}</h3>
                <h3>{totalDifficulty}</h3>
                <h3>{size}</h3>

                <h3>{gasUsed}</h3>
                <h3>{gasLimit}</h3>
                <h3>{baseFeePerGas}</h3>
                <h3>{burntFees}</h3>
                <h3>{extraData}</h3>
            </div>
        </div>
    )
}

function displayAccount() {
    return (
        <div className="account">
            <div className="titles">
                <h3>Transaction Hash</h3>
                <h3>Status</h3>
                <h3>Block</h3>
                <h3>Timestamp</h3>

                <h3>From</h3>
                <h3>To</h3>

                <h3>Value</h3>
                <h3>Transaction Fee</h3>
                <h3>Gas Price</h3>
            </div>

            <div className="data">
                <h3>transactionHash</h3>
                <h3>status</h3>
                <h3>block</h3>
                <h3>timestamp</h3>
    
                <h3>from</h3>
                <h3>to</h3>
    
                <h3>value</h3>
                <h3>fee</h3>
                <h3>gasPrice</h3>
            </div>
        </div>
    )
}

function displayError() {
    return (
        <div className="error">
            <h2>incorrect input</h2>
        </div>
    )
}

export const SearchInfo = () => {
    const defaultText = "Loading..."

    const [pageToDisplay, setPageToDisplay] = useState()

    //transaction data only
    const [transactionHash, setTransactionHash] = useState(defaultText)
    const [transactionStatus, setTransactionStatus] = useState(defaultText)
    const [transactionTimestamp, setTransactionTimestamp] = useState(defaultText)

    const [transactionFrom, setTransactionFrom] = useState(defaultText)
    const [transactionTo, setTransactionTo] = useState(defaultText)

    const [transactionValue, setTransactionValue] = useState(defaultText)
    const [transactionFee, setTransactionFee] = useState(defaultText)
    const [transactionGasPrice, setTransactionGasPrice] = useState(defaultText)

    const [transactionGasLimit, setTransactionGasLimit] = useState(defaultText)
    const [transactionGasUsageByTxn, setTransactionGasUsageByTxn] = useState(defaultText)
    const [transactionBurntFees, setTransactionBurntFees] = useState(defaultText)
    const [transactionTxnSavingFees, setTransactionTxnSavingFees] = useState(defaultText)

    //block data only
    const [blockStatus, setBlockStatus] = useState(defaultText)
    const [blockTimestamp, setBlockTimestamp] = useState(defaultText)
    const [blockProposedOn, setBlockProposedOn] = useState(defaultText)
    const [blockTransactionLength, setBlockTransactionLength] = useState(defaultText)

    const [blockFeeRecipient, setBlockFeeRecipient] = useState(defaultText)
    const [blockReward, setBlockReward] = useState(defaultText)
    const [blockTotalDifficulty, setBlockTotalDifficulty] = useState(defaultText)
    const [blockSize, setBlockSize] = useState(defaultText)

    const [blockGasUsed, setBlockGasUsed] = useState(defaultText)
    const [blockGasLimit, setBlockGasLimit] = useState(defaultText)
    const [blockBaseFeePerGas, setBlockBaseFeePerGas] = useState(defaultText)
    const [blockBurntFees, setBlockBurntFees] = useState(defaultText)
    const [blockExtraData, setBlockExtraData] = useState(defaultText)

    //transaction and block data
    const [block, setBlock] = useState(defaultText)

    //account data
    const [accountEthBalance, setAccountEthBalance] = useState(defaultText)
    const [accountLastTx, setAccountLastTx] = useState(defaultText)
    const [accountFirstTx, setAccountFirstTx] = useState(defaultText)
    const [accountTxs, setAccountTxs] = useState(defaultText)
    const [accountTokenHoldings, setAccountTokenHoldings] = useState(defaultText)

    useEffect(() => {
        const searchInput = localStorage.getItem("searchInput")
        
        async function determinePage() {
            if (searchInput.length == 42) {
                const transaction = await alchemy.core.getTransaction(searchInput)

                if (transaction) {
                    setPageToDisplay(PageType.Transaction)
                    return

                } else {
                    const transactionCount = await alchemy.core.getTransactionCount(searchInput)

                    if (transactionCount > 0) {
                        setPageToDisplay(PageType.Account)
                        return
                    } else {
                        setPageToDisplay(PageType.Error)
                        return
                    }
                }
            } else {
                const block = await alchemy.core.getBlock(searchInput);
    
                if (block.parentHash) {
                    setPageToDisplay(PageType.Block)
                    return
                }
                setPageToDisplay(PageType.Error)
                return
            }
        }

        async function getDataForTransaction() {
            const transaction = await alchemy.core.getTransaction(searchInput)
            const block = await alchemy.core.getBlock(transaction.hash)
        
            setTransactionHash(transaction.hash)
            setTransactionStatus("Loading...")
            setBlock(transaction.blockNumber)
            setTransactionTimestamp(block.timestamp)

            setTransactionFrom(transaction.from)
            setTransactionTo(transaction.to)

            //setValue(transaction.value)
            //setFee(transaction.gas)
            //setGasPrice(transaction.gasPrice)
            
        }

        async function getDataForBlock() {
            const block = await alchemy.core.getBlock(searchInput)



        }

        //determinePage()
        setPageToDisplay(PageType.Block)
        //getDataForTransaction()
    }, [])

    return (
        <div className="main">
            {pageToDisplay == PageType.Transaction && displayTransaction(transactionHash, 
                                                                         transactionStatus, 
                                                                         block, 
                                                                         transactionTimestamp, 
                                                                         transactionFrom, 
                                                                         transactionTo, 
                                                                         transactionValue, 
                                                                         transactionFee, 
                                                                         transactionGasPrice,
                                                                         transactionGasLimit,
                                                                         transactionGasUsageByTxn,
                                                                         transactionBurntFees,
                                                                         transactionTxnSavingFees
                                                                         )}
            {pageToDisplay == PageType.Block && displayBlock(blockStatus,
                                                             blockTimestamp,
                                                             blockProposedOn,
                                                             blockTransactionLength,
                                                             blockFeeRecipient,
                                                             blockReward,
                                                             blockTotalDifficulty,
                                                             blockSize,
                                                             blockGasUsed,
                                                             blockGasLimit,
                                                             blockBaseFeePerGas,
                                                             blockBurntFees,
                                                             blockExtraData)}
            {pageToDisplay == PageType.Account && displayAccount()}
            {pageToDisplay == PageType.Error && displayError()}
        </div>
    )
}