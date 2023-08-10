import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TutorialPage, BookshelvesPage, AlarmPage, HomePage, StatisticsPage, BookSearchPage, BookInfoPage, LoginPage } from './pages';
import UpperNavbar from './components/common/UpperNavbar';
import Navbar from './components/common/Navbar';
import fetchFCMtoken from './utils/bluetooth/fetchFCMtoken';
import { useRecoilState } from 'recoil';
import { AccessToken } from './recoil/user/UserAtom';
import { useEffect } from 'react';


function App() {

  const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
  const [token, setToken] = useRecoilState(AccessToken);

  fetchFCMtoken();

  // function setScreenSize() {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // }
  // useEffect(() => {
  //   setScreenSize();
  // });
  
  return (
      <div className='App'>
        <BrowserRouter>
          {isLoggedIn && <UpperNavbar />}
            <Routes>
              <Route path="/" element={isLoggedIn ? <HomePage /> : <LoginPage />} />
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/tutorial" element={<TutorialPage />} />
              <Route path='/search' element={<BookSearchPage />} />
              <Route path="/bookshelves" element={<BookshelvesPage />} />
              <Route path="/userbook/:userBookId" element={<BookInfoPage />} />
              <Route path="/alarm" element={<AlarmPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          {isLoggedIn && <Navbar />}
        </BrowserRouter>
      </div>
  );
}

export default App;