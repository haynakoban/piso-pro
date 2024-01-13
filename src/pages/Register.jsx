import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Form, Link, redirect, useActionData } from 'react-router-dom';
import { registerAccount, validateAccount } from '../helpers/queries';
import {
  handleEmailValidation,
  handlePasswordValidation,
} from '../helpers/validation';

export const registerAction = async ({ request }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);

  try {
    const { status } = await validateAccount('users', formData);

    if (status === 'error') {
      return { message: 'The email is already in use' };
    }

    await registerAccount('users', formData);

    toast.success(`Welcome, ${formData.fullName}!`);
    return redirect('/');
  } catch (error) {
    throw new Error('There was a problem creating your account!');
  }
};

const Register = () => {
  const actionError = useActionData();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  return (
    <div className='flex justify-center items-center pt-12 md:pt-24 pb-24 px-2 md:px-20'>
      <div className='w-full sm:w-[500px] shadow-md shadow-gray-400 rounded-lg p-4 sm:p-8 border-t-2 bg-[#242424]'>
        <h1 className='text-3xl font-medium pb-0 sm:pb-1'>Sign Up</h1>
        <p className='text-md font-normal pb-0 sm:pb-1'>
          Secure financial control – register today!
        </p>

        <Form
          method='post'
          onSubmit={(e) => {
            if (!isValid) {
              e.preventDefault();
              if (watch('fullName').length === 0) {
                setError(
                  'fullName',
                  { type: 'custom', message: 'Full name field is required' },
                  { shouldFocus: true }
                );
              }
              if (watch('email').length === 0) {
                setError('email', {
                  type: 'custom',
                  message: 'Email field is required',
                });
              }
              if (watch('password').length === 0) {
                setError('password', {
                  type: 'custom',
                  message: 'Password field is required',
                });
              }
              if (watch('confirmPassword').length === 0) {
                setError('confirmPassword', {
                  type: 'custom',
                  message: 'Confirm Password field is required',
                });
              }
              if (watch('password') !== watch('confirmPassword')) {
                setError('confirmPassword', {
                  type: 'custom',
                  message: 'The password does not match',
                });
              }
            }
          }}
        >
          <div className='my-6'>
            <input
              type='text'
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Full Name *'
              name='displayName'
              value={watch('fullName')}
              {...register('fullName', {
                required: 'Full name field is required',
                minLength: {
                  value: 4,
                  message: `Full name must at least 4 characters`,
                },
              })}
            />
            {errors.fullName?.message && (
              <span className='text-xs p-1 font-semibold text-[#dc3545]'>
                {errors.fullName?.message}
              </span>
            )}
          </div>

          <div className='mb-6'>
            <input
              type='email'
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Email *'
              name='email'
              value={watch('email')}
              {...register('email', {
                required: 'Email field is required',
                validate: (email) =>
                  handleEmailValidation(email) === true ||
                  'Invalid email address',
              })}
            />
            {(errors?.email?.message || actionError?.message) && (
              <span className='text-xs p-1 font-semibold text-[#dc3545]'>
                {errors?.email?.message || actionError?.message}
              </span>
            )}
          </div>

          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Password *'
              name='password'
              value={watch('password')}
              {...register('password', {
                required: 'Password field is required',
                minLength: {
                  value: 8,
                  message: `password must at least 8 characters`,
                },
                maxLength: {
                  value: 20,
                  message: `password must not exceed 20 characters`,
                },
                validate: (password) => {
                  const errors = handlePasswordValidation(password);

                  if (errors.length > 0) {
                    return errors.join('\n');
                  }

                  return true;
                },
              })}
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
          {errors.password?.message && (
            <div className='text-xs font-semibold text-[#dc3545]'>
              {errors.password?.message.split('\n').map((error, index) => (
                <p key={index} className='p-1'>
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className='relative mt-6'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
              placeholder='Confirm Password *'
              name='confirmPassword'
              value={watch('confirmPassword')}
              {...register('confirmPassword', {
                required: 'Confirm password field is required',
                minLength: {
                  value: 8,
                  message: `password must at least 8 characters`,
                },
                maxLength: {
                  value: 20,
                  message: `password must not exceed 20 characters`,
                },
                validate: (confirmPassword) => {
                  if (watch('password') !== confirmPassword) {
                    return 'The password does not match';
                  }

                  return true;
                },
              })}
            />
            <div className='absolute top-[50%] right-0 translate-y-[-50%]'>
              <button
                type='button'
                className='text-[#F26816] focus:outline-none font-medium text-sm px-5 py-2.5 text-center'
                onClick={() => setShowConfirmPassword((show) => !show)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errors.confirmPassword?.message && (
            <span className='text-xs p-1 font-semibold text-[#dc3545]'>
              {errors.confirmPassword?.message}
            </span>
          )}

          <button
            type='submit'
            style={{ fontFamily: 'Poppins' }}
            className='mt-6 block w-full p-3 rounded-full text-sm tracking-wider font-medium text-white bg-[#F26816] hover:bg-[#f26716cf] focus:outline-none text-center'
          >
            Sign Up
          </button>

          <div className='inline-flex items-center w-full mt-4'>
            <p className='tracking-wider text-sm'>Already have an account?</p>
            <Link
              to={'/login'}
              className='text-[#F26816] font-medium text-center pl-1 block text-sm'
            >
              Sign In
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Register;
