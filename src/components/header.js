import { Link } from 'react-router-dom';
import * as ROUTES from '../components/routes/routes';

export default function Header() {
  return (
    <div>
      <header className='mt-6'>
        <nav className='grid grid-cols-1 rounded-t-lg p-2  shadow-inner gridCol '>
          <div className='border border-black rounded-2xl'>
            <div className='button p-4 border border-green-800 rounded-2xl'>
              <Link to='/'>Главная страница</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.TotalCases}>Россия - общая статистика</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.EveryDay}>Россия - ежедневная статистика</Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
