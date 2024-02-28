import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectToken,
  selectPreAuth,
  selectResetInfo
} from '../reducers/auth.reducer';

export const useAuth = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const preAuth = useSelector(selectPreAuth)
  const resetInfo = useSelector(selectResetInfo)
  return useMemo(
    () => ({user,token,preAuth, resetInfo}),
    [user,token,preAuth, resetInfo],
  );
};
