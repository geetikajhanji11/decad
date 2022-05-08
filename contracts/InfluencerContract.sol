// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ProductContract.sol";

contract InfluencerContract {

    // influencer structure
    struct Influencer {
        address influencerAddress;
        string name;
        string igHandle;
        uint moneyEarned;
        uint[] prodIds;
        uint prodIdsCount;
        mapping(uint => uint) prodIdToInfluence;
    }
    mapping(address => Influencer) public influencers;
    uint public influencerCount;
    address[] private influencerAddresses;
    address private productContractAddress;

    // constructor
    constructor(address _productContractAddress) {
        productContractAddress = _productContractAddress;
        influencerCount = 0;
    }

    // add a new influencer to the blockchain
    function addInfluencer(address _influencerAddress, string memory _name, string memory _igHandle) public {
        influencers[_influencerAddress].influencerAddress = _influencerAddress;
        influencers[_influencerAddress].name = _name;
        influencers[_influencerAddress].igHandle = _igHandle;
        influencers[_influencerAddress].moneyEarned = 0;
        influencers[_influencerAddress].prodIdsCount = 0;
        influencerCount++;
        influencerAddresses.push(_influencerAddress);
    }

    // when an influencer is interested to advertise the product,
    // the company has to choose whether or not to hire the influencer
    // therefore, this function should be called by the company contract
    function subscribeToProduct(address _influencerAddress, uint _prodId) public {
        influencers[_influencerAddress].prodIds.push(_prodId);
        influencers[_influencerAddress].prodIdsCount++;
        influencers[_influencerAddress].prodIdToInfluence[_prodId] = 0;
    }

    // returns total number of products
    // the influencer has subscribed to
    function totalSubscribedProducts(address _influencerAddress) public view returns(uint) {
        return influencers[_influencerAddress].prodIdsCount;
    }

    // increments influences of a product
    // by the number of new influences generated
    // by the influencer
    function addInfluencesTo(address _influencerAddress, uint _prodId, uint _influences) public {

        // calculate extra money the influencer
        // earned due to new influences generated
        uint pricePerInfluence;
        (,,,,,,pricePerInfluence,) = ProductContract(productContractAddress).getProduct(_prodId);
        uint money = _influences * pricePerInfluence;

        // update the infleuncer data
        influencers[_influencerAddress].prodIdToInfluence[_prodId] += _influences;
        influencers[_influencerAddress].moneyEarned += money;


        // calculateTotalMoneyEarned(_influencerAddress);
    }

    // returns the number of influences the advertiser of the 
    // product (influencer) is able to generate
    function getInfluencesOf(address _influencerAddress, uint _prodId) public view returns(uint) {
        return influencers[_influencerAddress].prodIdToInfluence[_prodId];
    }

    // calculates the total money earned on the basis on influences
    // generated by the influencer for each product
    function calculateTotalMoneyEarned(address _influencerAddress) public {
        uint totalMoney = 0;
        uint n = totalSubscribedProducts(_influencerAddress);
        for(uint i=0; i<n; i++) {
            uint prodId = influencers[_influencerAddress].prodIds[i];
            uint numOfInfluences = getInfluencesOf(_influencerAddress, prodId);
            uint pricePerInfluence;
            (,,,,,,pricePerInfluence,) = ProductContract(productContractAddress).getProduct(prodId);
            totalMoney += (numOfInfluences * pricePerInfluence);
        }
        influencers[_influencerAddress].moneyEarned = totalMoney;
    }

    // returns the amount of money earned by the influencer
    function getMoneyEarned(address _influencerAddress) public view returns(uint) {
        return influencers[_influencerAddress].moneyEarned;
    }

    struct Inf {
        address influencerAddress;
        string name;
        string igHandle;
        uint moneyEarned;
        uint[] prodIds;
        uint prodIdsCount;
    }

    // get list of all influencers
    function getAllInfluencers() public view returns(Inf[] memory) {
        
        Inf[] memory allInfluencers = new Inf[](influencerCount);
        
        for(uint i=0; i<influencerCount; i++) {
            
            address influencerAddresse = influencerAddresses[i];
            Influencer storage currInfluencer = influencers[influencerAddresse];
            Inf memory currInf = Inf(
                currInfluencer.influencerAddress,
                currInfluencer.name,
                currInfluencer.igHandle,
                currInfluencer.moneyEarned,
                currInfluencer.prodIds,
                currInfluencer.prodIdsCount
            );
            allInfluencers[i] = currInf;
        }
        return allInfluencers;
    }

    // get prodIds to Infleunce map for every influencer
    function getProdIdsAndInfluences(address _influencerAddress) public view returns(uint[] memory, uint[] memory) {
        uint prodIdsCount = influencers[_influencerAddress].prodIdsCount;
        uint[] memory influences = new uint[](prodIdsCount);
        uint[] memory prodIds = influencers[_influencerAddress].prodIds;
        for(uint i=0; i<prodIdsCount; i++) {
            influences[i] = influencers[_influencerAddress].prodIdToInfluence[i];
        }
        return (prodIds, influences);
    }

}