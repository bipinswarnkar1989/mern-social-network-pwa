import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withMuiRoot from '../../withMuiRoot';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SideMenu from '../SideMenu';
import DrawerUser from '../DrawerUser';
import Auth from '../../utils/auth';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import NotiFicationIcon from '@material-ui/icons/Notifications';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';

import './style.css';
const authObj = new Auth();

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 70,
  },
  flex: {
    flexGrow: 1,
  },
  sideDrawer:{
    width:300
  },
  list: {
    width: 250,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    border:'0 !important',
    textDecoration:'none !important',
    borderBottom: 'none !important',
    display: 'block',
    lineHeight: '2.0rem',
    width:'95%',
    padding:2,
    fontSize:16
  },
});

class Appwrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      anchorEl: null,
      routePath:'',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSaveProfile = this.handleSaveProfile.bind(this);
  }

  componentDidMount(){
    this.setState({
      routePath:this.props.history.location.pathname
    })
    this.props.history.listen(location => {
      console.log(location.pathname) // /home
      this.setState({
        routePath:location.pathname
      })
    })
  }
  
  toggleDrawer = (open) => {
    this.setState({
      drawerOpen: open,
    });
  }
  handleLogout(){
    authObj.removeToken();
    this.setState({
      drawerOpen:false
    })
    this.props.history.push('/login');
    this.props.mappedlogout();
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleSearch(){
    this.props.mappedshowSearchBar();
    this.props.history.push('/search')
  }
  goBack(){
    this.props.mappedshowAppBar();
     this.props.history.goBack();
  }

  handleSaveProfile(){
    this.props.mappedupdateUser(this.props.auth.modifiedUserTosave,this.props.history);
  }

  render() {
    const { classes } = this.props;
    const { isLoggedIn, user, isLoading, error } = this.props.auth;
    const { anchorEl, routePath, drawerOpen } = this.state;
    const open = Boolean(anchorEl);
    const { showAppBar, showSearchBar, appBarTitle } = this.props.appState;
  
    if (isLoading) {
      return null;
    }
    const homeLinks = (
      <div>
          <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleSearch}
                  color="inherit"
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <NotiFicationIcon />
                </IconButton>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                
          <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}><Link to="/edit-profile">Profile</Link></MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Menu>
                </div>
    );

    const editProfileLinks = (
      <div>
        <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleSaveProfile}
                  color="inherit"
                >
                  <SaveIcon />
                </IconButton>
      </div>
    )

   
    return (
      <div className={classes.root}>
      {showAppBar && !showSearchBar && 
        <AppBar position="fixed" style={{backgroundColor:'#1466F7'}}>
        <Toolbar>
          {isLoggedIn &&  routePath === '/' ?
             <IconButton onClick={() => this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
             <MenuIcon />
           </IconButton>
           : 
           isLoggedIn && routePath !== '/' ?
           <IconButton onClick={() => this.goBack()} className={classes.menuButton} color="inherit" aria-label="Menu">
           <ArrowBackIcon />
         </IconButton>
         : ''
          }
          <Typography variant="title" color="inherit" className={classes.flex}>
            {appBarTitle} 
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          {isLoggedIn && routePath === '/' ? homeLinks :
           isLoggedIn && routePath === '/edit-profile' ? editProfileLinks  :
           isLoggedIn && routePath === '/compose' ? homeLinks :
           ''
           }
        </Toolbar>
      </AppBar>
      }
      {showSearchBar && !showAppBar && 
          <AppBar position="fixed" style={{backgroundColor:'white'}}>
          <Toolbar>
            {isLoggedIn && 
               <IconButton onClick={() => this.goBack()}  aria-label="Menu">
               <ArrowBackIcon />
             </IconButton>
            }
            <input type="text" placeholder="Search for people" className={classes.textField}/>
          </Toolbar>
        </AppBar>
      }
      <SwipeableDrawer
          open={drawerOpen}
          onClose={() => this.toggleDrawer(false)}
          onOpen={() => this.toggleDrawer(true)}
          disableSwipeToOpen={isLoggedIn ? false : true}
          className={classes.sideDrawer}
        >
          <div >
          <DrawerUser user={user}/>
          <SideMenu 
           logout = {() => this.handleLogout()}
          />
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
};

export default withMuiRoot(withStyles(styles)(Appwrapper));
