import './style/app.css';
import TopBar from './main/top_bar';
import { Route, Routes } from 'react-router-dom';
import Maps from './pages/maps';
import Guests from './pages/guests';
import Login from './pages/login';

function App() {
  return (
      <div className="content">
        <TopBar />
        <Routes>
          <Route path='/maps/:map_name/*' element ={<Maps />}/>
          <Route path='/guests/:map_name/*' element={<Guests/>} />
          <Route path='login' element={<Login/>} />
        </Routes>
      </div>

  );
}

export default App;
