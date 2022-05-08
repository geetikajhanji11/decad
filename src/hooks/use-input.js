import { useReducer } from 'react';

const initialInputState = {
    value: "",
    isTouched: false
}

const inputStateReducer = (state, action) => {
    
    if(action.type === "UPDATE_VALUE") {
        return {
            value: action.value,
            isTouched: state.isTouched
        }
    }

    else if(action.type === "UPDATE_TOUCH") {
        return {
            value: state.value,
            isTouched: action.isTouched
        }
    }

    else if(action.type === "RESET") {
        return initialInputState
    }

    return initialInputState
}

const useInput = (validateValue) => {

    const [inputState, dispatchInputState] = useReducer(inputStateReducer, initialInputState, )

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event) => {
        dispatchInputState({
            type: "UPDATE_VALUE",
            value: event.target.value
        })
    };

    const inputBlurHandler = (event) => {
        dispatchInputState({
            type: "UPDATE_TOUCH",
            isTouched: true
        })
    };

    const reset = () => {
        dispatchInputState({
            type: "RESET"
        })
    };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;