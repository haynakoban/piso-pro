import PropTypes from 'prop-types';
import { colorVariant } from '../helpers/colorVariant';
import { Form, Link } from 'react-router-dom';
import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  calculatePercentage,
  getRemainingText,
  getSpentText,
} from '../helpers/helpers';

const BudgetItem = ({ budget, showDelete = false }) => {
  return (
    <div
      className={`
        ${colorVariant(budget.color, 'shadow')} 
        ${colorVariant(budget.color, 'border')} 
        border-t-2 w-full sm:w-[500px] shadow-md rounded-lg p-4 sm:p-8 bg-[#242424]`}
    >
      <h1
        className={`${colorVariant(budget.color, 'text')}  
        text-xl font-medium truncate`}
      >
        {budget.name}
      </h1>

      <div
        className={`${colorVariant(budget.color, 'text')} 
        text-sm font-medium text-right`}
      >
        ₱{budget.amount} for expenses
      </div>

      {/* progress bar */}
      <div className='my-1 w-full rounded-full h-2 bg-gray-700'>
        <div
          className={`${colorVariant(budget.color, 'bg')} h-2 rounded-full`}
          style={{
            width: `${calculatePercentage(budget.amount, budget.expenses)}%`,
          }}
        ></div>
      </div>

      {/* progress bar text */}
      <div className='flex justify-between items-center'>
        <small
          className={`${colorVariant(budget.color, 'text')}  
          text-sm font-medium tracking-wide`}
        >
          {getSpentText(budget.amount, budget.expenses)}
        </small>
        <small className='text-sm font-medium tracking-wide text-gray-400'>
          {getRemainingText(budget.amount, budget.expenses)}
        </small>
      </div>

      <div className='mt-5 flex justify-center text-center'>
        {showDelete ? (
          <Form
            method='post'
            onSubmit={(e) => {
              if (
                !confirm(
                  'Are you sure you want to delete this budget and its expenses?'
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <input type='hidden' name='_action' value='deleteBudget' />
            <input type='hidden' name='budgetId' value={budget.id} />
            <input type='hidden' name='userId' value={budget.userId} />
            <button
              type='submit'
              className={`
            ${colorVariant(budget.color, 'border')} 
            ${colorVariant(budget.color, 'text')} 
            hover:bg-[#141414] border inline-flex items-center gap-1 p-3 rounded-lg text-sm font-semibold focus:outline-none`}
            >
              <span>Delete</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        ) : (
          <Link
            to={`/budget/${budget.id}`}
            className={`
            ${colorVariant(budget.color, 'border')} 
            ${colorVariant(budget.color, 'text')} 
            hover:bg-[#141414] border inline-flex items-center gap-1 p-3 rounded-lg text-sm font-semibold focus:outline-none`}
          >
            <span>View Budget</span>
            <ArrowRightIcon width={20} />
          </Link>
        )}
      </div>
    </div>
  );
};

BudgetItem.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.object.isRequired,
        updatedAt: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        budgetId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  showDelete: PropTypes.bool,
};
export default BudgetItem;
