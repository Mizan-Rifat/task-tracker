import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTaskStore } from '../../services/stores/tasksStore';
import { db, DOC_PATHS } from '../../lib/firebase';
import { getFsData } from '../../lib/utils';

const useFetchTask = (title?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const tasksRef = collection(db, DOC_PATHS.TASKS);
  const q = query(
    tasksRef,
    where('title', '==', title),
    where('stoppedAt', '!=', null),
    orderBy('startedAt', 'desc')
  );

  const { setCurrentTasks } = useTaskStore();

  useEffect(() => {
    setIsLoading(true);
    onSnapshot(q, snapshot => {
      const tasks = snapshot.docs.map(doc => getFsData(doc));

      setIsLoading(false);

      setCurrentTasks(tasks);
    });
  }, []);

  return { isLoading };
};

export default useFetchTask;
