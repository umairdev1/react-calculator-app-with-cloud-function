import { functions } from './firebaseConfig';

const calculateFunction = functions.httpsCallable('calculate');

export const calculate = async (num1, num2, operation, currency) => {
  try {
    const result = await calculateFunction({ num1, num2, operation, currency });
    return result;
  } catch (error) {
    console.error('Error calling calculate function:', error);
    throw error;
  }
};
