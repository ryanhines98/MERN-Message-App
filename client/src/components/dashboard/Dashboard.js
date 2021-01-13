import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Chat from '../Chat';
import Contacts from './Contacts';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Navbar from '../layout/Navbar';

//import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles((theme) => ({
    root: {
        diplay: 'flex'
    },
    paper: {
        height: '100%',
        width: 200,
        padding: 5,
        margin: 10
    },
}));



function Dashboard(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Navbar/>
            <Contacts/>
        </div>
    );
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
) (Dashboard);