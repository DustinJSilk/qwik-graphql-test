import { createContext } from '@builder.io/qwik';

// TODO: Add user data to auth state store
export const AuthStateContext = createContext<{ token: string }>('auth-state');
