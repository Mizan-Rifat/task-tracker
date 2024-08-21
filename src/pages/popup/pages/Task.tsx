import { useEffect, useState } from "react";
import { useTaskStore } from "../services/stores/tasksStore";
import useFetchTask from "../hooks/firebase/useFetchTask";
import { useRouter } from "../services/stores/router";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { DATE_FORMAT, TIME_FORMAT } from "../services/constants";
import { Task as TaskType } from "../services/types";
import { durationFormat } from "../lib/utils";
import Backdrop from "../components/Backdrop";

const Task = () => {
  const { param } = useRouter();
  const [totalTime, setTotalTime] = useState([0, 0, 0]);
  const { isLoading } = useFetchTask(param as string);

  const { currentTasks } = useTaskStore();

  useEffect(() => {
    const totalDiff = currentTasks.reduce(
      (acc, task: TaskType) => dayjs(task.stoppedAt).diff(task.startedAt) + acc,
      0
    );

    const seconds = dayjs.duration(totalDiff).seconds();
    const minutes = dayjs.duration(totalDiff).minutes();
    const hours = dayjs.duration(totalDiff).hours();

    setTotalTime([seconds, minutes, hours]);
  }, [currentTasks]);

  return (
    <Box py={1}>
      <Stack justifyContent="center" alignItems="center">
        <Typography variant="h6">
          {param} - {durationFormat(totalTime)}
        </Typography>
      </Stack>
      <List
        dense
        disablePadding
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {currentTasks.map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </List>

      <Backdrop open={isLoading} />
    </Box>
  );
};

export default Task;

const TaskListItem = ({ task }: { task: TaskType }) => {
  const [duration, setDuration] = useState<number[]>([]);
  const { setCurrentRoute } = useRouter();

  useEffect(() => {
    const diff = dayjs(task.stoppedAt).diff(task.startedAt);
    const seconds = dayjs.duration(diff).seconds();
    const minutes = dayjs.duration(diff).minutes();
    const hours = dayjs.duration(diff).hours();

    setDuration([seconds, minutes, hours]);
  }, [task]);

  return (
    <ListItem
      secondaryAction={
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {durationFormat(duration)}
        </Typography>
      }
      sx={[
        {
          borderBottom: 1,
          borderColor: "divider",
          cursor: "pointer",
          "&:hover": {
            bgcolor: "action.hover",
          },
        },
      ]}
      onClick={() => {
        setCurrentRoute("/task", task.title);
      }}
    >
      <ListItemText
        primary={<>{dayjs(task.startedAt).format(DATE_FORMAT)}</>}
        secondary={
          <>
            {dayjs(task.startedAt).format(TIME_FORMAT)} -{" "}
            {dayjs(task.stoppedAt).format(TIME_FORMAT)}
          </>
        }
      />
    </ListItem>
  );
};
