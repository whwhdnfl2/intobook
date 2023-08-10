import './App.css';
import fetchFCMtoken from './utils/bluetooth/fetchFCMtoken';
import { useRecoilState } from 'recoil';
import { AccessToken } from './recoil/user/UserAtom';
import AppRouter from './Route';


function App() {
  
  const [token, setToken] = useRecoilState(AccessToken);

  fetchFCMtoken();

  return (
    <div className='App'>
      <AppRouter token={token} />
    </div>
  );
}

export default App;