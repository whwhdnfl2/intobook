import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter } from 'react-router-dom';
import UpperNavbar from './components/common/UpperNavbar';


function App() {
  return (
    <div className='App'>
      <UpperNavbar/>
      <div className='main-frame'>
        <BrowserRouter>
        </BrowserRouter>
      </div>
      <Navbar/>
    </div>
      
  );
}

export default App;
