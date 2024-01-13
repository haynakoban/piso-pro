import PropTypes from 'prop-types';
import { useFetcher } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

const CreateExpense = ({ id, budgets }) => {
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
      <h1 className='text-xl font-medium pb-0 sm:pb-1 mb-3'>
        Add New{' '}
        <span className='text-[#F26816]'>
          {budgets?.length === 1 && budgets[0]?.name}
        </span>{' '}
        Expense
      </h1>

      <fetcher.Form method='post' ref={formRef}>
        <input type='hidden' name='_action' value='createExpense' />
        <input type='hidden' name='userId' value={id} />
        <div className='mb-6'>
          <label className='block pl-1 mb-1 text-sm font-medium text-white'>
            Expense Name
          </label>
          <input
            type='text'
            name='expenseName'
            className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
            placeholder='e.g., Electric Bills'
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
            name='expenseAmount'
            className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
            placeholder='e.g., ₱1000'
            required
          />
        </div>

        <div className='mb-6' hidden={budgets?.length === 1}>
          <label className='block pl-1 mb-1 text-sm font-medium text-white'>
            Budget Category
          </label>
          <select
            required
            name='budgetId'
            className='border-[#242424] border focus:border-gray-400 text-white text-md rounded-md block w-full p-3.5 focus:outline-none placeholder:tracking-wider placeholder:text-sm'
          >
            {budgets
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((budget) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          style={{ fontFamily: 'Poppins' }}
          className='inline-flex items-center gap-1 p-3 rounded-lg text-sm tracking-wider font-medium text-white bg-[#F26816] hover:bg-[#f26716cf] focus:outline-none text-center'
        >
          {isSubmitting ? (
            <span>Creating expense...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

CreateExpense.propTypes = {
  id: PropTypes.string.isRequired,
  budgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default CreateExpense;
