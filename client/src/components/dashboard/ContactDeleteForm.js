import React, { useState } from 'react';
import PropTypes from "prop-types";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@material-ui/core";

function ContactDeleteForm(props) {

    const handleDelete = (e) => {
        console.log('contact delete');
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
    toggleOpen: PropTypes.func.isRequired
}

export default ContactDeleteForm;