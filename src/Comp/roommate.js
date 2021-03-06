import React, { Component } from 'react';
import Modal from 'react-modal';
import Reply from './reply';
import * as firebase from 'firebase';
import './Comment.css'

class Roommate extends Component {
    constructor(){
        super();
        this.state = {
            messages: [],
            showModal: false,
            id_for_message:""
        }
    }
    writeUserData = () => {
        firebase.database().ref('/message').set(this.state.messages);
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
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
          this.writeUserData();
        }
    }

    openModal = (developer) => {
      this.setState({ 
        showModal: true,
        id_for_message: developer.id_for_message
      });
    }

    closeModal = () => {
      this.setState({ 
        showModal: false,
        id_for_message:""
      });
    }

    render() {
        const { messages } = this.state;
        return(
          <div className="comment-box">
            <div className='comment'>
              <div >
              { 
                messages.map(developer => 
                  <div>
                    <div className="editContent">
                      <div className="content" href='#' onClick={ () => this.openModal(developer)}>{ developer.message }</div>
                      <div className='metadata'>
	              	      <div className='author'>{developer.name}</div>
                        <div className='author'>{developer.des}</div>
	              	      <div className='date'>{developer.date}</div>
	              	      <a className='option' href='#' onClick={ () => this.removeData(developer)}>Delete</a>
	              	      <a className='option' href='#' onClick={ () => this.updateData(developer)}>Edit</a>
	                  </div>
                    </div>
                  </div>
                  )
              } 
              </div>
            </div>
            <div className='comment-box'>
              <div className='col-xl-12'>
                <form className='submitform' onSubmit={ this.handleSubmit }>
                <span className='warning' ref='warning'></span>
                    <input type='hidden' ref='uid' />
                    <div className='form-row'>
                        <input type="text" placeholder='Name' ref='name'/>
                    </div>
                    <div className='form-row'>
                        <input type="text" placeholder='Description' ref='des'/>
                    </div>
                    <div className='form-row'>
                        <textarea placeholder='Message' ref='message'></textarea>
                    </div>
                    <div className='form-row'>
                        <input type="text" placeholder='Email' ref='Email'/>
                    </div>
                    <div className='form-row'>
                        <button>Post</button>
                    </div>
                </form>
              </div>
            </div>
            <Modal 
              isOpen={this.state.showModal}
              overlayClassName="overlay"   
              className="modal"   

              onAfterOpen={this.handleAfterOpenFunc}  
              shouldCloseOnOverlayClick={true}   
            >
              <Reply id_for_message = {this.state.id_for_message}/>
              <button onClick={this.closeModal}>关闭模态框</button>
            </Modal>



          </div>
        )
      }
      
      handleSubmit = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let message = this.refs.message.value;
        let uid = this.props.uid;
        let des = this.refs.des.value;
        console.log(uid);
      
        let Email = this.refs.Email.value;
        let date = new Date().toLocaleString();
        let warning = this.refs.warning;

        if(!(name.length < 20 && name.length > 5)) {
          warning.innerHTML = '*Name must be longer than 5 characters, less than 20';
          return null;
        }else if(!(des.length < 100) && des.length !== 0) {
          warning.innerHTML = '* Describption must be less than 100 character';
          return null;
        }else if(!(message.length < 500 && message.length > 15)) {
          warning.innerHTML = '* Message must be longer than 15 characters, less than 500 characters';
          return null;
        }else 
        {
          warning.innerHTML = '';
        }
      
        if (uid && name && message){
          //const { messages } = this.state;
          //const devIndex = messages.findIndex(data => {
          //  return data.uid === uid 
          //});
          //messages[devIndex].name = name;
          //messages[devIndex].message = message;
          //messages[devIndex].date = date;
          //messages[devIndex].des = des;
          //messages[devIndex].Email = Email;
          //this.setState({ messages });
          const id_for_message = new Date().getTime().toString() + uid;
          const { messages } = this.state;
          console.log(typeof messages)
          console.log(messages)
          messages.push({ id_for_message, uid, name, message,date,des,Email })
          this.setState({ messages });
        }
      
        this.refs.name.value = '';
        this.refs.message.value = '';
        //this.refs.uid.value = '';
        this.refs.des.value = '';
        this.refs.Email.value = '';

      }
      
      removeData = (developer) => {
        const { messages } = this.state;
        const newState = messages.filter(data => {
          return data.date !== developer.date;
        });
        this.setState({ messages: newState });
      }
      
      updateData = (developer) => {
        //this.refs.uid.value = developer.uid;
        this.refs.name.value = developer.name;
        this.refs.message.value = developer.message;
        //this.refs.date.value = developer.date;
      }
       
}

export default Roommate;