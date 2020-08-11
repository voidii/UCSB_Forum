import React, { Component } from 'react';
import Home from './Home'
import Roomate from './roommate'
import ClassRoom from './class_room'




class body extends Component {
    
    
    displayContent = () => {
        console.log(this.props.uid)
        if(this.props.activeTab === 1)
            return <Home/>
        else if(this.props.activeTab === 2)
            return <Roomate uid = {this.props.uid}/>
        else if(this.props.activeTab === 3)
            return <ClassRoom uid = {this.props.uid}/>
        else  if(this.props.activeTab === 4)
            return <Home/>
        else
            return <Home/>
    }
    render() {
        return (
            
            this.displayContent()
        );
    }
}

export default body;