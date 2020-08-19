import React, { Component } from 'react';
import Ground from './Ground'
import Fatiezi from './fatiezi'
import * as firebase from 'firebase';

class Groundpage extends Component {
    
    constructor(){
        super();
        this.state = {
            messages: [],
            showModal: false,
            id_for_message:""
        }
    }

    getUserData = () => {
        let ref = firebase.database().ref('/GuangChang');
        ref.on('value', snapshot => {
          const message = snapshot.val();
          this.setState(
            {
              messages: message
            }
          );
        });
        console.log('DATA RETRIEVED');
    }

    componentDidMount() {
        this.getUserData();
    }

    renderList() {
        console.log(this.state.messages);
        console.log(typeof this.state.messages);
        return this.state.messages.map((indMessage) => (
            <Ground 
            uid = {this.props.uid}
            Tiezi_publisher = {indMessage.uid}
            date = {indMessage.date}
            content = {indMessage.message}
            />
          ))
      }
    
    render() {
        return (
            <div>
                <Fatiezi uid = {this.props.uid}/>
                {this.state.messages && this.renderList()}
            </div>
        );
    }
}

export default Groundpage;