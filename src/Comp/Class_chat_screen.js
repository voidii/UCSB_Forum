import React, { Component } from 'react';
import * as firebase from 'firebase';
import { ChatFeed, Message } from 'react-chat-ui';

class ClassChatScreen extends Component {
    constructor() {
        super();
    
        this.state = {
          messages: [
            new Message({
                id: 1,
                message: "I'm the recipient! (The person you're talking to)",
                senderName:"Frank"
              }), // Gray bubble
            new Message({ 
                id: 0, 
                message: "I'm you -- the blue bubble!",
                senderName:"Jason"
            }), // Blue bubble
          ],
        };
    }
    writeUserData = () => {
        firebase.database().ref('/UCSB/' + this.props.title).set(this.state.messages);
        console.log('DATA SAVED');
    }
    render() {
        return (
            <div>
                <ChatFeed
                    messages = {this.state.messages} // Boolean: list of message objects
                    isTyping = {this.state.is_typing} // Boolean: is the recipient typing
                    hasInputField = {false} // Boolean: use our input, or use your own
                    showSenderName// show the name of the user who sent the message
                    bubblesCentered = {false} //Boolean should the bubbles be centered in the feed?
                    // JSON: Custom bubble styles
                    bubbleStyles={
                      {
                        text: {
                          fontSize: 20
                        },
                        chatbubble: {
                          borderRadius: 30,
                          padding: 20
                        }
                      }
                    }
                />
            </div>
        );
    }
}

export default ClassChatScreen;