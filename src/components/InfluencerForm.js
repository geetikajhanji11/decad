import React, { useContext } from "react";

import useInput from "../hooks/use-input";
import { UserContext } from "../store/user-context";
import Card from "./Card";

import "./Form.css"

const InfluencerForm = (props) => {

    const walletAddress = useContext(UserContext).walletAddress

  const {
    value: influencerName,
    isValid: isinfluencerNameValid,
    hasError: influencerNameHasError,
    valueChangeHandler: handleinfluencerNameChange,
    inputBlurHandler: handleinfluencerNameBlur,
    reset: resetinfluencerName
  } = useInput(enteredinfluencerName => enteredinfluencerName.trim() !== "")

  const {
    value: igHandle,
    isValid: isigHandleValid,
    hasError: igHandleHasError,
    valueChangeHandler: handleigHandleChange,
    inputBlurHandler: handleigHandleBlur,
    reset: resetigHandle
  } = useInput(enteredigHandle => enteredigHandle.trim() !== "")

  let isFormValid = false
  if(isinfluencerNameValid && isigHandleValid) {
    isFormValid = true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!isFormValid) {
      return
    }
    console.log(walletAddress, influencerName, igHandle)
    props.addInfluencer(influencerName, igHandle)

    resetinfluencerName()
    resetigHandle()
  }

  const influencerNameClasses = influencerNameHasError ? "form-control invalid" : "form-control"
  const igHandleClasses = igHandleHasError ? "form-control invalid" : "form-control"


  return (
    <Card>

    <h1>Register Yourself as an Influencer!</h1>
    
    <form onSubmit={handleSubmit}>
      <div className='control-group'>

        {/* INFLUENCER NAME */}
        <div className={influencerNameClasses}>
          <label htmlFor="influencerName">Influencer Name</label>
          <input 
            type="text"
            id="influencerName"
            name="influencerName"
            value={influencerName}
            onChange={handleinfluencerNameChange}
            onBlur={handleinfluencerNameBlur}
          />
          {influencerNameHasError && <p className="error-text">Instagram Name cannot be empty!</p>}
        </div>
        

        {/* IG HANDLE */}
        <div className={igHandleClasses}>
          <label htmlFor="igHandle">IG Handle</label>
          <input 
            type="text" 
            id="igHandle"
            name="igHandle"
            value={igHandle}
            onChange={handleigHandleChange}
            onBlur={handleigHandleBlur}
          />
          {igHandleHasError && <p className="error-text">IG Handle cannot be empty!</p>}
        </div>


      </div>


      <div className='form-actions'>
        <button disabled={!isFormValid}>Add Influencer</button>
      </div>
    </form>
    </Card>
  );
};

export default InfluencerForm;
