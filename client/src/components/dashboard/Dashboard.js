import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    paper: {
        height: '100%',
        width: 200,
        padding: 5,
        margin: 10
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    const mounted = useRef();

    const [contact, setContact] = useState({});

    const changeContact = (name) => {
        setContact(name);
    }

    useEffect(() => {
        if(!mounted.current) {
            mounted.current = true;
        } else {
            
        }
    }, [props.contacts] );

    return (
        <div className={classes.root}>
            { (props.contacts.length !== 0) ? <Contacts contacts={props.contacts} changeContact={changeContact} /> : null }
            <Chat contact={contact} />
        </div>
    );
}

Dashboard.propTypes = {
    contacts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    contacts: state.auth.user.contacts
});

export default connect(
    mapStateToProps,
    null
) (Dashboard);