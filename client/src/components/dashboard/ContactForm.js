import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addContact, setErrors, updateContact } from "../../actions/userActions";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class ContactForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            errors: this.props.errors,
            open: this.props.open
        };
        this.addContact = addContact.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if( !(Object.keys(nextProps.errors).length === 0) )
            this.setState({ errors: nextProps.errors });
    }

    handleContact = async () => {
        const res = await this.props.addContact(this.state.email);
        // console.log(res);
        // console.log(res.errors);
        // if(res.errors){
        //     console.log(res.errors);
        //     this.props.setErrors(res.errors);
        // } else {
        //     console.log(res.contact);
        //     this.props.updateContact(res.contact);
        //     this.handleClose();
        // }
    };

    handleClose = () => {
        if(this.state.errors) this.setState({ errors: {} });
        if(this.props.errors) this.props.setErrors({});
        this.props.handleClose();
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    render() {
        return(
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
    { setErrors, addContact }
) (ContactForm);