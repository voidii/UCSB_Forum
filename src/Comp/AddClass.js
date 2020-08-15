import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import * as firebase from 'firebase';

class AddClass extends Component {
    constructor(){
        super();
        this.state = {
            title:""
        }
    }

    writeUserData = () => {
        firebase.database().ref('/UCSB/Classes').set(this.state.title);
    }

    getUserData = () => {
        let ref = firebase.database().ref('/UCSB/Classes');
        ref.on('value', snapshot => {
          const message = snapshot.val();
          this.setState(
            {
              title: message
            }
          );
        });
        console.log('DATA RETRIEVED');
    }

    componentDidMount() {
        this.getUserData();
    }
      
    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
          this.writeUserData();
        }
    }
    
    render() {
        
        
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                  <input type="text" width="200px" height="30px" ref="title" />
                  <Button variant="contained" color="primary" onClick={ () => {this.handleSubmit()} }>
                      ADD CLASS
                  </Button>
                </form>
            </div>
        );
    }
    handleSubmit = (event) => {
        let title = this.refs.title.value.toUpperCase();
        if(!title) return;
        for(var i = 0,len = this.state.title.length; i < len; i++)
        {
            if(title === this.state.title[i].title)
            {
                return
            }
        }
        let curClass = this.state.title;
        curClass.push({title})
        this.setState({
            curClass
        })
    }
}

export default AddClass;