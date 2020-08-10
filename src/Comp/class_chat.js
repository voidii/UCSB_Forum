import React, { Component } from 'react';
import './class_list.css';

class Class_chat extends Component {
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
            <div className = "class_list"
            style = {this.addStyling()}
            onClick={this.props.changeClass.bind(this, this.props.class.title)}
            >
                <h2>
                    {this.props.class.title}
                </h2>
            </div>  
        );
    }
}

export default Class_chat