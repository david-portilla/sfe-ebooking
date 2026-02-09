import { AppProvider } from './app/provider';
import { AppRouter } from './app/router';
import React from 'react';
import ReactDOM from 'react-dom';

if (import.meta.env.DEV) {
  import('@axe-core/react').then((axe) => {
    axe.default(React, ReactDOM, 1000);
  });
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
