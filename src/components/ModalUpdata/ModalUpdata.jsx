import './ModalUpdata.css';

function ModalUpdata({ active, setModal }) {
  return (
    <div
      className={active ? 'modal__overlay' : 'modal__overlay-disabled'}
      onClick={() => setModal(false)}
    >
      <div
        className='modal__window'
        onClick={(evt) => evt.stopPropagation()}
      ></div>
    </div>
  );
}

export default ModalUpdata;
