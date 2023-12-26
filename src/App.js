import './App.css';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form/Form';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Profile from './components/Profile/Profile';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <div className='App'>
      <main className='main'>
        <Routes>
          <Route path='/techoavia-roman' element={<Form></Form>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route
            path='/registration'
            element={<Registration></Registration>}
          ></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
