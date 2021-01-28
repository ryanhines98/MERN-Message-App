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
        // position: 'absolute',
        // bottom: 0,
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
        flex: '1 1 auto'
        //height: '100%'
    },
    message: {
        margin: 20
    }
}));

function Chat(props) {
    const mounted = useRef();
    const classes = useStyles();

    const [message, setMessage] = useState('');
    const [messageItems, setMessageItems] = useState([]);

    useEffect(() => {
        if(!mounted.current) {

            props.socket.on('message', function(data) {
                console.log(data);
            });

            mounted.current = true;
        } else {

        }
        
    }, [messageItems]);

    const onChange = (e) => {
        setMessage(e.target.value);
    }

    const onSubmit = (e) => {
        if(e.type === "click" || e.key === "Enter") {
            let arr = [...messageItems];
            arr.push(message);
            setMessageItems(arr);
            setMessage('');
            props.socket.emit('message', props.contact._id, message);
        }
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
                        messageItems.map( (item, index) => 
                            <div key={index + 1} className={classes.message}>
                                <Paper 
                                    variant='outlined' 
                                    component='span'
                                    style={{ 
                                        padding: 5
                                    }}
                                >
                                    {item}
                                </Paper>
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
    socket: state.chat.socket
});

Chat.propTypes = {
    socket: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps
) (Chat);