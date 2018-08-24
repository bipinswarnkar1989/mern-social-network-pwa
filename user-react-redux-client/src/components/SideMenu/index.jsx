import React, { Component } from 'react';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhotoIcon from '@material-ui/icons/Photo';
import VideosIcon from '@material-ui/icons/VideoLibrary';
import GroupIcon from '@material-ui/icons/Group';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ChatIcon from '@material-ui/icons/Chat';

const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    primary: {},
    icon: {},
    fullList: {
        width: 300,
      },
  });

class SideMenu extends Component {
   render() {
    const { classes } = this.props;
       return (
           <div>
               <Paper>
      <MenuList className={classes.fullList}>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <PhotoIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Photos" />
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <VideosIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Videos" />
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Friends" />
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Messaging" />
        </MenuItem>
        <MenuItem onClick={() => this.props.logout()} className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
        </MenuItem>
      </MenuList>
    </Paper>
           </div>
       );
   }
}

export default withStyles(styles)(SideMenu);