import './App.css';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form/Form';
import Update from './components/Update/Update';
import Header from './components/Header/Header';
import ModalUpdata from './components/ModalUpdata/ModalUpdata';
import { useEffect, useState } from 'react';
import api from './untils/api';
import danger from './untils/danger';
function App() {

     useEffect(() => {
      api.getDangers().then((err) => console.log(err))
    //   danger.forEach(item=>
    //     api
    //     .createDangers(item)
    //     .then((err) => console.log([err]))
    //     .catch((err) => console.log(err))
    //     )
     }, []);

  const [isModal, setModal] = useState(false);
  return (
    <div className='App'>
      <ModalUpdata active={isModal} setModal={setModal}></ModalUpdata>
      <Header></Header>
      <Routes>
        <Route path='/techoavia-roman' element={<Form></Form>}></Route>
        <Route
          path='/update'
          element={<Update setModal={setModal}></Update>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
