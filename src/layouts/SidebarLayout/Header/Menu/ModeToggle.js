import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon icon for dark mode
import Brightness5Icon from '@mui/icons-material/Brightness5'; // Sun icon for light mode

const ModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <IconButton
      color="inherit"
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? <Brightness5Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ModeToggle;
