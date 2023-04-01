import React, {createContext, useContext, PropsWithChildren} from 'react';

export interface UserContext {}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const UserState = createContext<UserContext>();

export const useUserState = () => useContext(UserState);

export type UserProviderProps = {
  //
};

export const UserProvider = ({
  children,
}: PropsWithChildren<UserProviderProps>) => {
  const state = {};

  return <UserState.Provider value={state}>{children}</UserState.Provider>;
};
