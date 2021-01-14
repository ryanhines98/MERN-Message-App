import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import {    ListSubheader, 
            Typography, 
            IconButton,
            Avatar,
            Drawer,
            List,
            ListItem,
            ListItemText,
            ListItemAvatar,
            Divider,
            Dialog,
            DialogTitle,
            DialogContent,
            DialogContentText,
            TextField,
            DialogActions,
            Button
        } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
    drawer: {
        width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    list: {
        backgroundColor: theme.palette.background.paper
    },
    item: {
        width: 350
    },
    subheader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        display: 'inline',
        fontSize: '1.5em'
    }
}));

function Contacts() {
    const classes = useStyles();
    const contacts = [];
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
    setOpen(false);
    };

    for(let i = 0; i < 50; i++) {
        contacts.push(
        <ListItem button divider className={classes.item}>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText 
                primary='Ryan Hines'
                secondary='ello govna'
            />
        </ListItem>);
    }

    return(
        <Drawer
                className={classes.drawer}
                variant='permanent'
        >
            <div className={classes.toolbar} />
                <List className={classes.list}>
                    <ListSubheader className={classes.subheader}>

                        <Typography className={classes.title} variant='span'>
                            CONTACTS
                        </Typography>

                        <IconButton 
                            color='secondary'
                            onClick={handleClickOpen}
                        >
                            <AddIcon/>
                        </IconButton>

                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle> Add Contact </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Enter Desired User's ID to Add
                                </DialogContentText>

                                <TextField
                                    margin="normal"
                                    id="userid"
                                    label="User ID"
                                    variant="filled"
                                    fullWidth
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color='secondary'>
                                    Cancel
                                </Button>
                                <Button onClick={handleClose} color="secondary">
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </ListSubheader>
                    <Divider />
                    { contacts }
                </List>
        </Drawer>
    );

}

export default Contacts;