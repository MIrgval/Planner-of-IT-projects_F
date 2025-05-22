import './index.css';
import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ru_RU from 'antd/locale/ru_RU';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { ConfigProvider } from 'antd';
dayjs.locale('ru');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={ru_RU}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
