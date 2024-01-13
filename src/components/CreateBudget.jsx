import PropTypes from 'prop-types';
import { useFetcher } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef } from 'react';

const CreateBudget = ({ id }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className='w-full sm:w-[500px] shadow-md shadow-gray-400 rounded-lg p-4 sm:p-8 border-t-2 bg-[#242424]'>
      <h1 className='text-xl font-medium pb-0 sm:pb-1 mb-3'>Create Budget</h1>

      <fetcher.Form method='post' ref={formRef}>
        <input type='hidden' name='_action' value='createBudget' />
        <input type='hidden' name='userId' value={id} />
        <div className='mb-6'>
          <label className='block pl-1 mb-1 text-sm font-medium text-white'>
            Budget Name
          </label>
          <input
            type='text'
            name='budgetName'
            className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
            placeholder='e.g., Housing'
            required
            ref={focusRef}
          />
        </div>

        <div className='mb-6'>
          <label className='block pl-1 mb-1 text-sm font-medium text-white'>
            Amount
          </label>
          <input
            type='number'
            step='0.01'
            inputMode='decimal'
            name='budgetAmount'
            className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
            placeholder='e.g., ₱1000'
            required
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          style={{ fontFamily: 'Poppins' }}
          className='inline-flex items-center gap-1 p-3 rounded-lg text-sm tracking-wider font-medium text-white bg-[#F26816] hover:bg-[#f26716cf] focus:outline-none text-center'
        >
          {isSubmitting ? (
            <span>Creating budget...</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

CreateBudget.propTypes = {
  id: PropTypes.string.isRequired,
};
export default CreateBudget;
