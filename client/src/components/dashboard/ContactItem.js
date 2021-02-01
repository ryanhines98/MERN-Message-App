import React, { useState } from 'react';
import PropTypes from "prop-types";

import {    
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Popover,
} from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactDeleteForm from './ContactDeleteForm';

function ContactItem(props) {

    // used for options menu
    const [optionOpen, setOptionOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const id = optionOpen ? 'simple-popover' : undefined;

    // used for delete contact option
    const deleteId = 'delete-contact';
    const [deleteOpen, setDeleteOpen] = useState(false);

    // handlers for contact options
    const contactOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
        setOptionOpen(true);
    }

    const handleClose = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setAnchorEl(null);
        setOptionOpen(false);
        if(e.target.id === deleteId) {
            handleDeleteForm(e);
        }
    }


    // handler for delete contact form
    const handleDeleteForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteOpen(!deleteOpen);
    }


    // handler for contact click
    const contactClick = (e) => {
        e.preventDefault();
        props.changeContact(props.contact);
    }

    return(
        <ListItem 
            button 
            disableRipple={true}
            onClick={e => contactClick(e)}
            divider 
        >
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText 
                primary={props.contact.name}
                style={{ marginRight: 15 }}
            />

            <Button
                onClick={e => contactOptions(e)}
                aria-describedby={id}
            >
                <MoreVertIcon/>
            </Button>

            <Popover
                id={id}
                open={optionOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Paper>
                    <ClickAwayListener onClickAway={(e) => handleClose(e)}>
                        <MenuList autoFocusItem={optionOpen}>
                            <MenuItem onClick={(e) => handleClose(e)} id={deleteId}>Delete Contact</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popover>

            <ContactDeleteForm open={deleteOpen} toggleOpen={handleDeleteForm} contact={props.contact} />

        </ListItem>
    );
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
    changeContact: PropTypes.func
}

export default ContactItem;