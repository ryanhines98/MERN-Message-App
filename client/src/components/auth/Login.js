import React, { useState, useEffect, useRef } from "react";
//import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

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

    // componentDidMount() {
    //     // If logged in and user navigates to Login page, should redirect them to dashboard
    //     if (this.props.auth.isAuthenticated) {
    //       this.props.history.push("/dashboard");
    //     }
    // }

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

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.auth.isAuthenticated) {
    //       props.history.push("/dashboard"); // push user to dashboard when they login
    //     }

    //     if (nextProps.errors) {
    //         this.setState({
    //           errors: nextProps.errors
    //         });
    //       }
    // }

    // const onChange = e => {
    //     setState({ [e.target.id]: e.target.value });
    // };

    const onSubmit = e => {
        e.preventDefault();
        const userData = {
            email,
            password
        };
        props.loginUser(userData);
    };

    return (
        // <div className="container">
        //     <div style={{ marginTop: "4rem" }} className="row">
        //         <div className="col s8 offset-s2">

        //             <Link to="/" className="btn-flat waves-effect">
        //                 <i className="material-icons left">keyboard_backspace</i> Back to
        //                 home
        //             </Link>

        //             <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        //                 <h4>
        //                     <b>Login</b> below
        //                 </h4>
        //                 <p className="grey-text text-darken-1">
        //                     Don't have an account? <Link to="/register">Register</Link>
        //                 </p>
        //             </div>

        //             <form noValidate onSubmit={this.onSubmit}>
        //                 <div className="input-field col s12">
        //                     <input
        //                         onChange={this.onChange}
        //                         value={this.state.email}
        //                         error={errors.email}
        //                         id="email"
        //                         type="email"
        //                         className={classnames("", {
        //                             invalid: errors.email || errors.emailnotfound
        //                         })}
        //                     />
        //                     <label htmlFor="email">Email</label>
        //                     <span className="red-text">
        //                         {errors.email}
        //                         {errors.emailnotfound}
        //                     </span>
        //                 </div>

        //                 <div className="input-field col s12">
        //                     <input
        //                         onChange={this.onChange}
        //                         value={this.state.password}
        //                         error={errors.password}
        //                         id="password"
        //                         type="password"
        //                         className={classnames("", {
        //                             invalid: errors.password || errors.passwordincorrect
        //                         })}
        //                     />
        //                     <label htmlFor="password">Password</label>
        //                     <span className="red-text">
        //                         {errors.password}
        //                         {errors.passwordincorrect}
        //                     </span>
        //                 </div>

        //                 <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        //                     <button
        //                         style={{
        //                             width: "150px",
        //                             borderRadius: "3px",
        //                             letterSpacing: "1.5px",
        //                             marginTop: "1rem"
        //                         }}
        //                         type="submit"
        //                         className="btn btn-large waves-effect waves-light hoverable blue accent-3"
        //                     >
        //                     Login
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>
        
            <Container className={classes.container} maxWidth="sm">
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