import React, { Component } from 'react';
import Home from './Home'
import Roomate from './roommate'




class body extends Component {
    
    
    displayContent = () => {
        
        if(this.props.activeTab === 1)
            return <Home/>
        else if(this.props.activeTab === 2)
            return <Roomate/>
        else if(this.props.activeTab === 3)
            return <Home/>
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