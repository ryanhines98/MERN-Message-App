import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket, setCurrentContact } from "../../actions/chatActions";

 class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }
    }

    changeContact = (selectContact) => {
        this.props.setCurrentContact(selectContact);
        this.setState({ contact: selectContact });
    }

    componentDidMount() {
        this.props.connectSocket();
        if(this.props.currentContact)
            this.setState({ contact: this.props.currentContact });
    }

    componentWillUnmount() {
       this.props.disconnectSocket();
    }

    render() {
        return (
            <div style={{ height: '100%', position: 'relative' }}>
                <Contacts contacts={this.props.contacts} changeContact={this.changeContact} />
                { !(Object.keys(this.state.contact).length === 0) ? <Chat /> : null }
            </div>
        );
    }

}

Dashboard.propTypes = {
    contacts: PropTypes.array.isRequired,
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
    setCurrentContact: PropTypes.func.isRequired,
    currentContact: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    contacts: state.auth.user.contacts,
    currentContact: state.chat.currentContact,
    socket: state.chat.socket
});

export default connect(
    mapStateToProps,
    { 
        connectSocket, 
        disconnectSocket,
        setCurrentContact
     }
) (Dashboard);