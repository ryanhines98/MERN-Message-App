import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAccount, updateEmail, setErrors } from "../../actions/userActions";

import { 
    Container,
    Typography,
    Grid,
    Paper,
    Avatar, 
    Divider,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    IconButton,
    TextField
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '1rem 5rem',
        display: 'flex',
        flexFlow: 'column'
    },
    row: {
        display: 'flex', 
        justifyContent: 'center',
        marginBottom:10
    },
    error: {
        color: 'red'
    }
}));

function Account(props) {
    const classes = useStyles();
    const mounted = useRef();

    const prevEmail = useRef();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(false);
    const [email, setEmail] = useState('');

    const handleDelete = () => {
        props.deleteAccount();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.updateEmail(email);
        props.setErrors({});
    }

    useEffect(() => {
        if(!mounted.current){
            prevEmail.current = props.user.email;
            mounted.current = true;
        } else {
            if(prevEmail.current !== props.user.email) {
                setInput(false);
                prevEmail.current = props.user.email;
            }
        }
    }, [props.user]);
    

    return(
        <Container>
            <Grid 
                container 
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}  
            >
                <Grid item xs={12}>
                    <div>
                        <IconButton href='/dashboard' edge='start'>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography 
                            display='inline' 
                            style={{
                                position: 'relative',
                                top: 2
                            }}
                        >
                            Back to Dashboard
                        </Typography>
                    </div>

                    <Paper
                        variant='outlined'
                        className={classes.paper}
                    >
                        <div className={classes.row}>
                            <Avatar />
                        </div>
                        <Typography className={classes.row}> {props.user.name} </Typography>

                        <Divider style={{ marginBottom: 10 }}/>

                        <div className={classes.row}>
                            <Typography> Email: {props.user.email} </Typography>

                            {!input && 
                                <Button 
                                    size='small' 
                                    variant='outlined'
                                    style={{ 
                                        marginLeft: 10,
                                        position: 'relative',
                                        bottom:2
                                    }}
                                    onClick={() => setInput(true)}
                                >
                                    Change
                                </Button>
                            }
                        </div>

                        { input && 
                            <div className={classes.row}>
                                <div style={{ flexDirection: 'column' }}>
                                    <form onSubmit={onSubmit}>
                                        <TextField
                                            variant='outlined'
                                            placeholder='Enter New Email...'
                                            size='small'
                                            onChange={(e) => { e.preventDefault(); setEmail(e.target.value)}}
                                            error={ props.errors.email }
                                        />
                                    </form>

                                    <div className={classes.error}>
                                        {props.errors.email}
                                    </div>
                                </div>
                            </div>
                        }

                        <div style={{ height: '3rem' }} />

                        <Button 
                            variant='contained'
                            color='secondary'
                            onClick={ e => setOpen(true) }
                        > 
                            Delete Account 
                        </Button>

                    </Paper>


                    {/* Display for Account Delete */}
                    <Dialog
                        open={open}
                        disableBackdropClick
                        onClick={ (e) => e.stopPropagation() }
                    >
                        <DialogTitle>
                            {"Delete Account?"}
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Are you sure you would like to delete your account?
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={(e) => handleDelete(e)} color='primary'>
                                Yes
                            </Button>

                            <Button onClick={ e => setOpen(false) } color='primary'>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>

                </Grid>
            </Grid>
        </Container>
    );
}

Account.propTypes = {
    user: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,
    errors: PropTypes.object,
    setErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors
});

export default 
connect(
    mapStateToProps,
    { deleteAccount, updateEmail, setErrors }
)(Account);