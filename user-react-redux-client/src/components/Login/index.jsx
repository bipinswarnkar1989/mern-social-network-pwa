import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import './Login.css';

const styles = theme => ({
    container: {
      textAlign:'center',
      alignItems: 'center',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '90%',
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        fontStyle: 'normal',
        textTransform: 'none',
        backgroundColor:'#1466F7'
      },
      loginButtonDiv:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      errorDiv:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'red',
        fontSize: 12,
      }
  });

class Login extends Component {
   constructor(props) {
     super(props);
     this.state = {
      email:'',
      password:'',
      error:null
     }
     this.handleSubmit = this.handleSubmit.bind(this);
   }
   

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
          const emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          if (!emailValid) {
            this.setState({
              error:'Invalid Email'
            });
          }else {
            this.setState({
              error:null
            });
          }
     
      };

      handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.error) {
          return;
        }
        const payload =  {
          email: this.state.email,
          password: this.state.password
       }
       if (payload.email !== '' && payload.password !== '') {
        this.props.mappedLogin(payload,this.props.history);
       }
      }

    render() {
        const { classes } = this.props;
        const { isLoggedIn, error, isLoading } = this.props.auth;
        {/*if (isLoading) return (<Spinner/>) */}
        return (
            <div>
                <div className={classes.container}>
              <Card>
              <form onSubmit={this.handleSubmit}  noValidate autoComplete="off">
        <TextField
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
         <TextField
          id="password"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          margin="normal"
          type="password"
        />
        <div className={classes.loginButtonDiv}>
        <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
          Log In
        </Button>
          </div>
          <div className={classes.errorDiv}>
          {error && 
           <p>
           {error}
           </p>
        }
         {!error && this.state.error &&
           <p>
           {this.state.error}
           </p>
        }
          </div>
        </form>
        <div className="forgotContainer">
        <a className="link-forgot-password" tabIndex="1" href="">Forgot password?</a>
        </div>
        
             </Card>
             <div className="signUpContainer">
             <div className="signUpLink">
        <Button variant="contained" size="medium" color="primary" className={classes.button}
        component={Link} to="/register"
        >
          Create New Account
        </Button>
        </div>
            </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Login);