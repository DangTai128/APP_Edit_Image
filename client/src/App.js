import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Edit from './pages/Edit';
//import History from './pages/History';
//import Gallery from './pages/Gallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
        {/* <Route path="/history" element={<History />} />
        <Route path="/gallery" element={<Gallery />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
