import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <div className='main-frame'>
        <BrowserRouter>
        </BrowserRouter>
      </div>
      <Navbar/>
    </div>
  );
}

export default App;
