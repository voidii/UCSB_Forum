import React, { Component } from 'react';
import ClassChat from './class_chat';
import ClassChatScreen from './Class_chat_screen'

class Class_list extends Component {
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
            },
            {
              id: 6,
              title: 'ECON100A'
            },
            {
              id: 7,
              title: 'ECON1000A'
            }
            ]
          return classes.map((indClass) => (
              <ClassChat class = {indClass} 
              changeClass={this.props.changeClass}
              activeClass = {this.props.activeClass}/>
          )
          
          );
    }
}

export default Class_list;