import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropProps {
  open: boolean;
}

const Backdrop = ({ open }: BackdropProps) => {
  return (
    <MuiBackdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
