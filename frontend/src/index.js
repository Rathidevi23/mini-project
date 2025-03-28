import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18+
import App from './App';
import { TripProvider } from './hook/Trip';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root for the app
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

