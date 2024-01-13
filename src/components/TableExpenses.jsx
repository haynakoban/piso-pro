import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../helpers/helpers';
import { TrashIcon } from '@heroicons/react/24/outline';
import { colorVariant } from '../helpers/colorVariant';
import { Form, Link } from 'react-router-dom';

const TableExpenses = ({ expenses, length, showCategory = true }) => {
  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-md text-left rtl:text-right text-gray-400'>
        <thead className='text-sm uppercase bg-[#242424] text-[#F26816] tracking-wide'>
          <tr>
            {['name', 'amount', 'date', showCategory && 'category', ''].map(
              (headerName) => (
                <th
                  key={headerName}
                  scope='col'
                  className={`${
                    headerName !== 'name' && 'text-center'
                  } px-6 py-4`}
                >
                  {headerName}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses
            ?.sort((a, b) => b.createdAt - a.createdAt)
            ?.slice(0, length || expenses.length)
            ?.map((expense, index) => (
              <React.Fragment key={expense.id}>
                <tr className={`${index % 2 === 0 && 'bg-[#141414]'}`}>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap text-white'
                  >
                    {expense.name}
                  </th>
                  <td className='px-6 py-4 text-center'>{expense.amount}</td>
                  <td className='px-6 py-4 text-center'>
                    {formatDate(expense.createdAt)}
                  </td>
                  {showCategory && (
                    <td className='px-6 py-4 text-center'>
                      <Link
                        to={`/budget/${expense.budgetId}`}
                        className={`${colorVariant(expense.color, 'border')}  
                    ${colorVariant(expense.color, 'shadow')} 
                    ${colorVariant(expense.color, 'text')} 
                    shadow-md border-t-2 hover:bg-[#dbdbdb] p-3 block w-full rounded-full text-sm tracking-wider font-semibold focus:outline-none text-center`}
                      >
                        <span>{expense.budgetName}</span>
                      </Link>
                    </td>
                  )}
                  <td className='px-6 py-4 text-center'>
                    <Form method='post' key={expense.id}>
                      <input
                        type='hidden'
                        name='_action'
                        value='deleteExpense'
                      />
                      <input
                        type='hidden'
                        name='expenseId'
                        value={expense.id}
                      />
                      <button
                        type='submit'
                        className='inline-flex items-center gap-1 p-3 rounded-lg text-xs tracking-wider font-semibold text-red-700 border hover:bg-red-800 border-red-800 hover:text-white focus:outline-none text-center'
                      >
                        <span>Delete</span>
                        <TrashIcon width={18} />
                      </button>
                    </Form>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

TableExpenses.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.shape({
        seconds: PropTypes.number.isRequired,
        nanoseconds: PropTypes.number.isRequired,
      }).isRequired,
      color: PropTypes.string,
      budgetName: PropTypes.string.isRequired,
    })
  ),
  length: PropTypes.number,
  showCategory: PropTypes.bool,
};
export default TableExpenses;
