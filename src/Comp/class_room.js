import React, { Component } from 'react';
import ClassList from './Class_list';
import './class_room.css';

class ClassRoom extends Component {
    constructor(){
        super();
        this.state = {
            activeClass: 0,
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
        return (
            <div>
                <div>
                    <ClassList 
                        changeClass = {this.changeClass}
                        activeClass = {this.state.activeClass}/>
                </div>
            </div>
        );
    }
}

export default ClassRoom;