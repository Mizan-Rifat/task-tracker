import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ArrowLeft } from './icons';
import { useRouter } from '../services/stores/router';

const MainLayout = ({ children }: React.PropsWithChildren) => {
  const { setCurrentRoute, currentRoute } = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{}}>
        <Toolbar>
          {currentRoute === '/task' && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                setCurrentRoute('/');
              }}
              sx={{ mr: 2 }}
            >
              <ArrowLeft />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            Task Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
