
import { Route, Routes } from 'react-router';
import './App.css';
import { Home } from './components/Home';
import VerticalTabs from './components/Tabs';
function App() {
  
  return (
    <div className='App' >
     
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/profile' element={<VerticalTabs />}/>
     </Routes>
    </div>
  );
}

export default App;
