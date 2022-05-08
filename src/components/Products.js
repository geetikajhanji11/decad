import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';


import ProductContractJSON from "../artifacts/contracts/ProductContract.sol/ProductContract.json"
import { productContractAddress } from '../config';
import Product from './Product';
import ProductForm from './ProductForm';
import Layout from './Layout';

const Products = (props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        loadProducts()
    }, [])

    const loadProducts = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const productContract = new ethers.Contract(productContractAddress, ProductContractJSON.abi, provider)

        // get all products (array)
        const data = await productContract.getAllProducts()
        setProducts(data)
        // console.log("products")
        // console.log(data)
    }

    return (
        <Layout>
            <h1>Products</h1>
            
            {products.map(product => <Product key={product.prodId.toString()} product={product}/>)}
        </Layout>
    );
};

export default Products;