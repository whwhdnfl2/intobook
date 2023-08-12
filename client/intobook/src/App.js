import './App.css';
import { useRecoilState } from 'recoil';
import { AccessToken } from './recoil/user/UserAtom';
import AppRouter from './Route';
import React from 'react';


function App() {
  
  const [token, setToken] = useRecoilState(AccessToken);

  return (
    <div className='App'>
      <AppRouter token={token} />
    </div>
  );
}

export default App;