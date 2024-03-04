import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import MyLayout from '../MyLayout';
import Home from '../../pages/Home';
import About from '../../pages/About';
import Article from '../../pages/Article';
import Login from '../../pages/Login';
import Test from '../../pages/Test';
import PictureShow from '../../pages/PictureShow';

// function isAuth() {
//   return localStorage.getItem("token")
// }

const MyRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyLayout />}>
          <Route index  element={<Home />}/>
          <Route path="about" element={<About/>}/>
          <Route path="article" element={<Article/>}/>
          <Route path="about/edit" element={<Test/>}/>
          <Route path="pic" element={<PictureShow/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
};

export default MyRouter;
