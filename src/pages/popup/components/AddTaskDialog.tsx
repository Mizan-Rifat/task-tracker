import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Autocomplete, createFilterOptions } from '@mui/material';
import { useState } from 'react';
import useAddTask from '../hooks/firebase/useAddTask';
import dayjs from 'dayjs';

interface AddTaskDialogProps {
  open: boolean;
  handleClose: () => void;
}

interface FilmOptionType {
  inputValue?: string;
  title: string;
}

const filter = createFilterOptions<FilmOptionType>();

const AddTaskDialog = ({ open, handleClose }: AddTaskDialogProps) => {
  const [value, setValue] = useState<FilmOptionType | null>(null);

  const { addTask } = useAddTask();

  const onClose = () => {
    handleClose();
    setValue(null);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (value) {
            addTask({
              title: value.title,
              startedAt: dayjs().format()
            });
          }
          onClose();
        }
      }}
    >
      <DialogTitle sx={{ pb: 0.5 }}>Add Task</DialogTitle>
      <DialogContent>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                title: newValue
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                title: newValue.inputValue
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            const isExisting = options.some(option => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`
              });
            }
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={[
            { title: 'Whiplash' },
            { title: 'Gladiator' },
            { title: 'Memento' },
            { title: 'The Prestige' },
            { title: 'The Lion King' },
            { title: 'Apocalypse Now' },
            { title: 'Alien' },
            { title: 'Sunset Boulevard' }
          ]}
          getOptionLabel={option => {
            if (typeof option === 'string') {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.title;
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                {option.title}
              </li>
            );
          }}
          sx={{ width: 250, mt: 1 }}
          freeSolo
          renderInput={params => <TextField {...params} label="Type here" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Start</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskDialog;
