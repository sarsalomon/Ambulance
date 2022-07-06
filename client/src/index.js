import React, { createContext } from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';
import UserStore from './ambulance/UserStore';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'leaflet/dist/leaflet.css';

export const Context = createContext(null);
const root = createRoot( document.getElementById('root'));


root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
);
