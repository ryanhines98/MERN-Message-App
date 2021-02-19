import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addContact, setErrors } from "../../actions/userActions";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

function Alert(props) {
    return <MuiAlert eleveation={6} variant='filled' {...props} />
}

class ContactAddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: this.props.errors,
            open: this.props.open,
            alert: false
        };
    }

    static getDerivedStateFromProps(nextProps) {
        if( !(Object.keys(nextProps.errors).length === 0) ) {
            return({ errors: nextProps.errors});
        } else return null;
    }

    setAlert = () => {
        this.setState({ alert: true});
    }

    addContact = () => {
        this.props.addContact(this.state.email, this.setAlert);
    };

    handleClose = () => {
        if(this.state.errors) this.setState({ errors: {} });
        if(this.props.errors) this.props.setErrors({});
        this.setState({ email: '' });
        this.props.handleClose();
    }

    handleAlertClose = (event, reason) => {
        if(reason === 'clickaway') return;
        this.setState({ alert: false });
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    render() {
        return(
            <div>
                <Dialog open={this.props.open} onClose={this.handleClose}>
                    <DialogTitle>
                        <div
                            style={{
                                display:'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            Add Contact 
                            <Button onClick={this.handleClose}>
                                <CloseIcon/>
                            </Button>
                        </div> 
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Please Enter Desired User's Email to Add
                        </DialogContentText>

                        <TextField
                            margin="normal"
                            id="email"
                            label="Email"
                            variant="filled"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.email}
                            error={this.state.errors.addcontacterror ? true : false}
                        />
                        <span style={{color: 'red'}}>
                            {this.state.errors.addcontacterror}
                        </span>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.addContact} color='primary'>
                            Add
                        </Button>
                    </DialogActions>

                </Dialog>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.alert}
                    autoHideDuration={3000}
                    onClose={this.handleAlertClose}
                >
                    <Alert severity='success'>
                        {'Contact Added!'}
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

ContactAddForm.propTypes = {
    open: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    addContact: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps,
    { setErrors, addContact }
) (ContactAddForm);