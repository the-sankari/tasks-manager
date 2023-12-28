import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './webPages/Layout';
import Home from './webPages/Home';
import "daisyui/dist/full.css";
import Settings from './webPages/Settings';
import About from './webPages/About';
import SingleTask from './webPages/SingleTask';
import TroubleShoot from './webPages/Troubleshoot';
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<SingleTask />} />
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/troubleShoot' element={<TroubleShoot/>}/>
        </Route>
        
    </Routes>
  );
}

export default App;
