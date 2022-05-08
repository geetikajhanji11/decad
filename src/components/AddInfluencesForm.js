import React, { useContext } from "react";

import useInput from "../hooks/use-input";
import { UserContext } from "../store/user-context";
import Card from "./Card";

import "./Form.css"

const AddInfluencesForm = (props) => {

    const walletAddress = useContext(UserContext).walletAddress

  const {
    value: influences,
    isValid: isinfluencesValid,
    hasError: influencesHasError,
    valueChangeHandler: handleinfluencesChange,
    inputBlurHandler: handleinfluencesBlur,
    reset: resetinfluences
  } = useInput(enteredinfluences => enteredinfluences > 0)

  const {
    value: productId,
    isValid: isproductIdValid,
    hasError: productIdHasError,
    valueChangeHandler: handleproductIdChange,
    inputBlurHandler: handleproductIdBlur,
    reset: resetproductId
  } = useInput(enteredproductId => enteredproductId >= 0)

  let isFormValid = false
  if(isinfluencesValid && isproductIdValid) {
    isFormValid = true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!isFormValid) {
      return
    }

    const enteredinfluences = parseInt(influences)
    const enteredproductId = parseInt(productId)
    // console.log(typeof enteredinfluences)
    // console.log(typeof enteredproductId)
    props.addInfluencesForProduct(enteredinfluences, enteredproductId)

    resetinfluences()
    resetproductId()
  }

  const influencesClasses = influencesHasError ? "form-control invalid" : "form-control"
  const productIdClasses = productIdHasError ? "form-control invalid" : "form-control"


  return (
    <Card>

    <h1>Add Influences</h1>
    
    <form onSubmit={handleSubmit}>
      <div className='control-group'>

        {/* INFLUENCES */}
        <div className={influencesClasses}>
          <label htmlFor="influences">Influences</label>
          <input 
            type="number"
            id="influences"
            name="influences"
            value={influences}
            onChange={handleinfluencesChange}
            onBlur={handleinfluencesBlur}
          />
          {influencesHasError && <p className="error-text">Influences cannot be less than or equal to zero!</p>}
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
        <button disabled={!isFormValid}>Add Influences</button>
      </div>
    </form>
    </Card>
  );
};

export default AddInfluencesForm;
