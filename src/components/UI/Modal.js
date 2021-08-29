import ReactDOM from 'react-dom';

const Modal = (props) => {
  const closeModalHandler = () => {
    props.close && props.close();
    return;
  };

  return ReactDOM.createPortal(
    <>
      <div className="modal">{props.children}</div>
      <div className="backdrop" onClick={closeModalHandler}></div>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
