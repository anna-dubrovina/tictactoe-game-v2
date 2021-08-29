import { useEffect, useState } from 'react';

const Input = (props) => {
  const [isErrorStyle, setIsErrorStyle] = useState(false);
  const classes = isErrorStyle
    ? 'start-game-form__controls start-game-form__controls__invalid'
    : 'start-game-form__controls';

  useEffect(() => {
    let timer;
    !props.invalid && setIsErrorStyle(false);
    if (props.invalid) {
      setIsErrorStyle(true);
      timer = setTimeout(() => setIsErrorStyle(false), [3000]);
    }

    return () => clearTimeout(timer);
  }, [props.invalid, props.value]);

  return (
    <div className={classes}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.changed}
        onBlur={props.blured}
        value={props.value}
      />
      {isErrorStyle && <span>Entered name is too short</span>}
    </div>
  );
};

export default Input;
