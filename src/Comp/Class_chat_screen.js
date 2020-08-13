import React, { Component } from "react";
import { GiftedChat, Bubble } from "react-web-gifted-chat";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


class ClassChatScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      messages: [],
      user: {
        id: props.uid,
      },
      isAuthenticated: true,
    };
  }

  componentDidMount() {
    this.loadMessages();
  }

  loadMessages () {
    let ref = firebase.database().ref("/" + this.props.title + "/messages/");
    ref.on("child_added", snap => {
      const message = snap.val();
      message.id = snap.key;
      const { messages } = this.state;
      messages.push(message);
      this.setState(
        {
          messages
        },console.log(this.state)
      );
    });
  }

  onSend(messages) {
    for (const message of messages) {
      //message = message + {"imgae":""}
      this.saveMessage(message);
    }
  }

  saveMessage(message) {
    return firebase
      .database()
      .ref("/" + this.props.title + "/messages/")
      .push(message)
      .catch(function(error) {
        console.error("Error saving message to Database:", error);
      });
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    )
    }

  renderSignOutButton() {
    if (this.state.isAuthenticated) {
      return <Button /*onClick={() => this.signOut()}*/>Sign out</Button>;
    }
    return null;
  }

  renderChat() {
    return (
      <GiftedChat
        user={this.state.user}
        messages={this.state.messages.slice().reverse()}
        onSend={messages=> this.onSend(messages)}
        scrollToBottom
        renderBubble={this.renderBubble}
      />
    );
  }

  renderChannels() {
    return (
      <List>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>D</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Default" />
        </ListItem>
      </List>
    );
  }

  renderChannelsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Channels
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  renderChatHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  renderSettingsHeader() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Settings
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.chat}>
          {this.renderChatHeader()}
          {this.renderChat()}
        </div>
        <div style={styles.settings}>
          {this.renderSettingsHeader()}
          {this.renderSignOutButton()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  chat: {
    display: "flex",
    flex: 3,
    flexDirection: "column",
    borderWidth: "1px",
    borderColor: "#ccc",
    borderRightStyle: "solid",
    borderLeftStyle: "solid",
  },
  settings: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
};
export default ClassChatScreen;
//ReactDOM.render(<App />, document.getElementById("root"));