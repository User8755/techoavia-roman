import './App.css';
import dangerGroup from './untils/dangerGroup';
import danger from './untils/danger';
import prof from './untils/prof';

import Select from 'react-select';

import { useEffect, useState } from 'react';
function App() {
  const [isInput, setInput] = useState('');

  const optionsTwo = [
    { value: 'chocolate', label: 'Chocolate2' },
    { value: 'strawberry', label: 'Strawberry2' },
    { value: 'vanilla', label: 'Vanilla2' },
  ];

  const [isArr, setArr] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const arr = [];
    if (isInput) {
      danger.map((item) => {
        if (isInput.id === item.id) {
          arr.push(item);
          setDisabled(false);
          setArr(arr);
        }
      });
    } else {
      return setDisabled(true);
    }
  }, [isInput]);
  console.log(isInput);

  return (
    <div className='App'>
      <main className='main'>
        <form className='form'>
        <label className='lable'>
            Профессии:
            <Select options={prof} onChange={(evt) => console.log(evt)} />
          </label>
          <label className='lable'>
            Группа опасности:
            <Select options={dangerGroup} onChange={(evt) => setInput(evt)} />
          </label>
          <label className='lable'>
            Опасности:
            <Select
              options={isArr}
              onChange={(evt) => console.log(evt)}
              isDisabled={disabled}
            />
          </label>
          <label className='lable'>
            Опасное событие
            <Select
              options={optionsTwo}
              onChange={(evt) => console.log(evt)}
              isDisabled={true}
            />
          </label>
        </form>
      </main>
    </div>
  );
}

export default App;
