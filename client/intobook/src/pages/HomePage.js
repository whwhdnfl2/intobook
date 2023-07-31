import React, { useState } from 'react';
import SearchBottomSheet from '../components/bookSearch/SearchBottomSheet';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(true);
  };

  return (
    < >
      <div style={{ fontSize: '50px', margin: '0 20px', display: 'flex'}}
        onClick={clickHandler}
      >
        +
      </div>
      <SearchBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} clickHandler={clickHandler} />

    </>
  );
};

export default HomePage;