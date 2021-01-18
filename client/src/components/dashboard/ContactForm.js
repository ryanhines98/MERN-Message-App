import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addContact, clearErrors } from "../../actions/userActions";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core'


class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: this.props.errors,
            open: this.props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) this.setState({ errors: nextProps.errors });
    }

    handleContact = () => {
        this.props.addContact(this.state.email);
    
        if(!this.state.errors)
            this.props.handleClose();
    };

    handleClose = () => {
        if(this.state.errors) this.setState({ errors: {} });
        if(this.props.errors) this.props.clearErrors();
        this.props.handleClose();
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    render() {
        return(
            <Dialog open={this.props.open} onClose={this.handleClose}>

                <DialogTitle> Add Contact </DialogTitle>

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
                        error={this.state.errors.usernotfound ? true : false}
                    />
                    <span style={{color: 'red'}}>
                        {this.state.errors.usernotfound}
                    </span>

                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={this.handleContact} color='primary'>
                        Add
                    </Button>
                </DialogActions>

            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors
});

ContactForm.propTypes = {
    open: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    addContact: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default connect(
    mapStateToProps,
    { addContact, clearErrors }
) (ContactForm);