import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

//import Home from './pages/Home';
import Edit from './pages/Edit';
//import History from './pages/History';
//import Gallery from './pages/Gallery';
//import AttackPage from './pages/AttackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Edit />} />
        {/* <Route path="/attack" element={<AttackPage />} /> */}
        {/* <Route path="/history" element={<History />} />
        <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
