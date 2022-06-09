import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon,ListItemText } from '@mui/material';
import {ItemView} from './styles';

export function  ZDListItem(props){
    const {title, icon} = props
  return(
    <ItemView>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={props.handleClick}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        </List>
    </ItemView>
  );
}