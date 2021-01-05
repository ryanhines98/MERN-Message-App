import React, { Component } from "react";
import { connectSocket, disconnectSocket } from "../actions/chatActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";


class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.connectSocket();
    }

    componentWillUnmount() {
        this.props.disconnectSocket();
    }

    render() {

        return(
            <div>
                <h1> CHAT </h1>
            </div>
        )
    }
} 

Chat.propTypes = {
    connectSocket: PropTypes.func.isRequired,
    disconnectSocket: PropTypes.func.isRequired
}

export default connect(
    null,
    { connectSocket, disconnectSocket }
) (Chat);