import React from "react";

import {
  Container,
  Grid,
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