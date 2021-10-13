import { Link } from 'react-router-dom';
import * as ROUTES from './routes/routes';


export default function UsaHeader() {
  return (
    <div>
      <header className='mt-6 mb-6'>
        <nav className='grid grid-cols-2 rounded-t-lg p-2  shadow-inner gridCol font-light'>
          <div className='border border-black rounded-2xl m-2'>
            <div className='button p-2'>
              <Link to={ROUTES.UsaTotalCases}>
               США - общая статистика заражённых
              </Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.UsaEveryDay}>
                США - ежедневная статистика заражённых
              </Link>
            </div>
          </div>
          <div className='border border-black rounded-2xl m-2'>
            <div className='button p-2'>
              <Link to={ROUTES.UsaDeathTotalCases}>
                США - общая статистика смертности
              </Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.UsaDeathEveryDay}>
                США - ежедневная статистика смертности
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
