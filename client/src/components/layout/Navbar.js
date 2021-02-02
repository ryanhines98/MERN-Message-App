import React from "react";

import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import CodeIcon from '@material-ui/icons/Code';
import { makeStyles } from '@material-ui/core/styles';
import { 
        Typography,
        Button,
        IconButton,
        Avatar
    } from '@material-ui/core';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
    bar: {
        zIndex: theme.zIndex.drawer + 1
    },
    title: {
        flex: 1,
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

function Navbar(props) {

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const classes = useStyles();
    return (
        <Appbar position='absolute' color='primary' className={classes.bar}>
            <Toolbar>
                <CodeIcon fontSize='large' className={classes.icon}/>
                <Typography variant='h6' className={classes.title} >
                    MERN Message Application
                </Typography>
                { props.isAuthenticated && 
                    <div>
                        <Button variant='contained' onClick={onLogoutClick}>Logout</Button>
                        <IconButton
                            style={{ marginLeft: 10 }}
                            href='/account'
                        > 
                            <Avatar/> 
                        </IconButton> 
                    </div>
                }
            </Toolbar>
        </Appbar>
    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);