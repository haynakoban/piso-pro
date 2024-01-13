import PropTypes from 'prop-types';
import { Form, NavLink } from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

const Nav = ({ user }) => {
  return (
    <nav className='flex justify-between items-center p-5'>
      <NavLink
        to={'/'}
        aria-label='Go to dashboard'
        className='flex items-center'
      >
        <img src='/favicon.svg' alt='logo' className='w-10 h-10 object-cover' />
        <h6 className='ml-1 text-2xl font-semibold tracking-wider'>
          Piso<span className='text-[#F26816]'>Pro</span>
        </h6>
      </NavLink>

      {user && user?.displayName && (
        <Form method='post' action='/logout'>
          <button
            type='submit'
            className='flex items-center gap-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          >
            Logout
            <ArrowRightStartOnRectangleIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};

Nav.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
  }),
};

export default Nav;
