import { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import { loginAccount } from '../helpers/queries';

export const loginAction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  try {
    const { status, data } = await loginAccount('users', formData);

    if (status === 'error') {
      return { message: data };
    }

    toast.success(`Welcome, ${data}!`);

    return redirect('/');
  } catch (error) {
    throw new Error('There was an issue logging into your account.');
  }
};

const Login = () => {
  const navigate = useNavigate();
  const errors = useActionData();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex justify-center items-center pt-12 md:pt-24 pb-24 px-2 md:px-20'>
      <div className='w-full sm:w-[500px] shadow-md shadow-gray-400 rounded-lg p-4 sm:p-8 border-t-2 bg-[#242424]'>
        <h1 className='text-3xl font-medium pb-0 sm:pb-1'>Sign In</h1>
        <p className='text-md font-normal pb-0 sm:pb-1'>
          Join now for a secure financial future!
        </p>

        <Form method='post'>
          <div className='my-6'>
            <input
              type='email'
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Email'
              name='email'
            />
          </div>

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Password'
              name='password'
            />
            <div className='absolute top-[50%] right-0 translate-y-[-50%]'>
              <button
                type='button'
                className='text-[#F26816] focus:outline-none font-medium text-sm px-5 py-2.5 text-center'
                onClick={() => setShowPassword((show) => !show)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {errors?.message && (
            <span className='text-xs p-1 font-semibold text-[#dc3545]'>
              {errors?.message}
            </span>
          )}

          <button
            type='submit'
            style={{ fontFamily: 'Poppins' }}
            className='mt-6 block w-full p-3 rounded-full text-sm tracking-wider font-medium text-white bg-[#F26816] hover:bg-[#f26716cf] focus:outline-none text-center'
          >
            Sign In
          </button>

          <div className='inline-flex items-center w-full mt-4'>
            <p className='tracking-wider text-sm'>Don’t have an account?</p>
            <button
              className='text-[#F26816] font-medium text-center pl-1 block text-sm'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Login;
