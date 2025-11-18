import {createRoot} from 'react-dom/client'
import App from './app/App/App.tsx'
import {BrowserRouter} from "react-router";
import {store} from "@/app/store";
import {Provider} from "react-redux";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <Provider store={store}>
    <App />
          </Provider>
  </BrowserRouter>,
)
