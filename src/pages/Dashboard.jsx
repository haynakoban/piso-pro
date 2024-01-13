import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createBudget,
  createExpense,
  deleteExpense,
  getBudgets,
} from '../helpers/queries';
import { AwaitBudgets, fetchData } from '../helpers/helpers';
import Welcome from '../components/Welcome';
import CreateBudget from '../components/CreateBudget';
import CreateExpense from '../components/CreateExpense';
import BudgetItem from '../components/BudgetItem';
import TableExpenses from '../components/TableExpenses';

export const dashboardLoader = async () => {
  const authUser = fetchData('authUser');

  let budgets = [];
  let expenses = [];

  if (authUser?.id) {
    try {
      const querySnapshot = await getBudgets({ userId: authUser?.id });

      if (querySnapshot.size > 0) {
        const { budgetsData, expensesData } = await AwaitBudgets({
          budgetsSnapshot: querySnapshot,
          userId: authUser?.id,
        });

        budgets = [...budgetsData];
        expenses = [...expensesData];
      }
    } catch (error) {
      throw new Error('There was a problem fetching your budgets');
    }
  }

  return { authUser, budgets, expenses };
};

export const dashboardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  if (_action === 'createBudget') {
    try {
      const budgetName = await createBudget('budgets', formData);

      return toast.success(`Budget for ${budgetName} created!`);
    } catch (error) {
      throw new Error('There was a problem creating your budget!');
    }
  } else if (_action === 'createExpense') {
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
      throw new Error('There was a problem creating your expense!');
    }
  }
};

const Dashboard = () => {
  const { authUser, budgets, expenses } = useLoaderData();

  return (
    <main>
      {authUser ? (
        <div className='p-5 md:p-10 pb-24'>
          <h1 className='text-xl md:text-3xl lg:text-4xl font-medium mb-6 md:mb-12'>
            Welcome back,{' '}
            <span className='text-[#F26816]'>{authUser.displayName}</span>
          </h1>

          {/* create budget form */}
          <div className='flex flex-col md:flex-row items-center md:items-start gap-10 mb-12'>
            <CreateBudget id={authUser.id} />
            {budgets?.length > 0 && (
              <CreateExpense id={authUser.id} budgets={budgets} />
            )}
          </div>

          {budgets?.length > 0 && (
            <>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-6'>
                Existing Budgets
              </h1>
              <div className='flex flex-wrap flex-col md:flex-row items-center md:items-start gap-10 mb-6 md:mb-12'>
                {budgets
                  ?.sort((a, b) => b.createdAt - a.createdAt)
                  ?.map((budget) => {
                    return <BudgetItem key={budget.id} budget={budget} />;
                  })}
              </div>
            </>
          )}

          {expenses?.length > 0 && (
            <>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-6'>
                Recent Expenses
              </h1>
              <div className='mb-3'>
                <TableExpenses expenses={expenses} length={10} />
              </div>

              <Link
                to='/expenses'
                className='block mx-auto max-w-64 mb-8 md:mb-16 p-3 rounded-lg text-md tracking-wider font-medium text-white underline focus:outline-none text-center'
              >
                View All Expenses
              </Link>
            </>
          )}
        </div>
      ) : (
        <Welcome />
      )}
    </main>
  );
};
export default Dashboard;
