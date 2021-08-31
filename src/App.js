import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as ROUTES from './components/routes/routes';

import Loader from './components/pages/loader';

import './App.css';

const Header = lazy(() => import('./components/header'));
const Main = lazy(() => import('./main'));
const TotalCases = lazy(() =>
  import('./components/RusCovid/TotalCases/TotalCases')
);
const EveryDay = lazy(() =>
  import('./components/RusCovid/EverydayCases/EveryDay')
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Header />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route path={ROUTES.TotalCases} component={TotalCases} />
          <Route path={ROUTES.EveryDay} component={EveryDay} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
