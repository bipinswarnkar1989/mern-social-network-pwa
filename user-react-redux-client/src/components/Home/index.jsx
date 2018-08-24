import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  addPost: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
    <div className={classes.root}>
      <h2>Home</h2>
      <Button component={Link} to="/compose" variant="fab" className={classes.addPost} color='primary'>
              <AddIcon/>
            </Button>
    </div>
        );
    }
}


export default withStyles(styles)(Home);