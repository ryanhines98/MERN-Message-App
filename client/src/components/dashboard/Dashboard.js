import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket } from "../../actions/chatActions";

 class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        };
    }

    changeContact = (selectContact) => {
        this.setState({ contact: selectContact });
    }

    componentDidMount() {
        this.props.connectSocket();
        const contacts = document.getElementById('contacts');
        console.log(contacts.clientWidth);
    }

    componentWillUnmount() {
        this.props.disconnectSocket();
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Contacts contacts={this.props.contacts} changeContact={this.changeContact} />
                { !(Object.keys(this.state.contact).length === 0) ? <Chat contact={this.state.contact} /> : null }
            </div>
        );
    }

}

Dashboard.propTypes = {
    contacts: PropTypes.array.isRequired,
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    contacts: state.auth.user.contacts
});

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (Dashboard);