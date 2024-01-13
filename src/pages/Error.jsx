import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/solid';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center p-24 text-center'>
      <h1 className='text-5xl font-semibold'>Uh oh! We’ve got a problem.</h1>
      <p className='mt-4 text-xl text-[#F26816]'>
        {error.message || error.statusText}
      </p>
      <div className='mt-4 flex items-center justify-center gap-5'>
        <button
          onClick={() => navigate(-1)}
          className='inline-flex gap-2 items-center text-white bg-[#F26816] hover:bg-[#f26716c2] font-medium rounded-lg text-sm md:text-md px-5 py-2.5 focus:outline-none'
        >
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>

        <Link
          to={'/'}
          className='inline-flex gap-2 items-center text-white bg-[#F26816] hover:bg-[#f26716c2] font-medium rounded-lg text-sm md:text-md px-5 py-2.5 focus:outline-none'
        >
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};
export default Error;
