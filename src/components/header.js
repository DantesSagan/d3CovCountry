import { Link } from 'react-router-dom';
import * as ROUTES from '../components/routes/routes';

export default function Header() {
  return (
    <div>
      <header className='mt-6 '>
        <nav className='grid grid-cols-1 rounded-t-lg p-2 py-3 px-6 shadow-inner gridCol font-bold '>
          <div className='rounded-2xl'>
            <div className='button p-4 border border-green-800 rounded-2xl'>
              <Link to='/'>Главная страница</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.TotalCases}>
                Российская Федерация - Статистика
              </Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.UsaDeathTotalCases}>США - Статистика</Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
