import React, { Component } from 'react';
import ClassList from './Class_list';
import ClassChatScreen from './Class_chat_screen';
import './class_room.css';
import * as firebase from 'firebase';

class ClassRoom extends Component {
    constructor(){
        super();
        this.state = {
            activeClass: 1,
            authenicated: false,
            uid:""
        }
        this.changeClass = (title) => {
          this.setState({
            activeClass: title
          })
        }
      }
    
    render() {
        const classes = [
            {
              id: 1,
              title: 'ECON1'
            },
            {
              id: 2,
              title: 'CS8'
            },
            {
              id: 3,
              title: 'CS16'
            },
            {
              id: 4,
              title: 'ECON2'
            },
            {
              id: 5,
              title: 'ECON10A'
            }
            ]
        return (
            <div>
                <div className = "list">
                    <ClassList
                        class = {classes}  
                        changeClass = {this.changeClass}
                        activeClass = {this.state.activeClass}/>
                </div>
                <div className = "screen">
                    <ClassChatScreen
                        uid = {this.props.uid}
                        class = {classes}
                        title = {this.state.activeClass}
                        />
                </div>
            </div>
        );
    }
}

export default ClassRoom;