import React, { useState } from 'react';
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
    DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAccount } from "../../actions/userActions";

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
    }
}));

function Account(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        console.log('handle delete');
        props.deleteAccount();
    }

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
                    <Paper
                        variant='outlined'
                        className={classes.paper}
                    >
                        <div className={classes.row}>
                            <Avatar />
                        </div>
                        <Typography className={classes.row}> {props.user.name} </Typography>
                        <Divider style={{ marginBottom: 10 }}/>
                        <Typography className={classes.row}> Email: {props.user.email} </Typography>

                        <div style={{ height: '3rem' }} />

                        <Button 
                            variant='contained'
                            color='secondary'
                            onClick={ e => setOpen(true) }
                        > 
                            Delete Account 
                        </Button>
                    </Paper>

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
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default 
connect(
    mapStateToProps,
    { deleteAccount }
)(Account);