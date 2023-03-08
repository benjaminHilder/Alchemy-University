import "../css/tokenHoldings.css"
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

//alchemy
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
//alchemy

function displayBalanceInfo(title, balanceArray, displayAmount) {
    if (balanceArray === undefined) return;

    const balanceData = [title]
    

    for(let i = 0; i < displayAmount; i++) {
        if (title === "Balance" ) {
            balanceData.push(String(parseInt(balanceArray[balanceArray.length - 1 - i]).toFixed(8)))
        } else {
            balanceData.push(String(balanceArray[balanceArray.length - 1 - i]))
        }
    } 

    const data = balanceData.map((info) =>
        info !== title ? <p>{info}</p> : <h3>{info}</h3>
    )

    return data;
}

export const TokenHoldings = () => {
    const [tokenContractAddresses, setTokenContractAddresses] = useState()
    const [tokenBalances, setTokenBalances] = useState()

    useEffect(async() => {

        const searchInput = localStorage.getItem("searchInput")

        const tokenData = await alchemy.core.getTokenBalances(searchInput)
        const tokenBalances = tokenData.tokenBalances


        const newTokenContractAddresses = []
        const newTokenBalances = []

        for (let i = 0; i < tokenBalances.length; i++) {
            newTokenContractAddresses.push(tokenBalances[i].contractAddress)
            newTokenBalances.push(tokenBalances[i].tokenBalance)
        }

        setTokenContractAddresses(newTokenContractAddresses)
        setTokenBalances(newTokenBalances)
    })

    return (
        <div className="main">
            <h3>Token Balances for {localStorage.getItem("searchInput")}</h3>
            
            <div className="balances">
                <div className="balanceInfo">{displayBalanceInfo("Address", tokenContractAddresses, 10)}</div>
                <div className="balanceInfo">{displayBalanceInfo("Balance", tokenBalances, 10)}</div>
            </div>
        </div>
        
    )
}