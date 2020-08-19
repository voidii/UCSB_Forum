import React, { Component } from 'react';
import * as firebase from 'firebase';
import './fatiezi.css';

class Fatiezi extends Component {
    
    constructor(){
        super();
        this.state = {
            messages: [{
                id_for_message:'',
                uid:'', 
                message:'', 
                date:''
            }],
            showModal: false,
            id_for_message:""
        }
    }

    writeUserData = () => {
        firebase.database().ref('/GuangChang').set(this.state.messages);
        console.log('DATA SAVED');
    }
      
    getUserData = () => {
        let ref = firebase.database().ref('/message');
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
      
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
          this.writeUserData();
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        let message = this.refs.message.value;
        let uid = this.props.uid;
        let date = new Date().toLocaleString();
      
        if (uid && message){
          const id_for_message = new Date().getTime().toString() + uid;
          const {messages} = this.state;
          console.log(typeof messages)
          messages.push({ id_for_message, uid, message, date });
          this.setState({ messages });
        }
      }
    
    render() {
        return (
            <div>
                <div className='comment-box'>
                    <div className='col-xl-12'>
                      <form className='submitform' onSubmit={ this.handleSubmit }>
                      <span className='warning' ref='warning'></span>
                          <input type='hidden' ref='uid' />
                          <div className='form-row'>
                              <textarea placeholder='Message' ref='message'></textarea>
                          </div>
                          <div className='form-row'>
                              <button>Post</button>
                          </div>
                      </form>
                    </div>
              </div>
            </div>
        );
    }
}

export default Fatiezi;