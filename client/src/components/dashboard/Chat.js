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
    container: {
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
        flexFlow: 'column'
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
    }
}));

function Chat(props) {
    const mounted = useRef();
    const classes = useStyles();

    const [message, setMessage] = useState('');
    const [messageItems, _setMessageItems] = useState([]);
    const msgRef = useRef(messageItems);

    useEffect(() => {
        if(!mounted.current) {

            props.socket.on('message', function(msg) {
                console.log('received message');
                addMessageItem(msg);
                console.log(msgRef);
            });

            mounted.current = true;
        } else {

        }
        
    }, [messageItems] );

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        if(e.type === "click" || e.key === "Enter") {

            const msg = {
                id: props.userid,
                content: message
            }

            addMessageItem(msg);
            setMessage('');
            props.socket.emit('message', props.contact._id, msg);
        }
    }

    const setMessageItems = (arr) => {
        msgRef.current = arr;
        _setMessageItems(arr);
    }

    const addMessageItem = (msg) => {
        let arr = [...msgRef.current];
        arr.push(msg);
        setMessageItems(arr);
    }

    return(
        <Container maxWidth="md" className={classes.box}>
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
                        messageItems.map( (msg, index) => 
                            <div key={index + 1} className={classes.msgContainer}>  
                                <div className={ (props.userid === msg.id) ? classes.msgTo : classes.msgFrom }>
                                    <Paper 
                                        variant='outlined'
                                        component='span'
                                        style={{ 
                                            padding: 5,
                                            float: 'inherit'
                                        }}
                                    >
                                        <Typography style={{ wordWrap: 'break-word' }}>{msg.content}</Typography>
                                    </Paper>
                                </div>
                            </div>
                        )
                    }
                </Paper>

                <div className={classes.container}>
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