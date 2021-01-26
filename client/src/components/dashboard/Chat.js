import React, { useEffect, useState, useRef } from "react";
import { connectSocket, disconnectSocket } from "../../actions/chatActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

import {
    Container, 
    Typography,
    Paper,
    InputBase,
    IconButton,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    root: {
        margin: 10,
        height: '88vh',
        position: 'relative'
    },
    chatHeader: {
        backgroundColor: theme.palette.primary.main,
        padding: 15
    },
    container: {
        position: 'absolute',
        bottom: 0,
        
        display: 'flex',
        width: '100%'
    },
    input: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: 10,
        padding: 3
    },
    divider: {
        height: 30,
        margin: 10
    },
    textfield: {
        marginLeft: 10,
        width: '100%'
    },
    button: {
        
    }
}));

function Chat(props) {
    const mounted = useRef();
    const classes = useStyles();

    useEffect(() => {
        if(!mounted.current) {
            //props.connectSocket();
            mounted.current = true;
        } else {

        }
        
        return () => {
            //props.disconnectSocket();
        }
    }, []);


    return(
        <Container maxWidth="md">
            <div className={classes.toolbar} />
            <Paper 
                className={classes.root}
                variant='outlined'
            >
                <div className={classes.chatHeader}>
                    <Typography style={{color:'white'}}> {props.contact.name} </Typography>
                </div>

                <form className={classes.container} >
                    <Paper className={classes.input}>
                        <InputBase 
                            placeholder='Enter Message...'
                            className={classes.textfield}
                        />

                        <Divider orientation='vertical' className={classes.divider} />

                        <IconButton color='primary' className={classes.button} >
                            <ArrowRightRoundedIcon />
                        </IconButton>
                    </Paper>
                </form>
            </Paper>
        </Container>
    );
} 

const mapStateToProps = state => ({
    socket: state.chat.socket
});

Chat.propTypes = {
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
    socket: PropTypes.object
}

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (Chat);