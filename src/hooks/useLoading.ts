import {useState} from 'react';

type UseLoading = () => {
  isLoading: boolean;
  withLoading: <T>(fn: () => Promise<T>) => Promise<T>;
};

export const useLoading: UseLoading = () => {
  const [isLoading, setLoading] = useState(false);

  const withLoading = async <T>(fn: () => Promise<T>) => {
    try {
      setLoading(true);

      const result = await fn();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    isLoading,
    withLoading,
  };
};
