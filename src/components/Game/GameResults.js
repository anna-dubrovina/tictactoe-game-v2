import Modal from '../UI/Modal';

const GameResults = (props) => {
  const pickNewPlayersHandler = () => props.newPlayers();
  const startNewRoundHandler = () => props.newRound();

  return (
    <Modal>
      <h3> {props.result}</h3>
      <button className="btn" onClick={pickNewPlayersHandler}>
        Pick new players
      </button>
      <button className="btn" onClick={startNewRoundHandler}>
        Start new round
      </button>
    </Modal>
  );
};

export default GameResults;
