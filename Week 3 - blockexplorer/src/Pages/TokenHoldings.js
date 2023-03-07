import "../css/nftHoldings.css"
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

//alchemy
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
//alchemy

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
            {tokenContractAddresses}
            {tokenBalances}
        </div>
        
    )
}