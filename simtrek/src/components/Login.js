import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            open : (props.loginAttempt) ? true : false
        }
    }

    handleLoginOpen() {
        this.setState({
            open: true
        });
    }

    handleLoginClose() {
        this.setState({
            open: false
        });
        // pass false (for login popup) back up to the parent
        this.props.loginAttempt(false);
    }

    submitLoginForm = (event) => {
        console.log("submit LOGIN clicked!");
        let form = event.currentTarget;

        // will refresh the components without this statement,
        // useful for when users actually login/submit form
        event.preventDefault();

        /* actions to do when the form is not complete */
        if(form.checkValidity() === false) {
            // event.stopPropogation();
        }
        /* this will deal with the submission of a validated form */
        else {
            // event object should have user/pw somewhere
            console.log(event);
            this.setState({
                validated: true
            });
        }
    }

    render() {
        return (
            <Dialog modal = {true}
            autoDetectWindowHeight={true} 
            autoScrollBodyContent={true}
            contentStyle={{height: "200px", width: "300xp"}}
            onClose={() => this.handleLoginClose()} 
            open={this.state.open}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Form validated={this.state.validated} onSubmit={this.submitLoginForm}>
                        <Form.Label>Username</Form.Label>
                        <Form.Group controlId="formUsername">
                            <Form.Control type="text" placeholder="Username" required/>
                        </Form.Group> 
                        <Form.Label>Password</Form.Label>
                        <Form.Group controlId="formPassword">
                            <Form.Control type="password" placeholder="Password" required/>
                        </Form.Group>
                        <Button onClick={() => this.handleLoginClose()} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Travel!
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
}

export default Login;
