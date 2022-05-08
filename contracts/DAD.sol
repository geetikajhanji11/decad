// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DAD is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    // constructor
    constructor() ERC721("DecAD Tokens", "DAD") {}

    // for minting new tokens
    function buyToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(tx.origin, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    // returns all the token uris
    // of all the tokens that have been
    // minted by the owner 
    function getTokensOf(address owner) public view returns(string[] memory) {

        uint256 n = _tokenIds.current();
        string[] memory uris = new string[](n);
        uint256 index = 0;

        for(uint256 tokenId=1; tokenId<=n; tokenId++) {
            if(ownerOf(tokenId) == owner) {
                string memory uri = tokenURI(tokenId);
                uris[index] = uri;
                index++;
            }
        }
        return uris;
    }

}