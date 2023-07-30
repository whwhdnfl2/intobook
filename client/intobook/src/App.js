import './App.css';
import Navbar from './components/common/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import UpperNavbar from './components/common/UpperNavbar';
import TutorialPage from './pages/TutorialPage';
import BookshelvesPage from './pages/BookshelvesPage';
import AlarmPage from './pages/AlarmPage';
import StatisticsPage from './pages/StatisticsPage';


function App() {

  const isLoggedIn = true;

  return (
    <div className='App'>
      {isLoggedIn && <UpperNavbar/>}
      <div className='main-frame'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TutorialPage />} />
            <Route path="/bookshelves" element={<BookshelvesPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      {isLoggedIn && <Navbar/>}
    </div>
      
  );
}

export default App;
