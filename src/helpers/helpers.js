import moment from 'moment';
import { getExpenses } from './queries';
import { colors } from './colorVariant';

// local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

const calculateSpent = (expenses) => {
  let totalAmount = 0;

  expenses.forEach((expense) => {
    totalAmount += expense.amount || 0;
  });

  return totalAmount;
};

export const calculatePercentage = (totalAmount, expenses) => {
  const spentAmount = calculateSpent(expenses);

  if (totalAmount <= 0) {
    throw new Error('Total amount must be greater than 0');
  }

  const percentage = (spentAmount / totalAmount) * 100;

  // Ensure the percentage is capped at 100%
  return percentage > 100 ? 100 : percentage.toFixed(0);
};

export const getSpentText = (totalAmount, expenses) => {
  const spentAmount = calculateSpent(expenses);

  if (spentAmount > totalAmount) {
    return `Exceeded: ₱${spentAmount}`;
  } else if (spentAmount === totalAmount) {
    return `Fully spent: ₱${totalAmount}`;
  } else {
    return `₱${spentAmount} spent`;
  }
};

export const getRemainingText = (totalAmount, expenses) => {
  const spentAmount = calculateSpent(expenses);

  if (spentAmount >= totalAmount) {
    return `₱0 remaining`;
  } else {
    return `₱${totalAmount - spentAmount} remaining`;
  }
};

export const formatDate = (timestamp) => {
  const date = moment
    .unix(timestamp.seconds)
    .milliseconds(timestamp.nanoseconds / 1e6);
  return date.format('DD-MM-YYYY');
};

export const AwaitBudgets = async ({ budgetsSnapshot, userId }) => {
  let colorIndex = 0;
  let budgets = [];
  let expenses = [];

  const budgetPromises = budgetsSnapshot.docs
    .sort((a, b) => b.data().createdAt - a.data().createdAt)
    .map(async (doc) => {
      const color = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length;

      const expensesData = await getExpenses({
        userId,
        budgetId: doc.id,
        budgetName: doc.data().name,
        color,
      });

      expenses = [...expenses, ...expensesData];

      const budget = {
        id: doc.id,
        color,
        expenses: expensesData,
        ...doc.data(),
      };

      colorIndex++;

      return budget;
    });

  budgets = await Promise.all(budgetPromises);

  return { budgetsData: budgets, expensesData: expenses };
};
