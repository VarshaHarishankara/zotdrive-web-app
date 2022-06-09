import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export const ZDNavBar = () => {
  return (
    <Box sx={{ position: 'absolute', width: '100%', top: 0}}>
      <AppBar position="static" sx={{ bgcolor: "#07111D" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginLeft:'20px' }}>
            Zotdrive
          </Typography>
          <Link to="/signup" style={{ textDecoration: 'none'}}><Button style={{color:'white', margin: '10px'}}>Sign Up</Button></Link>
          <Link to="/login" style={{ textDecoration: 'none'}}><Button  style={{color:'white', margin: '10px'}}>Login</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
