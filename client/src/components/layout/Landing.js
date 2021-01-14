import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  Container,
  Grid,
  Paper,
  Typography,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '1rem 7rem',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10
    },
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
    },
    button: {

    }
}));

function Landing() {
  const classes = useStyles();

  return (
      // <div style={{ height: "75vh" }} className="container valign-wrapper">
      //   <div className="row">
      //     <div className="col s12 center-align">

      //       <h4>
      //         <b>Build</b> a login/auth app with the{" "}
      //         <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
      //         scratch
      //       </h4>

      //       <p className="flow-text grey-text text-darken-1">
      //         Create a (minimal) full-stack app with user authentication via
      //         passport and JWTs
      //       </p>

      //       <br />

      //       <div className="col s6">
      //         <Link
      //           to="/register"
      //           style={{
      //             width: "140px",
      //             borderRadius: "3px",
      //             letterSpacing: "1.5px"
      //           }}
      //           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //         >
      //           Register
      //         </Link>
      //       </div>

      //       <div className="col s6">
      //         <Link
      //           to="/login"
      //           style={{
      //             width: "140px",
      //             borderRadius: "3px",
      //             letterSpacing: "1.5px"
      //           }}
      //           className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //         >
      //           Log In
      //         </Link>
      //       </div>

      //     </div>
      //   </div>
      // </div>

    <Container maxWidth='md'>
      <Grid 
        container 
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}  
      >
        <Grid item xs={12}>
          <Typography variant='h4'>
            Welcome to MERN-Messaging <MessageIcon fontSize='large' color='primary' />
          </Typography>

          <div className={classes.paper}>
            <div className={classes.buttons}>
                <Button
                  className={classes.button}
                  variant='contained'
                  href='/login'
                  color= 'primary'
                  size='large'
                >
                  Login
                </Button>

                <Button
                  className={classes.button}
                  variant='contained'
                  href='/register'
                  color= 'primary'
                  size='large'
                >
                  Register
                </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
    
  );
}
export default Landing;