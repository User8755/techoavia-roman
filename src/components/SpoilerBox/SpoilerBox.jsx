import { React, useState } from 'react';

function SpoilerBox(props) {
  const [isOpenOrder776, setIsOpenOrder776] = useState(false);
  const [isOpenOrder767, setIsOpenOrder767] = useState(false);
  console.log(props.number);
  return (
    <>
      {props.number === 767 ? (
        <div className='input-order__wrapper'>
          <span
            className='input-order__title'
            onClick={() => setIsOpenOrder767(!isOpenOrder767)}
          >
            Приказ №767
          </span>
          <div
            className={
              isOpenOrder767 ? 'dropdown-child_open' : 'dropdown-child_close'
            }
          >
            {props.children}
          </div>
        </div>
      ) : (
        <div className='input-order__wrapper'>
          <span
            className='input-order__title'
            onClick={() => setIsOpenOrder776(!isOpenOrder776)}
          >
            Приказ №776
          </span>
          <div
            className={
              isOpenOrder776 ? 'dropdown-child_open' : 'dropdown-child_close'
            }
          >
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
export default SpoilerBox;
