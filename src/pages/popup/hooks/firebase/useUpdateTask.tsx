import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../../services/types';
import { db, DOC_PATHS } from '../../lib/firebase';

const useUpdateTask = (setIsLoading?: (loading: boolean) => void) => {
  const updateTask = async (id: string, data: Partial<Omit<Task, 'id'>>) => {
    const docRef = doc(db, DOC_PATHS.TASKS, id);

    if (setIsLoading) {
      setIsLoading(true);
    }
    try {
      await updateDoc(docRef, data);
      // toast.success('Successfully created.');
    } catch (error) {
      console.log({ error });
    }
    if (setIsLoading) {
      setIsLoading(false);
    }
  };

  return { updateTask };
};

export default useUpdateTask;
