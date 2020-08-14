import React, { Component } from 'react';
import ClassChat from './class_chat';
import firebase from "firebase";

class Class_list extends Component {
  constructor(){
    super();
    this.state = {
      classes:[
      ]
    }
  } 

  componentDidMount() {
    this.getClassesData();
  }

  writeClassesData() {
    firebase.database().ref("/UCSB/Classes").set(this.state.classes);
    console.log('DATA SAVED');
  }

  getClassesData () {
    let ref = firebase.database().ref("/UCSB/Classes");
    ref.on("value", snap => {
      const classes = snap.val();
      this.setState(
        {
          classes
        }
      );
    });
  }
  
  render() {  
          return this.state.classes.map((indClass) => (
              <ClassChat class = {indClass} 
              uid = {this.props.uid}
              changeClass={this.props.changeClass}
              activeClass = {this.props.activeClass}/>
          )
          
          );
    }
}

export default Class_list;