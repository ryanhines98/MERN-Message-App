import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket } from "../../actions/chatActions";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
    return({
        toolbar: theme.mixins.toolbar,
        button: {
            position: 'absolute',
            zIndex: theme.zIndex.drawer+1
        }
    });
}

 class Dashboard extends Component {

    componentDidMount() {
        this.props.connectSocket();
        if(this.props.currentContact)
            this.setState({ contact: this.props.currentContact });
    }

    componentWillUnmount() {
       this.props.disconnectSocket();
    }

    render() {
        //const {classes} = this.props;
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Contacts />
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