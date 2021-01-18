import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import { makeStyles } from '@material-ui/core/styles';

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