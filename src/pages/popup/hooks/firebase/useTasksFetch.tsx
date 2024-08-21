import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../../services/stores/tasksStore';
import { db, DOC_PATHS } from '../../lib/firebase';
import { getFsData } from '../../lib/utils';

const useTasksFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const tasksRef = collection(db, DOC_PATHS.TASKS);
  const q = query(tasksRef, orderBy('startedAt', 'desc'));

  const { setTasks } = useTaskStore();

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, snapshot => {
      const tasks = snapshot.docs.map(doc => getFsData(doc));

      setIsLoading(false);

      setTasks(tasks);
    });
  }, []);

  return { isLoading };
};

export default useTasksFetch;
