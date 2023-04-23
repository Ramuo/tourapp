import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';


function App() {
  return (
    <>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/' element={<HomePage/>}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
