import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    mode: 'light'
  }
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Cou
          </Typography>
          <Button variant="contained" color="primary">
            Commencer
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
