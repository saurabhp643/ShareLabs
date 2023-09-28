import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import DataGrid from './components/DataGrid';
import Pagination from './components/Pagination';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DataGrid />
        <Pagination />
      </div>
    </Provider>
  );
}

export default App;
