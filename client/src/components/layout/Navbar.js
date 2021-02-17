import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';

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

    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    };

    const classes = useStyles();
    return (
        <AppBar position='absolute' color='primary' className={classes.bar}>
            <Toolbar>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%'
                }}>

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
        </AppBar>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logoutUser })(Navbar);