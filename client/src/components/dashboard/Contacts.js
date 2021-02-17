import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import {    ListSubheader, 
            IconButton,
            Drawer,
            List,
            Divider,
            Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";

import { getContacts } from "../../actions/userActions";

const styles = (theme) => {
    return({
        toolbar: theme.mixins.toolbar,
        list: {
            backgroundColor: theme.palette.background.paper
        },
        subheader: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 5,
            width: 250
        },
        title: {
            display: 'inline',
            fontSize: '1.5rem'
        }
    });
};

class Contacts extends Component {

    constructor(props) {
        super(props);

        this.props.getContacts();

        this.state = {
            formOpen: false
        }
    }


    // handlers for add contact form
    handleClickOpen = () => {
        this.setState({ formOpen: true });
    };
    
    handleClose = () => {
        this.setState({ formOpen: false });
    };

    render() {

        const {classes} = this.props;

        return(
            <Drawer
                variant='persistent'
                id='contacts'
                open={this.props.open}
            >
                <div className={classes.toolbar} />

                <List className={classes.list}>
                    <ListSubheader>
                        <div className={classes.subheader}>
                            <IconButton
                                color='primary'
                                onClick={this.props.setDrawer}
                            >
                                <ArrowBackIcon />
                            </IconButton>

                            <span className={classes.title}>
                                CONTACTS
                            </span>

                            {/* Add Button for adding a Contact */}
                            <IconButton 
                                color='primary'
                                onClick={this.handleClickOpen}
                            > 
                                <AddIcon/> 
                            </IconButton>
                        </div>

                        {/* Form for adding a Contact on button Press */}
                        <ContactForm open={this.state.formOpen} handleClose={this.handleClose} />
                    </ListSubheader>

                    <Divider />

                    { this.props.contacts.map((contact, index) => <ContactItem contact={contact} key={index} />) }

                </List>
            </Drawer>
        );
    }
}


Contacts.propTypes = {
    contacts: PropTypes.array,
    open: PropTypes.bool,
    setDrawer: PropTypes.func
};

const mapStateToProps = state => ({
    contacts: state.auth.user.contacts
});

export default connect(
    mapStateToProps,
    { getContacts }
) (withStyles(styles)(Contacts));