import React, {useState} from 'react';
import {Menu,MenuItem} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Person from '@mui/icons-material/Person';
import {ProfileBtn, ProfileView} from './styles';
import {useNavigate} from 'react-router-dom';

export function ZDProfile(props){
    const {profileName} = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let navigate = useNavigate();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
      handleClose()
      localStorage.clear()
      navigate("/");
    } 

    return(
        <ProfileView>
        <ProfileBtn 
                size="large" 
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<Person />}
                endIcon={<ArrowDropDownIcon/>}>
                {profileName}
                </ProfileBtn>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
                >
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Log out</MenuItem>
                </Menu> 
        </ProfileView>
       
    )
}