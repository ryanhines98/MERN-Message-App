import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import { deleteContact } from "../../actions/userActions";

class ContactDeleteForm extends Component {

    handleDelete = (e) => {
        this.props.deleteContact(this.props.contact, this.setAlert);
        this.props.toggleOpen(e);
    }

    render() {
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    disableBackdropClick
                    onClick={ (e) => e.stopPropagation() }
                >
                    <DialogTitle>
                        {"Delete Contact?"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Are you sure you would like to delete this contact?
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={(e) => this.handleDelete(e)} color='primary'>
                            Yes
                        </Button>

                        <Button onClick={this.props.toggleOpen} color='primary'>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

ContactDeleteForm.propTypes = {
    open: PropTypes.bool.isRequired,
    toggleOpen: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired,
    deleteContact: PropTypes.func
}

export default connect(
    null,
    { deleteContact }
) (ContactDeleteForm);