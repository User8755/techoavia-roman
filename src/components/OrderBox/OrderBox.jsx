import { React, useState } from 'react';
import Select from 'react-select';

function OrderBox({
  dangerGroup,
  isDanger,
  isDangerGroup,
  setisDanger,
  setDangerGroup,
  sortedDangerGroup,
  sortedDangerEvent,
  setDangerEvent,
  isDangerEvent,
  sortedDanger776,
  setDanger776,
  isDanger776,
  sortedDangerEvent776,
  setDangerEvent776,
  isDangerEvent776,
  sortedRiskManagemet,
  setRiskManagement,
  isRiskManagement,
}) {
  const [isOpenOrder776, setIsOpenOrder776] = useState(false);
  const [isOpenOrder767, setIsOpenOrder767] = useState(false);

  return (
    <>
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
          <label className='label'>
            Группа опасности:
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={dangerGroup}
              onChange={(name) => setDangerGroup(name)}
              placeholder={'Группа опасности'}
              value={isDangerGroup}
            />
          </label>
          <label className='label'>
            Опасности:
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={sortedDangerGroup}
              onChange={(evt) => setisDanger(evt)}
              placeholder={'Опасности'}
              value={isDanger}
            />
          </label>
          <label className='label'>
            Опасное событие:
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={sortedDangerEvent}
              onChange={(evt) => setDangerEvent(evt)}
              placeholder={'Опасное событие'}
              value={isDangerEvent}
            />
          </label>
        </div>
      </div>
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
          <label className='label'>
            Опасности:
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={sortedDanger776}
              onChange={(evt) => setDanger776(evt)}
              placeholder={'Опасности'}
              value={isDanger776}
            />
          </label>
          <label className='label'>
            Опасное событие:
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={sortedDangerEvent776}
              onChange={(evt) => setDangerEvent776(evt)}
              placeholder={'Опасное событие'}
              value={isDangerEvent776}
            />
          </label>
          {/*не забыть настроить инпутб сейчас он работает как "Опасные события"*/}
          <label className='label'>
            Меры упр-я/контроля проф. рисков
            <Select
              className='react-select-container order'
              classNamePrefix='react-select'
              options={sortedRiskManagemet}
              onChange={(evt) => setRiskManagement(evt)}
              placeholder={'Меры управления/контроля'}
              value={isRiskManagement}
            />
          </label>
        </div>
      </div>
    </>
  );
}
export default OrderBox;
