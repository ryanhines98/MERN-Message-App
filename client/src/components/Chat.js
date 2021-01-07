import React, { Component } from "react";
import { connectSocket, disconnectSocket } from "../actions/chatActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        this.props.connectSocket();
    }

    componentWillUnmount() {
        this.props.disconnectSocket();
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('entered submit');
        this.props.socket.emit('message', this.state.message);
    }

    render() {

        return(
            <div>
                <h1> CHAT </h1>
                <form onSubmit={this.onSubmit} >
                    <input
                        onChange={this.onChange}
                        value={this.state.message}
                        id="message"
                    />
                    <button
                        type="submit"
                    >
                    Send
                    </button>
                </form>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    socket: state.chat.socket
});

Chat.propTypes = {
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired,
    socket: PropTypes.object
}

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (Chat);