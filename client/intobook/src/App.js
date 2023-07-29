import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BookSearchPage from './pages/BookSearchPage';
import BookSearchToggle from './components/bookSearch/BookSearchToggle';


function App() {
  return (
    <div className='App'>
      <div className='main-frame'>
        <BookSearchToggle {...booksearchData} />
        <BrowserRouter>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

const searchGroup1Data = {
  serchIcon: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/serch-icon-1@2x.png",
  spanText: "검색하여 등록하기",
};

const searchGroup2Data = {
  serchIcon: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/barcord-icon-1@2x.png",
  spanText: "바코드로 등록하기",
};

const booksearchData = {
  spanText1: "읽을 책 등록하기",
  line6: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/line-6-1@2x.png",
  line9: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/line-8-1@2x.png",
  line8: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/line-8-1@2x.png",
  booksIconSearch: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/books-icon-search-1@2x.png",
  spanText2: "내 책장에서 등록하기",
  line10: "https://anima-uploads.s3.amazonaws.com/projects/64c521b5278736f187f9527b/releases/64c521cd6c969ad206740be9/img/line-8-1@2x.png",
  searchGroup1Props: searchGroup1Data,
  searchGroup2Props: searchGroup2Data,
};