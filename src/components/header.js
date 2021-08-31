import { Link } from 'react-router-dom';
import * as ROUTES from '../components/routes/routes';

export default function Header() {
  return (
    <div>
      <header className='mt-14'>
        <nav className='grid grid-cols-4 rounded-t-lg p-2 border-4 border-green-900 shadow-inner font-mono gridCol '>
          <div className='border border-green-700 rounded-2xl'>
            <div className='button p-4 border border-green-800 rounded-2xl'>
              <Link to='/'>Home</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.TotalCases} >Rus_TotalCases</Link>
            </div>
            <div className='button p-2'>
              <Link to={ROUTES.EveryDay}>Rus_EveryDay</Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
