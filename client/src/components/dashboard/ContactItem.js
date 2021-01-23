import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {    
    Button,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Paper,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Popover
} from "@material-ui/core";

import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    item: {
        width: '18rem'
    }
}));


function ContactItem(props) {
    const classes = useStyles();

    const [optionOpen, setOptionOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    // handler for contact options
    const contactOptions = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('contact options');
        setAnchorEl(e.currentTarget);
        setOptionOpen(true);
    }

    const handleClose = (e) => {
        setAnchorEl(null);
        setOptionOpen(false);
    }

    // handler for contact click
    const contactClick = (e) => {
        e.preventDefault();
        console.log('contact click');
    }

    const id = optionOpen ? 'simple-popover' : undefined;

    return(
        <ListItem 
            button 
            disableRipple={true}
            onClick={e => contactClick(e)}
            divider 
            className={classes.item}
        >
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText 
                primary={props.name}
            />

            <Button
                onClick={e => contactOptions(e)}
                aria-describedby={id}
            >
                <MoreVertIcon/>
            </Button>

            <Popover
                id={id}
                open={optionOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList 
                            autoFocusItem={optionOpen} 
                        >
                            <MenuItem onClick={handleClose}>Delete Contact</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popover>

        </ListItem>
    );
}

export default ContactItem;