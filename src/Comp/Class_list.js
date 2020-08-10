import React, { Component } from 'react';
import Class_chat from './class_chat';
import * as firebase from 'firebase';

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
            }
            ]
          return classes.map((indClass) => (
              <Class_chat class = {indClass} 
              changeClass={this.props.changeClass}
              activeClass = {this.props.activeClass}/>
  
          ));
    }
}

export default Class_list;