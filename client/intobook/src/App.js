import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UpperNavbar from './components/common/UpperNavbar';
import TutorialPage from './pages/TutorialPage';


function App() {

  const isLoggedIn = true;

  return (
    <div className='App'>
      {isLoggedIn && <UpperNavbar/>}
      <div className='main-frame'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TutorialPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      {isLoggedIn && <Navbar/>}
    </div>
      
  );
}

export default App;
