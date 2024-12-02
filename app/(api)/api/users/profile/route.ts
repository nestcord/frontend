import useSWR from 'swr';
import { db } from '@/controllers/client/client';

// Fetcher para usar con SWR
const fetcher = async (url: string, user: string) => {
  const { data: userData, error } = await db
    .from('users')
    .select('*')
    .eq('user_name', user)
    .single();
  if (error) throw new Error(error.message);
  return userData;

};


// Hook personalizado
export const useUser = (user: string) => {
  const { data, error, isLoading } = useSWR(user ? ['/api/users/profile', user] : null, ([, user]) => fetcher('/api/users/profile', user));

  return {
    user: data,
    isLoading,
    isError: error,
  };
};
