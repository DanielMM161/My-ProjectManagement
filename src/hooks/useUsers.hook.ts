import { useEffect, useState } from 'react';

import { User } from '../models/user.model';
import { fetchAllUsers } from '../services/user.service';

import { useAppDispatch, useAppSelector } from './redux.hook';

function useUsers() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);
  const { user } = userState;
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = () => {
      dispatch(fetchAllUsers()).then((response) => {
        const result = response.payload as User[];
        setAllUsers(result.filter((item) => item.id !== user.id));
      });
    };
    fetchUsers();
  }, [dispatch, user.id]);

  return { allUsers };
}

export default useUsers;
