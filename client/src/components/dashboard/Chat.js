import React, { useEffect, useState, useRef } from "react";

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

    box: {
        height: '100%',
        display: 'flex',
        zIndex: theme.zIndex.drawer
    },
    container: {
        display: 'flex',
        flexFlow: 'column',
        height: '100%'
    },
    root: {
        margin: 10,
        position: 'relative',
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column'
    },
    chatHeader: {
        backgroundColor: theme.palette.primary.main,
        padding: 15,
    },
    inputContainer: {
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
    chat: {
        margin: 10,
        flex: '1 1 auto',
        display: 'flex',
        flexFlow: 'column',
        overflowY: 'scroll',
        height: 10
    },
    msgContainer: {
        margin: 5
    },
    msgTo: {
        width: '50%',
        float: 'right'
    },
    msgFrom: {
        width: '50%',
        float: 'left'
    },
    message: {
        padding: 5,
        float: 'inherit',
        backgroundColor: theme.palette.primary.main
    },
    msgContent: {
        color: theme.palette.background.paper
    }
}));

function Chat(props) {
    const mounted = useRef();
    const classes = useStyles();

    const [message, setMessage] = useState('');
    const [messages, _setMessages] = useState([]);

    const msgsRef = useRef(messages);
    const msgBttm = useRef(null);

    useEffect(() => {
        if(!mounted.current) {
            props.socket.on('message', function(msg) {
                addMessage(msg);
            });
            mounted.current = true;
        } else {
            scrollToBottom();
        }
    }, [messages] );

    const scrollToBottom = () => {
        msgBttm.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        if(e.type === "click" || e.key === "Enter") {
            const msg = {
                id: props.userid,
                content: message
            }
            addMessage(msg);
            setMessage('');
            props.socket.emit('message', props.contact._id, msg);
        }
    }

    const setMessages = (arr) => {
        msgsRef.current = arr;
        _setMessages(arr);
    }

    const addMessage = (msg) => {
        let arr = [...msgsRef.current, msg];
        setMessages(arr);
    }

    return(
        <div className={classes.box}>
            {/* <div style={{ height: '100%', width: 200}} /> */}
            <Container maxWidth="sm" className={classes.container}>
                <div className={classes.toolbar} />
                <Paper 
                    className={classes.root}
                    variant='outlined'
                >
                    <div className={classes.chatHeader}>
                        <Typography style={{color:'white'}}> {props.contact.name} </Typography>
                    </div>

                    <Paper
                        className={classes.chat}
                        variant='outlined'
                    >
                        { 
                            messages.map( (msg, index) => 
                                <div key={index} className={classes.msgContainer}>  
                                    <div className={ (props.userid === msg.id) ? classes.msgTo : classes.msgFrom }>
                                        <Paper 
                                            elevation={3}
                                            component='span'
                                            className={classes.message}
                                        >
                                            <Typography className={classes.msgContent}>{msg.content}</Typography>
                                        </Paper>
                                    </div>
                                </div>
                            ) 
                        }
                        <div ref={msgBttm} />
                    </Paper>

                    <div className={classes.inputContainer}>
                        <Paper className={classes.input}>
                            <InputBase 
                                placeholder='Enter Message...'
                                className={classes.textfield}
                                value={message}
                                onChange={onChange}
                                onKeyPress={onSubmit}
                            />

                            <Divider orientation='vertical' className={classes.divider} />

                            <IconButton 
                                color='primary'
                                onClick={onSubmit}
                            >
                                <ArrowRightRoundedIcon />
                            </IconButton>
                        </Paper>
                    </div>
                </Paper>
            </Container>
        </div>
    );
} 

const mapStateToProps = state => ({
    socket: state.chat.socket,
    userid: state.auth.user.id
});

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps
) (Chat);