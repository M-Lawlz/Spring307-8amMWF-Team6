import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';

export default class Login extends React.Component {
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

    handleLoginClose = () => {
        this.setState({
            open: false
        });
        // pass false (for login popup) back up to the parent
        this.props.loginAttempt(false);
    }

    submitLoginForm = (event) => {
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
            // console.log("username is: " + form.elements.formUser.value);
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
            onClose={this.handleLoginClose}
            open={this.state.open}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <Form validated={this.state.validated} onSubmit={this.submitLoginForm}>
                        <Form.Label>Username</Form.Label>
                        <Form.Group controlId="formUsername">
                            <Form.Control name="formUser" type="text" placeholder="Username" required/>
                        </Form.Group> <br/>
                        <Form.Label>Password</Form.Label>
                        <Form.Group controlId="formPassword">
                            <Form.Control name="formPass" type="password" placeholder="Password" required/>
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
