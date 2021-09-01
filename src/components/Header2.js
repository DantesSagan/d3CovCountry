import { Link } from 'react-router-dom';
import * as ROUTES from '../components/routes/routes';

export default function Header2() {
  return (
    <div>
      <header className='mt-6 mb-6'>
        <nav className='grid grid-cols-2 rounded-t-lg p-2  shadow-inner gridCol font-light'>
          <div className='border border-black rounded-2xl m-2'>
            <div className='button p-2'>
              <Link to={ROUTES.TotalCases}>
                Россия - общая статистика заражённых
              </Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.EveryDay}>
                Россия - ежедневная статистика заражённых
              </Link>
            </div>
          </div>
          <div className='border border-black rounded-2xl m-2'>
            <div className='button p-2'>
              <Link to={ROUTES.DeathTotalCases}>
                Россия - общая статистика смертности
              </Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.DeathEveryDay}>
                Россия - ежедневная статистика смертности
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
