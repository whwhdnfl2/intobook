import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookSearchPage from './pages/BookSearchPage';

function App() {
  return (
    <div className='App'>
      <div className='main-frame'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />}  />
            <Route path='/search' element={<BookSearchPage />}  />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;