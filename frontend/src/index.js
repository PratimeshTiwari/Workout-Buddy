import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import context and wrap it around app component
import { WorkoutsContextProvider } from './context/WorkoutContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

   <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider> 
  </React.StrictMode>
);


