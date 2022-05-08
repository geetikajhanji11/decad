// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./DAD.sol";
import "./ProductContract.sol";
import "./InfluencerContract.sol";

contract CompanyContract {

    // company structure
    struct Company {
        address companyAddress;
        string companyName;
        uint256 tokensBought;
        address[] influencersHired;
    }
    mapping(address => Company) public companies;

    address[] private companyAddresses;
    uint public companyCount;
    address private dadAddress;
    address private productContractAddress;
    address private influencerContractAddress;
    uint public tokenPrice;

    // constructor
    constructor(address tokenAddress, uint pricePerToken, address _productContractAddress, address _influencerContractAddress) {
        dadAddress = tokenAddress;
        tokenPrice = pricePerToken;
        productContractAddress = _productContractAddress;
        influencerContractAddress = _influencerContractAddress;
        companyCount = 0;
    }

    // adds a new comany to the blockchain
    function addCompany(address _companyAddress, string memory _companyName) public {
        companyAddresses.push(_companyAddress);
        companies[_companyAddress].companyAddress = _companyAddress;
        companies[_companyAddress].companyName = _companyName;
        companies[_companyAddress].tokensBought = 0;
        companyCount++;
    }

    // company can buy a token DAD from DecAd 
    // this token allows the company to register
    // a new product with our platform
    function buyToken(string memory tokenUri) public {
        DAD token = DAD(address(dadAddress));
        token.buyToken(tokenUri);
        companies[msg.sender].tokensBought += 1;
    }

    // adds a new product to the blockchain
    // the owner of this product is the company 
    // that called this function.
    // can only add a product if the company
    // has at least 1 DAD token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    function addNewProduct(
        string memory _title,
        string memory _description,
        string memory _imgUrl,
        string memory _productLink,
        uint _pricePerInfluence,
        uint _numOfInfluences
    ) public {
        uint companyTokens = companies[msg.sender].tokensBought;
        require(companyTokens > 0, "Company does not have enough tokens.");
        ProductContract(address(productContractAddress)).addProduct(
            _title,
            _description,
            _imgUrl,
            _productLink,
            _pricePerInfluence,
            _numOfInfluences
        );
    }

    // company hires an Influencer for a particular product
    function hireInfluencerForProduct(address _influencerAddress, uint _prodId) public {

        // add influencer address to company array
        // containing all influencers company has hired
        companies[msg.sender].influencersHired.push(_influencerAddress);

        // after company agrees to select the influencer,
        // influencer subscribes to the product
        InfluencerContract(address(influencerContractAddress)).subscribeToProduct(_influencerAddress, _prodId);
    }

    // company pays the influencer the amount which is 
    // calculated according to the number of influences
    // influencer is able to generate for the particular 
    // product
    function payInfluencer(address payable _influencerAddress) payable public {
        // uint amount = InfluencerContract(address(influencerContractAddress)).getMoneyEarned(_influencerAddress);
        _influencerAddress.transfer(msg.value);
    }

    // returns all the companies currently registered with us
    function getAllCompanies() public view returns(Company[] memory) {
        Company[] memory allCompanies = new Company[](companyCount);
        for(uint i=0; i<companyCount; i++) {
            Company storage currentCompany = companies[companyAddresses[i]];
            allCompanies[i] = currentCompany;
        }
        return allCompanies;
    }

}