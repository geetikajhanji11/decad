import React, { useContext, useEffect, useState } from 'react';
import Web3Modal from "web3modal"
import { UserContext } from '../store/user-context';
import { influencerContractAddress } from '../config';
import InfluencerContractJSON from "../artifacts/contracts/InfluencerContract.sol/InfluencerContract.json"

import { ethers } from 'ethers';
import Card from './Card';

const Influencer = (props) => {

    const [influencerData, setInfluencerData] = useState({
        prodIds: [],
        influences: []
    })

    useEffect(() => {
        loadInfluencerData()
    }, [])

    const loadInfluencerData = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, provider)

        // get all influencers (array)
        const infData = await influencerContract.getProdIdsAndInfluences(props.influencer.influencerAddress)
        // console.log("inf data")
        // console.log(infData)
        
        // console.log(infData[0].length) // array for prodIds[]
        // console.log(infData[1].length) // array for influences[]
        const data = {
            prodIds: infData[0],
            influences: infData[1]
        }
        setInfluencerData(data)
        // console.log(data)
    }

    return (
        <Card>
            <p><span>Address: </span>{props.influencer.influencerAddress}</p>
            <p><span>Name: </span>{props.influencer.name}</p>
            <p><span>IG Handle: </span>{props.influencer.igHandle}</p>
            <p><span>Money Earned: </span>{props.influencer.moneyEarned.toNumber()} ETH</p>
            <p><span>Number of products advertising: </span>{props.influencer.prodIdsCount.toNumber()}</p>
        </Card>
    );
};

export default Influencer;