import React, { Component } from 'react';
import Class_list from './Class_list';
import Class_chat_screen from './Class_chat_screen';
import './class_room.css';
import * as firebase from 'firebase';

class Class_room extends Component {
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
                    <Class_list
                        class = {classes}  
                        changeClass = {this.changeClass}
                        activeClass = {this.state.activeClass}/>
                </div>
                <div className = "screen">
                    <Class_chat_screen
                        class = {classes}
                        title = {this.state.activeClass}
                        />
                </div>
            </div>
        );
    }
}

export default Class_room;