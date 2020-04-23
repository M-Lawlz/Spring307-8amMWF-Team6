import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Login from './Login.js';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin : false
        }
        // this.rerenderCallback = this.rerenderCallback.bind(this);
    }

    // rerenderCallback() {
    //     console.log("Parent component is rerendered");
    //     this.setState({
    //         showLogin: false
    //     });
    //     this.forceUpdate();
    // }



    handleLoginClicked = (newVal) => {
        console.log("show login is : " + this.state.showLogin);
        this.setState({
            showLogin: newVal
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
                            <Button color="inherit" variant="outlined" type="submit" onClick={() => this.handleLoginClicked(!this.state.showLogin)}>                         
                            <em>Login</em>
                                {this.state.showLogin ? 
                                //<Login rerenderCallback={this.rerenderCallback} loginAttempt={() => this.handleLoginClicked}/> : null}
                                <Login loginAttempt={this.handleLoginClicked}/> : null}
                            </Button> &nbsp;
                            <Button color="inherit" variant="outlined">
                                <em>Sign Up</em>
                            </Button>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar;

