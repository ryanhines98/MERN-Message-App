import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import {    Container, 
            Button,  
            Typography,
            IconButton,
            Link,
            Paper,
            TextField,
            Grid
        } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: 30
    },
    error: {
        color: 'red'
    },
    button: {
        marginTop: 15,
        width: '100%'
    }
}));

function Login(props) {

    const mounted = useRef();
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(!mounted.current) {
            if (props.auth.isAuthenticated) props.history.push("/dashboard");
            mounted.current = true;
        } else {
            if (props.auth.isAuthenticated) props.history.push("/dashboard");

            if (props.errors) {
                setErrors(props.errors);
            }
        }
    }, [
        props.auth.isAuthenticated,
        props.errors,
        props.history
    ]);

    const onSubmit = e => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        props.loginUser(userData);
    };

    return (
        <Container maxWidth="sm">
            <Grid 
                container 
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh'}}  
            >
                <Grid item xs={12}>
                    <Paper variant='outlined' className={classes.paper}>
                        <div>
                            <IconButton href='/' edge='start'>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography display='inline'>
                                Back to Home
                            </Typography>
                        </div>

                        <Typography variant='h2'>
                            Login
                        </Typography>
                        <Typography>
                            Don't Have an Account? <Link href='/register'>Register</Link>
                        </Typography>


                        <form onSubmit={onSubmit}>
                            <TextField
                                variant='standard'
                                label='Email'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setEmail(e.target.value)} }
                                id='email'
                                value={email}
                                error={errors.email || errors.emailnotfound}
                            />
                            <span className={classes.error}>
                                {errors.email}
                                {errors.emailnotfound}
                            </span>

                            <TextField
                                variant='standard'
                                label='Password'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setPassword(e.target.value)} }
                                id='password'
                                value={password}
                                error={errors.password || errors.passwordincorrect}
                                type='password'
                            />
                            <span className={classes.error}>
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>

                            <Button 
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                type='submit'
                            >
                                Login
                            </Button>

                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
) (Login);