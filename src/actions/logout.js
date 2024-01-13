import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem } from '../helpers/helpers';

export const logoutAction = async () => {
  // delete user data
  deleteItem({ key: 'authUser' });

  // send toast signal
  toast.success("You've logged out of your account!");

  return redirect('/');
};
