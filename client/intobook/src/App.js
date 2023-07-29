import './App.css';
import { BrowserRouter } from 'react-router-dom';
import BookSearchToggle from './components/bookSearch/BookSearchToggle';


function App() {
  return (
    <div className='App'>
      <div className='main-frame'>
        <BookSearchToggle />
        <BrowserRouter>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;