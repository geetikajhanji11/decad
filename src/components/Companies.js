import React, { useContext, useState, useEffect } from 'react';
// import 


import Web3Modal from "web3modal"
import { UserContext } from '../store/user-context';

import { ethers } from 'ethers';

import { companyContractAddress, influencerContractAddress } from '../config';
import CompanyContractJSON from '../artifacts/contracts/CompanyContract.sol/CompanyContract.json'
import InfluencerContractJSON from '../artifacts/contracts/InfluencerContract.sol/InfluencerContract.json'
import Company from './Company';
import CompanyForm from './CompanyForm';
import ProductForm from './ProductForm';
import HireInfluencerForm from './HireInfluencerForm';
import Layout from './Layout';



const Companies = () => {

    const [companies, setCompanies] = useState([])

    const companyAddress = useContext(UserContext).walletAddress

    useEffect(() => {
        loadCompanies()
    }, [])

    const loadCompanies = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, provider)

        // get all products (array)
        const data = await companyContract.getAllCompanies()
        // console.log("companies")
        // console.log(data)
        setCompanies(data)

    }

    const addCompany = async (companyName) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, signer)

        let result = await companyContract.addCompany(companyAddress, companyName)
        console.log(result)
        
    }

    const addProduct = async (title, description, imageUrl, productLink, pricePerInfluence) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, signer)

        let result = await companyContract.addNewProduct(title, description, imageUrl, productLink, pricePerInfluence, 10)
        console.log(result)
    }

    const buyToken = async () => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, signer)

        let result = await companyContract.buyToken("token uri")
        console.log(result)
    }

    const hireInfluencer = async (influencerAddress, prodId) => {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, signer)

        let result = await companyContract.hireInfluencerForProduct(influencerAddress, prodId)
        console.log(result)
    }

    const getInfluencerMoney = async (influencerAddress) => {
        const provider = new ethers.providers.JsonRpcProvider()
        const influencerContract = new ethers.Contract(influencerContractAddress, InfluencerContractJSON.abi, provider)
        const money = await influencerContract.getMoneyEarned(influencerAddress)
        // console.log("money = " + money)
        const wei = ethers.utils.parseEther(money.toString())
        // console.log("wei = " + wei)
        let ethValue = ethers.utils.formatEther(wei)
        // console.log("ethVal = " + ethValue)
        ethValue = parseInt(ethValue)
        // console.log(typeof ethValue)
        return ethValue
    }

    const payInfluencer = async () => {
        const influencerAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection) 
        const signer = provider.getSigner()
        const companyContract = new ethers.Contract(companyContractAddress, CompanyContractJSON.abi, signer)
        
        const money = await getInfluencerMoney(influencerAddress)
        let result = await companyContract.payInfluencer(influencerAddress, {value: money})
        console.log(result)
    }


    return (
        <Layout>
            <CompanyForm addCompany={addCompany}/>
            <ProductForm addProduct={addProduct}/>

            <div>
                <button onClick={buyToken}>Buy Token</button>
                {/* <button onClick={hireInfluencer}>Hire Influencer</button> */}
                <HireInfluencerForm  hireInfluencer={hireInfluencer}/>
                <button onClick={payInfluencer}>Pay Influencer</button>
            </div>
            

            <h1>Registered Companies</h1>

            {companies.map(company => <Company key={company.companyAddress} company={company}/>)}

            

        </Layout>
    );
};

export default Companies;