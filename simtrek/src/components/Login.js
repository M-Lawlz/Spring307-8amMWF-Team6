import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, FormGroup, FormLabel} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClose = this.handleLoginClose.bind(this);
        this.state = {
            open : (props.loginAttempt) ? true : false
        }
    }

    handleLoginOpen() {
        this.setState({
            open: true
        });
    }

    handleLoginClose() {
        console.log("Handle close in the login component");
        this.setState({
            open: false
        });
        // attempt to hard rerender the parent component but fails
        // this.props.rerenderCallback();

        // pass false (for login popup) back up to the parent
        this.props.loginAttempt(false);
    }

    // TODO: Implement
    submitLoginForm() {}


    // will deal with form stuff later
    render() {
        return (
            <Dialog 
            modal = {true}
            autoDetectWindowHeight={true} 
            autoScrollBodyContent={true}
            contentStyle={{height: "200px", width: "300xp"}}
            onClose={() => this.handleLoginClose()} 
            open={this.state.open}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                <FormGroup controlId="username">
                    {/* <FormLabel>Email or Username</FormLabel>
                    <FormControl autoFocus type="email"/> */}
                    <TextField label="Username" margin="dense"></TextField>
                </FormGroup>
                <FormGroup controlId="password">
                    {/* <FormLabel>Password</FormLabel> */}
                    <TextField label="Password" margin="dense"></TextField>
                <FormControl/>
                </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleLoginClose()} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.submitLoginForm()} color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default Login;
