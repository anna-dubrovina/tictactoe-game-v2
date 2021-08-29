import useInput from '../../hooks/useInput';
import Input from '../UI/Input';
import Modal from '../UI/Modal';

const GameStart = (props) => {
  const {
    value: playerOneName,
    invalid: invalidPlayerOneName,
    changeHandler: changePlayerOneName,
    blurHandler: blurPlayerOneName,
  } = useInput();
  const {
    value: playerTwoName,
    invalid: invalidPlayerTwoName,
    changeHandler: changePlayerTwoName,
    blurHandler: blurPlayerTwoName,
  } = useInput();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      invalidPlayerOneName ||
      invalidPlayerTwoName ||
      playerOneName.trim() === '' ||
      playerTwoName.trim() === ''
    ) {
      return;
    }
    props.started(playerOneName, playerTwoName);
  };

  return (
    <Modal>
      <h2> Pick Names for Players</h2>
      <form className="start-game-form" onSubmit={submitHandler}>
        <Input
          id="p-1"
          type="text"
          label="player 1: crosses"
          placeholder="enter player 1 name"
          value={playerOneName}
          invalid={invalidPlayerOneName}
          changed={changePlayerOneName}
          blured={blurPlayerOneName}
        />
        <Input
          id="p-2"
          type="text"
          label="player 2: noughts"
          placeholder="enter player 2 name"
          value={playerTwoName}
          invalid={invalidPlayerTwoName}
          changed={changePlayerTwoName}
          blured={blurPlayerTwoName}
        />
        <button className="btn">Start Game</button>
      </form>
    </Modal>
  );
};

export default GameStart;
