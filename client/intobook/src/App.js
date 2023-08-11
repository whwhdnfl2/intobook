import './App.css';
import fetchFCMtoken from './utils/bluetooth/fetchFCMtoken';
import { useRecoilState } from 'recoil';
import { AccessToken } from './recoil/user/UserAtom';
import AppRouter from './Route';
import React, { useEffect } from 'react';


function App() {
  
  const [token, setToken] = useRecoilState(AccessToken);

  // useEffect(()=>{
  //   fetchFCMtoken();
  // },[])

  return (
    <div className='App'>
      <AppRouter token={token} />
    </div>
  );
}

export default App;