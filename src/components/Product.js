import React from 'react';

import Card from './Card';
import product_image_dummy from "../assets/product_image_dummy.jpg"
import classes from "./Product.module.css"

const Product = (props) => {
    return (
        <Card>
            <img className={classes.prodImg} src={product_image_dummy}/>
            <h1 className={classes.title}>{props.product.title}</h1>
            <p className={classes.desc}>{props.product.description}</p>

            <p><span>Product Id:</span> {props.product.prodId.toNumber()}</p>
            
            <p><span>Owned by:</span> {props.product.companyAddress}</p>
            
            <p><span>Image URL:</span> {props.product.imgUrl}</p>
            <p><span>Number of Influences:</span> {props.product.numOfInfluences.toNumber()}</p>
            <p><span>Price Per Influence:</span> {props.product.pricePerInfluence.toNumber()}</p>
            <p><span>Product Link:</span> {props.product.productLink}</p>
        </Card>
    );
};

export default Product;