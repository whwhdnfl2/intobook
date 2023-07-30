import React, { useState } from 'react';
import SearchBottomSheet from '../components/bookSearch/SearchBottomSheet';

const HomePage = () => {
  const [showSearchBottomSheet, setShowsSearchBottomSheet] = useState(false);

  const showSearchBottomSheetHandler = () => {
    setShowsSearchBottomSheet((status) => !status);
  };

  return (
    <div>
      <div style={{width: '350px', fontSize: '50px'}}
        onClick={showSearchBottomSheetHandler}
      >
        +
      </div>
      {showSearchBottomSheet && <SearchBottomSheet />}
    </div>
  );
};

export default HomePage;