import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/PersonOutline';

const styles = {
   container:{
       display: 'flex',
       flexDirection: 'row',
       height: 'auto',
       width:'100%',
       padding: 10,
   },
   userImage:{
       
   },
   userName:{
       alignSelf: 'center',
   },
   avatar: {
    margin: 10,
  },
 fullname:{
    width: 'auto',
    marginLeft: 2,
    fontSize: 16,
    color: '#1466f7',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 1,
    
 }

}

class DrawerUser extends Component {
    render() {
        const { classes } = this.props;
        const { user } = this.props;
        return (
            <div className={classes.container}>
            <div className={classes.userImage}>
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            </div>  
            <div className={classes.userName}>
            <span className={classes.fullname}>{user && `${user.firstname} ${user.lastname}`}</span>
            </div> 
            </div>
        );
    }
}

export default withStyles(styles)(DrawerUser);