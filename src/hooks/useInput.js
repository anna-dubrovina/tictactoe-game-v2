import { useReducer } from 'react';

const CHANGE = 'change',
  BLUR = 'blur',
  INITIAL_STATE = { value: '', isTouched: false };

const nameRe = /^[A-Za-zА-я ]{2,}/;
const validateValue = (value) => nameRe.test(value.trim());

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return { ...state, value: action.value };
    case BLUR:
      return { ...state, isTouched: true };
    default:
      return INITIAL_STATE;
  }
};

const useInput = () => {
  const [inputState, dispatch] = useReducer(inputStateReducer, INITIAL_STATE);
  const isValid = validateValue(inputState.value);
  const invalid = !isValid && inputState.isTouched;

  const changeHandler = (e) =>
    dispatch({ type: CHANGE, value: e.target.value });
  const blurHandler = () => dispatch({ type: BLUR });

  return {
    value: inputState.value,
    invalid,
    changeHandler,
    blurHandler,
  };
};

export default useInput;
