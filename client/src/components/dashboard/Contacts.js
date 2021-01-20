import React, { useState, useEffect, useRef } from "react";

import { makeStyles } from '@material-ui/core/styles';
import {    ListSubheader, 
            IconButton,
            Drawer,
            List,
            Divider,
            ListItem,
            ListItemAvatar,
            ListItemText,
            Avatar
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";

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

    const [open, setOpen] = useState(false);
    const [contacts] = useState([]);

    useEffect(() => {
        if(!mounted.current) {
            console.log('mounting');
            console.log(props.contacts);

            mounted.current = true;
        } else {

        }
    }, [props.contacts]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    for(let i = 0; i < props.contacts.length; i++) {
        contacts.push(
            <ListItem button divider className={classes.item}>
                <ListItemAvatar>
                    <Avatar />
                </ListItemAvatar>
                <ListItemText 
                    primary={props.contacts[i].name}
                />
            </ListItem>
        );
    }

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
                    <ContactForm open={open} handleClose={handleClose} />

                </ListSubheader>

                <Divider />

                { contacts }

            </List>

        </Drawer>
    );

}

const mapStateToProps = state => ({
    //contacts: state.auth.user.contacts,
    errors: state.errors
});

Contacts.propTypes = {
    //contacts: PropTypes.array,
    errors: PropTypes.object
    //getContacts: PropTypes.func.isRequired
}

export default connect(
    mapStateToProps
    //{ getContacts }
) (Contacts);