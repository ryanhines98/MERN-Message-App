import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Chat from '../Chat';
import Contacts from './Contacts';

import { Grid } from '@material-ui/core';

function Dashboard(props) {

    return (
        <Grid container direction='column'>
            <Grid item xs={2}>
                <Contacts/>
            </Grid>

            <Grid item>
                GRID ITEM
            </Grid>
        </Grid>
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