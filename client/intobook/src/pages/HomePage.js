import React, { useState } from 'react';
import SearchBottomSheet from '../components/bookSearch/SearchBottomSheet';

const HomePage = () => {
  const [showSearchBottomSheet, setShowsSearchBottomSheet] = useState(false);

  const showSearchBottomSheetHandler = () => {
    setShowsSearchBottomSheet((status) => !status);
  };

  return (
    < >
      <div style={{ fontSize: '50px', margin: '0 20px', display: 'flex'}}
        onClick={showSearchBottomSheetHandler}
      >
        +
      </div>
      {showSearchBottomSheet && <SearchBottomSheet />}
    </>
  );
};

export default HomePage;