
import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './components/Home';
import ProfilePage from './components/ProfilePage';
function App() {
  
  return (
    <div className='App' >
     
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/profile' element={<ProfilePage />}/>
     </Routes>
    </div>
  );
}

export default App;
