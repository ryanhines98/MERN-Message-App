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
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 15,
            marginTop: 5
        }
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
        height: 25
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
        marginTop: 10
    },
    msgTo: {
        width: '50%',
        float: 'right',
        marginRight: 10
    },
    msgFrom: {
        width: '50%',
        float: 'left',
        marginLeft: 10
    },
    message: {
        padding: '0.1em 0.8em',
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
        // component did mount
        if(!mounted.current) {
            mounted.current = true;
        } else {
        // makes scroll bar keep at bottom
        // as messages get added
            scrollToBottom();
        }
    }, [messages]);

    // on contact change, clear the messages
    useEffect(() => {
        if(mounted.current) setMessages([]); 
    }, [props.contact]);

    // set previous messages received from database
    useEffect(() => {
        if(props.messages) setMessages(props.messages.reverse());
    }, [props.messages]);

    // if the socket has been initiated add message receive event
    useEffect(() => {
        if( Object.keys(props.socket).length !== 0 ) {
            props.socket.on('message', function(msg) {
                addMessage(msg);
            });
        }
    }, [props.socket]);



    // makes scroll bar follow the msgBttm reference
    // to keep it at the bottom when messages are added and 
    // extend window downward
    const scrollToBottom = () => {
        msgBttm.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    // for submitting messages
    const onSubmit = (e) => {
        // if a contact is chosen or chat is not empty, 
        // the message is not whitespace,
        // and it is the button click or 'enter' key, 
        // do message submission
        if( props.contact._id && 
            /\S/.test(message) &&
            (e.type === "click" || e.key === "Enter") 
        ) {
            console.log(message);
            const msg = {
                conversation: props.contact.conversation,
                sender: props.userid,
                text: message
            };
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
            <Container maxWidth="sm" className={classes.container}>
                <div className={classes.toolbar} />
                <Paper 
                    className={classes.root}
                    variant='outlined'
                >
                    <div className={classes.chatHeader}>
                        <Typography style={{color:'white'}}> { props.contact.name } </Typography>
                    </div>

                    <Paper
                        className={classes.chat}
                        variant='outlined'
                    >
                        { 
                            messages.map( (msg, index) => 
                                <div key={index} className={classes.msgContainer}>  
                                    <div className={ (props.userid === msg.sender) ? classes.msgTo : classes.msgFrom }>
                                        <Paper 
                                            elevation={3}
                                            component='span'
                                            className={classes.message}
                                        >
                                            <Typography className={classes.msgContent}>{msg.text}</Typography>
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
    userid: state.auth.user.id,
    contact: state.chat.currentContact,
    messages: state.chat.messages
});

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    messages: PropTypes.array
}

export default connect(
    mapStateToProps
) (Chat);