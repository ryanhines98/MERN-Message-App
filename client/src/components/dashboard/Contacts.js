import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import {    ListSubheader, 
            IconButton,
            Drawer,
            List,
            Divider
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import PropTypes from "prop-types";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 500
    },
    toolbar: theme.mixins.toolbar,
    list: {
        backgroundColor: theme.palette.background.paper
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    title: {
        display: 'inline',
        fontSize: '1.5rem',
        marginRight: 10
    }
}));

function Contacts(props) {
    const classes = useStyles();
    const mounted = useRef();
    const contacts = useRef();

    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        if(!mounted.current) {
            console.log(contacts.current.clientWidth);
            mounted.current = true;
        } else {

        }
    }, [props.contacts]);


    // handlers for add contact form
    const handleClickOpen = () => {
        setFormOpen(true);
    };
    
    const handleClose = () => {
        setFormOpen(false);
    };

    return(
        <Drawer
            className={classes.drawer}
            variant='permanent'
            id='contacts'
            ref={contacts}
        >
            <div className={classes.toolbar} />

            <List className={classes.list}>

                <ListSubheader className={classes.subheader}>
                    <span className={classes.title}>
                        CONTACTS
                    </span>

                    {/* Add Button for adding a Contact */}
                    <IconButton 
                        color='primary'
                        onClick={handleClickOpen}
                    > <AddIcon/> </IconButton>

                    {/* Form for adding a Contact on button Press */}
                    <ContactForm open={formOpen} handleClose={handleClose} />

                </ListSubheader>

                <Divider />

                { props.contacts.map((contact, index) => <ContactItem contact={contact} changeContact={props.changeContact} key={index} />) }

            </List>
        </Drawer>
    );

}


Contacts.propTypes = {
    contacts: PropTypes.array,
    changeContact: PropTypes.func
}

export default Contacts;