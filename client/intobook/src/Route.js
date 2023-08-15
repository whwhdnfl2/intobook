import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, LoginPage, TutorialPage, BookshelvesPage, AlarmPage, StatisticsPage, BookSearchPage, BookInfoPage, BarcodePage } from './pages';
import { UpperNavbar } from './components/common';
import { Navbar } from './components/common';

const AppRoutes = () => {
    return (
        <>
            <UpperNavbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tutorial" element={<TutorialPage />} />
                <Route path='/search' element={<BookSearchPage />} />
                <Route path="/bookshelves" element={<BookshelvesPage />} />
                <Route path="/userbook/:userBookId" element={<BookInfoPage />} />
                <Route path="/alarm" element={<AlarmPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/search/barcode" element={<BarcodePage />} />
            </Routes>
            <Navbar />
        </>
    );
};

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
};

const AppRouter = ({ token }) => {
    return (
        <BrowserRouter>
            {token ? <AppRoutes /> : <AuthRoutes />}
        </BrowserRouter>
    );
};

export default AppRouter;