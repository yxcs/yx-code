import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Gallery from '../pages/gallery';
import NotFound from '../pages/NotFound';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path='*' element={<NotFound/>}></Route>
  </Routes>
);

export default AppRoutes;