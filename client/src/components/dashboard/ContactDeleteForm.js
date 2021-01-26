import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";
import { deleteContact } from "../../actions/userActions";

function ContactDeleteForm(props) {

    const handleDelete = (e) => {
        console.log('contact delete');
        console.log(props.contact.name);
        props.deleteContact(props.contact);
        props.toggleOpen(e);
    }

    return(
        <Dialog
            open={props.open}
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
                <Button onClick={(e) => handleDelete(e)} color='primary'>
                    Yes
                </Button>

                <Button onClick={props.toggleOpen} color='primary'>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
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