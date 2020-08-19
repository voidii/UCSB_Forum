import React, { Component } from 'react';
import Home from './Home'
import Roomate from './roommate'
import ClassRoom from './class_room'
import About from './About'
import GroundPage from './Ground_page'


class body extends Component {
    
    displayContent = () => {
        if(this.props.activeTab === 1)
            return <Home/>
        else if(this.props.activeTab === 2)
            return <Roomate uid = {this.props.uid}/>
        else if(this.props.activeTab === 3)
            return <ClassRoom uid = {this.props.uid} edu = {this.props.edu}/>
        else  if(this.props.activeTab === 4)
            return <GroundPage uid = {this.props.uid}/>
        else  if(this.props.activeTab === 6)
            return <About/>
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