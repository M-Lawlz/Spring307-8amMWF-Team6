import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {FormControl, FormGroup, FormLabel} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Form from 'react-bootstrap/Form';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : (props.signupAttempt) ? true : false
        }
    }

    handleSignUpOpen() {
        this.setState({
            open: true
        });
    }

    handleSignUpClose() {
        this.setState({
            open: false
        });
        this.props.signupAttempt(false);
    }

    // TODO: Implement
    submitSignUpForm = (event) => {
        console.log("submit SIGNUP clicked!");
        let form = event.currentTarget;

        // will refresh the components without this statement,
        // useful for when users actually signup/submit form
        event.preventDefault();

        /* actions to do when the form is not complete */
        if(form.checkValidity() === false) {
            // event.stopPropogation();
        }
        /* this will deal with the submission of a validated form */
        else {
            console.log("firstname is: " + form.elements.formFirst.value);
            console.log("lastname is: " + form.elements.formLast.value);
            console.log("email is: " + form.elements.formEmail.value);
            console.log("username is: " + form.elements.formUser.value);
            console.log("password is: " + form.elements.formPass.value);
        }
    }

    render() {
        return (
            //TODO: look into these properties later (not working)
            <Dialog modal = {true}
            autoDetectWindowHeight={true} 
            autoScrollBodyContent={true}
            contentStyle={{height: "200px", width: "300xp"}}
            onClose={() => this.handleSignUpClose()} 
            open={this.state.open}>
                <DialogTitle>New VTravelr</DialogTitle>
                <DialogContent>
                    <Form validated={this.state.validated} onSubmit={this.submitSignUpForm}>
                        <Form.Row>
                            <Form.Label>First Name</Form.Label>
                            <Form.Group controlId="formFirstname">
                                <Form.Control name="formFirst" type="text" placeholder="First Name" required/>
                            </Form.Group> <br/> 
                            <Form.Label>Last Name</Form.Label>
                            <Form.Group controlId="formLastname">
                                <Form.Control name="formLast" type="text" placeholder="Last Name" required/>
                            </Form.Group> <br/>
                        </Form.Row>

                        <Form.Label>Email</Form.Label>
                        <Form.Group controlId="enteredEmail">
                            <Form.Control name="formEmail" type="text" placeholder="Email" required/>
                        </Form.Group> <br/>

                        <Form.Label>Username</Form.Label>
                        <Form.Group controlId="formUsername">
                            <Form.Control name="formUser" type="text" placeholder="Username" required/>
                        </Form.Group> <br/>
                        <Form.Label>Password</Form.Label>
                        <Form.Group controlId="formPassword">
                            <Form.Control name="formPass" type="password" placeholder="Password" required/>
                        </Form.Group> <br/>
                        <Button onClick={() => this.handleSignUpClose()} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Sign Up!
                        </Button>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
}

export default SignUp;