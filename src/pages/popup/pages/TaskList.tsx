import {
  Button,
  Fab,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useTasksFetch from "../hooks/firebase/useTasksFetch";
import { useTaskStore } from "../services/stores/tasksStore";
import { Plus } from "../components/icons";
import AddTaskDialog from "../components/AddTaskDialog";
import useUpdateTask from "../hooks/firebase/useUpdateTask";
import { Task } from "../services/types";
import { DATE_TIME_FORMAT } from "../services/constants";
import { useRouter } from "../services/stores/router";
import { durationFormat } from "../lib/utils";
import Backdrop from "../components/Backdrop";

dayjs.extend(duration);

const TaskList = () => {
  const [showAll, setShowAll] = useState(false);
  const { isLoading } = useTasksFetch();
  const { tasks } = useTaskStore();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <List
        dense
        disablePadding
        sx={{ width: "100%", bgcolor: "background.paper" }}
      >
        {tasks.slice(0, !showAll ? 5 : undefined).map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
      </List>

      {tasks.length > 5 && (
        <Stack direction="row" justifyContent="center" sx={{ py: 2 }}>
          <Button
            variant="text"
            sx={{ textTransform: "none", fontWeight: 700 }}
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            Show {showAll ? "Less" : "All"}
          </Button>
        </Stack>
      )}

      <Fab
        color="primary"
        size="small"
        aria-label="add"
        sx={{ position: "fixed", bottom: 30, right: 30 }}
        onClick={() => setOpenDialog(true)}
      >
        <Plus />
      </Fab>
      <AddTaskDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
      />

      <Backdrop open={isLoading} />
    </>
  );
};

export const TaskListItem = ({ task }: { task: Task }) => {
  const [duration, setDuration] = useState<number[]>([0, 0, 0]);
  const { setCurrentRoute } = useRouter();
  const { updateTask } = useUpdateTask();

  useEffect(() => {
    if (!task.stoppedAt) {
      const interval = setInterval(() => {
        const diff = dayjs().diff(task.startedAt);

        const seconds = dayjs.duration(diff).seconds();
        const minutes = dayjs.duration(diff).minutes();
        const hours = dayjs.duration(diff).hours();

        setDuration([seconds, minutes, hours]);
      }, 1000);

      return () => {
        clearInterval(interval);
        setDuration([0, 0, 0]);
      };
    } else {
      const diff = dayjs(task.stoppedAt).diff(task.startedAt);
      const seconds = dayjs.duration(diff).seconds();
      const minutes = dayjs.duration(diff).minutes();
      const hours = dayjs.duration(diff).hours();

      setDuration([seconds, minutes, hours]);
    }
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
        !task.stoppedAt && {
          pb: 6,
          "& .MuiListItemSecondaryAction-root": {
            top: 30,
          },
        },
      ]}
      onClick={() => {
        setCurrentRoute("/task", task.title);
      }}
    >
      <ListItemText
        primary={task.title}
        secondary={<>{dayjs(task.startedAt).format(DATE_TIME_FORMAT)}</>}
      />
      {!task.stoppedAt && (
        <Stack
          direction="row"
          gap={1}
          sx={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {/* <Button size="small" variant="contained" color="secondary" disableElevation>
            Pause
            </Button> */}
          <Button
            size="small"
            variant="contained"
            color="success"
            disableElevation
            onClick={(e) => {
              e.stopPropagation();
              updateTask(task.id, {
                stoppedAt: dayjs().format(),
              });
            }}
          >
            Complete
          </Button>
        </Stack>
      )}
    </ListItem>
  );
};

export default TaskList;
