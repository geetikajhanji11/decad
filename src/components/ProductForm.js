import React, { useContext } from "react";

import useInput from "../hooks/use-input";
import { UserContext } from "../store/user-context";

import Card from "./Card";

import "./Form.css"

const ProductForm = (props) => {

    const walletAddress = useContext(UserContext).walletAddress

  const {
    value: title,
    isValid: istitleValid,
    hasError: titleHasError,
    valueChangeHandler: handletitleChange,
    inputBlurHandler: handletitleBlur,
    reset: resettitle
  } = useInput(enteredtitle => enteredtitle.trim() !== "")

  const {
    value: description,
    isValid: isdescriptionValid,
    hasError: descriptionHasError,
    valueChangeHandler: handledescriptionChange,
    inputBlurHandler: handledescriptionBlur,
    reset: resetdescription
  } = useInput(entereddescription => entereddescription.trim() !== "")

  const {
    value: imageUrl,
    isValid: isimageUrlValid,
    hasError: imageUrlHasError,
    valueChangeHandler: handleimageUrlChange,
    inputBlurHandler: handleimageUrlBlur,
    reset: resetimageUrl
  } = useInput(enteredimageUrl => enteredimageUrl.trim() !== "")

  const {
    value: productLink,
    isValid: isproductLinkValid,
    hasError: productLinkHasError,
    valueChangeHandler: handleproductLinkChange,
    inputBlurHandler: handleproductLinkBlur,
    reset: resetproductLink
  } = useInput(enteredproductLink => enteredproductLink.trim() !== "")

  const {
    value: pricePerInfluence,
    isValid: ispricePerInfluenceValid,
    hasError: pricePerInfluenceHasError,
    valueChangeHandler: handlepricePerInfluenceChange,
    inputBlurHandler: handlepricePerInfluenceBlur,
    reset: resetpricePerInfluence
  } = useInput(enteredpricePerInfluence => enteredpricePerInfluence !== 0)
  
  let isFormValid = false
  if(istitleValid && isdescriptionValid && isimageUrlValid && isproductLinkValid && ispricePerInfluenceValid) {
    isFormValid = true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!isFormValid) {
      return
    }
    // console.log(walletAddress, title, description)
    props.addProduct(title, description, imageUrl, productLink, pricePerInfluence)

    resettitle()
    resetdescription()
    resetimageUrl()
    resetproductLink()
    resetpricePerInfluence()
  }

  const titleClasses = titleHasError ? "form-control invalid" : "form-control"
  const descriptionClasses = descriptionHasError ? "form-control invalid" : "form-control"
  const imageUrlClasses = imageUrlHasError ? "form-control invalid" : "form-control"
  const productLinkClasses = productLinkHasError ? "form-control invalid" : "form-control"
  const pricePerInfluenceClasses = pricePerInfluenceHasError ? "form-control invalid" : "form-control"

  return (
    <Card>
    <h1>Register Your Product With Us!</h1>
    <form onSubmit={handleSubmit}>
      <div className='control-group'>

        {/* PRODUCT TITLE */}
        <div className={titleClasses}>
          <label htmlFor="title">Title</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handletitleChange}
            onBlur={handletitleBlur}
          />
          {titleHasError && <p className="error-text">Instagram Name cannot be empty!</p>}
        </div>
        

        {/* DESCRIPTION */}
        <div className={descriptionClasses}>
          <label htmlFor="description">Description</label>
          <input 
            type="text" 
            id="description"
            name="description"
            value={description}
            onChange={handledescriptionChange}
            onBlur={handledescriptionBlur}
          />
          {descriptionHasError && <p className="error-text">IG Handle cannot be empty!</p>}
        </div>

        {/* IMAGE */}
        <div className={imageUrlClasses}>
          <label htmlFor="imageUrl">Image URL</label>
          <input 
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={imageUrl}
            onChange={handleimageUrlChange}
            onBlur={handleimageUrlBlur}
          />
          {imageUrlHasError && <p className="error-text">Image URL cannot be empty!</p>}
        </div>

        {/* PRICE PER INFLUENCE */}
        <div className={pricePerInfluenceClasses}>
          <label htmlFor="pricePerInfluence">Price Per Influence</label>
          <input 
            type="number"
            id="pricePerInfluence"
            name="pricePerInfluence"
            value={pricePerInfluence}
            onChange={handlepricePerInfluenceChange}
            onBlur={handlepricePerInfluenceBlur}
          />
          {pricePerInfluenceHasError && <p className="error-text">Price Per Influence cannot be zero!</p>}
        </div>

        {/* PRODUCT LINK */}
        <div className={productLinkClasses}>
          <label htmlFor="">Product Link</label>
          <input 
            type="text"
            id="productLink"
            name="productLink"
            value={productLink}
            onChange={handleproductLinkChange}
            onBlur={handleproductLinkBlur}
          />
          {productLinkHasError && <p className="error-text">Product Link cannot be empty!</p>}
        </div>


      </div>


      <div className='form-actions'>
        <button disabled={!isFormValid}>Add Product</button>
      </div>
    </form>
    </Card>
  );
};

export default ProductForm;
