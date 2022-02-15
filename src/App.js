import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Metrics from './pages/Metrics';
import Metric from './pages/Metric'

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path='/' element={<Navigate replace to='/metrics' />} />
          <Route exact path='/metrics' element={<Metrics/>} />
          <Route exact path='/metric/:id' element={<Metric/>}/>
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
