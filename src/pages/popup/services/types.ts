export interface Task {
  id: string;
  title: string;
  startedAt: string | Date;
  stoppedAt?: string | Date;
}
