import React, { Component, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Contacts from './Contacts';
import Chat from './Chat';
import { connectSocket, disconnectSocket } from "../../actions/chatActions";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
    Button
} from "@material-ui/core";
import RecentActorsIcon from '@material-ui/icons/RecentActors';

// const styles = (theme) => {
//     return({
//         toolbar: theme.mixins.toolbar,
//         bttnContainer: {
//             position: 'absolute',
//             zIndex: theme.zIndex.drawer
//         },
//         button: {
//             marginTop: 10,
//             right: 5
//         }
//     });
// }

// class Dashboard extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             drawerOpen: false
//         }
//     }

//     componentDidMount() {
//         this.props.connectSocket();
//         if(this.props.currentContact)
//             this.setState({ contact: this.props.currentContact });
//     }

//     componentWillUnmount() {
//        this.props.disconnectSocket();
//     }

//     setDrawer = () => {
//         this.setState({ drawerOpen: !(this.state.drawerOpen) });
//     }

//     render() {
//         const {classes} = this.props;
//         // const theme = useTheme();
//         // const matches = useMediaQuery('(min-width:600px)');

//         return (
//             <div style={{ height: '100%', position: 'relative' }}>

//                 {/* Contacts Drawer Open Button */}
//                 <div className={classes.bttnContainer}>
//                     <div className={classes.toolbar}/>
//                     <Button 
//                         className={classes.button}
//                         variant='contained'
//                         color='primary'
//                         size='large'
//                         disableElevation
//                         onClick={ this.setDrawer }
//                     >
//                         <RecentActorsIcon />
//                     </Button>
//                 </div>

//                 <Contacts open={this.state.drawerOpen} setDrawer={this.setDrawer} />
//                 <Chat />

//             </div>
//         );
//     }
// }

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    bttnContainer: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer
    },
    button: {
        marginTop: 10,
        right: 5
    }
}));

function Dashboard(props) {
    const mounted = useRef();
    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);


    useEffect(() => {
        if(!mounted.current) {
            props.connectSocket();
            mounted.current = true;
        } 
        return(() => {
            props.disconnectSocket();
        })
    },[]);

    const setDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    return (
        <div style={{ height: '100%', position: 'relative' }}>

            {/* Contacts Drawer Open Button */}
            <div className={classes.bttnContainer}>
                <div className={classes.toolbar}/>
                <Button 
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    size='large'
                    disableElevation
                    onClick={ setDrawer }
                >
                    <RecentActorsIcon />
                </Button>
            </div>

            <Contacts open={drawerOpen} setDrawer={setDrawer} />
            <Chat />

        </div>
    );

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

// export default connect(
//     mapStateToProps,
//     { connectSocket, disconnectSocket }
// ) (withStyles(styles)(Dashboard));

export default connect(
    mapStateToProps,
    { connectSocket, disconnectSocket }
) (Dashboard);