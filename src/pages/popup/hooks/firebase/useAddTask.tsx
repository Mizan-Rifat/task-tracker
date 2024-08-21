import { addDoc, collection } from 'firebase/firestore';
import { Task } from '../../services/types';
import { db, DOC_PATHS } from '../../lib/firebase';

const useAddTask = (setIsLoading?: (loading: boolean) => void) => {
  const addTask = async (data: Task) => {
    const docRef = collection(db, DOC_PATHS.TASKS);

    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await addDoc(docRef, data);
      // toast.success('Successfully created.');
    } catch (error) {
      console.log({ error });
    }
    if (setIsLoading) {
      setIsLoading(false);
    }
  };

  return { addTask };
};

export default useAddTask;
