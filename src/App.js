import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../src/constants/routes';

import TotalCases from './components/RusCovid/TotalCases/TotalCases';

import './App.css';

export default function App() {
  return (
    <svg className='App'>
      <TotalCases />
    </svg>
  );
}
