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
const DeathTotalCases = lazy(() =>
  import('./components/RusCovid/DeathTotalCases/DeathTotalCases')
);
const DeathEveryDay = lazy(() =>
  import('./components/RusCovid/DeathEveryDay/DeathEveryDay')
);
const UsaTotalCases = lazy(() =>
  import('./components/UsaCovid/TotalCases/TotalCases')
);
const UsaEveryDay = lazy(() =>
  import('./components/UsaCovid/EverydayCases/EveryDay')
);
const UsaDeathTotalCases = lazy(() =>
  import('./components/UsaCovid/DeathTotalCases/DeathTotalCases')
);
const UsaDeathEveryDay = lazy(() =>
  import('./components/UsaCovid/DeathEveryDay/DeathEveryDay')
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
          <Route path={ROUTES.DeathTotalCases} component={DeathTotalCases} />
          <Route path={ROUTES.DeathEveryDay} component={DeathEveryDay} />
          <Route path={ROUTES.UsaTotalCases} component={UsaTotalCases} />
          <Route path={ROUTES.UsaEveryDay} component={UsaEveryDay} />
          <Route
            path={ROUTES.UsaDeathTotalCases}
            component={UsaDeathTotalCases}
          />
          <Route path={ROUTES.UsaDeathEveryDay} component={UsaDeathEveryDay} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
