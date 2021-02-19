import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import { 
        Container,
        Grid,
        Paper,
        IconButton,
        Typography,
        TextField,
        Link,
        Button
    } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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

function Register(props) {

    const mounted = useRef();
    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
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
        const newUser = {
            name: name,
            email: email,
            password: password,
            password2: password2
        };
        console.log(newUser);
        props.registerUser(newUser, props.history); 
    };

    return(
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
                            <Typography 
                                display='inline'
                                style={{
                                    position: 'relative',
                                    top: 2
                                }}
                            >
                                Back to Home
                            </Typography>
                        </div>

                        <Typography variant='h2'>
                            Register
                        </Typography>
                        <Typography>
                            Already Have an Account? <Link href='/login'>Login</Link>
                        </Typography>

                        <form onSubmit={onSubmit}>

                            <TextField
                                variant='standard'
                                label='Name'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setName(e.target.value)} }
                                id='name'
                                value={name}
                                error={errors.name}
                            />
                            <span className={classes.error}>
                                {errors.name}
                            </span>

                            <TextField
                                variant='standard'
                                label='Email'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setEmail(e.target.value)} }
                                id='email'
                                value={email}
                                error={errors.email}
                            />
                            <span className={classes.error}>
                                {errors.email}
                            </span>

                            <TextField
                                variant='standard'
                                label='Password'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setPassword(e.target.value)} }
                                id='password'
                                value={password}
                                error={errors.password}
                                type='password'
                            />
                            <span className={classes.error}>
                                {errors.password}
                            </span>

                            <TextField
                                variant='standard'
                                label='Enter Password Again'
                                fullWidth
                                onChange={ (e)=> {e.preventDefault(); setPassword2(e.target.value)} }
                                id='password2'
                                value={password2}
                                error={errors.password2}
                                type='password'
                            />
                            <span className={classes.error}>
                                {errors.password2}
                            </span>

                            <Button 
                                variant='contained'
                                color='primary'
                                className={classes.button}
                                type='submit'
                            >
                                Sign Up
                            </Button>

                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(
    mapStateToProps,
    { registerUser }
) (withRouter(Register));