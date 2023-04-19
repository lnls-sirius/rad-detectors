import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RouterNavigator from './pages';
import './styled.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>
    Testing page
  <BrowserRouter>
    <RouterNavigator />
  </BrowserRouter>
  </div>
);
