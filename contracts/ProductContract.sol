// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ProductContract {

    // product structure
    struct Product {
        address companyAddress;
        uint prodId;
        string title;
        string description;
        string imgUrl;
        string productLink;
        uint pricePerInfluence;
        uint numOfInfluences;
    }
    mapping(uint => Product) public products;
    uint public productCount;

    // constructor
    constructor() {
        productCount = 0;
    }

    // adds a single product to the blockchain
    function addProduct(
        string memory _title,
        string memory _description,
        string memory _imgUrl,
        string memory _productLink,
        uint _pricePerInfluence,
        uint _numOfInfluences
    ) external {
        products[productCount] = Product(
            tx.origin,
            productCount,
            _title,
            _description,
            _imgUrl,
            _productLink,
            _pricePerInfluence,
            _numOfInfluences
        );
        productCount++;
    }

    // shows all the details of a product
    function getProduct(uint _id) view public returns (
        address, 
        uint, 
        string memory,
        string memory, 
        string memory,
        string memory, 
        uint, 
        uint) {
            Product memory prod = products[_id];
            return(
                prod.companyAddress,
                prod.prodId,
                prod.title,
                prod.description,
                prod.imgUrl,
                prod.productLink,
                prod.pricePerInfluence,
                prod.numOfInfluences
            );
    }

    // returns all the products currently available
    function getAllProducts() public view returns(Product[] memory) {
        Product[] memory allProducts = new Product[](productCount);
        for(uint i=0; i<productCount; i++) {
            Product storage currentProduct = products[i];
            allProducts[i] = currentProduct;
        }
        return allProducts;
    }

}