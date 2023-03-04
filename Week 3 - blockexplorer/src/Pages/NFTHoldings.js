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

export const NFTHoldings = () => {
    const [nftContractAddresses, setNftContractAddresses] = useState()
    const [nftIds, setNftIds] = useState()
    const [nftUris, setNftUris] = useState()

    useEffect(async() => {
        if (nftContractAddresses === undefined || nftIds === undefined || nftUris === undefined) {

        const searchInput = localStorage.getItem("searchInput")

        const result = await alchemy.nft.getNftsForOwner(searchInput)
        const nfts = result.ownedNfts

        const newNftContractAddresses = []
        const newNftIds = []
        const newNftUris = []

        for (let i = 0; i < nfts.length; i++) {
            newNftContractAddresses.push(nfts[i].contract.address)
            newNftIds.push(nfts[i].tokenId)
            newNftUris.push(nfts[i].tokenUri)
        }

        setNftContractAddresses(newNftContractAddresses)
        setNftIds(newNftIds)
        setNftUris(newNftUris)
    }
    })

    return (
        <div className="main">
            {}
        </div>
        
    )
}