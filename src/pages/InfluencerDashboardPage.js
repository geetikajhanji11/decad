import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../store/user-context';

import { ethers } from 'ethers';
import { influencerContractAddress } from '../config';
import InfluencerContractJSON from "../artifacts/contracts/InfluencerContract.sol/InfluencerContract.json"

const InfluencerDashboardPage = () => {

    const [influencer, setInfluencer] = useState(null)
    const influencerAddress = useContext(UserContext).walletAddress

    useEffect(() => {
        loadInfluencer()
    }, [companyAddress])

    const loadInfluencer = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, provider)

        const data = await influencerContract.influencers(influencerAddress)
        console.log("company")
        console.log(data)
        setCompany(data)
    }

    if(company !== null) {
        return <div>
        <p>{company.companyAddress}</p>
        <p>{company.companyName}</p>
        <p>{company.tokensBought.toNumber()}</p>
        <h3>Influencers Hired</h3>
        {company.influencersHired && <p>{company.influencersHired.map(influencer => <p key={influencer}>{influencer}</p>)}</p>}
    
    </div>
    }

    return (
        <div>
            <h1>Loading</h1>
        </div>
        
    );
};

export default InfluencerDashboardPage;