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
            <img src = {imageURL} alt="nftImage"
            className="nftImage"/>
        </div>
    )
}

export const NFTHoldings = () => {
    const [nftInfo, setNftInfo] = useState()
    const [nftImageURL, setNftImageURL] = useState()

    useEffect(async() => {
        const searchInput = localStorage.getItem("searchInput")

        const result = await alchemy.nft.getNftsForOwner(searchInput)
        const nfts = await result.ownedNfts

        const newNftInfo = []
        const newNftImageURL = []

        for (let i = 0; i < nfts.length; i++) {

            await newNftInfo.push({
                contractAddress: nfts[i].contract.address,
                tokenId: nfts[i].tokenId,
                tokenType: nfts[i].tokenType
            })
        }

        setNftInfo(newNftInfo)
        
        const nftMetadatas = await alchemy.nft.getNftMetadataBatch(newNftInfo)

        for (let i = 0; i < nftMetadatas.length; i++) {
            if (nftMetadatas[i].media[0] != undefined) {
                newNftImageURL.push(nftMetadatas[i].media[0].gateway)
            }
        }

        setNftImageURL(newNftImageURL)
    })

    return (
        <div className="main">
            <div className="nftDisplay">
                {nftImageURL && nftImageURL.map(image => displayNftImage(image))}
            </div>
            
        </div>
        
    )
}