import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';

import TableExpenses from '../components/TableExpenses';
import CreateExpense from '../components/CreateExpense';
import BudgetItem from '../components/BudgetItem';

import { fetchData } from '../helpers/helpers';
import { colorVariant } from '../helpers/colorVariant';
import {
  createExpense,
  deleteBudget,
  deleteExpense,
  getBudget,
} from '../helpers/queries';

export const singleBudgetLoader = async ({ params }) => {
  const authUser = fetchData('authUser');

  try {
    const { budgetsData, expensesData } = await getBudget({
      budgetId: params.id,
      userId: authUser?.id,
    });

    return { authUser, budgets: budgetsData, expenses: expensesData };
  } catch (error) {
    throw new Error('There was a problem fetching your budget');
  }
};

export const singleBudgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  if (_action === 'createExpense') {
    try {
      const expenseName = await createExpense('expenses', formData);

      return toast.success(`Expense for ${expenseName} created!`);
    } catch (error) {
      throw new Error('There was a problem creating your expense!');
    }
  } else if (_action === 'deleteExpense') {
    try {
      await deleteExpense('expenses', formData);
      return toast.success(`Expense deleted successfully!`);
    } catch (error) {
      throw new Error('There was a problem deleting your expense!');
    }
  } else if (_action === 'deleteBudget') {
    try {
      await deleteBudget('budgets', formData);
      toast.success(`Budget deleted successfully!`);
      return redirect('/');
    } catch (error) {
      throw new Error('There was a problem deleting your budget');
    }
  }
};

const SingleBudget = () => {
  const { authUser, budgets, expenses } = useLoaderData();

  return (
    <main>
      <div className='p-5 md:p-10 pb-24'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-6'>
          <span className={`${colorVariant(budgets[0].color, 'text')}`}>
            {budgets[0].name + ' '}
          </span>
          Overview
        </h1>

        {/* create expense form */}
        <div className='flex flex-col-reverse lg:flex-row items-center md:items-start gap-10 mb-12'>
          <CreateExpense id={authUser.id} budgets={budgets} />
          {budgets
            ?.sort((a, b) => b.createdAt - a.createdAt)
            ?.map((budget) => {
              return (
                <BudgetItem key={budget.id} budget={budget} showDelete={true} />
              );
            })}
        </div>

        <div className='mb-3'>
          <TableExpenses expenses={expenses} showCategory={false} />
        </div>
      </div>
    </main>
  );
};
export default SingleBudget;
