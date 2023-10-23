import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Logo from '../../../logo.png'

export const NavBar = () => {

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#363636' }}>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sales Date Prediction App
                </Typography>
                <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/orders/prediction">
                  <img src={Logo} alt="Logo" style={{ height: '50px' }}/>
                </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    </>
  )
}
