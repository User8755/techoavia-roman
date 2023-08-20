import './App.css';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form/Form';
import Update from './components/Update/Update';
import Header from './components/Header/Header';
import ModalUpdata from './components/ModalUpdata/ModalUpdata';
import { useState } from 'react';
import Footer from './components/Footer/Footer';

function App() {

  const [isModal, setModal] = useState(false)
  return (
    <div className='App'>
      <ModalUpdata active={isModal} setModal={setModal}></ModalUpdata>
      <Header></Header>
      <Routes>
        <Route path='/techoavia-roman' element={<Form></Form>}></Route>
        <Route path='/update' element={<Update setModal={setModal}></Update>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;