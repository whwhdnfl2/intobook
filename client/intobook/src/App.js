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
      <BrowserRouter>
      {isLoggedIn && <UpperNavbar/>}
      <div className='main-frame'>
          <Routes>
            <Route path="/" element={<TutorialPage />} />
            <Route path="/bookshelves" element={<BookshelvesPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
      </div>
      {isLoggedIn && <Navbar/>}
      </BrowserRouter>
    </div>
      
  );
}

export default App;
