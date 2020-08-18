import React, { Component, useState } from "react";
import { GiftedChat, Bubble } from "react-web-gifted-chat";
import "firebase/storage";
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
      messages: [{
        text: '',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          id: 2,
          name: 'React',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: "",
        
      }],
      user: {
        id: props.uid,
      },
      isAuthenticated: true,
      image:null,
      progress:"",
      url:""
    };
  }

  componentDidMount() {
    this.loadMessages();
  }
  //加载消息
  loadMessages () {
    let ref = firebase.database().ref("/" + this.props.title + "/messages/");
    ref.on("child_added", snap => {
      const message = snap.val();
      message.id = snap.key;
      if(message.createdAt)
      {
        message.createdAt = new Date(message.createdAt)
      }
      const messages = this.state.messages;
      messages.push(message);
      this.setState(
        {
          messages:messages
        }
      );
    });
  }
  //发出消息
  onSend(messages) {
    console.log(messages)
    for (var message of messages) {
      message.createdAt = JSON.stringify(new Date()).replace(/['"]+/g, '')
      this.saveMessage(message);
    }
  }
  //以message形式保存图片在实时数据库中
  saveImage(url){
    let image_message = {
      text: '',
      createdAt: new Date(),
      user: {},
      image: url,
  }
    image_message.user = this.state.user
    console.log(image_message)
    this.saveMessage(image_message)
  }
  //保存message在实时数据库中
  saveMessage(message) {
    return firebase
      .database()
      .ref("/" + this.props.title + "/messages")
      .push(message)
      .catch(function(error) {
        console.error("Error saving message to Database:", error);
      });
  }
  //一堆渲染，不用改
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
  //上传图片或者文件
  handleChange = e => {
    console.log(this.state.image)
    if (e.target.files[0]) {
      this.setState({
        image:e.target.files[0]
      },console.log(this.state.image))
    }
  };

  handleUpload = () => {
    console.log(this.state.image)
    const uploadTask = firebase.storage().ref("/" + this.props.title + "/image/" + this.state.image.name).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progres = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({progress:progres});
      },
      error => {
        console.log(error);
      },
      () => {
        firebase.storage()
          .ref("/" + this.props.title + "/image/")
          .child(this.state.image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({url:url}, this.saveImage(url));
          });
      },
    );
  };
  


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
        <div>
          <progress value={this.state.progress} max="100" />
          <br />
          <br />
          <input type="file" onChange={this.handleChange} />
          <button onClick={this.handleUpload}>Upload</button>
          <br />
          <br />
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
