export const customAssert = (isSucceeded: boolean, error?: string) => {
  return {
    isSucceeded,
    error,
  };
};
