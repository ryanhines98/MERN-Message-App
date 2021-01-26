import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import {    ListSubheader, 
            IconButton,
            Drawer,
            List,
            Divider
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    list: {
        backgroundColor: theme.palette.background.paper
    },
    item: {
        width: '18rem'
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        display: 'inline',
        fontSize: '1.5rem'
    }
}));

function Contacts(props) {
    const classes = useStyles();
    const mounted = useRef();

    const [formOpen, setFormOpen] = useState(false);
    const [listItems, setListItems] = useState([]);
    const contacts = [];

    useEffect(() => {

        for(let i = 0; i < props.contacts.length; i++) {
            contacts.push(
                <ContactItem contact={props.contacts[i]} changeContact={props.changeContact} />
            );
        }
        setListItems(contacts);

        if(!mounted.current) {
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

                { listItems }

            </List>

        </Drawer>
    );

}

const mapStateToProps = state => ({
    errors: state.errors
});

Contacts.propTypes = {
    errors: PropTypes.object,
    contacts: PropTypes.array,
    changeContact: PropTypes.func
}

export default connect(
    mapStateToProps
) (Contacts);