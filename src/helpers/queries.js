import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { colors } from './colorVariant';

const delay = () => new Promise((res) => setTimeout(res, Math.random() * 500));

export const createBudget = async (collectionName, formData) => {
  await delay();

  try {
    const budgetRef = collection(db, collectionName);
    const budgetData = {
      name: formData.budgetName,
      amount: +formData.budgetAmount,
      userId: formData.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(budgetRef, budgetData);

    return formData.budgetName;
  } catch (error) {
    throw new Error('There was a problem creating your budget!');
  }
};

export const createExpense = async (collectionName, formData) => {
  await delay();

  try {
    const expenseRef = collection(db, collectionName);
    const expenseData = {
      name: formData.expenseName,
      amount: +formData.expenseAmount,
      userId: formData.userId,
      budgetId: formData.budgetId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(expenseRef, expenseData);

    return formData.expenseName;
  } catch (error) {
    throw new Error('There was a problem creating your expense!');
  }
};

export const deleteExpense = async (collectionName, formData) => {
  await delay();

  try {
    const expenseRef = collection(db, collectionName);
    const documentRef = doc(expenseRef, formData.expenseId);
    await deleteDoc(documentRef);
  } catch (error) {
    throw new Error('There was a problem creating your expense!');
  }
};

export const deleteBudget = async (collectionName, formData) => {
  await delay();

  try {
    const budgetRef = collection(db, collectionName);
    const documentRef = doc(budgetRef, formData.budgetId);
    await deleteDoc(documentRef);

    // based on formData.budgetId and formData.userId
    const expensesRef = collection(db, 'expenses');
    const expensesQuery = query(
      expensesRef,
      where('budgetId', '==', formData.budgetId),
      where('userId', '==', formData.userId)
    );
    // Get the query snapshot
    const querySnapshot = await getDocs(expensesQuery);
    const batchInstance = writeBatch(db);
    querySnapshot.forEach((doc) => {
      batchInstance.delete(doc.ref);
    });
    await batchInstance.commit();
  } catch (error) {
    throw new Error('There was a problem creating your expense!');
  }
};

export const getExpenses = async ({ userId, budgetId, budgetName, color }) => {
  const expenseRef = collection(db, 'expenses');
  const expenseQuery = query(
    expenseRef,
    where('budgetId', '==', budgetId),
    where('userId', '==', userId)
  );

  const expenseSnapshot = await getDocs(expenseQuery);
  return expenseSnapshot.docs
    .sort((a, b) => b.data().createdAt - a.data().createdAt)
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
      budgetName,
      color,
    }));
};

export const getBudgets = async ({ userId }) => {
  const budgetRef = collection(db, 'budgets');
  const budgetQuery = query(budgetRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(budgetQuery);

  return querySnapshot;
};

export const getBudget = async ({ budgetId, userId }) => {
  try {
    const budgetDocRef = doc(db, 'budgets', budgetId);
    const budgetDoc = await getDoc(budgetDocRef);

    if (!budgetDoc.exists()) {
      throw new Error(`There was a problem fetching your budget '${budgetId}'`);
    }

    const colorIndex = Math.floor(Math.random() * 10);

    const expensesData = await getExpenses({
      userId,
      budgetId: budgetDoc.id,
      budgetName: budgetDoc.data().name,
      color: colors[colorIndex],
    });

    const budgets = [
      {
        id: budgetDoc.id,
        ...budgetDoc.data(),
        color: colors[colorIndex],
        expenses: expensesData,
      },
    ];

    return { budgetsData: budgets, expensesData };
  } catch (error) {
    throw new Error('There was a problem fetching your budget');
  }
};

export const registerAccount = async (collectionName, formData) => {
  try {
    const userRef = collection(db, collectionName);
    const userData = {
      email: formData.email,
      displayName: formData.fullName,
      password: formData.password,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(userRef, userData);

    localStorage.setItem(
      'authUser',
      JSON.stringify({
        email: formData.email,
        displayName: formData.fullName,
        id: docRef.id,
      })
    );
  } catch (error) {
    throw new Error('There was a problem creating your account!');
  }
};

export const validateAccount = async (collectionName, formData) => {
  try {
    const userRef = collection(db, collectionName);
    const userQuery = query(
      userRef,
      where('email', '==', formData.email),
      where('password', '==', formData.password)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size > 0) {
      return { status: 'error' };
    }

    return { status: 'success' };
  } catch (error) {
    throw new Error('There was a problem with your email');
  }
};

export const loginAccount = async (collectionName, formData) => {
  try {
    const userRef = collection(db, collectionName);
    const userQuery = query(
      userRef,
      where('email', '==', formData.email),
      where('password', '==', formData.password)
    );

    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.size === 0) {
      return {
        status: 'error',
        data: 'Invalid email/password combination',
      };
    }

    const docRef = querySnapshot.docs[0];

    localStorage.setItem(
      'authUser',
      JSON.stringify({
        email: docRef.data().email,
        displayName: docRef.data().displayName,
        id: docRef.id,
      })
    );

    return { status: 'success', data: docRef.data().displayName };
  } catch (error) {
    throw new Error('There was a problem creating your account!');
  }
};
