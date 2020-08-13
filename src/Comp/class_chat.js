import React, { Component } from 'react';
import ClassChatScreen from './Class_chat_screen'
import './class_chat.css';

class ClassChat extends Component {
    addStyling = () => {
        if(this.props.class.title === this.props.activeClass){
            return {backgroundColor: '#C0E4FF'}
        }
        else{
            return {backgroundColor: '#87CCFF'}
        }
    }
    render() {
        return (
            <div>

            <div className = "list"
            style = {this.addStyling()}
            onClick={this.props.changeClass.bind(this, this.props.class.title)}
            >
                <h2>
                    {this.props.class.title}
                </h2>
            </div> 
            {this.props.class.title === this.props.activeClass && 
            <div className = "screen"> 
            <div className = "sub">
                <ClassChatScreen
                    uid = {this.props.uid}
                    title = {this.props.class.title}
                />
                </div>
            </div>}
            </div>
        );
    }
}

export default ClassChat