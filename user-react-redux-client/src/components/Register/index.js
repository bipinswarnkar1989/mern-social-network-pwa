import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';

import './style.css';

const styles = theme => ({
    container: {
      textAlign:'center'
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
      signUpButtonDiv:{
        display: 'flex',
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

class Register extends Component {
    state = {
        email:'',
        password:'',
        firstname:'',
        lastname:'',
        error:null,
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({ errors: nextProps.errors })
      }
  }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
          error:null,
          errors:{}
        });
      };

      handleSubmit = async(e) => {
        e.preventDefault();
        let validForm = await this.validateForm();
        if (!validForm) {
          return
        }
        const user = {
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          email:this.state.email,
          password:this.state.password
        }
        this.props.mappedRegister(user,this.props.history);
      }

      async validateForm(){
        const emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (this.state.firstname === '') {
          this.setState({
            error:'Firstname required!',
            errors:{
              firstname:true
            }
          })
          return false;
        } else if (this.state.email === '' || !emailValid) {
          this.setState({
            error:'Please enter a valid email!',
            errors:{
              email:true
            }
          })
          return false
        } else if (this.state.password === '') {
          this.setState({
            error:'Password required!',
            errors:{
              password:true
            }
          })
          return false;
        }
        return true;
      }

    render() {
        const { classes } = this.props;
        const { error,errors } = this.state;
        return (
            <div>
                <div className={classes.container}>
              <Card>
              <form onSubmit={e => this.handleSubmit(e)}  noValidate autoComplete="off">
              <TextField
          name="firstname"
          error= {errors.firstname}
          id="firstname"
          label="Firstname"
          className={classes.textField}
          value={this.state.firstname}
          onChange={this.handleChange('firstname')}
          margin="normal"
        />
          <TextField
          name="lastname"
          id="lastname"
          label="Lastname"
          className={classes.textField}
          value={this.state.lastname}
          onChange={this.handleChange('lastname')}
          margin="normal"
        />
        <TextField
         name="email"
         error= {errors.email}
          id="email"
          label="Email"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          
        />
         <TextField
         name="password"
         error= {errors.password}
          id="password"
          label="Password"
          className={classes.textField}
          value={this.state.password}
          onChange={this.handleChange('password')}
          margin="normal"
          type="password"
        />
       <div className={classes.signUpButtonDiv}>
       <Button type="submit" variant="contained" size="medium" color="primary" className={classes.button}>
          Sign Up
        </Button>
        </div>
        <div className={classes.errorDiv}>
          {error && 
           <p>
           {error}
           </p>
        }
          </div>
        </form>
        
        
             </Card>
             <div className="signUpContainer">
             <div className="signUpLink">
        <span className="sign-in">Already have an account?&nbsp;<span className="link-login form-toggle"><Link to="/login">Sign in</Link></span></span>
        </div>
            </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Register);