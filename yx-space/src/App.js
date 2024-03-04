import React from 'react';
import { ConfigProvider, theme } from 'antd';

import MyRouter from './components/MyRouter';

function App() {
  return (
    <div className="App">
      <ConfigProvider theme={{
        token: { colorPrimary: '#00b96b' },
        algorithm: theme.darkAlgorithm,
        Button: {
          colorPrimary: '#00ff00',
          algorithm: true, // 启用算法
        },
        Input: {
          colorPrimary: '#eb2f96',
          algorithm: true, // 启用算法
        }
      }}>
        <MyRouter />
      </ConfigProvider>
    </div>
  );
}

export default App;
