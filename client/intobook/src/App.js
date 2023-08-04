import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpperNavbar from './components/common/UpperNavbar';
import TutorialPage from './pages/TutorialPage';
import BookshelvesPage from './pages/BookshelvesPage';
import AlarmPage from './pages/AlarmPage';
import StatisticsPage from './pages/StatisticsPage';
import HomePage from './pages/HomePage';
import BookSearchPage from './pages/BookSearchPage';
import BookInfoPage from './pages/BookInfoPage';
import LoginPage from './pages/LoginPage';

function App() {

  const isLoggedIn = true;

  return (
    <div className='App'>
      <BrowserRouter>
        {isLoggedIn && <UpperNavbar />}
        <div className='main-frame'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/tutorial" element={<TutorialPage />} />
            <Route path='/search' element={<BookSearchPage />} />
            <Route path="/bookshelves" element={<BookshelvesPage />} />
            <Route path="/book/:bookId" element={<BookInfoPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        {isLoggedIn && <Navbar />}
      </BrowserRouter>
    </div>

  );
}

export default App;