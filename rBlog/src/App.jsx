import { useState } from 'react'
import { Button } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.less';
import AppRoutes from './routers/AppRoutes';
function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
