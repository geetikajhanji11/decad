import React, { useContext, useEffect, useState } from 'react';
import Influencer from './Influencer';


import Web3Modal from "web3modal"
import { UserContext } from '../store/user-context';
import { influencerContractAddress } from '../config';
import InfluencerContractJSON from "../artifacts/contracts/InfluencerContract.sol/InfluencerContract.json"

import { ethers } from 'ethers';
import InfluencerForm from './InfluencerForm';
import AddInfluencesForm from './AddInfluencesForm';
import Layout from './Layout';

const Influencers = () => {
    const [influencers, setInfluencers] = useState([])
    const influencerAddress = useContext(UserContext).walletAddress

    useEffect(() => {
        loadAllInfluencers()
    }, [])

    const loadAllInfluencers = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, provider)

        // get all influencers (array)
        const allInfluencers = await influencerContract.getAllInfluencers()
        // console.log("influencers")
        // console.log(allInfluencers)
        setInfluencers(allInfluencers)
    }

    const addInfluencer = async (influencerName, igHandle) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, signer)

        let result = await influencerContract.addInfluencer(influencerAddress, influencerName, igHandle)
        
        console.log(result)
    }

    const addInfluencesForProduct = async (influences, prodId) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, signer)

        let result = await influencerContract.addInfluencesTo(influencerAddress, prodId, influences)
        console.log(result)
    }

    return (
        <Layout>
            
            <InfluencerForm addInfluencer={addInfluencer}/>
            {/* <button onClick={addInfluencesForProduct}>Add Influences To Product</button> */}
            <AddInfluencesForm addInfluencesForProduct={addInfluencesForProduct}/>

            <h1>All Influencers</h1>
            {influencers.map(influencer => <Influencer key={influencer.influencerAddress} influencer={influencer}/>)}
        </Layout>
    );
};

export default Influencers;