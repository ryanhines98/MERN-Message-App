import React, { useEffect, useState } from "react";

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
    item: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

function Navbar(props) {

    const [dashboard, setDashboard] = useState(false);

    useEffect(() => {
        console.log(window.location.pathname);
        if (window.location.pathname === '/dashboard')
            setDashboard(true);
        else {
            setDashboard(false);
        }
    });

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const classes = useStyles();
    return (
        <Appbar position='absolute' color='primary' className={classes.bar}>
            <Toolbar>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%'
                }}>
                    
                    {  dashboard &&
                        <div>
                            <Typography> test </Typography>
                        </div>
                    }

                    <div style={{ display: 'flex', flexDirection: 'row'}}>
                        <div className={classes.item}>
                            <CodeIcon fontSize='large' className={classes.icon}/>
                        </div>
                        <div className={classes.item}>
                            <Typography variant='h5'>
                                
                                MERN Message Application
                            </Typography>
                        </div>
                    </div>

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
                </div>
            </Toolbar>
        </Appbar>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);