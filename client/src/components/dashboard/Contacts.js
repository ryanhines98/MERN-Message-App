import React, { Component } from "react";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {    ListSubheader, 
            Typography, 
            Box,
            IconButton,
            Avatar,
            Drawer
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
                        <Typography className={classes.title} variant=''>
                            CONTACTS
                        </Typography>
                        <IconButton >
                            <AddIcon/>
                        </IconButton>
                    </ListSubheader>
                    <Divider />
                    { contacts }
                </List>
        </Drawer>
    );

}

export default Contacts;