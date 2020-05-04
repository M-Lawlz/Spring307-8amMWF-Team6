import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SignUp from './SignUp.js';
import Login from './Login.js';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin : false,
            showSignUp : false
        }
    }

    handleLoginClicked = (newVal) => {
        this.setState({
            showLogin: newVal
        });
    }

    handleSignUpClicked = (newVal) => {
        this.setState({
            showSignUp: newVal
        });
    }

    render() {
        return (
            <div>
                <AppBar position="static" style={{background: '#00CED1'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6">
                            <h2>SimTrek</h2>
                        </Typography>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button color="inherit" variant="outlined" type="submit" onClick={this.handleLoginClicked}>                         
                            <em>Login</em>
                            </Button> &nbsp;
                            {this.state.showLogin ? <Login loginAttempt={this.handleLoginClicked}/> : null}
                            <Button color="inherit" variant="outlined" type="submit" onClick={this.handleSignUpClicked}>
                                <em>Sign Up</em>
                            </Button>
                            {this.state.showSignUp ? <SignUp signupAttempt={this.handleSignUpClicked}/> : null}
                   


                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
