import React from "react";
import { Link } from "react-router-dom";

import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import CodeIcon from '@material-ui/icons/Code';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

function Navbar(props) {
    // render() {
    //     return (
    //         <div className="navbar-fixed">
    //             <nav className="z-depth-0">
    //                 <div className="nav-wrapper white">
    //                     <Link
    //                         to="/"
    //                         style={{
    //                             fontFamily: "monospace"
    //                         }}
    //                         className="col s5 brand-logo center black-text"
    //                     >
    //                         <i className="material-icons">code</i>
    //                         MERN
    //                     </Link>
    //                 </div>
    //             </nav>
    //         </div>
    //     )
    // }
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const classes = useStyles();
    return (
        <Appbar position='static' color='secondary'>
            <Toolbar>
                    <CodeIcon fontSize='large' className={classes.icon} />
                    <Typography variant='h6' className={classes.root} >
                        MERN Message Application
                    </Typography>
                { props.isAuthenticated && <Button variant='contained' onClick={onLogoutClick}>Logout</Button> }
            </Toolbar>
        </Appbar>

    );
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);