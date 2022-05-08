import React, { useContext } from "react";

import useInput from "../hooks/use-input";
import { UserContext } from "../store/user-context";
import Card from "./Card";

import "./Form.css"

const HireInfluencerForm = (props) => {

    const walletAddress = useContext(UserContext).walletAddress

  const {
    value: influencerAddress,
    isValid: isinfluencerAddressValid,
    hasError: influencerAddressHasError,
    valueChangeHandler: handleinfluencerAddressChange,
    inputBlurHandler: handleinfluencerAddressBlur,
    reset: resetinfluencerAddress
  } = useInput(enteredinfluencerAddress => enteredinfluencerAddress.trim() !== "")

  const {
    value: productId,
    isValid: isproductIdValid,
    hasError: productIdHasError,
    valueChangeHandler: handleproductIdChange,
    inputBlurHandler: handleproductIdBlur,
    reset: resetproductId
  } = useInput(enteredproductId => enteredproductId >= 0)

  let isFormValid = false
  if(isinfluencerAddressValid && isproductIdValid) {
    isFormValid = true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!isFormValid) {
      return
    }

    const enteredproductId = parseInt(productId)
    props.hireInfluencer(influencerAddress, enteredproductId)

    resetinfluencerAddress()
    resetproductId()
  }

  const influencerAddressClasses = influencerAddressHasError ? "form-control invalid" : "form-control"
  const productIdClasses = productIdHasError ? "form-control invalid" : "form-control"


  return (
    <Card>

    <h1>Hire Influencer</h1>
    
    <form onSubmit={handleSubmit}>
      <div className='control-group'>

        {/* influencerAddress */}
        <div className={influencerAddressClasses}>
          <label htmlFor="influencerAddress">Influencer Address</label>
          <input 
            type="text"
            id="influencerAddress"
            name="influencerAddress"
            value={influencerAddress}
            onChange={handleinfluencerAddressChange}
            onBlur={handleinfluencerAddressBlur}
          />
          {influencerAddressHasError && <p className="error-text">Influencer Address cannot be empty!</p>}
        </div>
        

        {/* PRODUCT ID */}
        <div className={productIdClasses}>
          <label htmlFor="productId">Product ID</label>
          <input 
            type="number" 
            id="productId"
            name="productId"
            value={productId}
            onChange={handleproductIdChange}
            onBlur={handleproductIdBlur}
          />
          {productIdHasError && <p className="error-text">Product ID cannot be negative!</p>}
        </div>


      </div>


      <div className='form-actions'>
        <button disabled={!isFormValid}>Hire</button>
      </div>
    </form>
    </Card>
  );
};

export default HireInfluencerForm;
