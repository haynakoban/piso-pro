import { Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import FinancePhoto from '../assets/finance.svg';

const Welcome = () => {
  return (
    <div className='flex flex-col lg:flex-row justify-between items-center py-24 px-10 md:px-20 gap-10'>
      <div className='text-center lg:text-left'>
        <h1 className='capitalize text-3xl sm:text-4xl md:text-5xl font-bold'>
          Direct your money{' '}
          <span className='text-[#F26816]'>with purpose.</span>
        </h1>
        <p className='mt-2 text-md md:text-xl'>
          Unlock financial freedom through personalized budgeting.
        </p>
        <p className='text-md md:text-xl'>
          Embark on your journey to economic empowerment today.
        </p>
        <div className='mt-4'>
          <Link
            to={'/signup'}
            className='inline-flex items-center gap-1.5 text-white bg-[#F26816] hover:bg-[#f26716c2] font-medium rounded-lg text-sm md:text-md px-5 py-2.5 focus:outline-none'
          >
            Create Account
            <UserPlusIcon width={20} />
          </Link>
        </div>
      </div>
      <div className='max-w-[600px]'>
        <img
          src={FinancePhoto}
          alt='Finance Photo'
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};
export default Welcome;
