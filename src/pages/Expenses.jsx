import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteExpense, getBudgets } from '../helpers/queries';
import { AwaitBudgets, fetchData } from '../helpers/helpers';
import TableExpenses from '../components/TableExpenses';

export const expensesLoader = async () => {
  const authUser = fetchData('authUser');
  let expenses = [];

  if (authUser?.id) {
    try {
      const querySnapshot = await getBudgets({ userId: authUser?.id });

      if (querySnapshot.size > 0) {
        const { expensesData } = await AwaitBudgets({
          budgetsSnapshot: querySnapshot,
          userId: authUser?.id,
        });

        expenses = [...expensesData];
      }
    } catch (error) {
      throw new Error('There was a problem fetching your budgets');
    }
  }

  return { expenses };
};

export const expensesAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...formData } = Object.fromEntries(data);

  if (_action === 'deleteExpense') {
    try {
      await deleteExpense('expenses', formData);
      return toast.success(`Expense deleted successfully!`);
    } catch (error) {
      throw new Error('There was a problem creating your expense!');
    }
  }
};

const Expenses = () => {
  const { expenses } = useLoaderData();
  return (
    <main>
      <div className='p-5 md:p-10 pb-24'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-6'>
          Your Expenses Overview{' '}
          <span className='text-sm tracking-wide'>
            ({expenses.length} total)
          </span>
        </h1>
        <div className='mb-3'>
          <TableExpenses expenses={expenses} />
        </div>
      </div>
    </main>
  );
};
export default Expenses;
