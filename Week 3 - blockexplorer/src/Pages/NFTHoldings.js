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

function displayNftImage(imageURL) {
    return (
        <div>
            <img src = {imageURL} alt="nftImage"/>
        </div>

    )
}

export const NFTHoldings = () => {
    const [nftContractAddresses, setNftContractAddresses] = useState()
    const [nftIds, setNftIds] = useState()
    const [nftImageURL, setNftImageURL] = useState()

    useEffect(async() => {
        if (nftContractAddresses === undefined || nftIds === undefined) {

        const searchInput = localStorage.getItem("searchInput")

        const result = await alchemy.nft.getNftsForOwner(searchInput)
        const nfts = await result.ownedNfts

        const newNftContractAddresses = []
        const newNftIds = []
        const newNftImageURL = []

        console.log(`${nfts}`)

        for (let i = 0; i < nfts.length; i++) {
            await newNftContractAddresses.push(nfts[i].contract.address)
            await newNftIds.push(nfts[i].tokenId)

            const nftMetadata = await alchemy.nft.getNftMetadata(nfts[i].contract.address, nfts[i].tokenId)

            if (nftMetadata.media[0] != undefined) {
                newNftImageURL.push(nftMetadata.media[0].gateway)
            }
        }

        setNftContractAddresses(newNftContractAddresses)
        setNftIds(newNftIds)
        setNftImageURL(newNftImageURL)
    }
    })

    return (
        <div className="main">
            {nftImageURL && nftImageURL.map(image => displayNftImage(image))}
        </div>
        
    )
}