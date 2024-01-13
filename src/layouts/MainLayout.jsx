import { Outlet, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helpers/helpers';

import Nav from '../components/Nav';
import wave from '../assets/wave.svg';

export const mainLoader = () => {
  const userAuth = fetchData('authUser');

  return { userAuth };
};

const MainLayout = () => {
  const { userAuth } = useLoaderData();
  return (
    <>
      <div className='container mx-auto relative z-20'>
        <Nav user={userAuth} />
        <Outlet />
      </div>
      <div className='fixed bottom-0 left-0 w-full z-10'>
        <img src={wave} alt='wave' className='object-cover z-0' />
      </div>
    </>
  );
};
export default MainLayout;
