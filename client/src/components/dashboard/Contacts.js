import React, { Component } from "react";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper
    }
}));

function Contacts() {
    const classes = useStyles();

    return(
        <List className={classes.root}>

            <ListItem divider >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText 
                    primary='Ryan Hines'
                    secondary='ello govna'
                />
            </ListItem>

            <ListItem divider >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                </ListItemAvatar>
                <ListItemText 
                    primary='Ryan Hines'
                    secondary='ello govna'
                />
            </ListItem>

        </List>
    );

}

export default Contacts;