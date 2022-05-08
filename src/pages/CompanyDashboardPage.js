import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../store/user-context';

import { ethers } from 'ethers';
import { companyContractAddress } from '../config';
import CompanyContractJSON from "../artifacts/contracts/CompanyContract.sol/CompanyContract.json"

const CompanyDashboardPage = () => {

    const [company, setCompany] = useState(null)
    const companyAddress = useContext(UserContext).walletAddress

    useEffect(() => {
        loadCompany()
    }, [companyAddress])

    const loadCompany = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, provider)

        const data = await companyContract.companies(companyAddress)
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

export default CompanyDashboardPage;