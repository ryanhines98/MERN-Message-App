import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket } from "../../actions/chatActions";
import { withStyles } from "@material-ui/core/styles";

import {
    Button
} from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';

const styles = (theme) => {
    return({
        toolbar: theme.mixins.toolbar,
        bttnCtn: {
            position: 'absolute',
            zIndex: theme.zIndex.drawer
        },
        button: {
            marginTop: 10,
            right: 5
        }
    });
}

 class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
    }

    componentDidMount() {
        this.props.connectSocket();
        if(this.props.currentContact)
            this.setState({ contact: this.props.currentContact });
    }

    componentWillUnmount() {
       this.props.disconnectSocket();
    }

    setDrawer = () => {
        this.setState({ drawerOpen: !(this.state.drawerOpen) });
    }

    render() {
        const {classes} = this.props;
        return (
            <div style={{ height: '100%', position: 'relative' }}>

                {/* Contacts Drawer Open Button */}
                <div className={classes.bttnCtn}>
                    <div className={classes.toolbar}/>
                    <Button 
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        size='large'
                        disableElevation
                        onClick={ this.setDrawer }
                    >
                        <RecentActorsIcon />
                    </Button>
                </div>

                <Contacts open={this.state.drawerOpen} setDrawer={this.setDrawer} />
                <Chat />

            </div>
        );
    }
}

Dashboard.propTypes = {
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
    currentContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentContact: state.chat.currentContact,
    socket: state.chat.socket
});

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (withStyles(styles)(Dashboard));