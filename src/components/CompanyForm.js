import React, { useContext } from "react";

import useInput from "../hooks/use-input";
import { UserContext } from "../store/user-context";

import Card from "../components/Card"

import "./Form.css"

const CompanyForm = (props) => {

    const walletAddress = useContext(UserContext).walletAddress

  const {
    value: companyName,
    isValid: iscompanyNameValid,
    hasError: companyNameHasError,
    valueChangeHandler: handlecompanyNameChange,
    inputBlurHandler: handlecompanyNameBlur,
    reset: resetcompanyName
  } = useInput(enteredcompanyName => enteredcompanyName.trim() !== "")

  let isFormValid = false
  if(iscompanyNameValid) {
    isFormValid = true
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(!isFormValid) {
      return
    }
    console.log(companyName, walletAddress)
    // call function
    props.addCompany(companyName)



    resetcompanyName()

    
  }

  const companyNameClasses = companyNameHasError ? "form-control invalid" : "form-control"

  return (
    <Card>
    <h1>Register Your Company With Us!</h1>
    <form onSubmit={handleSubmit}>
      <div className='control-group'>

        {/* COMPANY NAME */}
        <div className={companyNameClasses}>
          <label htmlFor="companyName">Company Name</label>
          <input 
            type="text"
            id="companyName"
            name="companyName"
            value={companyName}
            onChange={handlecompanyNameChange}
            onBlur={handlecompanyNameBlur}
          />
          {companyNameHasError && <p className="error-text">Company Name cannot be empty!</p>}
        </div>

      </div>

      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
    </Card>
  );
};

export default CompanyForm;
