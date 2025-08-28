import { useDispatch, useSelector } from 'react-redux';
import store  from '../../GlobalStateContext/GlobalStateStore';
import type {AuthState} from '../../GlobalStateContext/AuthSlice';

// Custom hooks to use in components
export const useAuthDispatch = () => useDispatch<typeof store.dispatch>();
export const useAuthSelector = <TSelected>(selector: (state: { auth: AuthState }) => TSelected): TSelected =>
  useSelector(selector);