import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket } from "../../actions/chatActions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    Button
} from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    bttnContainer: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer
    },
    button: {
        marginTop: 10,
        right: 5,
        [theme.breakpoints.down('xs')]: {
            right: 35,
            marginTop: 16
        }
    },
    mobileIcon: {
        [theme.breakpoints.down('xs')]: {
            position: 'relative',
            left: 16
        },
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    desktopIcon: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    }
}));

function Dashboard(props) {
    const mounted = useRef();
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('xs'));

    const [drawerOpen, setDrawerOpen] = useState(false);


    useEffect(() => {
        if(!mounted.current) {
            props.connectSocket();
            mounted.current = true;
        } 

        return(() => {
            props.disconnectSocket();
        });
    },[]);

    const setDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div style={{ height: '100%', position: 'relative' }}>
            {/* Contacts Drawer Open Button */}
            <div className={classes.bttnContainer}>
                <div className={classes.toolbar}/>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    size='large'
                    disableElevation
                    onClick={ setDrawer }
                >    
                    <RecentActorsIcon className={classes.desktopIcon} />
                    <MenuIcon className={classes.mobileIcon} />
                </Button>
            </div>

            <Contacts open={drawerOpen} setDrawer={setDrawer} />
            <Chat />

        </div>
    );
}

Dashboard.propTypes = {
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
    currentContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentContact: state.chat.currentContact,
    socket: state.chat.socket
});

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (Dashboard);