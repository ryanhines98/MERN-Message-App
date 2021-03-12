import React from "react";

import {
  Container,
  Grid,
  Typography,
  Button,
  Box
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
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      },
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        flexFlow: 'column'
      }
    },
    button: {
      [theme.breakpoints.down('xs')]: {
        marginTop: 10
      }
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
          <Typography component='div'> 
            <Box 
              textAlign='center'
              fontSize='h4.fontSize'
            >
              Welcome to MERN-Messaging <MessageIcon fontSize='large' color='primary' />
            </Box>
          </Typography>

          <div className={classes.paper}>
            <div className={classes.buttons}>
                <Button
                  variant='contained'
                  href='/login'
                  color= 'primary'
                  size='large'
                >
                  Login
                </Button>

                <Button
                  variant='contained'
                  href='/register'
                  color= 'primary'
                  size='large'
                  className={classes.button}
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